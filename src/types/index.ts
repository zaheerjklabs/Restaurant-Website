export type DietaryTag = 
  | 'Vegetarian' 
  | 'Vegan' 
  | 'Gluten-Free' 
  | 'Dairy-Free' 
  | 'Nut-Free'
  | 'Chef\'s Pick' 
  | 'Popular' 
  | 'New'
  | 'Halal-Friendly';

export type MenuCategory = 
  | 'all'
  | 'starters'
  | 'pasta'
  | 'woodfired'
  | 'mains'
  | 'desserts'
  | 'beverages';

export type Currency = 'USD' | 'GBP' | 'EUR';

export interface MenuItemOption {
  name: string;
  priceDelta: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  fallbackGradient: string;
  tags: DietaryTag[];
  calories?: number;
  prepTime?: string;
  spicyLevel?: number; // 0-3
  portionOptions?: MenuItemOption[];
  addonOptions?: MenuItemOption[];
  featured?: boolean;
  winePairing?: string;
  allergens?: string[];
}

export interface CartItem {
  id: string;
  menuItemId: string;
  item: MenuItem;
  quantity: number;
  selectedPortion?: MenuItemOption;
  selectedAddons?: MenuItemOption[];
  specialInstructions?: string;
  itemTotal: number;
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main' | 'hearthside' | 'courtyard' | 'private';
  selectedTableId?: string;
  diningExperience?: 'standard' | 'tasting-5' | 'tasting-7';
  specialRequests?: string;
  dietaryNotes?: string;
}

export interface ConfirmedReservation extends ReservationFormData {
  id: string;
  confirmationCode: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  publication?: string;
  rating: number;
  initials: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Cuisine' | 'Atmosphere' | 'Hearth' | 'Cellar';
  image: string;
  fallbackGradient: string;
  span?: string;
}

export interface TastingCourse {
  courseNumber: number;
  title: string;
  dishName: string;
  description: string;
  dietaryNotes: string;
  winePairing: {
    wine: string;
    vintage: string;
    region: string;
    sommelierNotes: string;
  };
}

export interface WineItem {
  id: string;
  name: string;
  type: 'Red' | 'White' | 'Champagne' | 'Rosé' | 'Dessert';
  vintage: string;
  region: string;
  country: string;
  bottlePrice: number;
  glassPrice?: number;
  tastingNotes: string;
  pairingDish: string;
  image?: string;
}

export interface ActiveOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  orderType: 'delivery' | 'pickup' | 'dinein';
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'preparing' | 'plating' | 'ready';
  estimatedMinutesLeft: number;
  createdAt: string;
}

export interface PrivateEventInquiry {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  preferredDate: string;
  guestCount: number;
  roomPreference: 'cellar' | 'terrace' | 'buyout';
  estimatedBudget: string;
  additionalNotes?: string;
}
