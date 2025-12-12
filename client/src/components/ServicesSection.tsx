import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Wrench, Snowflake, Settings, Droplets, Gauge, CircleDot } from "lucide-react";
import ServiceBookingDialog from "./ServiceBookingDialog";
import mechanicImage from "@assets/stock_images/motorcycle_mechanic__3d02ce62.jpg";
import type { Service } from "@shared/schema";

const iconMap: Record<string, typeof Wrench> = {
  Wrench,
  Snowflake,
  Settings,
  Droplets,
  Gauge,
  CircleDot,
};

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const handleBook = (service: Service) => {
    setSelectedService(service);
    setDialogOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-muted" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-services-title"
            >
              Professional Maintenance
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Our certified technicians treat every bike like their own. From routine
              oil changes to complete overhauls, we keep you riding safe and smooth.
            </p>
            <div className="relative rounded-md overflow-hidden">
              <img
                src={mechanicImage}
                alt="Professional motorcycle maintenance"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-semibold">Expert Care</p>
                <p className="text-sm text-white/80">Factory-trained technicians</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-5">
                    <Skeleton className="h-10 w-10 rounded-md mb-3" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              services?.map((service) => {
                const Icon = iconMap[service.iconName] || Wrench;
                return (
                  <Card
                    key={service.id}
                    className="hover-elevate"
                    data-testid={`card-service-${service.id}`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {service.popular && (
                          <Badge className="ml-auto text-xs">Popular</Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-foreground">{service.price}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleBook(service)}
                          data-testid={`button-book-${service.id}`}
                        >
                          Book
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ServiceBookingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        service={selectedService}
      />
    </section>
  );
}
