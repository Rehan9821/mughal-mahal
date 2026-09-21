import {
  RestaurantInfo,
  RestaurantContact,
  MenuCategory,
  MenuItem,
  SignatureDish,
  GalleryItem,
  ReviewItem
} from '../types.ts';

export const restaurantContact: RestaurantContact = {
  phone: "+91 85955 08305",
  phoneRaw: "+918595508305",
  telLink: "tel:+918595508305",
  email: "Mughalmahal2020@gmail.com",
  mailtoLink: "mailto:Mughalmahal2020@gmail.com",
  whatsapp: "918595508305",
  whatsappLink: "https://wa.me/918595508305"
};

export const restaurantInfo: RestaurantInfo = {
  name: "Mughal Mahal Restaurant",
  nameHindi: "मुगल महल रेस्टोरेंट",
  tagline: "Authentic Mughlai & North Indian Heritage in Central West Delhi",
  address: "7, Sethi Bhawan, Rajendra Place",
  locality: "Rajendra Place",
  city: "New Delhi",
  pinCode: "110008",
  fullAddress: "7, Sethi Bhawan, Rajendra Place, New Delhi, Delhi 110008, India",
  phoneNumbers: [
    restaurantContact.phone
  ],
  primaryPhone: restaurantContact.phone,
  email: restaurantContact.email,
  contact: restaurantContact,
  rating: 3.9,
  reviewCount: 1142,
  priceRange: "₹800 – ₹2,000",
  costForTwo: "₹1,100 – ₹1,400 for two people (approx.)",
  cuisines: ["Mughlai", "North Indian", "Tandoori", "Kebab", "Biryani"],
  openingHours: {
    days: "Monday – Sunday (All 7 Days)",
    timings: "11:30 AM – 11:30 PM",
    lunch: "11:30 AM – 4:00 PM",
    dinner: "6:30 PM – 11:30 PM"
  },
  serviceOptions: [
    "Fine Dine-In Service",
    "Takeaway & Parcel Counter",
    "Direct Express Delivery",
    "Private Dining & Banquet Hall (Up to 200–300 guests)",
    "Outdoor & Event Catering"
  ],
  diningOptions: [
    "Lunch",
    "Dinner",
    "Family Gatherings",
    "Corporate Luncheons",
    "Private Celebrations"
  ],
  amenities: [
    "Fully Air-Conditioned Royal Seating",
    "Wheelchair Accessible Seating & Entrance",
    "Live Background Music on Select Evenings",
    "Card, UPI & Cash Payment Accepted",
    "Complex Parking & Valet Assistance (Rajendra Place)"
  ],
  accessibility: [
    "Wheelchair accessible entrance",
    "Wheelchair accessible seating",
    "Ground floor / lift access via Sethi Bhawan"
  ],
  reservationLink: restaurantContact.telLink,
  googleMapsUrl: "https://maps.app.goo.gl/C1pJMiD41Udwka2Q6",
  googleMapsEmbedQuery: "Mughal+Mahal+7+Sethi+Bhawan+Rajendra+Place+New+Delhi",
  orderLinks: {
    directPhone: restaurantContact.telLink,
    swiggy: "https://www.swiggy.com/restaurants/mughal-mahal-rajendra-place-delhi",
    zomato: "https://www.zomato.com/ncr/mughal-mahal-rajendra-place-new-delhi"
  }
};

