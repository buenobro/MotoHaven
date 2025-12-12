import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertStorageBookingSchema,
  insertServiceBookingSchema,
  insertMembershipSignupSchema,
  insertInquirySchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Storage Units
  app.get("/api/storage-units", async (req, res) => {
    try {
      const units = await storage.getStorageUnits();
      res.json(units);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch storage units" });
    }
  });

  app.get("/api/storage-units/:id", async (req, res) => {
    try {
      const unit = await storage.getStorageUnit(req.params.id);
      if (!unit) {
        return res.status(404).json({ error: "Storage unit not found" });
      }
      res.json(unit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch storage unit" });
    }
  });

  // Services
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/services/:id", async (req, res) => {
    try {
      const service = await storage.getService(req.params.id);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch service" });
    }
  });

  // Membership Tiers
  app.get("/api/membership-tiers", async (req, res) => {
    try {
      const tiers = await storage.getMembershipTiers();
      res.json(tiers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch membership tiers" });
    }
  });

  // Storage Bookings
  app.post("/api/storage-bookings", async (req, res) => {
    try {
      const data = insertStorageBookingSchema.parse({
        ...req.body,
        startDate: new Date(req.body.startDate),
      });
      
      // Get the storage unit to check availability
      const unit = await storage.getStorageUnit(data.storageUnitId);
      if (!unit) {
        return res.status(404).json({ error: "Storage unit not found" });
      }
      if (unit.availableUnits <= 0) {
        return res.status(400).json({ error: "No units available" });
      }

      const booking = await storage.createStorageBooking(data);
      
      // Decrement available units
      await storage.updateStorageUnitAvailability(unit.id, unit.availableUnits - 1);
      
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create storage booking" });
    }
  });

  // Service Bookings
  app.post("/api/service-bookings", async (req, res) => {
    try {
      const data = insertServiceBookingSchema.parse({
        ...req.body,
        preferredDate: new Date(req.body.preferredDate),
      });
      
      // Verify service exists
      const service = await storage.getService(data.serviceId);
      if (!service) {
        return res.status(404).json({ error: "Service not found" });
      }

      const booking = await storage.createServiceBooking(data);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create service booking" });
    }
  });

  // Membership Signups
  app.post("/api/membership-signups", async (req, res) => {
    try {
      const data = insertMembershipSignupSchema.parse(req.body);
      
      // Verify tier exists
      const tier = await storage.getMembershipTier(data.tierId);
      if (!tier) {
        return res.status(404).json({ error: "Membership tier not found" });
      }

      const signup = await storage.createMembershipSignup(data);
      res.status(201).json(signup);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create membership signup" });
    }
  });

  // Contact Inquiries
  app.post("/api/inquiries", async (req, res) => {
    try {
      const data = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(data);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create inquiry" });
    }
  });

  return httpServer;
}
