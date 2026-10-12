import { MenuItem, MenuCategory } from '../types';

export const CATEGORIES: { id: MenuCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Dishes', count: 12 },
  { id: 'starters', label: 'Starters & Tapas', count: 3 },
  { id: 'pasta', label: 'Handmade Pasta', count: 2 },
  { id: 'woodfired', label: 'Wood-Fired Pizza', count: 2 },
  { id: 'mains', label: 'Prime Cuts & Mains', count: 2 },
  { id: 'desserts', label: 'Artisanal Desserts', count: 2 },
  { id: 'beverages', label: 'Craft Beverages', count: 2 },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Pan-Seared Chilean Sea Bass',
    category: 'mains',
    description: 'Crispy skin Chilean sea bass resting on vibrant saffron velouté, confit baby fennel, blistered heirloom cherry tomatoes, and micro leeks.',
    price: 44.00,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-900/80 via-stone-900 to-black',
    tags: ['Chef\'s Pick', 'Gluten-Free'],
    calories: 580,
    prepTime: '22 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: 'Standard Fillet (220g)', priceDelta: 0 },
      { name: 'Grand Reserve Cut (320g)', priceDelta: 16 }
    ],
    addonOptions: [
      { name: 'Fresh Shaved Black Truffle', priceDelta: 12 },
      { name: 'Wood-Roasted Wild Mushrooms', priceDelta: 8 },
      { name: 'Seared Hokkaido Scallops (2pcs)', priceDelta: 14 }
    ]
  },
  {
    id: 'dish-2',
    name: 'Tagliatelle al Tartufo Nero',
    category: 'pasta',
    description: 'Handcrafted egg pasta swirled in 24-month aged Parmigiano Reggiano butter emulsion, crowned with generous shaved winter black truffles.',
    price: 36.00,
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-800/80 via-yellow-950 to-stone-900',
    tags: ['Popular', 'Vegetarian'],
    calories: 640,
    prepTime: '18 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: 'Appetizer Portion', priceDelta: -8 },
      { name: 'Main Entrée', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Extra 5g Shaved Truffle', priceDelta: 10 },
      { name: 'Crispy Guanciale', priceDelta: 6 },
      { name: 'Poached Organic Farm Egg', priceDelta: 4 }
    ]
  },
  {
    id: 'dish-3',
    name: 'Prime Wood-Fired Ribeye',
    category: 'mains',
    description: '45-day dry-aged USDA Prime ribeye seared over white oak embers, served with smoked bone marrow jus, roasted garlic head, and charred shallots.',
    price: 58.00,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-rose-950/80 via-stone-900 to-black',
    tags: ['Chef\'s Pick', 'Gluten-Free'],
    calories: 820,
    prepTime: '25 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: '12oz Prime Cut', priceDelta: 0 },
      { name: '18oz Bone-In Cut', priceDelta: 24 }
    ],
    addonOptions: [
      { name: 'Foie Gras Torchon', priceDelta: 18 },
      { name: 'Gorgonzola Dolce Crust', priceDelta: 6 },
      { name: 'Truffle Herb Butter', priceDelta: 5 }
    ]
  },
  {
    id: 'dish-4',
    name: 'Artisanal Burrata di Puglia',
    category: 'starters',
    description: 'Fresh Pugliese burrata with sun-ripened heritage tomatoes, 25-year traditional balsamic glaze, toasted pine nuts, and grilled levain bread.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69102353?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-emerald-950/80 via-stone-900 to-black',
    tags: ['Vegetarian', 'Popular'],
    calories: 490,
    prepTime: '12 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: 'Single Serving (150g)', priceDelta: 0 },
      { name: 'Sharing Platter (300g)', priceDelta: 14 }
    ],
    addonOptions: [
      { name: 'San Daniele Prosciutto (36mo)', priceDelta: 9 },
      { name: 'Extra Grilled Sourdough', priceDelta: 4 }
    ]
  },
  {
    id: 'dish-5',
    name: 'Wood-Fired Margherita D.O.P.',
    category: 'woodfired',
    description: 'Slow-fermented 72-hour sourdough crust, San Marzano D.O.P. tomatoes, hand-torn buffalo mozzarella, fresh sweet basil, and Ligurian olive oil.',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-900/80 via-orange-950 to-stone-900',
    tags: ['Vegetarian', 'Popular'],
    calories: 780,
    prepTime: '15 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: 'Standard 12" Pizza', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Spicy Calabrian ' + 'Nduja', priceDelta: 5 },
      { name: 'Fresh Smoked Burrata Heart', priceDelta: 7 },
      { name: 'Hot Honey Drizzle', priceDelta: 3 }
    ]
  },
  {
    id: 'dish-6',
    name: 'Valrhona Molten Chocolate Lava',
    category: 'desserts',
    description: 'Warm single-origin 70% dark chocolate fondant with flowing ganache center, paired with Tahitian vanilla bean gelato and macerated raspberries.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-950/80 via-stone-900 to-black',
    tags: ['Chef\'s Pick', 'Vegetarian'],
    calories: 520,
    prepTime: '14 min',
    spicyLevel: 0,
    featured: true,
    portionOptions: [
      { name: 'Standard Plating', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Extra Scoop Bourbon Vanilla Gelato', priceDelta: 4 },
      { name: 'Espresso Caramel Sauce', priceDelta: 3 }
    ]
  },
  {
    id: 'dish-7',
    name: 'Tartufo e Funghi Wood-Fired Pizza',
    category: 'woodfired',
    description: 'Fontina val d’aosta, roasted wild chanterelles, cremini mushrooms, rosemary thyme oil, fresh fior di latte, and white truffle essence.',
    price: 31.00,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-stone-800 via-amber-950 to-black',
    tags: ['Vegetarian', 'New'],
    calories: 810,
    prepTime: '16 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Standard 12" Pizza', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Shaved Parmigiano Reggiano', priceDelta: 4 },
      { name: 'Truffle Honey Drizzle', priceDelta: 3 }
    ]
  },
  {
    id: 'dish-8',
    name: 'Wagyu Beef Carpaccio',
    category: 'starters',
    description: 'Ultra-thin sliced A5 Miyazaki Wagyu, pickled shallots, wild caperberries, 36-month Parmigiano shavings, truffle garlic emulsion, micro arugula.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-red-950/80 via-stone-900 to-black',
    tags: ['Gluten-Free', 'Chef\'s Pick'],
    calories: 420,
    prepTime: '10 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Standard Plating', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Petrossian Caviar Dollop (10g)', priceDelta: 28 }
    ]
  },
  {
    id: 'dish-9',
    name: 'Handcrafted Ricotta Gnocchi',
    category: 'pasta',
    description: 'Pillow-soft sheep ricotta gnocchi tossed in slow-cooked San Marzano cherry tomato sugo, molten smoked provolone, and fresh Genovese basil.',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-900 via-stone-900 to-black',
    tags: ['Vegetarian'],
    calories: 610,
    prepTime: '17 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Standard Portion', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Crispy Prosciutto Dust', priceDelta: 5 }
    ]
  },
  {
    id: 'dish-10',
    name: 'Golden Quinoa & Roast Avocado Bowl',
    category: 'starters',
    description: 'Warm tri-color quinoa, charred Hass avocado halves, pickled baby beets, pomegranate seeds, baby kale, toasted pistachios, and citrus vinaigrette.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-emerald-900 via-stone-900 to-black',
    tags: ['Vegan', 'Gluten-Free'],
    calories: 450,
    prepTime: '12 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Standard Salad', priceDelta: 0 }
    ],
    addonOptions: [
      { name: 'Grilled Herb Tofu', priceDelta: 6 },
      { name: 'Wild King Prawns (3pcs)', priceDelta: 12 }
    ]
  },
  {
    id: 'dish-11',
    name: 'Pistachio Bronte Crème Brûlée',
    category: 'desserts',
    description: 'Silky Sicilian Bronte pistachio custard with a shatteringly crisp caramelized demerara sugar crust, served with fresh macerated blackberries.',
    price: 17.00,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-emerald-950 via-stone-900 to-black',
    tags: ['Vegetarian', 'Gluten-Free'],
    calories: 470,
    prepTime: '8 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Individual Pot', priceDelta: 0 }
    ]
  },
  {
    id: 'dish-12',
    name: 'Smoked Rosemary Old Fashioned',
    category: 'beverages',
    description: 'Small-batch 10-year Kentucky bourbon, house-made Demerara syrup, Angostura & orange bitters, expressed orange peel, smoked under rosemary glass cloche.',
    price: 19.00,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80',
    fallbackGradient: 'from-amber-950 via-stone-900 to-black',
    tags: ['Chef\'s Pick'],
    prepTime: '5 min',
    spicyLevel: 0,
    portionOptions: [
      { name: 'Single Crafted Cocktail', priceDelta: 0 }
    ]
  }
];
