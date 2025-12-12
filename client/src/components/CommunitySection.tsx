import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users } from "lucide-react";

interface RiderProfile {
  id: string;
  name: string;
  bike: string;
  memberSince: string;
  initials: string;
}

// todo: remove mock functionality
const riders: RiderProfile[] = [
  { id: "1", name: "Mike T.", bike: "BMW R1250GS", memberSince: "2022", initials: "MT" },
  { id: "2", name: "Sarah K.", bike: "Triumph Street Triple", memberSince: "2023", initials: "SK" },
  { id: "3", name: "Jake R.", bike: "Harley Fat Bob", memberSince: "2021", initials: "JR" },
  { id: "4", name: "Lisa M.", bike: "KTM 890 Adventure", memberSince: "2023", initials: "LM" },
  { id: "5", name: "Chris D.", bike: "Ducati Monster", memberSince: "2022", initials: "CD" },
  { id: "6", name: "Emma P.", bike: "Honda Africa Twin", memberSince: "2024", initials: "EP" },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-muted" data-testid="section-community">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-12">
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
              data-testid="text-community-title"
            >
              Our Rider Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Join a passionate group of BC riders who share your love for two wheels.
              Monthly rides, wrenching sessions, and good times.
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2" data-testid="button-view-all-riders">
            <Users className="h-4 w-4" />
            View All Members
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {riders.map((rider) => (
            <Card
              key={rider.id}
              className="hover-elevate"
              data-testid={`card-rider-${rider.id}`}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {rider.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{rider.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{rider.bike}</p>
                    <p className="text-xs text-muted-foreground">Member since {rider.memberSince}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block">
            <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Ready to join the crew?
                </h3>
                <p className="text-muted-foreground">
                  Become part of BC's most active motorcycle community.
                </p>
              </div>
              <Button size="lg" data-testid="button-become-member">
                Become a Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