export const menuCategories: MenuCategory[] = [
  {
    id: 'curries-nonveg',
    name: 'Mughal Handi Se — Non-Veg Curries',
    hindiName: 'मुगल हांडी से — मांसाहारी करी',
    description: 'Slow-simmered rich gravies prepared with whole Indian spices, butter, and centuries-old culinary precision.'
  },
  {
    id: 'appetizers-nonveg',
    name: 'Mughlai Charcoal Appetizers — Non-Veg',
    hindiName: 'तंदूरी स्टार्टर्स — मांसाहारी',
    description: 'Prime cuts marinated in artisanal hung curd and freshly pounded spices, roasted over red-hot charcoal.'
  },
  {
    id: 'curries-veg',
    name: 'Mughal Handi Se — Veg Curries',
    hindiName: 'मुगल हांडी से — शाकाहारी करी',
    description: 'Silky cream gravies, slow-cooked black lentils, and fresh cottage cheese specialities.'
  },
  {
    id: 'appetizers-veg',
    name: 'Mughlai Charcoal Appetizers — Veg',
    hindiName: 'तंदूरी स्टार्टर्स — शाकाहारी',
    description: 'Cottage cheese and tender vegetables steeped in royal tandoori marinades.'
  },
  {
    id: 'breads',
    name: 'Karamat-e-Tandoor — Artisan Breads',
    hindiName: 'करामात-ए-तंदूर — रोटियां व कुल्चे',
    description: 'Hand-stretched dough baked on clay tandoor walls, brushed with clarified butter.'
  },
  {
    id: 'biryani-rice',
    name: 'Chawal-e-Lazeez — Biryani & Rice',
    hindiName: 'चावल-ए-लज़ीज़ — बिरयानी',
    description: 'Fragrant aged basmati sealed in handis with whole garam spices, saffron, and tender meats.'
  },
  {
    id: 'thali-combos',
    name: 'Mughal Royal Thali & Sets',
    hindiName: 'शाही थाली',
    description: 'A curated imperial feast featuring our most celebrated curries, breads, dal, and accompaniments.'
  }
];

