import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Thermometer, Shield, Lock } from "lucide-react";
import StorageBookingDialog from "./StorageBookingDialog";
import storageImage from "@assets/generated_images/secure_motorcycle_storage_unit.png";
import garageImage from "@assets/generated_images/premium_motorcycle_garage_interior.png";
import type { StorageUnit } from "@shared/schema";

const getFeatureIcon = (feature: string) => {
  if (feature.toLowerCase().includes("climate") || feature.toLowerCase().includes("temperature")) {
    return <Thermometer className="h-4 w-4" />;
  }
  if (feature.toLowerCase().includes("security") || feature.toLowerCase().includes("premium security")) {
    return <Shield className="h-4 w-4" />;
  }
  if (feature.toLowerCase().includes("private") || feature.toLowerCase().includes("enclosed")) {
    return <Lock className="h-4 w-4" />;
  }
  return <Check className="h-4 w-4" />;
};

const getUnitImage = (index: number) => {
  return index % 2 === 0 ? garageImage : storageImage;
};

export default function StorageSection() {
  const [selectedUnit, setSelectedUnit] = useState<StorageUnit | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: storageUnits, isLoading } = useQuery<StorageUnit[]>({
    queryKey: ["/api/storage-units"],
  });

  const handleReserve = (unit: StorageUnit) => {
    setSelectedUnit(unit);
    setDialogOpen(true);
  };

  return (
    <section id="storage" className="py-20 bg-background" data-testid="section-storage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            data-testid="text-storage-title"
          >
            Secure Motorcycle Storage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BC winters are tough on bikes. Keep yours safe, dry, and ready to ride
            with our premium storage solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            storageUnits?.map((unit, index) => (
              <Card
                key={unit.id}
                className={`overflow-hidden hover-elevate ${unit.popular ? "ring-2 ring-primary" : ""}`}
                data-testid={`card-storage-${unit.id}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={getUnitImage(index)}
                    alt={unit.name}
                    className="w-full h-full object-cover"
                  />
                  {unit.popular && (
                    <Badge className="absolute top-3 right-3" data-testid="badge-popular">
                      Most Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{unit.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {unit.availableUnits} left
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{unit.size}</p>

                  <div className="space-y-2 mb-6">
                    {unit.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        {getFeatureIcon(feature)}
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">
                        ${unit.price}
                      </span>
                      <span className="text-muted-foreground">/mo</span>
                    </div>
                    <Button
                      onClick={() => handleReserve(unit)}
                      disabled={unit.availableUnits <= 0}
                      data-testid={`button-reserve-${unit.id}`}
                    >
                      {unit.availableUnits > 0 ? "Reserve" : "Sold Out"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <StorageBookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        storageUnit={selectedUnit}
      />
    </section>
  );
}
