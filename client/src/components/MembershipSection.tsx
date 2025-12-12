import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";
import MembershipSignupDialog from "./MembershipSignupDialog";
import type { MembershipTier } from "@shared/schema";

const allFeatures = [
  "Community event access",
  "Member newsletter",
  "10% off merchandise",
  "15% off merchandise",
  "20% off merchandise",
  "10% storage discount",
  "15% storage discount",
  "Priority booking",
  "Free annual inspection",
  "Garage workspace access",
];

const getDisplayFeatures = (tier: MembershipTier) => {
  const tierFeatures = tier.features;
  
  const merchandiseDiscount = tierFeatures.find(f => f.includes("merchandise"));
  const storageDiscount = tierFeatures.find(f => f.includes("storage"));
  
  const displayFeatures = [
    { name: "Community event access", included: tierFeatures.includes("Community event access") },
    { name: "Member newsletter", included: tierFeatures.includes("Member newsletter") },
    { name: merchandiseDiscount || "Merchandise discount", included: !!merchandiseDiscount },
    { name: storageDiscount || "Storage discount", included: !!storageDiscount },
    { name: "Priority booking", included: tierFeatures.includes("Priority booking") },
    { name: "Free annual inspection", included: tierFeatures.includes("Free annual inspection") },
    { name: "Garage workspace access", included: tierFeatures.includes("Garage workspace access") },
  ];
  
  return displayFeatures;
};

export default function MembershipSection() {
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: tiers, isLoading } = useQuery<MembershipTier[]>({
    queryKey: ["/api/membership-tiers"],
  });

  const handleJoin = (tier: MembershipTier) => {
    setSelectedTier(tier);
    setDialogOpen(true);
  };

  return (
    <section id="membership" className="py-20 bg-background" data-testid="section-membership">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            data-testid="text-membership-title"
          >
            Join the Club
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            More than storage, we're a community. Choose your membership and unlock
            exclusive benefits, events, and rider perks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader className="text-center pb-4">
                  <Skeleton className="h-8 w-24 mx-auto mb-2" />
                  <Skeleton className="h-10 w-20 mx-auto mb-2" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-3 mb-6 flex-1">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            tiers?.map((tier) => {
              const features = getDisplayFeatures(tier);
              return (
                <Card
                  key={tier.id}
                  className={`flex flex-col ${tier.popular ? "ring-2 ring-primary" : ""}`}
                  data-testid={`card-membership-${tier.id}`}
                >
                  <CardHeader className="text-center pb-4">
                    {tier.popular && (
                      <Badge className="mx-auto mb-2" data-testid="badge-recommended">
                        Recommended
                      </Badge>
                    )}
                    <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-foreground">${tier.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="space-y-3 mb-6 flex-1">
                      {features.map((feature, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center gap-2 text-sm ${
                            feature.included ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {feature.included ? (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                          )}
                          <span className={feature.included ? "" : "line-through opacity-60"}>
                            {feature.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => handleJoin(tier)}
                      data-testid={`button-join-${tier.id}`}
                    >
                      {tier.ctaText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <MembershipSignupDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        tier={selectedTier}
      />
    </section>
  );
}