export const signatureDishes: SignatureDish[] = [
  {
    id: 'murg-makhani',
    name: 'Murg Makhani',
    hindiName: 'मुर्ग मखनी',
    englishTitle: 'The Legendary Butter Chicken',
    description: 'Tandoor-charred chicken steeped in a velvety reduction of vine-ripened tomatoes, churned butter, and fragrant dried fenugreek leaves (kasoori methi). Celebrated across Delhi for its gentle sweetness and rich silken texture.',
    price: 725,
    isVegetarian: false,
    category: 'Mughal Handi Se — Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Velvety, creamy tomato reduction with aromatic fenugreek and charcoal-charred chicken morsels.',
    preparationMethod: 'Charcoal roasted before simmering 4 hours in churned dairy butter and strained makhani gravy.'
  },
  {
    id: 'mughal-dal-makhani',
    name: 'Mughal Dal Makhani',
    hindiName: 'मुगल दाल मखनी',
    englishTitle: 'Slow-Simmered Black Lentils',
    description: 'Whole black urad lentils and kidney beans slow-simmered overnight over smoldering embers, finished with farm butter and heavy cream. A velvety staple of North Indian culinary heritage.',
    price: 675,
    isVegetarian: true,
    category: 'Mughal Handi Se — Veg',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Earthy, deeply smoky, rich and comforting with a melt-in-mouth creamy finish.',
    preparationMethod: 'Overnight 14-hour charcoal simmer with degi mirch, fresh ginger juliennes, and white butter.'
  },
  {
    id: 'murg-tandoori',
    name: 'Murg Tandoori',
    hindiName: 'मुर्ग तंदूरी',
    englishTitle: 'Charcoal Roast Spring Chicken',
    description: 'Whole tender spring chicken bathed in a double marinade of mustard oil, hung curd, ginger, garlic, and freshly crushed Kashmiri chilies, then roasted in a flaming clay tandoor.',
    price: 415,
    isVegetarian: false,
    category: 'Mughlai Charcoal Appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Crisp charred exterior revealing juicy, spiced meat infused with woodsmoke.',
    preparationMethod: 'Double marinated for 12 hours and charred at 400°C over live charcoal in traditional clay tandoors.'
  },
  {
    id: 'fish-tikka',
    name: 'Fish Tikka',
    hindiName: 'फिश टिक्का',
    englishTitle: 'Spiced River Sole Kebabs',
    description: 'Boneless river sole fillets marinated in carom seeds (ajwain), lemon juice, turmeric, and tandoori spices, gently blistered over coals to golden perfection.',
    price: 1100,
    isVegetarian: false,
    category: 'Mughlai Charcoal Appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Delicate flaky fish infused with sharp ajwain and a tangy lemon-butter crust.',
    preparationMethod: 'Quick-skewered and flash-roasted over embers to lock in natural coastal moisture.'
  },
  {
    id: 'murg-seekh-kebab',
    name: 'Murgh Seekh Kebab',
    hindiName: 'मुर्ग सीख कबाब',
    englishTitle: 'Minced Chicken Skewered Kebabs',
    description: 'Finely hand-minced chicken blended with fresh coriander, mint, green chilies, and royal potli masala, pressed onto iron skewers and roasted to succulent perfection.',
    price: 685,
    isVegetarian: false,
    category: 'Mughlai Charcoal Appetizers',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Juicy, fragrant with herbs, melting texture with subtle heat from green chilies.',
    preparationMethod: 'Freshly minced with green herbs and charcoal skewered to order; served 4 pieces.'
  },
  {
    id: 'gosht-rogan-josh',
    name: 'Gosht Rogan Josh',
    hindiName: 'गोश्त रोगन जोश',
    englishTitle: 'Kashmiri Mutton in Aromatic Gravy',
    description: 'Tender mutton cuts braised in an infusion of dried ginger powder, fennel seeds, ratan jot (cockscomb extract), and whole black cardamom in a slow-cooked clarified butter gravy.',
    price: 715,
    isVegetarian: false,
    category: 'Mughal Handi Se — Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1545247181-516773ca838b?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Warm aromatic profile with vibrant crimson sheen and fork-tender mutton.',
    preparationMethod: 'Dum-braised on low heat with Kashmiri red chilies, brown onion paste, and whole spices.'
  },
  {
    id: 'achari-paneer-tikka',
    name: 'Achari Paneer Tikka',
    hindiName: 'अचारी पनीर टिक्का',
    englishTitle: 'Pickled Cottage Cheese Kebabs',
    description: 'Generous cubes of artisanal malai paneer steeped in a tangy pickling spice marinade with kalonji, mustard, and bell peppers, charred with delicate smokiness.',
    price: 635,
    isVegetarian: true,
    category: 'Mughlai Charcoal Appetizers — Veg',
    imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Creamy pillowy core with a zesty, savory spiced pickle crust.',
    preparationMethod: 'Cured in crushed pickling spices and skewered with capsicum and red onions.'
  },
  {
    id: 'butter-naan',
    name: 'Butter Naan & Artisan Breads',
    hindiName: 'बटर नान व करामात-ए-तंदूर',
    englishTitle: 'Clay Oven Flatbreads',
    description: 'Leavened fine flour bread slapped against the blazing inner wall of a clay tandoor, pulled blistered and golden, generously glazed with churned amul butter.',
    price: 145,
    isVegetarian: true,
    category: 'Karamat-e-Tandoor',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80',
    tastingNote: 'Crisp bubbled crust with a tender, fluffy, butter-soaked crumb.',
    preparationMethod: 'Live tandoor baking at 450°C; served piping hot to accompany rich gravies.'
  }
];

