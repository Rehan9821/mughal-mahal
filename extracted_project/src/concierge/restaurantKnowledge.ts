import {
  restaurantInfo,
  restaurantContact,
  menuCategories,
  menuItems,
  signatureDishes,
  reviews
} from '../data/restaurantData.ts';
import { MenuItem } from '../types.ts';

export interface EnrichedMenuItem extends MenuItem {
  tags: string[];
}

// Enhance menu items with search tags for precise local search
export const enrichedMenuItems: EnrichedMenuItem[] = menuItems.map((item) => {
  const tags: string[] = [];
  const lowerName = item.name.toLowerCase();
  const lowerDesc = item.description.toLowerCase();

  // Diet
  if (item.isVegetarian) {
    tags.push('veg', 'vegetarian', 'shakahari');
  } else {
    tags.push('nonveg', 'non-veg', 'non veg', 'meat');
  }

  // Proteins / Main Ingredients
  if (lowerName.includes('murg') || lowerName.includes('chicken') || lowerDesc.includes('chicken')) {
    tags.push('chicken', 'murg', 'murgh', 'poultry');
  }
  if (lowerName.includes('gosht') || lowerName.includes('mutton') || lowerName.includes('lamb') || lowerDesc.includes('mutton')) {
    tags.push('mutton', 'gosht', 'lamb', 'meat');
  }
  if (lowerName.includes('fish') || lowerDesc.includes('fish') || lowerDesc.includes('river sole')) {
    tags.push('fish', 'seafood', 'sole');
  }
  if (lowerName.includes('paneer') || lowerDesc.includes('paneer') || lowerDesc.includes('cottage cheese')) {
    tags.push('paneer', 'cottage cheese');
  }
  if (lowerName.includes('egg') || lowerName.includes('anda')) {
    tags.push('egg', 'anda');
  }
  if (lowerName.includes('dal') || lowerName.includes('lentil') || lowerDesc.includes('lentil')) {
    tags.push('dal', 'lentil', 'urad');
  }

  // Preparations & Styles
  if (item.category.includes('curries') || lowerName.includes('curry') || lowerName.includes('makhani') || lowerName.includes('rogan josh') || lowerName.includes('saag') || lowerName.includes('kofta')) {
    tags.push('curry', 'gravy', 'handi', 'gravies');
  }
  if (item.category.includes('appetizers') || lowerName.includes('tandoori') || lowerName.includes('tikka') || lowerName.includes('kebab') || lowerName.includes('afghani') || lowerName.includes('wings')) {
    tags.push('tandoori', 'tandoor', 'starter', 'starters', 'appetizer', 'appetizers', 'tikka', 'kebab', 'charcoal', 'skewered');
  }
  if (item.category.includes('breads') || lowerName.includes('naan') || lowerName.includes('kulcha') || lowerName.includes('roti') || lowerName.includes('paratha')) {
    tags.push('bread', 'breads', 'roti', 'naan', 'kulcha', 'paratha');
  }
  if (item.category.includes('biryani') || lowerName.includes('biryani') || lowerName.includes('rice') || lowerDesc.includes('basmati')) {
    tags.push('biryani', 'rice', 'chawal', 'pulao');
  }
  if (item.category.includes('thali') || lowerName.includes('thali') || lowerDesc.includes('platter')) {
    tags.push('thali', 'platter', 'combo', 'set');
  }

  // Flavors / Profiles
  if (lowerName.includes('achari') || lowerName.includes('rogan josh') || lowerDesc.includes('chili') || lowerDesc.includes('chilies') || lowerDesc.includes('spiced')) {
    tags.push('spicy', 'masaledar', 'zesty');
  }
  if (lowerName.includes('makhani') || lowerName.includes('afghani') || lowerName.includes('malai') || lowerDesc.includes('butter') || lowerDesc.includes('cream')) {
    tags.push('creamy', 'mild', 'butter', 'buttery', 'smooth');
  }

  if (item.isSignature) {
    tags.push('signature', 'special', 'bestseller', 'famous', 'popular');
  }

  return {
    ...item,
    tags
  };
});

export const verifiedRestaurantFacts = {
  name: restaurantInfo.name,
  nameHindi: restaurantInfo.nameHindi,
  conciergeName: 'MUGHAL',
  tagline: restaurantInfo.tagline,
  address: "7, Sethi Bhawan, Rajendra Place, New Delhi, Delhi 110008 (accessible also via Govind Lal Sikka Marg)",
  phone: restaurantContact.phone,
  email: restaurantContact.email,
  rating: `${restaurantInfo.rating} / 5 based on 1,142 verified reviews on Google Maps`,
  priceRange: "₹800 – ₹2,000 per person (approx. ₹1,100 – ₹1,400 for two)",
  cuisines: "Authentic Mughlai & North Indian Tandoor cuisine",
  timings: "11:30 AM to 11:30 PM (All 7 days). Lunch: 11:30 AM – 4:00 PM, Dinner: 6:30 PM – 11:30 PM.",
  services: [
    "Dine-in with royal air-conditioned seating",
    "Kerbside pickup & takeaway parcel counter",
    "Direct express delivery",
    "No-contact delivery via Swiggy & Zomato",
    "Banquets and private dining (up to 200–300 guests)",
    "Outdoor & corporate event catering"
  ],
  accessibility: [
    "Wheelchair accessible entrance and table seating",
    "Ground floor and lift access inside Sethi Bhawan"
  ],
  amenities: [
    "Fully air-conditioned royal heritage seating",
    "Bar on site with selected beverages",
    "Clean guest restrooms",
    "Live background music on select evenings"
  ],
  atmosphere: "Casual, cozy, quiet, trendy, and steeped in authentic Mughal hospitality.",
  crowd: "Exceptionally family friendly, great for large groups, tourists, and corporate gatherings.",
  payments: "All major Credit Cards, Debit Cards, NFC Mobile Payments, UPI, and Cash.",
  parking: "Free parking lot and free street parking with complex parking and valet assistance at Rajendra Place.",
  children: "Very welcoming for kids and family birthday celebrations.",
  reservations: "Reservations are accepted and warmly recommended for lunch and dinner peak hours.",
  signatureDishesList: signatureDishes
};
