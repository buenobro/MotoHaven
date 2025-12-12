import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Storage Units table
export const storageUnits = pgTable("storage_units", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  size: text("size").notNull(),
  price: integer("price").notNull(),
  features: text("features").array().notNull(),
  imageUrl: text("image_url"),
  popular: boolean("popular").default(false),
  totalUnits: integer("total_units").notNull().default(10),
  availableUnits: integer("available_units").notNull().default(10),
});

export const insertStorageUnitSchema = createInsertSchema(storageUnits).omit({
  id: true,
});

export type InsertStorageUnit = z.infer<typeof insertStorageUnitSchema>;
export type StorageUnit = typeof storageUnits.$inferSelect;

// Services table
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  iconName: text("icon_name").notNull(),
  popular: boolean("popular").default(false),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Membership tiers table
export const membershipTiers = pgTable("membership_tiers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  popular: boolean("popular").default(false),
  ctaText: text("cta_text").notNull().default("Join"),
});

export const insertMembershipTierSchema = createInsertSchema(membershipTiers).omit({
  id: true,
});

export type InsertMembershipTier = z.infer<typeof insertMembershipTierSchema>;
export type MembershipTier = typeof membershipTiers.$inferSelect;

// Storage bookings table
export const storageBookings = pgTable("storage_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  storageUnitId: varchar("storage_unit_id").notNull().references(() => storageUnits.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  bikeInfo: text("bike_info"),
  startDate: timestamp("start_date").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const storageBookingsRelations = relations(storageBookings, ({ one }) => ({
  storageUnit: one(storageUnits, {
    fields: [storageBookings.storageUnitId],
    references: [storageUnits.id],
  }),
}));

export const insertStorageBookingSchema = createInsertSchema(storageBookings).omit({
  id: true,
  createdAt: true,
});

export type InsertStorageBooking = z.infer<typeof insertStorageBookingSchema>;
export type StorageBooking = typeof storageBookings.$inferSelect;

// Service bookings table
export const serviceBookings = pgTable("service_bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  serviceId: varchar("service_id").notNull().references(() => services.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  bikeInfo: text("bike_info"),
  preferredDate: timestamp("preferred_date").notNull(),
  preferredTime: text("preferred_time"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const serviceBookingsRelations = relations(serviceBookings, ({ one }) => ({
  service: one(services, {
    fields: [serviceBookings.serviceId],
    references: [services.id],
  }),
}));

export const insertServiceBookingSchema = createInsertSchema(serviceBookings).omit({
  id: true,
  createdAt: true,
});

export type InsertServiceBooking = z.infer<typeof insertServiceBookingSchema>;
export type ServiceBooking = typeof serviceBookings.$inferSelect;

// Membership signups table
export const membershipSignups = pgTable("membership_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tierId: varchar("tier_id").notNull().references(() => membershipTiers.id),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  bikeInfo: text("bike_info"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const membershipSignupsRelations = relations(membershipSignups, ({ one }) => ({
  tier: one(membershipTiers, {
    fields: [membershipSignups.tierId],
    references: [membershipTiers.id],
  }),
}));

export const insertMembershipSignupSchema = createInsertSchema(membershipSignups).omit({
  id: true,
  createdAt: true,
});

export type InsertMembershipSignup = z.infer<typeof insertMembershipSignupSchema>;
export type MembershipSignup = typeof membershipSignups.$inferSelect;

// Contact inquiries table
export const inquiries = pgTable("inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
