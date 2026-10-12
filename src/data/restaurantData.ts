import { Testimonial, GalleryItem } from '../types';

export const RESTAURANT_INFO = {
  name: "Maison L'Ambre",
  shortName: "L'Ambre",
  tagline: "Good Food. Beautiful Moments.",
  cuisine: "Contemporary Coastal & Wood-Fired Artisanal Dining",
  address: "428 Heritage Boulevard, Mayfair",
  city: "London",
  postalCode: "W1K 2HD",
  country: "United Kingdom",
  phone: "+44 20 7946 0912",
  phoneFormatted: "+44 (0) 20 7946 0912",
  email: "reservations@maisonlambre.com",
  orderEmail: "orders@maisonlambre.com",
  hours: {
    weekdays: {
      lunch: "12:00 PM – 3:30 PM",
      dinner: "5:30 PM – 11:00 PM"
    },
    weekends: {
      lunch: "11:30 AM – 4:00 PM",
      dinner: "5:00 PM – 11:30 PM"
    }
  },
  executiveChef: "Antoine Laurent",
  sommelier: "Camille Moreau",
  yearEstablished: 2018,
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tripadvisor: "https://tripadvisor.com"
  }
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: "Maison L'Ambre redefines modern wood-fired gastronomy. The Chilean sea bass with saffron velouté is an absolute triumph of restraint and exquisite balance.",
    author: "Elena Vance",
    role: "Senior Gastronomy Critic",
    publication: "The Epicurean Review",
    rating: 5,
    initials: "EV"
  },
  {
    id: 'test-2',
    quote: "From the warm candlelit ambiance to the handcrafted black truffle pasta, dining here feels like an intimate celebration. Easily London's most soulful evening table.",
    author: "Julian Thorne",
    role: "Editorial Director",
    publication: "Modern Dining Quarterly",
    rating: 5,
    initials: "JT"
  },
  {
    id: 'test-3',
    quote: "Exceptional culinary technique married with sincere, unpretentious hospitality. The dry-aged ribeye with bone marrow jus is worth crossing continents for.",
    author: "Clara Beauchamp",
    role: "Verified Guest & Sommelier",
    rating: 5,
    initials: "CB"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Hearthside Dining Room',
    category: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    fallbackGradient: 'from-amber-950 via-stone-900 to-black',
    span: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    id: 'gal-2',
    title: 'Seared Sea Bass with Saffron Velouté',
    category: 'Cuisine',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-orange-950 via-stone-900 to-black',
    span: 'col-span-1'
  },
  {
    id: 'gal-3',
    title: 'Executive Chef at Wood-Fired Hearth',
    category: 'Hearth',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-stone-900 via-amber-950 to-black',
    span: 'col-span-1'
  },
  {
    id: 'gal-4',
    title: 'Private Garden Courtyard',
    category: 'Atmosphere',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-emerald-950 via-stone-900 to-black',
    span: 'col-span-1'
  },
  {
    id: 'gal-5',
    title: 'Sommelier Wine Vault Selection',
    category: 'Cellar',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-rose-950 via-stone-900 to-black',
    span: 'col-span-1'
  },
  {
    id: 'gal-6',
    title: 'Handcrafted Chocolate Fondant Plating',
    category: 'Cuisine',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    fallbackGradient: 'from-amber-950 via-stone-900 to-black',
    span: 'col-span-1 md:col-span-2'
  }
];

export const PILLARS_OF_EXCELLENCE = [
  {
    title: "Carefully Selected Ingredients",
    description: "Sourced daily from organic coastal fisheries and regional regenerative farms with uncompromised seasonal integrity.",
    icon: "Leaf"
  },
  {
    title: "Skilled & Passionate Chefs",
    description: "Led by Executive Chef Antoine Laurent, combining classical French discipline with rustic open-fire mastery.",
    icon: "ChefHat"
  },
  {
    title: "A Warm, Inviting Atmosphere",
    description: "Architectural lighting, honest timber, hand-thrown ceramics, and intuitive hospitality designed for lingering.",
    icon: "Sparkles"
  },
  {
    title: "Seamless Dining & Ordering",
    description: "Guaranteed table reservations and premium culinary takeout packaged with temperature-retaining precision.",
    icon: "ShieldCheck"
  }
];

export const SEATING_OPTIONS = [
  { id: 'main', name: 'Main Dining Room', desc: 'Central room with warm ambient lighting & acoustics' },
  { id: 'hearthside', name: 'Wood-Fired Hearthside', desc: 'Front-row view of the open embers and culinary pass' },
  { id: 'courtyard', name: 'Garden Courtyard', desc: 'Covered glass atrium surrounded by lush botanicals' },
  { id: 'private', name: 'Private Wine Vault', desc: 'Intimate secluded seating for parties up to 8' },
];

export const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"
];
