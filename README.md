# Maison L'Ambre — World-Class Premium Restaurant Web Application

A production-grade, responsive restaurant web application featuring signature wood-fired culinary storytelling, dynamic seasonal menu exploration with real-time search & dietary filters, multi-course tasting degustations, a sommelier grand crus cellar, an interactive table floor-plan reservation selector, live kitchen order tracking, and multi-currency switching.

---

## 🍽️ Key Features & Capabilities

### 1. Chef's Multi-Course Tasting Menu Journey (Prix Fixe)
- **Interactive Course Stepper**: 5-course "Terra & Mare" and 7-course "Grand Reserve" progression.
- **Course-by-Course Profiles**: Detailed dish ingredients, dietary notes, and Sommelier Wine Pairings with vintage, terroir, and tasting notes.
- **Direct Reservation Sync**: One-click "Reserve This Tasting" transfers selection directly to the table booking system.

### 2. Sommelier Wine Vault & Grand Crus
- Curated cellar collection featuring iconic Champagne, Bordeaux, Burgundy, and Tuscan vintages.
- Bottle & glass pricing with live currency conversion.
- Direct **"Add Bottle to Order"** action seamlessly integrated into the shopping bag.

### 3. Visual Table & Seating Floor Plan Selector
- Interactive table layout covering **Hearthside Embers**, **Main Dining Salon**, **Glasshouse Garden Pergola**, and **Subterranean Wine Vault**.
- Table seat capacities, ambiance descriptions, and real-time selection.

### 4. Live Kitchen Order Tracking System
- Simulated real-time 4-stage kitchen preparation queue:
  1. Concierge Verification
  2. Wood-Fired Hearth Roasting (800°F)
  3. Executive Chef Plating & Quality Check
  4. Ready for Dining Table Service / Priority Courier
- Real-time minute countdown timer and floating active order status pill.

### 5. Private Dining & Banquets Inquiry Module
- Dedicated exploration of private dining spaces (The Wine Vault up to 12 guests, Glasshouse Garden up to 32 guests, Full Venue Buyout up to 85 guests).
- Structured booking inquiry form with automated reference codes (`EVT-XXXXX`).

### 6. Multi-Currency Switcher (GBP £ · USD $ · EUR €)
- Live price conversion across all menu items, tasting journeys, wine bottles, cart calculations, and checkout receipts.
- Automatically saved in local storage.

### 7. Seasonal Menu, Customization & Ordering
- Real-time search by dish name, ingredients, or keywords.
- Dietary filters: Chef's Pick, Vegetarian, Vegan, Gluten-Free, Popular.
- Portion sizing, culinary add-ons (extra truffles, wild mushrooms, etc.), and kitchen notes.
- Slide-over cart drawer with promotional code engine (`LAMBRE20` for 20% off).
- Dine-in pickup vs. Priority Delivery toggle.

### 8. Online Table Reservation Booking
- Complete reservation validation, past-date prevention, party sizes, and seating preferences.
- Instant booking code generation (`RES-XXXXX`) with clipboard copy.

### 9. Atmosphere Gallery, Lightbox & Acclaim
- Keyboard-accessible full-screen Lightbox with next/previous controls.
- Critic reviews and guest testimonials carousel with 5-star ratings.
- Clickable telephone and email links, operating schedules, and directions map launcher.

---

## 🎨 Client Customization Guide

### Brand Configuration & Hours
Open `src/data/restaurantData.ts` to adjust:
- Restaurant Name, Tagline, Address, Phone, Email
- Lunch & Dinner hours
- Executive Chef and Sommelier attributions

### Tasting Courses & Cellar Vintages
Open `src/data/tastingMenuData.ts` to edit:
- Course dishes, descriptions, and sommelier pairing notes
- Wine cellar inventory, vintages, regions, and bottle prices
- Table floor plan options and capacities

### Menu Items & Pricing
Open `src/data/menuData.ts` to customize:
- Dish names, categories, descriptions, base prices
- Portion variations and culinary add-ons

---

## 🛠️ Tech Stack

- **React 19** with **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** with `@tailwindcss/vite`
- **Lucide React** for icons
- Custom React Context Providers (`CartContext`, `CurrencyContext`, `ToastContext`)

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript lint check
npm run lint

# Build for production
npm run build
```
