import { TastingCourse, WineItem } from '../types';

export const TASTING_EXPERIENCES = [
  {
    id: 'tasting-5',
    name: 'Terra & Mare Tasting Journey',
    coursesCount: 5,
    pricePerGuest: 115,
    winePairingPrice: 65,
    description: 'A five-movement symphonic journey exploring wild British coastal waters and open-oak hearth roasts.',
    duration: '2.5 Hours',
  },
  {
    id: 'tasting-7',
    name: 'The Grand Reserve Degustation',
    coursesCount: 7,
    pricePerGuest: 165,
    winePairingPrice: 95,
    description: 'Our most prestigious dining experience featuring A5 Miyazaki Wagyu, Brittany blue lobster, and 30-year cellar reserves.',
    duration: '3.5 Hours',
  }
];

export const TASTING_COURSES: TastingCourse[] = [
  {
    courseNumber: 1,
    title: 'Prelude · Amuse-Bouche',
    dishName: 'Cornish Oyster & Finger Lime',
    description: 'Wild Carlingford oyster gently poached in champagne emulsion, topped with finger lime caviar and sea purslane.',
    dietaryNotes: 'Pescatarian · Gluten-Free',
    winePairing: {
      wine: 'Ruinart Blanc de Blancs Brut',
      vintage: 'NV',
      region: 'Reims, Champagne, France',
      sommelierNotes: 'Vibrant mineral chalkiness with citrus floral bouquet cutting through oyster brine.'
    }
  },
  {
    courseNumber: 2,
    title: 'Premier · Crudo di Mare',
    dishName: 'Kingfish Carpaccio with Calamansi',
    description: 'Line-caught yellowtail kingfish sliced paper-thin, pickled green strawberries, compressed cucumber, and smoked sea salt.',
    dietaryNotes: 'Pescatarian · Gluten-Free',
    winePairing: {
      wine: 'Domaine Vacheron Sancerre Blanc',
      vintage: '2022',
      region: 'Loire Valley, France',
      sommelierNotes: 'Crisp flinty acidity with grapefruit notes harmonizing with the delicate citrus cure.'
    }
  },
  {
    courseNumber: 3,
    title: 'Primi · Pasta Artigianale',
    dishName: 'Black Truffle Agnolotti del Plin',
    description: 'Handcrafted mini ravioli filled with 36-month mountain parmigiano and roasted sweetbreads, tossed in cultured Normandy butter and winter black truffles.',
    dietaryNotes: 'Can be prepared Vegetarian on request',
    winePairing: {
      wine: 'Gaja Barbaresco DOCG',
      vintage: '2019',
      region: 'Piedmont, Italy',
      sommelierNotes: 'Silky red cherry tannins, violet aromas, and forest-floor earthiness complimenting the pungent black truffle.'
    }
  },
  {
    courseNumber: 4,
    title: 'Secondi · The Wood-Fired Hearth',
    dishName: 'Wood-Smoked Chilean Sea Bass or A5 Wagyu',
    description: 'Charred over vintage applewood embers, saffron velouté, confit fennel, and roasted bone marrow glaze.',
    dietaryNotes: 'Gluten-Free',
    winePairing: {
      wine: 'Château Pontet-Canet Grand Cru',
      vintage: '2015',
      region: 'Pauillac, Bordeaux, France',
      sommelierNotes: 'Structured cedar, cassis, graphite, and tobacco leaves with velvet tannins.'
    }
  },
  {
    courseNumber: 5,
    title: 'Dolce · Finale',
    dishName: 'Valrhona Grand Cru Dark Chocolate & Bronte Pistachio',
    description: 'Single-origin 72% Venezuelan dark chocolate mousse, smoked olive oil sponge, Bronte pistachio gelato, and gold leaf.',
    dietaryNotes: 'Vegetarian',
    winePairing: {
      wine: 'Château d’Yquem Sauternes 1er Cru Supérieur',
      vintage: '2016',
      region: 'Sauternes, Bordeaux, France',
      sommelierNotes: 'Liquid amber with honeyed apricot, candied citrus peel, and vibrant balancing acidity.'
    }
  }
];

