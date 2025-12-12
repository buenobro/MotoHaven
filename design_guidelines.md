# Design Guidelines: BC Motorcycle Storage & Community Platform

## Design Approach

**Selected Approach:** Reference-Based with Premium Community Focus

Drawing inspiration from:
- **Airbnb** for browsing/booking storage units and services
- **Harley-Davidson/Triumph** for rugged, premium motorcycle aesthetic
- **Strava** for community and social features

**Core Principle:** Create a rugged yet refined digital clubhouse that mirrors the premium, adventure-focused nature of BC's motorcycle culture.

## Typography System

**Font Families:**
- Primary: Inter (Google Fonts) - clean, modern, excellent readability
- Accent: Bebas Neue or Oswald (Google Fonts) - bold headers with mechanical/industrial feel

**Hierarchy:**
- Hero Headlines: 4xl to 6xl (responsive), bold weight, tight line-height
- Section Headers: 3xl to 4xl, bold
- Subsections: xl to 2xl, semibold
- Body Text: base to lg, normal weight
- UI Elements: sm to base, medium weight

## Layout System

**Spacing Units:** Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm

**Container Strategy:**
- Full-width hero and feature sections
- Content sections: max-w-7xl centered
- Text-heavy areas: max-w-4xl for readability

**Vertical Rhythm:**
- Section padding: py-16 (mobile) to py-24 (desktop)
- Component spacing: gap-8 to gap-12
- Generous whitespace between major sections

## Page Structure & Layout

### Hero Section
- **Height:** 85vh minimum - immersive entry point
- **Layout:** Full-width background image with centered content overlay
- **Content:** Bold headline emphasizing "Urban Moto Clubhouse" concept, subheading about storage + maintenance + community, primary CTA button with blurred background
- **Image Treatment:** High-impact photo of motorcycles in BC mountain setting or garage interior

### Storage Units Browse Section
- **Layout:** 3-column grid (lg), 2-column (md), 1-column (mobile)
- **Cards:** Large images of storage units, size specs, monthly pricing, "Reserve" CTA
- **Filters:** Sticky sidebar or horizontal filter bar (unit size, features, availability)

### Maintenance Services Section
- **Layout:** 2-column alternating content blocks
- **Content:** Service package cards with icon, title, description, pricing, popular services highlighted
- **Visual:** Mix text blocks with lifestyle images of bikes being serviced

### Membership Tiers
- **Layout:** 3-column comparison table (Basic, Premium, VIP)
- **Design:** Vertical cards with tiered heights (emphasize Premium tier), checkmark lists, pricing, feature comparison
- **Treatment:** Center tier slightly elevated or highlighted

### Community Showcase
- **Layout:** Masonry grid or staggered layout for rider profiles
- **Content:** Member bike photos, names, bike models, brief descriptions
- **Interactive:** Hover states revealing more details, profile links

### Booking/Calendar Section
- **Layout:** Split layout - calendar on left (60%), booking details/form on right (40%)
- **Treatment:** Clean calendar interface with availability indicators

### Footer
- **Layout:** 4-column grid with newsletter signup, quick links (Services, Storage, Community, About), contact info, social links
- **Content:** Trust indicators (years in business, bikes stored, community size)

## Component Library

### Navigation
- **Desktop:** Horizontal nav with logo left, links center, "Book Now" CTA right
- **Mobile:** Hamburger menu with slide-in drawer
- **Treatment:** Slightly transparent overlay on hero, solid on scroll

### Cards
- **Storage Units:** Landscape image, overlay text, hover lift effect
- **Service Packages:** Vertical cards with top icon/image, stacked content
- **Member Profiles:** Square images with rounded corners, minimal overlay text

### Buttons
- **Primary:** Bold, substantial size (px-8 py-4), uppercase text
- **Secondary:** Outlined style, same sizing
- **Contextual (on images):** Blurred background treatment for readability

### Forms
- **Contact/Booking:** Generous input sizing, clear labels above fields, full-width on mobile
- **Layout:** Single column, logical grouping with section headers

### Icons
- **Library:** Heroicons via CDN
- **Usage:** Service features, membership benefits, navigation elements
- **Style:** Outline style for consistency with rugged aesthetic

## Images Strategy

**Required Images:**
1. **Hero:** Full-width BC mountain road with motorcycles or premium garage interior with bikes (dramatic lighting)
2. **Storage Units:** Professional photos of various unit sizes (individual, covered, climate-controlled)
3. **Maintenance Services:** Lifestyle shots of mechanics working on bikes, detail shots of service work
4. **Community:** Real rider photos with their bikes in BC landscapes
5. **About/Trust:** Team photos, facility exterior/interior shots

**Image Treatment:**
- High-quality, professional photography
- Consistent editing style (slightly desaturated for rugged feel, or vibrant for adventure vibe)
- Mix wide landscape shots with detail/close-ups for visual variety

## Responsive Behavior

**Breakpoints:**
- Mobile: Single column, stacked navigation, simplified cards
- Tablet (md): 2-column grids, horizontal navigation
- Desktop (lg): Full multi-column layouts, expanded imagery

**Priority:** Mobile-first approach ensuring booking and contact forms are easily accessible on all devices

## Animation Principles

**Minimal, Purposeful Motion:**
- Scroll-triggered fade-ins for section entry
- Hover lift on cards (transform: translateY(-4px))
- Smooth transitions on navigation state changes
- No distracting parallax or complex scroll effects

## Accessibility Standards

- Semantic HTML throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- Form inputs with clear focus states and error messaging
- Sufficient contrast ratios for text readability
- Alt text on all images