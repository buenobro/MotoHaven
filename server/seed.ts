import { db } from "./db";
import { storageUnits, services, membershipTiers } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed storage units
  const existingUnits = await db.select().from(storageUnits);
  if (existingUnits.length === 0) {
    await db.insert(storageUnits).values([
      {
        name: "Standard Unit",
        size: "Single bike space",
        price: 149,
        features: ["24/7 Access", "Security cameras", "Battery tender hookup"],
        popular: false,
        totalUnits: 20,
        availableUnits: 12,
      },
      {
        name: "Climate Controlled",
        size: "Single bike space",
        price: 199,
        features: ["Temperature regulated", "Humidity control", "Premium security", "Battery tender"],
        popular: true,
        totalUnits: 10,
        availableUnits: 5,
      },
      {
        name: "Premium Suite",
        size: "2-bike space",
        price: 349,
        features: ["Private enclosed unit", "Climate controlled", "Work bench included", "Tool access"],
        popular: false,
        totalUnits: 5,
        availableUnits: 3,
      },
    ]);
    console.log("Storage units seeded");
  }

  // Seed services
  const existingServices = await db.select().from(services);
  if (existingServices.length === 0) {
    await db.insert(services).values([
      {
        name: "Winterization Package",
        description: "Full prep for winter storage: fuel stabilizer, battery tender setup, tire care, and protective cover.",
        price: "From $129",
        iconName: "Snowflake",
        popular: true,
      },
      {
        name: "Oil & Filter Service",
        description: "Premium synthetic oil change with filter replacement. Includes 21-point inspection.",
        price: "From $89",
        iconName: "Droplets",
        popular: false,
      },
      {
        name: "Tire Mount & Balance",
        description: "Professional tire mounting and dynamic balancing. We can source tires or use yours.",
        price: "From $75/wheel",
        iconName: "CircleDot",
        popular: false,
      },
      {
        name: "Full Service",
        description: "Complete maintenance package: oil, brakes, chain, fluids, and comprehensive inspection.",
        price: "From $299",
        iconName: "Wrench",
        popular: false,
      },
      {
        name: "Spring Ready Package",
        description: "De-winterization, battery check, fluid top-up, and safety inspection to get you road-ready.",
        price: "From $149",
        iconName: "Gauge",
        popular: false,
      },
      {
        name: "Custom Work",
        description: "Accessory installation, custom modifications, and specialty work. Get a quote for your project.",
        price: "Quote",
        iconName: "Settings",
        popular: false,
      },
    ]);
    console.log("Services seeded");
  }

  // Seed membership tiers
  const existingTiers = await db.select().from(membershipTiers);
  if (existingTiers.length === 0) {
    await db.insert(membershipTiers).values([
      {
        name: "Rider",
        price: 0,
        description: "Access to community events and basic perks",
        features: [
          "Community event access",
          "Member newsletter",
          "10% off merchandise",
        ],
        popular: false,
        ctaText: "Join Free",
      },
      {
        name: "Club Member",
        price: 49,
        description: "Full access to storage discounts and priority service",
        features: [
          "Community event access",
          "Member newsletter",
          "15% off merchandise",
          "10% storage discount",
          "Priority booking",
          "Free annual inspection",
        ],
        popular: true,
        ctaText: "Get Started",
      },
      {
        name: "VIP",
        price: 99,
        description: "The ultimate rider experience with exclusive perks",
        features: [
          "Community event access",
          "Member newsletter",
          "20% off merchandise",
          "15% storage discount",
          "Priority booking",
          "Free annual inspection",
          "Garage workspace access",
        ],
        popular: false,
        ctaText: "Go VIP",
      },
    ]);
    console.log("Membership tiers seeded");
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