export const menuItems: MenuItem[] = [
  // Curries - Non-Veg
  {
    id: 'murg-makhani',
    name: 'Murg Makhani (Butter Chicken)',
    hindiName: 'मुर्ग मखनी',
    description: 'The restaurant’s signature preparation. Tandoori chicken simmered in rich tomato, butter, and cream gravy.',
    price: 725,
    category: 'curries-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: 'Serves 2'
  },
  {
    id: 'murg-makhani-boneless',
    name: 'Murg Makhani (Boneless Special)',
    hindiName: 'मुर्ग मखनी बोनलेस',
    description: 'Tender boneless roasted chicken chunks in the legendary silky sweet-tangy makhani sauce.',
    price: 1159,
    category: 'curries-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: 'Serves 2-3'
  },
  {
    id: 'murg-curry',
    name: 'Murgh Curry',
    hindiName: 'मुर्ग करी',
    description: 'Traditional home-style chicken curry cooked with onions, whole spices, and light tomato gravy.',
    price: 450,
    category: 'curries-nonveg',
    isVegetarian: false,
    portion: 'Serves 2'
  },
  {
    id: 'gosht-rogan-josh',
    name: 'Gosht Rogan Josh',
    hindiName: 'गोश्त रोगन जोश',
    description: 'Classic Kashmiri-style mutton curry with ratan jot, dry ginger, and aromatic garam spices.',
    price: 715,
    category: 'curries-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: 'Serves 2'
  },
  {
    id: 'gosht-saag',
    name: 'Gosht Saag',
    hindiName: 'गोश्त साग',
    description: 'Tender lamb cuts cooked gently in an earthy, seasoned mustard and spinach puree with garlic tempering.',
    price: 715,
    category: 'curries-nonveg',
    isVegetarian: false,
    portion: 'Serves 2'
  },
  {
    id: 'gosht-keema-egg-curry',
    name: 'Gosht Keema Egg Curry',
    hindiName: 'गोश्त कीमा अंडा करी',
    description: 'Slow-simmered hand-minced mutton cooked with caramelized onions, garam masala, and boiled eggs.',
    price: 715,
    category: 'curries-nonveg',
    isVegetarian: false,
    portion: 'Serves 2'
  },
  {
    id: 'fish-curry',
    name: 'Fish Curry',
    hindiName: 'फिश करी',
    description: 'Fresh river fish simmered in a mildly spiced onion, tomato, and mustard sauce.',
    price: 1100,
    category: 'curries-nonveg',
    isVegetarian: false,
    portion: 'Serves 2'
  },
  {
    id: 'egg-curry',
    name: 'Egg Curry (Anda Curry)',
    hindiName: 'अंडा करी',
    description: 'Boiled golden-fried farm eggs simmered in a rustic, spiced North Indian onion-tomato gravy.',
    price: 495,
    category: 'curries-nonveg',
    isVegetarian: false,
    portion: 'Serves 2'
  },

  // Appetizers - Non-Veg
  {
    id: 'murg-tandoori',
    name: 'Murgh Tandoori',
    hindiName: 'मुर्ग तंदूरी',
    description: 'Whole chicken marinated in hung yogurt, red chili paste, and tandoori spices, roasted in a clay oven.',
    price: 415,
    category: 'appetizers-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: 'Half / Full available'
  },
  {
    id: 'murg-afghani',
    name: 'Murgh Afghani',
    hindiName: 'मुर्ग अफगानी',
    description: 'Chicken pieces marinated in cashew nut paste, fresh cream, white pepper, and roasted gently in the tandoor.',
    price: 410,
    category: 'appetizers-nonveg',
    isVegetarian: false,
    portion: 'Half / Full available'
  },
  {
    id: 'fish-tikka-app',
    name: 'Fish Tikka',
    hindiName: 'फिश टिक्का',
    description: 'Succulent river sole chunks marinated with ajwain, curd, and lemon, skewered over glowing coals.',
    price: 1100,
    category: 'appetizers-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: '4-6 Portions'
  },
  {
    id: 'murg-seekh-kebab',
    name: 'Murgh Seekh Kebab',
    hindiName: 'मुर्ग सीख कबाब',
    description: 'Minced spiced chicken skewers infused with fresh mint, coriander, and royal spices, roasted to order.',
    price: 685,
    category: 'appetizers-nonveg',
    isVegetarian: false,
    isSignature: true,
    portion: '4 Pieces'
  },
  {
    id: 'murg-wings-tandoori',
    name: 'Murgh Wings Tandoori',
    hindiName: 'मुर्ग विंग्स तंदूरी',
    description: 'Juicy chicken wings seasoned in our house tandoori spice rub and charred over hot coals.',
    price: 605,
    category: 'appetizers-nonveg',
    isVegetarian: false,
    portion: '6 Pieces'
  },

  // Curries - Veg
  {
    id: 'mughal-dal-makhani',
    name: 'Mughal Dal Makhani',
    hindiName: 'मुगल दाल मखनी',
    description: 'Black lentils slow cooked overnight on charcoal embers with butter, cream, and subtle ginger notes.',
    price: 675,
    category: 'curries-veg',
    isVegetarian: true,
    isSignature: true,
    portion: 'Serves 2'
  },
  {
    id: 'paneer-makhani',
    name: 'Paneer Makhani',
    hindiName: 'पनीर मखनी',
    description: 'Soft cottage cheese cubes enveloped in a rich, buttery tomato sauce scented with fenugreek.',
    price: 625,
    category: 'curries-veg',
    isVegetarian: true,
    isSignature: true,
    portion: 'Serves 2'
  },
  {
    id: 'saag-corn-malai',
    name: 'Saag Corn Malai',
    hindiName: 'साग कॉर्न मलाई',
    description: 'Tender golden sweet corn tossed with freshly ground spiced greens and finished with rich cream.',
    price: 565,
    category: 'curries-veg',
    isVegetarian: true,
    portion: 'Serves 2'
  },
  {
    id: 'malai-kofta',
    name: 'Shahi Malai Kofta',
    hindiName: 'शाही मलाई कोफ्ता',
    description: 'Melt-in-mouth cottage cheese and dried fruit dumplings served in an imperial cashew-nut gravy.',
    price: 635,
    category: 'curries-veg',
    isVegetarian: true,
    portion: 'Serves 2'
  },

  // Appetizers - Veg
  {
    id: 'achari-paneer-tikka-app',
    name: 'Achari Paneer Tikka',
    hindiName: 'अचारी पनीर टिक्का',
    description: 'Fresh paneer blocks infused with tangy pickle seasonings, bell peppers, and roasted in the clay tandoor.',
    price: 635,
    category: 'appetizers-veg',
    isVegetarian: true,
    isSignature: true,
    portion: '6 Pieces'
  },
  {
    id: 'paneer-tikka-shashlik',
    name: 'Paneer Tikka Shashlik',
    hindiName: 'पनीर टिक्का शशलिक',
    description: 'Skewered cottage cheese cubes with charred tomatoes, onions, and capsicum in tandoori spices.',
    price: 635,
    category: 'appetizers-veg',
    isVegetarian: true,
    portion: '6 Pieces'
  },
  {
    id: 'veg-hara-bhara-kebab',
    name: 'Veg Hara Bhara Kebab',
    hindiName: 'हरा भरा कबाब',
    description: 'Crisp spinach, green pea, and spiced potato patties infused with roasted cumin and chaat masala.',
    price: 525,
    category: 'appetizers-veg',
    isVegetarian: true,
    portion: '6 Pieces'
  },

  // Breads (Karamat-e-Tandoor)
  {
    id: 'butter-naan',
    name: 'Butter Naan',
    hindiName: 'बटर नान',
    description: 'Traditional refined flour leavened flatbread baked in the clay oven, topped with melted butter.',
    price: 145,
    category: 'breads',
    isVegetarian: true,
    portion: '1 Piece'
  },
  {
    id: 'paneer-kulcha',
    name: 'Paneer Kulcha',
    hindiName: 'पनीर कुल्चा',
    description: 'Stuffed bread packed with seasoned crumbled cottage cheese, green chilies, and herbs.',
    price: 170,
    category: 'breads',
    isVegetarian: true,
    portion: '1 Piece'
  },
  {
    id: 'onion-kulcha',
    name: 'Onion Kulcha',
    hindiName: 'प्याज़ कुल्चा',
    description: 'Crispy leavened bread stuffed with spiced chopped red onions and carom seeds.',
    price: 170,
    category: 'breads',
    isVegetarian: true,
    portion: '1 Piece'
  },
  {
    id: 'mutton-keema-kulcha',
    name: 'Mutton Keema Kulcha',
    hindiName: 'मटन कीमा कुल्चा',
    description: 'Rich tandoori flatbread stuffed with spiced minced mutton, herbs, and baked to a crisp finish.',
    price: 320,
    category: 'breads',
    isVegetarian: false,
    isSignature: true,
    portion: '1 Piece'
  },
  {
    id: 'khasta-roti',
    name: 'Khasta Roti',
    hindiName: 'खस्ता रोटी',
    description: 'Flaky, layered whole wheat bread baked until crisp and golden in the tandoor.',
    price: 165,
    category: 'breads',
    isVegetarian: true,
    portion: '1 Piece'
  },
  {
    id: 'paratha',
    name: 'Tandoori Lachha Paratha',
    hindiName: 'लच्छा पराठा',
    description: 'Multi-layered flaky whole wheat bread baked over coals and brushed with ghee.',
    price: 165,
    category: 'breads',
    isVegetarian: true,
    portion: '1 Piece'
  },

  // Rice & Biryani
  {
    id: 'murgh-biryani',
    name: 'Murgh Dum Biryani',
    hindiName: 'मुर्ग दम बिरयानी',
    description: 'Long-grain basmati layered with marinated chicken, saffron milk, caramelized onions, and kewra.',
    price: 660,
    category: 'biryani-rice',
    isVegetarian: false,
    isSignature: true,
    portion: 'Served with raita'
  },
  {
    id: 'gosht-biryani',
    name: 'Gosht Dum Biryani',
    hindiName: 'गोश्त दम बिरयानी',
    description: 'Royal dum-cooked basmati rice with tender succulent mutton pieces, mint, and saffron.',
    price: 770,
    category: 'biryani-rice',
    isVegetarian: false,
    portion: 'Served with raita'
  },
  {
    id: 'veg-biryani',
    name: 'Subz Dum Biryani',
    hindiName: 'सब्ज़ दम बिरयानी',
    description: 'Fragrant basmati rice cooked with garden vegetables, paneer cubes, and whole aromatic spices.',
    price: 550,
    category: 'biryani-rice',
    isVegetarian: true,
    portion: 'Served with raita'
  },
  {
    id: 'jeera-rice',
    name: 'Jeera Rice',
    hindiName: 'जीरा राइस',
    description: 'Fluffy aged basmati rice tempered with roasted cumin seeds and fresh desi ghee.',
    price: 440,
    category: 'biryani-rice',
    isVegetarian: true,
    portion: 'Serves 2'
  },
  {
    id: 'steamed-rice',
    name: 'Steamed Basmati Rice',
    hindiName: 'बासमती चावल',
    description: 'Delicate long-grain steamed fragrant Indian basmati rice.',
    price: 330,
    category: 'biryani-rice',
    isVegetarian: true,
    portion: 'Serves 2'
  },

  // Thali & Combos
  {
    id: 'royal-nonveg-thali',
    name: 'Royal Non-Veg Thali',
    hindiName: 'शाही मांसाहारी थाली',
    description: 'A curated imperial platter: Boneless Butter Chicken, Mughal Dal Makhani, Steamed Basmati Rice, Lachha Paratha, Boondi Raita, and Fresh Salad.',
    price: 849,
    category: 'thali-combos',
    isVegetarian: false,
    isSignature: true,
    portion: 'Complete Meal for 1'
  }
];

