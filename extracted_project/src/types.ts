export interface RestaurantContact {
  phone: string;
  phoneRaw: string;
  telLink: string;
  email: string;
  mailtoLink: string;
  whatsapp: string;
  whatsappLink: string;
}

export interface RestaurantInfo {
  name: string;
  nameHindi: string;
  tagline: string;
  address: string;
  locality: string;
  city: string;
  pinCode: string;
  fullAddress: string;
  phoneNumbers: string[];
  primaryPhone: string;
  email: string;
  contact: RestaurantContact;
  rating: number;
  reviewCount: number;
  priceRange: string;
  costForTwo: string;
  cuisines: string[];
  openingHours: {
    days: string;
    timings: string;
    lunch: string;
    dinner: string;
  };
  serviceOptions: string[];
  diningOptions: string[];
  amenities: string[];
  accessibility: string[];
  reservationLink: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  orderLinks: {
    directPhone: string;
    swiggy?: string;
    zomato?: string;
  };
}

export type MenuCategoryType = 
  | 'appetizers-nonveg'
  | 'appetizers-veg'
  | 'curries-nonveg'
  | 'curries-veg'
  | 'biryani-rice'
  | 'breads'
  | 'thali-combos'
  | 'desserts-beverages';

export interface MenuCategory {
  id: MenuCategoryType;
  name: string;
  hindiName: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  hindiName?: string;
  description: string;
  price: number;
  priceDetails?: string;
  category: MenuCategoryType;
  isVegetarian: boolean;
  isSignature?: boolean;
  imageUrl?: string;
  portion?: string;
  spiceLevel?: 'Mild' | 'Medium' | 'Rich & Aromatic';
}

export interface SignatureDish {
  id: string;
  name: string;
  hindiName: string;
  englishTitle: string;
  description: string;
  price: number;
  isVegetarian: boolean;
  category: string;
  imageUrl: string;
  tastingNote: string;
  preparationMethod: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'FOOD' | 'INTERIORS' | 'AMBIENCE' | 'DETAILS';
  imageUrl: string;
  description: string;
  dimensions?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  snippet: string;
  source: 'Google Maps' | 'Local Guide';
  highlightDish?: string;
}
