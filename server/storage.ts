import {
  type User,
  type InsertUser,
  type StorageUnit,
  type InsertStorageUnit,
  type Service,
  type InsertService,
  type MembershipTier,
  type InsertMembershipTier,
  type StorageBooking,
  type InsertStorageBooking,
  type ServiceBooking,
  type InsertServiceBooking,
  type MembershipSignup,
  type InsertMembershipSignup,
  type Inquiry,
  type InsertInquiry,
  users,
  storageUnits,
  services,
  membershipTiers,
  storageBookings,
  serviceBookings,
  membershipSignups,
  inquiries,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Storage Units
  getStorageUnits(): Promise<StorageUnit[]>;
  getStorageUnit(id: string): Promise<StorageUnit | undefined>;
  createStorageUnit(unit: InsertStorageUnit): Promise<StorageUnit>;
  updateStorageUnitAvailability(id: string, available: number): Promise<StorageUnit | undefined>;

  // Services
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Membership Tiers
  getMembershipTiers(): Promise<MembershipTier[]>;
  getMembershipTier(id: string): Promise<MembershipTier | undefined>;
  createMembershipTier(tier: InsertMembershipTier): Promise<MembershipTier>;

  // Storage Bookings
  getStorageBookings(): Promise<StorageBooking[]>;
  createStorageBooking(booking: InsertStorageBooking): Promise<StorageBooking>;

  // Service Bookings
  getServiceBookings(): Promise<ServiceBooking[]>;
  createServiceBooking(booking: InsertServiceBooking): Promise<ServiceBooking>;

  // Membership Signups
  getMembershipSignups(): Promise<MembershipSignup[]>;
  createMembershipSignup(signup: InsertMembershipSignup): Promise<MembershipSignup>;

  // Inquiries
  getInquiries(): Promise<Inquiry[]>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Storage Units
  async getStorageUnits(): Promise<StorageUnit[]> {
    return await db.select().from(storageUnits);
  }

  async getStorageUnit(id: string): Promise<StorageUnit | undefined> {
    const [unit] = await db.select().from(storageUnits).where(eq(storageUnits.id, id));
    return unit || undefined;
  }

  async createStorageUnit(unit: InsertStorageUnit): Promise<StorageUnit> {
    const [created] = await db.insert(storageUnits).values(unit).returning();
    return created;
  }

  async updateStorageUnitAvailability(id: string, available: number): Promise<StorageUnit | undefined> {
    const [updated] = await db
      .update(storageUnits)
      .set({ availableUnits: available })
      .where(eq(storageUnits.id, id))
      .returning();
    return updated || undefined;
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(service: InsertService): Promise<Service> {
    const [created] = await db.insert(services).values(service).returning();
    return created;
  }

  // Membership Tiers
  async getMembershipTiers(): Promise<MembershipTier[]> {
    return await db.select().from(membershipTiers);
  }

  async getMembershipTier(id: string): Promise<MembershipTier | undefined> {
    const [tier] = await db.select().from(membershipTiers).where(eq(membershipTiers.id, id));
    return tier || undefined;
  }

  async createMembershipTier(tier: InsertMembershipTier): Promise<MembershipTier> {
    const [created] = await db.insert(membershipTiers).values(tier).returning();
    return created;
  }

  // Storage Bookings
  async getStorageBookings(): Promise<StorageBooking[]> {
    return await db.select().from(storageBookings);
  }

  async createStorageBooking(booking: InsertStorageBooking): Promise<StorageBooking> {
    const [created] = await db.insert(storageBookings).values(booking).returning();
    return created;
  }

  // Service Bookings
  async getServiceBookings(): Promise<ServiceBooking[]> {
    return await db.select().from(serviceBookings);
  }

  async createServiceBooking(booking: InsertServiceBooking): Promise<ServiceBooking> {
    const [created] = await db.insert(serviceBookings).values(booking).returning();
    return created;
  }

  // Membership Signups
  async getMembershipSignups(): Promise<MembershipSignup[]> {
    return await db.select().from(membershipSignups);
  }

  async createMembershipSignup(signup: InsertMembershipSignup): Promise<MembershipSignup> {
    const [created] = await db.insert(membershipSignups).values(signup).returning();
    return created;
  }

  // Inquiries
  async getInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const [created] = await db.insert(inquiries).values(inquiry).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
