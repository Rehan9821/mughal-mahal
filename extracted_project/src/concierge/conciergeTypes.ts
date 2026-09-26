import { MenuItem } from '../types.ts';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  dishes?: MenuItem[];
  actionType?: 'reserve' | 'order' | 'menu_category' | 'none';
  quickReplies?: string[];
}

export interface ConversationState {
  lastCategory?: string | null;
  lastIngredient?: 'chicken' | 'mutton' | 'paneer' | 'fish' | 'egg' | 'dal' | 'biryani' | 'bread' | 'thali' | null;
  lastDishes?: MenuItem[];
  lastDietPreference?: 'veg' | 'nonveg' | null;
  lastPriceConstraint?: { max?: number; min?: number } | null;
  lastTopic?: string | null;
}
