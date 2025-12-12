# MotoVault BC - Motorcycle Storage & Community Platform

## Overview

MotoVault BC is a premium motorcycle storage and community platform targeting British Columbia riders. The application provides secure winter storage booking, professional maintenance services, membership tiers, and community features. It's designed as an "urban moto clubhouse" combining Airbnb-style booking with motorcycle community elements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Build Tool**: Vite with React plugin

**Design Pattern**: Component-based architecture with section components (HeroSection, StorageSection, ServicesSection, etc.) composed into page layouts. Dialog components handle booking flows.

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Style**: RESTful JSON API under `/api/*` routes
- **Build**: esbuild for production bundling with selective dependency bundling for cold start optimization

**Key Endpoints**:
- `/api/storage-units` - Storage unit listings and details
- `/api/services` - Maintenance service offerings
- `/api/membership-tiers` - Membership plans
- `/api/inquiries` - Contact form submissions
- Booking endpoints for storage, services, and memberships

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Connection**: `pg` Pool with `DATABASE_URL` environment variable
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Drizzle Kit with `drizzle-kit push` for schema sync

**Core Tables**: users, storageUnits, services, membershipTiers, storageBookings, serviceBookings, membershipSignups, inquiries

### Shared Code
- **Location**: `shared/` directory for code used by both client and server
- **Schema Validation**: Zod schemas generated from Drizzle tables via `drizzle-zod`
- **Type Safety**: Inferred types from schema for full-stack type consistency

### Development Setup
- **Dev Server**: Vite dev server with HMR proxied through Express
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`
- **Hot Reload**: Server uses tsx for TypeScript execution in development

## External Dependencies

### Database
- PostgreSQL database (required via `DATABASE_URL` environment variable)
- Drizzle ORM for type-safe queries and migrations

### UI/Component Libraries
- Radix UI primitives (dialogs, forms, navigation, tooltips, etc.)
- Lucide React for icons
- React Icons (social media icons)
- Embla Carousel for image carousels
- React Day Picker for calendar components

### Form Handling
- React Hook Form with Zod resolver for validation
- date-fns for date formatting

### Session Management
- express-session with connect-pg-simple for PostgreSQL session storage
- Session-based authentication infrastructure (passport-local available)

### Asset Management
- Static assets in `attached_assets/` directory
- Generated images and stock photos for motorcycle/storage imagery