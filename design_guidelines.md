# Design Guidelines for Rostov Region Travel Planning Application

## Design Philosophy
Apple.com-inspired minimalist aesthetic with clean hierarchy, generous whitespace, thin typography, and smooth animations throughout the entire experience.

## Color Palette
- **Primary Accent**: #50b848 (Центр-Инвест green) - use for all buttons, interactive elements, highlights, and CTAs
- **Backgrounds**: Soft gradients, white/light backgrounds with semi-transparent overlays
- **Text**: Black/dark gray for primary text, lighter grays for secondary information

## Typography
- Thin, elegant typefaces (San Francisco-style or similar)
- Clear hierarchy with varied font weights and sizes
- Ample line-spacing for readability

## Layout & Spacing
- Generous whitespace between sections and elements
- Use Tailwind spacing units: primarily 4, 6, 8, 12, 16 for consistent rhythm
- Rounded corners on cards, forms, and interactive elements (rounded-lg to rounded-xl)
- Full responsiveness: 320px mobile → tablet → desktop breakpoints

## Component Library

### Navigation
- Clean header with logo, minimal navigation links
- Smooth scroll behavior between sections
- Mobile: hamburger menu with slide-in animation

### Forms & Inputs
- Minimalist input fields with subtle borders
- Focus states with #50b848 accent
- Tab switching with smooth transitions (login/registration)
- Checkbox/chip-style tags for interests (15-20 options)
- Slider for budget selection (3 tiers: economy/comfort/premium)

### Cards
- Route history cards with dates, mini-map icons
- Attraction cards with photos, titles, categories, descriptions
- 1-3 columns on desktop, single column on mobile
- Hover effects with subtle elevation changes

### Buttons
- Primary: #50b848 background with white text
- Blurred backgrounds when overlaid on images
- Smooth hover/active states built-in
- Rounded corners (rounded-full or rounded-lg)

### Modals/Overlays
- Semi-transparent white/light overlays (backdrop-blur effect)
- Rounded corners, floating appearance
- Route planning form overlaid on map background

## Animations
- **Scroll Animations**: Fade-in and slide-up on benefits blocks
- **Page Transitions**: Smooth fade transitions between pages
- **Interactive Elements**: Subtle scale/opacity changes on hover
- **Tab Switching**: Smooth cross-fade animations
- **Route Type Selector**: Animated toggle between walking/bus/car modes

## Page-Specific Requirements

### Landing Page
- Hero section with large headline, descriptive subtitle
- Background: soft gradient or abstract Rostov region map
- "Build Route" CTA button (#50b848) → registration
- 2-3 benefits blocks with icons, animated on scroll

### Login/Registration
- Two tabs with smooth switching animation
- Minimal form design, centered layout
- Fields: email, password, confirm password (registration)

### Profile Setup
- Avatar upload UI (mock button)
- Name fields (first, last)
- 15-20 interest tags in chip/checkbox format
- Categories: Museums, Nature, Gastronomy, Festivals, History, Photo Spots, etc.

### User Profile
- Header with avatar and name
- "Route History" section with clickable cards
- Each card shows: route name, date, mini-map/icon

### Route Planning
- Full-screen Yandex Maps background (like taxi.yandex.ru)
- Semi-transparent overlay form with:
  - Start/end location dropdowns (Rostov, Taganrog, Azov, etc.)
  - Budget slider (3 tiers)
  - Travel style checkboxes (Family, Active, Cultural, Romantic)
- Mobile: form slides down or appears as modal

### Route Result
- Attraction cards (1-3 per row desktop, 1 on mobile)
- Each card: photo, name, category, description
- Route type switcher at top (walk/bus/car) with animation
- "Save Route" and "Share" buttons
- "Add Stop" functionality (mock)

## Images
- **Hero Image**: Abstract or stylized map of Rostov region with gradient overlay
- **Attraction Cards**: High-quality photos of landmarks, nature spots, cultural venues
- **Benefits Section**: Iconography representing personalization, offline mode, ticketing

## Technical Specifications
- Mock data arrays in JavaScript/JSON
- Yandex Maps API for visual background (static if complex)
- No backend logic required
- Replit-ready with CDN libraries only
- Accessibility considerations throughout