export const galleryImages: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Murg Makhani in Handi',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=1200&q=80',
    description: 'The iconic slow-simmered butter chicken finished with rich cream and kasoori methi.'
  },
  {
    id: 'gal-2',
    title: 'Heritage Dining Hall',
    category: 'INTERIORS',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    description: 'Spacious air-conditioned banquet and family dining room with warm golden lighting in Rajendra Place.'
  },
  {
    id: 'gal-3',
    title: 'Charcoal Tandoori Roasting',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh chicken and kebabs roasted over smoldering embers in the traditional clay tandoors.'
  },
  {
    id: 'gal-4',
    title: 'Imperial Table Setting',
    category: 'AMBIENCE',
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm mood lighting, polished brass and fine chinaware for family and corporate gatherings.'
  },
  {
    id: 'gal-5',
    title: 'Mughal Dal Makhani',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
    description: 'Overnight charcoal simmered urad lentils crowned with churned dairy butter.'
  },
  {
    id: 'gal-6',
    title: 'Live Charcoal Skewers',
    category: 'DETAILS',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Artisanal seekh kebabs on iron skewers garnished with lemon and fresh herbs.'
  },
  {
    id: 'gal-7',
    title: 'Blistered Butter Naan',
    category: 'FOOD',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=1200&q=80',
    description: 'Piping hot tandoor naan brushed with melted butter straight from the clay oven.'
  },
  {
    id: 'gal-8',
    title: 'Private Banquet & Celebration Space',
    category: 'INTERIORS',
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80',
    description: 'Comfortable seating capacity for up to 200–300 guests for family gatherings and corporate dinners.'
  },
  {
    id: 'gal-9',
    title: 'Dum Biryani with Saffron',
    category: 'DETAILS',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Sealed handi biryani opened to reveal aromatic saffron and steam.'
  }
];

