import {
  enrichedMenuItems,
  verifiedRestaurantFacts,
  EnrichedMenuItem
} from './restaurantKnowledge.ts';
import { MenuItem } from '../types.ts';
import { ChatMessage, ConversationState } from './conciergeTypes.ts';

// Extract number after "under", "below", "less than", "budget", "upto", "within"
function extractPriceLimit(query: string): number | null {
  const match = query.match(/(?:under|below|less than|within|upto|up to|max|budget of)\s*(?:₹|rs\.?|inr)?\s*(\d{2,5})/i) ||
                query.match(/(?:₹|rs\.?|inr)\s*(\d{2,5})\s*(?:or less|budget|max)/i) ||
                query.match(/under\s*(\d{2,5})/i);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return null;
}

// Format currency
export function formatINR(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export class MughalConciergeEngine {
  private state: ConversationState = {
    lastCategory: null,
    lastIngredient: null,
    lastDishes: [],
    lastDietPreference: null,
    lastPriceConstraint: null,
    lastTopic: null
  };

  public getState(): ConversationState {
    return { ...this.state };
  }

  public resetState(): void {
    this.state = {
      lastCategory: null,
      lastIngredient: null,
      lastDishes: [],
      lastDietPreference: null,
      lastPriceConstraint: null,
      lastTopic: null
    };
  }

  public processUserMessage(rawMessage: string): ChatMessage {
    const text = rawMessage.trim();
    const lower = text.toLowerCase();
    const id = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. OUT-OF-SCOPE QUESTIONS
    if (this.isOutOfScope(lower)) {
      return {
        id,
        sender: 'concierge',
        text: "I’m mainly here as your Mughal host, so I can help with our food, menu, restaurant and reservations. Feel free to ask about our dishes, prices, or dining experience.",
        timestamp,
        quickReplies: ['Explore Menu', 'What should I try?', 'Vegetarian Options', 'Reserve a Table']
      };
    }

    // 2. GREETINGS
    if (/^(hi|hello|hey|namaste|salaam|greetings|good morning|good afternoon|good evening|adaab)\b/i.test(lower) && lower.split(/\s+/).length <= 4) {
      return {
        id,
        sender: 'concierge',
        text: "Namaste! Welcome to Mughal. 👋\nI'm your digital host.\n\nAsk me anything about our menu, dishes, prices, restaurant, reservations or dining experience.",
        timestamp,
        quickReplies: ['Explore Menu', 'What should I try?', 'Vegetarian', 'Non-Veg', 'Biryani', 'Reserve a Table']
      };
    }

    // 3. CONTEXTUAL FOLLOW-UPS: CHEAPER / EXPENSIVE (e.g. "Which one is cheaper?", "Cheapest option?")
    if (/(which\s+(one\s+)?is\s+cheaper|cheapest|cheaper\s+options?|more\s+affordable|lowest\s+price)/i.test(lower)) {
      return this.handleCheaperFollowUp(id, timestamp);
    }

    if (/(expensive|costliest|priciest|luxury\s+dish|highest\s+price|premium\s+dishes)/i.test(lower)) {
      return this.handleExpensiveQuery(id, timestamp);
    }

    // 4. CONTEXTUAL FOLLOW-UP: "What about mutton?" / "What about chicken?" / "And something vegetarian?"
    if (/(what about|how about|and|show me|switch to)\s+(mutton|gosht|lamb)/i.test(lower)) {
      return this.handleMuttonQuery(id, timestamp);
    }

    if (/(what about|how about|and|show me|switch to)\s+(chicken|murg|murgh)/i.test(lower)) {
      return this.handleChickenQuery(id, timestamp, extractPriceLimit(lower));
    }

    if (/(what about|how about|and|something|options? for)\s+(veg|vegetarian|shakahari)/i.test(lower)) {
      return this.handleVegQuery(id, timestamp);
    }

    // 5. PRICE QUERY FOR SPECIFIC ITEM (e.g. "How much is butter naan?", "Butter naan price?", "Cost of butter chicken")
    if (/(how much|what is the price|what's the price|what's the cost|how much for|cost of|price of)\b/i.test(lower) || /price\??$/i.test(lower) || /cost\??$/i.test(lower)) {
      const specificItemResponse = this.handleSpecificItemPrice(lower, id, timestamp);
      if (specificItemResponse) return specificItemResponse;
    }

    // 6. PRICE / BUDGET FILTER (e.g. "What can I get under ₹700?", "I want chicken under ₹800")
    const priceLimit = extractPriceLimit(lower);
    if (priceLimit !== null) {
      return this.handleBudgetFilter(lower, priceLimit, id, timestamp);
    }

    // 7. SPECIFIC DISH INQUIRIES (e.g. "Do you have butter chicken?", "Do you have fish?", "Do you have paneer?", "Do you have biryani?")
    if (/butter chicken/i.test(lower)) {
      return this.handleButterChicken(id, timestamp);
    }
    if (/dal makhani/i.test(lower)) {
      return this.handleDalMakhani(id, timestamp);
    }
    if (/\b(fish|river sole|machli)\b/i.test(lower)) {
      return this.handleFishQuery(id, timestamp);
    }
    if (/\b(mutton|gosht|lamb|keema)\b/i.test(lower)) {
      return this.handleMuttonQuery(id, timestamp);
    }
    if (/\b(chicken|murg|murgh)\b/i.test(lower)) {
      return this.handleChickenQuery(id, timestamp, null);
    }
    if (/\b(paneer|cottage cheese)\b/i.test(lower)) {
      return this.handlePaneerQuery(id, timestamp);
    }
    if (/\b(thali|thalis|combo|combos)\b/i.test(lower)) {
      return this.handleThaliQuery(lower, id, timestamp);
    }
    if (/\b(biryani|biryanis|pulao|rice|chawal)\b/i.test(lower)) {
      return this.handleBiryaniQuery(id, timestamp);
    }
    if (/\b(tandoori|tandoor|tikka|kebab|kebabs|seekh)\b/i.test(lower)) {
      return this.handleTandooriQuery(id, timestamp);
    }
    if (/\b(bread|breads|naan|roti|kulcha|paratha)\b/i.test(lower)) {
      return this.handleBreadsQuery(id, timestamp);
    }

    // 8. TASTE PREFERENCES (Spicy vs Creamy / Mild)
    if (/\b(spicy|hot|teekha|masaledar|chili|chilies)\b/i.test(lower)) {
      return this.handleSpicyQuery(id, timestamp);
    }
    if (/\b(mild|creamy|sweet|not spicy|less spicy|butter)\b/i.test(lower)) {
      return this.handleCreamyQuery(id, timestamp);
    }

    // 9. OCCASIONS & GUEST SIZES (e.g. family, kids, 2 people, group)
    if (/(family|kids|children|birthday|for 2|two people|couple|group|banquet|party|celebration)/i.test(lower)) {
      return this.handleOccasionQuery(lower, id, timestamp);
    }

    // 10. GENERAL RECOMMENDATIONS / WHAT'S GOOD
    if (/(what's good|what should i try|recommend|suggest|what is famous|speciality|best dish|must try|popular)/i.test(lower)) {
      if (/(veg|vegetarian)/i.test(lower)) {
        return this.handleVegQuery(id, timestamp);
      }
      if (/(non veg|non-veg|nonveg|meat)/i.test(lower)) {
        return this.handleNonVegRecommendations(id, timestamp);
      }
      return this.handleGeneralRecommendations(id, timestamp);
    }

    // 11. DIET QUERIES
    if (/(pure veg|vegetarian|veg food|shakahari)/i.test(lower)) {
      return this.handleVegQuery(id, timestamp);
    }
    if (/(non veg|non-veg|nonveg|meat dishes)/i.test(lower)) {
      return this.handleNonVegRecommendations(id, timestamp);
    }

    // 12. RESTAURANT LOGISTICS & HOSPITALITY
    if (/(reserve|reservation|book a table|booking|table|seat)/i.test(lower)) {
      return this.handleReservationQuery(id, timestamp);
    }
    if (/(order|delivery|swiggy|zomato|takeaway|parcel|pickup)/i.test(lower)) {
      return this.handleOrderQuery(id, timestamp);
    }
    if (/(address|location|where are you|where is|landmark|rajendra place|metro|direction)/i.test(lower)) {
      return this.handleAddressQuery(id, timestamp);
    }
    if (/(timings?|hours?|opening|closing|open today|lunch time|dinner time)/i.test(lower)) {
      return this.handleTimingsQuery(id, timestamp);
    }
    if (/(phone|call|contact|number|email|whatsapp)/i.test(lower)) {
      return this.handleContactQuery(id, timestamp);
    }
    if (/(rating|reviews?|feedback|stars|google)/i.test(lower)) {
      return this.handleReviewsQuery(id, timestamp);
    }
    if (/(parking|car|valet|vehicle)/i.test(lower)) {
      return this.handleParkingQuery(id, timestamp);
    }
    if (/(wheelchair|accessible|accessibility|disabled|handicap|lift)/i.test(lower)) {
      return this.handleAccessibilityQuery(id, timestamp);
    }
    if (/(bar|alcohol|beer|wine|liquor|cocktail|drinks?|beverage)/i.test(lower)) {
      return this.handleBarQuery(id, timestamp);
    }
    if (/(payment|pay|card|credit|debit|upi|cash|nfc)/i.test(lower)) {
      return this.handlePaymentQuery(id, timestamp);
    }
    if (/(mughlai|north indian|cuisine|history|heritage|ambience|atmosphere)/i.test(lower)) {
      return this.handleCuisineQuery(id, timestamp);
    }
    if (/(menu|categories|what food|carte)/i.test(lower)) {
      return this.handleMenuOverview(id, timestamp);
    }

    // 13. SMART FALLBACK
    return this.handleSmartFallback(id, timestamp);
  }

  // --- Handlers ---

  private isOutOfScope(lower: string): boolean {
    const outOfScopePatterns = [
      /\b(weather|temperature|forecast|rain)\b/,
      /\b(cricket|football|ipl|messi|ronaldo|world cup)\b/,
      /\b(president|prime minister|politics|election|modi|biden|trump)\b/,
      /\b(bitcoin|crypto|stock market|shares|forex)\b/,
      /\b(movie|cinema|hollywood|bollywood|netflix)\b/,
      /\b(chatgpt|openai|claude|gemini|deepseek|anthropic)\b/,
      /\b(who coded you|who created you|who made you|are you a robot)\b/
    ];
    return outOfScopePatterns.some((pattern) => pattern.test(lower));
  }

  private handleCheaperFollowUp(id: string, timestamp: string): ChatMessage {
    const dishes = this.state.lastDishes && this.state.lastDishes.length > 0
      ? [...this.state.lastDishes]
      : enrichedMenuItems;

    const sorted = [...dishes].sort((a, b) => a.price - b.price);
    const topThree = sorted.slice(0, 3);
    this.state.lastDishes = topThree;

    const itemNames = topThree.map((d) => `${d.name} (${formatINR(d.price)})`).join(', ');

    return {
      id,
      sender: 'concierge',
      text: this.state.lastIngredient
        ? `Looking at our ${this.state.lastIngredient} offerings, the most affordable options are ${itemNames}.`
        : `Among our highlighted dishes, the most budget-friendly selections are ${itemNames}.`,
      timestamp,
      dishes: topThree,
      quickReplies: ['Explore Breads', 'Murgh Curry ₹450', 'Vegetarian Options', 'Reserve a Table']
    };
  }

  private handleExpensiveQuery(id: string, timestamp: string): ChatMessage {
    const sorted = [...enrichedMenuItems].sort((a, b) => b.price - a.price);
    const topPriced = sorted.slice(0, 3);
    this.state.lastDishes = topPriced;

    return {
      id,
      sender: 'concierge',
      text: "Our most premium, grand imperial preparations feature whole river sole and boneless specialties:\n\n• Murg Makhani (Boneless Special) — ₹1,159 (Serves 2–3)\n• Fish Curry — ₹1,100 (Fresh river sole)\n• Fish Tikka — ₹1,100 (Skewered river sole fillets)",
      timestamp,
      dishes: topPriced,
      quickReplies: ['View Butter Chicken', 'Explore Appetizers', 'Royal Non-Veg Thali ₹849', 'Reserve a Table']
    };
  }

  private handleSpecificItemPrice(query: string, id: string, timestamp: string): ChatMessage | null {
    // Look for best match in menu items
    const matchingItem = enrichedMenuItems.find((item) => {
      const lowerName = item.name.toLowerCase();
      const lowerHindi = (item.hindiName || '').toLowerCase();
      const words = lowerName.split(/[\s()—-]+/).filter((w) => w.length > 2);
      return words.some((w) => query.includes(w)) || (lowerHindi && query.includes(lowerHindi));
    });

    if (matchingItem) {
      this.state.lastDishes = [matchingItem];
      return {
        id,
        sender: 'concierge',
        text: `${matchingItem.name} is verified at ${formatINR(matchingItem.price)}${matchingItem.portion ? ` (${matchingItem.portion})` : ''}. ${matchingItem.description}`,
        timestamp,
        dishes: [matchingItem],
        quickReplies: ['What should I pair with this?', 'Butter Naan ₹145', 'Reserve a Table', 'Order Online']
      };
    }

    return null;
  }

  private handleBudgetFilter(query: string, maxPrice: number, id: string, timestamp: string): ChatMessage {
    let items = enrichedMenuItems.filter((item) => item.price <= maxPrice);

    // Apply ingredient filter if specified in the query
    if (query.includes('chicken') || query.includes('murg')) {
      items = items.filter((item) => item.tags.includes('chicken'));
      this.state.lastIngredient = 'chicken';
    } else if (query.includes('mutton') || query.includes('gosht')) {
      items = items.filter((item) => item.tags.includes('mutton'));
      this.state.lastIngredient = 'mutton';
    } else if (query.includes('veg') || query.includes('vegetarian')) {
      items = items.filter((item) => item.isVegetarian);
      this.state.lastDietPreference = 'veg';
    }

    if (items.length === 0) {
      return {
        id,
        sender: 'concierge',
        text: `We don't have dishes strictly under ${formatINR(maxPrice)} for that specific criteria. Our tandoori breads start from ₹145, tandoori chicken starters from ₹410, and curries from ₹450.`,
        timestamp,
        quickReplies: ['Butter Naan ₹145', 'Murgh Tandoori ₹415', 'Subz Dum Biryani ₹550', 'Explore Menu']
      };
    }

    const sorted = items.sort((a, b) => b.price - a.price).slice(0, 4);
    this.state.lastDishes = sorted;

    return {
      id,
      sender: 'concierge',
      text: `Here are verified dishes available under ${formatINR(maxPrice)}:`,
      timestamp,
      dishes: sorted,
      quickReplies: ['Which one is cheaper?', 'Murgh Tandoori ₹415', 'Butter Naan ₹145', 'Reserve a Table']
    };
  }

  private handleChickenQuery(id: string, timestamp: string, maxPrice: number | null): ChatMessage {
    this.state.lastIngredient = 'chicken';
    this.state.lastDietPreference = 'nonveg';

    let chickenDishes = enrichedMenuItems.filter((item) => item.tags.includes('chicken'));
    if (maxPrice !== null) {
      chickenDishes = chickenDishes.filter((item) => item.price <= maxPrice);
    }

    this.state.lastDishes = chickenDishes;

    return {
      id,
      sender: 'concierge',
      text: maxPrice !== null
        ? `Here are our verified chicken specialties under ${formatINR(maxPrice)}:`
        : "Here are our celebrated chicken preparations, from clay tandoor roasts to rich handi curries:",
      timestamp,
      dishes: chickenDishes.slice(0, 4),
      quickReplies: ['Which one is cheaper?', 'What about mutton?', 'And something vegetarian?', 'Butter Naan ₹145']
    };
  }

  private handleMuttonQuery(id: string, timestamp: string): ChatMessage {
    this.state.lastIngredient = 'mutton';
    this.state.lastDietPreference = 'nonveg';

    const muttonDishes = enrichedMenuItems.filter((item) => item.tags.includes('mutton'));
    this.state.lastDishes = muttonDishes;

    return {
      id,
      sender: 'concierge',
      text: "Our royal mutton (Gosht) specialties are slow-simmered with traditional whole spices and clarified butter:",
      timestamp,
      dishes: muttonDishes,
      quickReplies: ['Gosht Rogan Josh ₹715', 'Mutton Keema Kulcha ₹320', 'Gosht Dum Biryani ₹770', 'What about chicken?']
    };
  }

  private handleFishQuery(id: string, timestamp: string): ChatMessage {
    this.state.lastIngredient = 'fish';
    this.state.lastDietPreference = 'nonveg';

    const fishDishes = enrichedMenuItems.filter((item) => item.tags.includes('fish'));
    this.state.lastDishes = fishDishes;

    return {
      id,
      sender: 'concierge',
      text: "Yes, we prepare fresh river sole in two royal styles:\n\n• Fish Tikka (₹1,100): River sole fillets marinated with ajwain, lemon juice, and roasted over glowing coals.\n• Fish Curry (₹1,100): River sole chunks simmered in a spiced onion, tomato, and mustard gravy.",
      timestamp,
      dishes: fishDishes,
      quickReplies: ['Fish Tikka ₹1,100', 'Fish Curry ₹1,100', 'Non-Veg Options', 'Reserve a Table']
    };
  }

  private handlePaneerQuery(id: string, timestamp: string): ChatMessage {
    this.state.lastIngredient = 'paneer';
    this.state.lastDietPreference = 'veg';

    const paneerDishes = enrichedMenuItems.filter((item) => item.tags.includes('paneer'));
    this.state.lastDishes = paneerDishes;

    return {
      id,
      sender: 'concierge',
      text: "Our cottage cheese (Paneer) creations are prepared with fresh artisanal malai paneer:",
      timestamp,
      dishes: paneerDishes,
      quickReplies: ['Paneer Makhani ₹625', 'Achari Paneer Tikka ₹635', 'Paneer Kulcha ₹170', 'Mughal Dal Makhani ₹675']
    };
  }

  private handleButterChicken(id: string, timestamp: string): ChatMessage {
    const butterChickenItems = enrichedMenuItems.filter((item) => item.id.includes('murg-makhani'));
    this.state.lastDishes = butterChickenItems;

    return {
      id,
      sender: 'concierge',
      text: "Murg Makhani (Butter Chicken) is Mughal Mahal's signature recipe. Tandoor-charred chicken steeped in a velvety reduction of vine-ripened tomatoes, churned butter, and fragrant kasoori methi.\n\n• Murg Makhani (Regular): ₹725 (Serves 2)\n• Murg Makhani (Boneless Special): ₹1,159 (Serves 2–3)\n\nBest enjoyed with hot blistered Butter Naan (₹145).",
      timestamp,
      dishes: butterChickenItems,
      actionType: 'reserve',
      quickReplies: ['Butter Naan ₹145', 'Murgh Dum Biryani ₹660', 'Reserve a Table', 'Order Online']
    };
  }

  private handleDalMakhani(id: string, timestamp: string): ChatMessage {
    const dalItem = enrichedMenuItems.filter((item) => item.id === 'mughal-dal-makhani');
    this.state.lastDishes = dalItem;

    return {
      id,
      sender: 'concierge',
      text: "Mughal Dal Makhani (₹675) is our pride. Whole black urad lentils and kidney beans slow-simmered overnight over smoldering charcoal embers, finished with farm butter and dairy cream.",
      timestamp,
      dishes: dalItem,
      quickReplies: ['Butter Naan ₹145', 'Tandoori Lachha Paratha ₹165', 'Veg Starters', 'Reserve a Table']
    };
  }

  private handleThaliQuery(query: string, id: string, timestamp: string): ChatMessage {
    const isVegQuery = /(veg|vegetarian|shakahari)/i.test(query) && !/(non[- ]?veg)/i.test(query);
    const thaliItem = enrichedMenuItems.filter((item) => item.id === 'royal-nonveg-thali');
    this.state.lastDishes = thaliItem;

    if (isVegQuery) {
      return {
        id,
        sender: 'concierge',
        text: "Our structured set meal on the menu is the Royal Non-Veg Thali (₹849). For our vegetarian guests, we gladly arrange a complete personalized imperial combination by pairing our Mughal Dal Makhani (₹675) or Paneer Makhani (₹625) with hot Butter Naan (₹145) and Subz Dum Biryani (₹550).",
        timestamp,
        quickReplies: ['Mughal Dal Makhani ₹675', 'Paneer Makhani ₹625', 'Subz Dum Biryani ₹550', 'Royal Non-Veg Thali ₹849']
      };
    }

    return {
      id,
      sender: 'concierge',
      text: "Our featured imperial platter is the Royal Non-Veg Thali (₹849). It includes:\n\n• Boneless Butter Chicken\n• Mughal Dal Makhani\n• Steamed Basmati Rice\n• Tandoori Lachha Paratha\n• Boondi Raita\n• Fresh Crisp Salad\n\nServed as a complete, generous meal for 1 person.",
      timestamp,
      dishes: thaliItem,
      actionType: 'order',
      quickReplies: ['Order Online', 'Reserve a Table', 'Explore Biryani', 'Murg Makhani ₹725']
    };
  }

  private handleBiryaniQuery(id: string, timestamp: string): ChatMessage {
    const biryanis = enrichedMenuItems.filter((item) => item.tags.includes('biryani'));
    this.state.lastDishes = biryanis;

    return {
      id,
      sender: 'concierge',
      text: "Our Biryani & Rice offerings (Chawal-e-Lazeez) are prepared with aged long-grain basmati rice sealed in handis with saffron and whole spices:\n\n• Murgh Dum Biryani (₹660) — layered with tender chicken & kewra (Served with raita)\n• Gosht Dum Biryani (₹770) — tender mutton dum-cooked with mint & saffron (Served with raita)\n• Subz Dum Biryani (₹550) — garden vegetables and paneer (Served with raita)\n• Jeera Rice (₹440)\n• Steamed Basmati Rice (₹330)",
      timestamp,
      dishes: biryanis.slice(0, 3),
      quickReplies: ['Murgh Dum Biryani ₹660', 'Gosht Dum Biryani ₹770', 'Subz Dum Biryani ₹550', 'Murg Makhani ₹725']
    };
  }

  private handleTandooriQuery(id: string, timestamp: string): ChatMessage {
    const tandooriItems = enrichedMenuItems.filter((item) => item.tags.includes('tandoori'));
    this.state.lastDishes = tandooriItems;

    return {
      id,
      sender: 'concierge',
      text: "Our Karamat-e-Tandoor charcoal starters are marinated in artisanal hung curd and roasted over live charcoal:\n\nNon-Veg:\n• Murgh Tandoori — ₹415 (Charcoal roast spring chicken)\n• Murgh Afghani — ₹410 (Cashew nut & cream marinade)\n• Murgh Seekh Kebab — ₹685 (Minced chicken skewers, 4 pcs)\n• Fish Tikka — ₹1,100 (Boneless river sole)\n• Murgh Wings Tandoori — ₹605 (6 pcs)\n\nVeg:\n• Achari Paneer Tikka — ₹635 (Pickling spices, 6 pcs)\n• Paneer Tikka Shashlik — ₹635 (Capsicum & onion skewers, 6 pcs)\n• Veg Hara Bhara Kebab — ₹525 (Spinach & pea patties, 6 pcs)",
      timestamp,
      dishes: tandooriItems.slice(0, 4),
      quickReplies: ['Murgh Tandoori ₹415', 'Achari Paneer Tikka ₹635', 'Fish Tikka ₹1,100', 'Explore Breads']
    };
  }

  private handleBreadsQuery(id: string, timestamp: string): ChatMessage {
    const breads = enrichedMenuItems.filter((item) => item.tags.includes('bread'));
    this.state.lastDishes = breads;

    return {
      id,
      sender: 'concierge',
      text: "Our artisan breads are baked on clay tandoor walls at 450°C and brushed with clarified butter:\n\n• Butter Naan — ₹145\n• Paneer Kulcha — ₹170\n• Onion Kulcha — ₹170\n• Mutton Keema Kulcha — ₹320\n• Tandoori Lachha Paratha — ₹165\n• Khasta Roti — ₹165",
      timestamp,
      dishes: breads,
      quickReplies: ['Butter Naan ₹145', 'Mutton Keema Kulcha ₹320', 'Murg Makhani ₹725', 'Mughal Dal Makhani ₹675']
    };
  }

  private handleSpicyQuery(id: string, timestamp: string): ChatMessage {
    const spicyItems = enrichedMenuItems.filter((item) => item.tags.includes('spicy'));
    this.state.lastDishes = spicyItems;

    return {
      id,
      sender: 'concierge',
      text: "If you enjoy authentic warmth and spice, I recommend:\n\n• Gosht Rogan Josh (₹715) — aromatic Kashmiri mutton with dry ginger and ratan jot\n• Achari Paneer Tikka (₹635) — tangy mustard & kalonji pickling spices\n• Murgh Tandoori (₹415) — fiery Kashmiri chili & mustard oil marinade\n• Murgh Seekh Kebab (₹685) — spiked with fresh green chilies and royal potli masala",
      timestamp,
      dishes: spicyItems.slice(0, 3),
      quickReplies: ['Gosht Rogan Josh ₹715', 'Murgh Tandoori ₹415', 'Achari Paneer Tikka ₹635', 'Reserve a Table']
    };
  }

  private handleCreamyQuery(id: string, timestamp: string): ChatMessage {
    const creamyItems = enrichedMenuItems.filter((item) => item.tags.includes('creamy'));
    this.state.lastDishes = creamyItems;

    return {
      id,
      sender: 'concierge',
      text: "For a smooth, rich, and milder Mughlai dining experience, consider:\n\n• Murg Makhani (₹725) — sweet-tangy velvety tomato, butter, and kasoori methi gravy\n• Shahi Malai Kofta (₹415) — cottage cheese dumplings in imperial cashew nut gravy\n• Mughal Dal Makhani (₹675) — 14-hour slow-simmered black lentils with churned butter\n• Murgh Afghani (₹410) — cream and cashew marinade gently charred in tandoor",
      timestamp,
      dishes: creamyItems.slice(0, 4),
      quickReplies: ['Murg Makhani ₹725', 'Mughal Dal Makhani ₹675', 'Shahi Malai Kofta ₹635', 'Butter Naan ₹145']
    };
  }

  private handleVegQuery(id: string, timestamp: string): ChatMessage {
    this.state.lastDietPreference = 'veg';
    const vegDishes = enrichedMenuItems.filter((item) => item.isVegetarian);
    this.state.lastDishes = vegDishes;

    return {
      id,
      sender: 'concierge',
      text: "We offer an extensive selection of vegetarian handi curries, tandoori starters, and breads:\n\nCurries:\n• Mughal Dal Makhani (₹675) — slow-cooked black lentils\n• Paneer Makhani (₹625) — malai paneer in butter sauce\n• Shahi Malai Kofta (₹635) — in royal cashew gravy\n• Saag Corn Malai (₹565) — sweet corn with tempered greens\n\nAppetizers:\n• Achari Paneer Tikka (₹635)\n• Veg Hara Bhara Kebab (₹525)\n\nRice & Breads:\n• Subz Dum Biryani (₹550)\n• Butter Naan (₹145) | Paneer Kulcha (₹170)",
      timestamp,
      dishes: vegDishes.slice(0, 4),
      quickReplies: ['Mughal Dal Makhani ₹675', 'Paneer Makhani ₹625', 'Achari Paneer Tikka ₹635', 'Butter Naan ₹145']
    };
  }

  private handleNonVegRecommendations(id: string, timestamp: string): ChatMessage {
    this.state.lastDietPreference = 'nonveg';
    const nonVeg = enrichedMenuItems.filter((item) => !item.isVegetarian && item.isSignature);
    this.state.lastDishes = nonVeg;

    return {
      id,
      sender: 'concierge',
      text: "Our standout non-vegetarian signatures crafted over decades in Delhi include:\n\n• Murg Makhani (Butter Chicken) — ₹725\n• Gosht Rogan Josh — ₹715\n• Murgh Tandoori — ₹415\n• Fish Tikka (River Sole) — ₹1,100\n• Murgh Seekh Kebab — ₹685\n• Royal Non-Veg Thali — ₹849",
      timestamp,
      dishes: nonVeg.slice(0, 4),
      quickReplies: ['Murg Makhani ₹725', 'Gosht Rogan Josh ₹715', 'Murgh Tandoori ₹415', 'Reserve a Table']
    };
  }

  private handleGeneralRecommendations(id: string, timestamp: string): ChatMessage {
    const signatures = enrichedMenuItems.filter((item) => item.isSignature);
    this.state.lastDishes = signatures;

    return {
      id,
      sender: 'concierge',
      text: "If this is your first visit to Mughal Mahal, these are our most celebrated legacy dishes:\n\n1. Murg Makhani (₹725) — The legendary butter chicken with velvety tomato and cream gravy.\n2. Mughal Dal Makhani (₹675) — Overnight charcoal-simmered black lentils.\n3. Murgh Tandoori (₹415) — Charcoal-charred spring chicken.\n4. Gosht Rogan Josh (₹715) — Kashmiri mutton braised with whole spices.\n5. Butter Naan (₹145) — Blistered clay oven flatbread.",
      timestamp,
      dishes: signatures.slice(0, 4),
      actionType: 'reserve',
      quickReplies: ['Vegetarian Options', 'Non-Veg Options', 'Reserve a Table', 'Order Online']
    };
  }

  private handleOccasionQuery(query: string, id: string, timestamp: string): ChatMessage {
    if (/(2 people|two people|couple)/i.test(query)) {
      return {
        id,
        sender: 'concierge',
        text: "For dining as a pair of two, our average cost is approximately ₹1,100 – ₹1,400.\n\nA classic recommendation for two:\n• 1 Starter: Murgh Tandoori (₹415) or Achari Paneer Tikka (₹635)\n• 1 Gravy: Murg Makhani (₹725) or Mughal Dal Makhani (₹675)\n• 2 Artisan Breads: Butter Naan (₹145 each)\n• Or our Murgh Dum Biryani (₹660)",
        timestamp,
        actionType: 'reserve',
        quickReplies: ['Reserve a Table', 'Murg Makhani ₹725', 'Murgh Dum Biryani ₹660', 'Butter Naan ₹145']
      };
    }

    return {
      id,
      sender: 'concierge',
      text: "Mughal Mahal is renowned across Delhi as a comfortable family dining destination:\n\n• Spacious air-conditioned seating with booths and banquet halls accommodating up to 200–300 guests for celebrations and birthdays.\n• Child-friendly ambiance with gentle seating arrangements.\n• Portions are generous and suited for sharing among families and groups.\n• Free parking and valet assistance at Rajendra Place complex.",
      timestamp,
      actionType: 'reserve',
      quickReplies: ['Reserve a Table', 'View Location', 'Explore Menu', 'Contact Front Desk']
    };
  }

  private handleReservationQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: `Yes, Mughal Mahal accepts table reservations! We recommend booking ahead especially for weekend lunches and dinner hours.\n\nYou can click below to open our interactive table reservation request:`,
      timestamp,
      actionType: 'reserve',
      quickReplies: ['Reserve a Table', 'Call +91 85955 08305', 'View Opening Hours', 'Explore Menu']
    };
  }

  private handleOrderQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "We offer takeaway parcel service, direct phone express delivery, as well as delivery through Swiggy and Zomato.\n\nYou can open our quick order desk below:",
      timestamp,
      actionType: 'order',
      quickReplies: ['Order Online', 'Direct Call: +91 85955 08305', 'Royal Non-Veg Thali ₹849', 'Murg Makhani ₹725']
    };
  }

  private handleAddressQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: `Mughal Mahal is located at:\n${verifiedRestaurantFacts.address}\n\nEasily accessible in Central West Delhi near the Rajendra Place Metro Station (Blue Line).`,
      timestamp,
      quickReplies: ['Get Directions', 'Call Front Desk', 'View Timings', 'Reserve a Table']
    };
  }

  private handleTimingsQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: `Our doors are open all 7 days of the week:\n\n• Operating Hours: 11:30 AM – 11:30 PM\n• Lunch Hours: 11:30 AM – 4:00 PM\n• Dinner Hours: 6:30 PM – 11:30 PM`,
      timestamp,
      quickReplies: ['Reserve a Table', 'View Address', 'Call Front Desk', 'Explore Menu']
    };
  }

  private handleContactQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: `Here are our verified contact channels:\n\n• Phone: ${verifiedRestaurantFacts.phone}\n• Email: ${verifiedRestaurantFacts.email}\n• WhatsApp: +91 85955 08305\n• Address: 7, Sethi Bhawan, Rajendra Place, New Delhi`,
      timestamp,
      quickReplies: ['Reserve a Table', 'Order Online', 'View Menu', 'Opening Hours']
    };
  }

  private handleReviewsQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: `Mughal Mahal holds a ${verifiedRestaurantFacts.rating}.\n\nGuests consistently praise our rich butter chicken gravy, authentic overnight dal makhani, tender fish tikka, and warm family hospitality in Rajendra Place.`,
      timestamp,
      quickReplies: ['What should I try?', 'Reserve a Table', 'View Murg Makhani', 'View Dal Makhani']
    };
  }

  private handleParkingQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "Yes, free parking lot and free street parking are available around Sethi Bhawan, along with complex parking and valet assistance at Rajendra Place.",
      timestamp,
      quickReplies: ['View Location', 'Reserve a Table', 'Opening Hours', 'Contact Desk']
    };
  }

  private handleAccessibilityQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "Mughal Mahal is accessible. We feature wheelchair-accessible seating and entrance, with ground floor and elevator access inside Sethi Bhawan.",
      timestamp,
      quickReplies: ['Reserve a Table', 'Contact Front Desk', 'View Location', 'Explore Menu']
    };
  }

  private handleBarQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "Mughal Mahal features a bar on site offering select spirits, beers, and beverages to accompany your North Indian dining experience.",
      timestamp,
      quickReplies: ['Reserve a Table', 'Explore Starters', 'View Atmosphere', 'Contact Front Desk']
    };
  }

  private handlePaymentQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "We accept all major Credit cards, Debit cards, UPI (Google Pay, PhonePe, Paytm), NFC mobile payments, and Cash.",
      timestamp,
      quickReplies: ['Reserve a Table', 'Order Online', 'Explore Menu', 'Pricing Information']
    };
  }

  private handleCuisineQuery(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "Mughal Mahal specializes in authentic Mughlai and North Indian cuisine. Our recipes honor the culinary traditions of old Delhi—slow handi dum-cooking, live charcoal tandoor roasting, and gravies made with churned butter, cream, and fragrant potli masalas.",
      timestamp,
      quickReplies: ['Explore Menu', 'Murg Makhani ₹725', 'Gosht Rogan Josh ₹715', 'Reserve a Table']
    };
  }

  private handleMenuOverview(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "Our complete verified menu spans:\n\n1. Mughal Handi Se — Non-Veg Curries (Butter Chicken, Rogan Josh, Saag Gosht)\n2. Mughlai Charcoal Appetizers — Non-Veg (Tandoori Murgh, Seekh Kebab, Fish Tikka)\n3. Mughal Handi Se — Veg Curries (Dal Makhani, Paneer Makhani, Malai Kofta)\n4. Mughlai Charcoal Appetizers — Veg (Achari Paneer Tikka, Hara Bhara Kebab)\n5. Karamat-e-Tandoor — Artisan Breads (Butter Naan, Kulchas, Paratha)\n6. Chawal-e-Lazeez — Biryani & Rice (Murgh Biryani, Gosht Biryani, Subz Biryani)\n7. Mughal Royal Thali & Sets (Royal Non-Veg Thali ₹849)",
      timestamp,
      quickReplies: ['Vegetarian', 'Non-Veg', 'Biryani', 'Royal Thali ₹849', 'Reserve a Table']
    };
  }

  private handleSmartFallback(id: string, timestamp: string): ChatMessage {
    return {
      id,
      sender: 'concierge',
      text: "I'm not completely sure what you're looking for. I can help with our menu, dishes, prices, reservations, restaurant information and dining experience. What would you like to know?",
      timestamp,
      quickReplies: ['Explore Menu', 'What should I try?', 'Prices under ₹700', 'Reserve a Table', 'Opening Hours']
    };
  }
}

export const conciergeEngine = new MughalConciergeEngine();