export const SOMMELIER_CELLAR_ITEMS: WineItem[] = [
  {
    id: 'wine-1',
    name: 'Dom Pérignon Vintage',
    type: 'Champagne',
    vintage: '2013',
    region: 'Épernay',
    country: 'France',
    bottlePrice: 285.00,
    glassPrice: 48.00,
    tastingNotes: 'Crisp brioche, crushed stone, smoky minerality, and silky white peach.',
    pairingDish: 'Cornish Oyster & Pan-Seared Chilean Sea Bass'
  },
  {
    id: 'wine-2',
    name: 'Tenuta San Guido Sassicaia Bolgheri',
    type: 'Red',
    vintage: '2019',
    region: 'Tuscany',
    country: 'Italy',
    bottlePrice: 340.00,
    tastingNotes: 'Blackcurrant, rosemary, cedarwood, crushed stones, and aristocratic elegance.',
    pairingDish: 'Prime Wood-Fired Ribeye & Truffle Pasta'
  },
  {
    id: 'wine-3',
    name: 'Domaine Leflaive Puligny-Montrachet',
    type: 'White',
    vintage: '2021',
    region: 'Burgundy',
    country: 'France',
    bottlePrice: 220.00,
    glassPrice: 38.00,
    tastingNotes: 'Toasted hazelnut, crisp lemon curd, white flowers, and electric limestone tension.',
    pairingDish: 'Artisanal Burrata & Tagliatelle al Tartufo'
  },
  {
    id: 'wine-4',
    name: 'Château Cheval Blanc 1er Grand Cru',
    type: 'Red',
    vintage: '2016',
    region: 'Saint-Émilion',
    country: 'France',
    bottlePrice: 650.00,
    tastingNotes: 'Perfumed violet, plum liqueur, sandalwood, opulent cocoa, and endless finish.',
    pairingDish: 'Dry-Aged Wagyu & Roasted Bone Marrow'
  },
  {
    id: 'wine-5',
    name: 'Domaine Tempier Bandol Rosé',
    type: 'Rosé',
    vintage: '2022',
    region: 'Provence',
    country: 'France',
    bottlePrice: 85.00,
    glassPrice: 18.00,
    tastingNotes: 'Wild strawberries, pink grapefruit, dried thyme, and refreshing sea breeze minerality.',
    pairingDish: 'Burrata di Puglia & Seafood Starters'
  }
];

export const PRIVATE_DINING_ROOMS = [
  {
    id: 'cellar',
    name: 'The Wine Vault & Sommelier Table',
    capacity: 'Up to 12 Guests',
    description: 'Surrounded by 1,200 bottles of vintage grand crus in our climate-controlled subterranean cellar. Features custom brass chandeliers and private sommelier service.',
    minimumSpend: '£1,200',
    suitableFor: 'Intimate Celebrations, Executive Dinners, Board Meetings'
  },
  {
    id: 'terrace',
    name: 'The Glasshouse Garden Terrace',
    capacity: 'Up to 32 Guests',
    description: 'A luminous, botanically draped atrium with retractable glass roof and heated slate floors. Enjoy wood-fired sharing banquets under the stars.',
    minimumSpend: '£2,800',
    suitableFor: 'Cocktail Receptions, Birthday Galas, Wedding Rehearsals'
  },
  {
    id: 'buyout',
    name: 'Full Restaurant & Hearth Buyout',
    capacity: 'Up to 85 Guests',
    description: 'Exclusive private takeover of the entire venue including main dining salon, open hearth kitchen pass, and lounge bar. Fully customized multi-course bespoke menus.',
    minimumSpend: '£7,500',
    suitableFor: 'Luxury Weddings, Corporate Galas, Brand Product Launches'
  }
];

export const RESTAURANT_TABLES = [
  { id: 'T-101', name: 'Hearth Table 1', area: 'hearthside', seats: 2, position: 'Direct view of the open wood fire', status: 'available' },
  { id: 'T-102', name: 'Hearth Table 2', area: 'hearthside', seats: 4, position: 'Center stage facing the culinary pass', status: 'available' },
  { id: 'T-201', name: 'Main Salon Booth 1', area: 'main', seats: 4, position: 'Velvet booth with ambient acoustic privacy', status: 'available' },
  { id: 'T-202', name: 'Main Salon Round', area: 'main', seats: 6, position: 'Central chandelier round table', status: 'available' },
  { id: 'T-301', name: 'Courtyard Pergola', area: 'courtyard', seats: 2, position: 'Secluded botanical corner beside the olive tree', status: 'available' },
  { id: 'T-302', name: 'Courtyard Long Table', area: 'courtyard', seats: 8, position: 'Heated glass conservatory garden view', status: 'available' },
  { id: 'T-401', name: 'Private Vault Table', area: 'private', seats: 10, position: 'Subterranean wine vault exclusive sanctuary', status: 'available' },
];