export const reviews: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rajiv Malhotra',
    role: 'Local Guide • 84 reviews',
    rating: 5,
    date: '3 months ago',
    snippet: 'Mughal Mahal in Rajendra Place remains an undisputed institution for classic Butter Chicken and Dal Makhani. The gravy is thick, silky and not overly sweet. Their crisp butter naan is always served piping hot. Extremely humble staff and quick service even on crowded weekends.',
    source: 'Google Maps',
    highlightDish: 'Murg Makhani & Butter Naan'
  },
  {
    id: 'rev-2',
    author: 'Sunita Mehra',
    role: 'Local Guide • 42 reviews',
    rating: 5,
    date: '1 month ago',
    snippet: 'We hosted a family dinner for 25 people here. The seating in Sethi Bhawan is very spacious and air conditioning was top notch. The Fish Tikka and Murgh Afghani disappeared within minutes. One of the best family dining spots in Central West Delhi.',
    source: 'Google Maps',
    highlightDish: 'Fish Tikka & Murgh Afghani'
  },
  {
    id: 'rev-3',
    author: 'Vikramjit Singh',
    role: 'Verified Google Diner',
    rating: 4,
    date: '5 months ago',
    snippet: 'A true Delhi legacy. If you appreciate authentic North Indian recipes rather than modern fusion, Mughal Mahal hits the spot. The Dal Makhani has that unmistakable smoky charcoal depth that you rarely find elsewhere. Prices reflect the generous portion sizes.',
    source: 'Google Maps',
    highlightDish: 'Mughal Dal Makhani'
  },
  {
    id: 'rev-4',
    author: 'Ananya Deshmukh',
    role: 'Verified Google Diner',
    rating: 4,
    date: '2 months ago',
    snippet: 'Ordered the Non-Veg Thali and Chicken Seekh Kebabs. Portions are massive and the food arrived steaming hot. The keema kulcha is also a hidden gem here. Good heritage Mughlai vibe.',
    source: 'Google Maps',
    highlightDish: 'Royal Non-Veg Thali'
  },
  {
    id: 'rev-5',
    author: 'Harpreet Chawla',
    role: 'Local Guide • 116 reviews',
    rating: 4,
    date: '6 months ago',
    snippet: 'Located right in Rajendra Place, it has been our family dinner go-to for years. The owner and senior staff are very courteous and look after your table personally. Murgh Tandoori is juicy and properly charred.',
    source: 'Google Maps',
    highlightDish: 'Murgh Tandoori'
  }
];
