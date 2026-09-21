import React, { useState, useMemo } from 'react';
import { Search, Filter, Utensils, Star, Phone, ShoppingBag, Check } from 'lucide-react';
import { menuCategories, menuItems, restaurantInfo, restaurantContact } from '../data/restaurantData.ts';

interface MenuPageProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onOpenReservation, onOpenOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState<'all' | 'veg' | 'nonveg'>('all');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Veg filter
      if (vegFilter === 'veg' && !item.isVegetarian) return false;
      if (vegFilter === 'nonveg' && item.isVegetarian) return false;

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesHindi = item.hindiName?.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        return matchesName || matchesHindi || matchesDesc;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, vegFilter]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId !== 'all') {
      const el = document.getElementById(`category-section-${categoryId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="menu-page" className="min-h-screen bg-[#07070a] pt-32 pb-24 text-[#f4efe6]">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12 text-center">
        <span className="text-[10px] font-sans tracking-[0.3em] text-[#c5a059] uppercase block mb-2 font-semibold">
          Culinary Repertoire
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#f4efe6] tracking-tight uppercase">
          The Grand Menu
        </h1>
        <div className="font-hindi text-lg text-[#c5a059] mt-1">
          मुगल महल रेस्टोरेंट • शाही व्यंजन सूची
        </div>
        <p className="mt-4 text-xs sm:text-sm text-[#cfc8bc] max-w-xl mx-auto font-serif">
          Verified offerings from our kitchen at 7, Sethi Bhawan, Rajendra Place.
          Featuring legendary handi curries, clay-roasted tandoor kebabs, and freshly baked breads.
        </p>

        {/* Quick Order / Desk CTA */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            id="menu-order-now-cta"
            onClick={onOpenOrder}
            className="bg-[#c5a059] hover:bg-[#d8b46a] text-[#0a0a0c] font-sans font-semibold uppercase tracking-wider py-2.5 px-6 rounded transition-all flex items-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Order for Delivery / Takeaway
          </button>
          <a
            href={restaurantContact.telLink}
            className="border border-[rgba(218,179,106,0.4)] hover:border-[#c5a059] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(197,160,89,0.1)] text-[#c5a059] font-sans uppercase tracking-wider py-2.5 px-5 rounded transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Kitchen Call: {restaurantContact.phone}
          </a>
        </div>
      </section>

      {/* Sticky Category Bar with Glassmorphism */}
      <div className="sticky top-20 z-30 mb-10 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto rounded-xl bg-[rgba(12,12,16,0.85)] border border-[rgba(218,179,106,0.25)] backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] p-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`whitespace-nowrap px-4 py-2 rounded text-xs font-sans uppercase tracking-wider transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                  : 'text-[#8e8779] hover:text-[#f4efe6] bg-[rgba(255,255,255,0.02)]'
              }`}
            >
              All Categories ({menuItems.length})
            </button>
            {menuCategories.map((cat) => {
              const count = menuItems.filter((i) => i.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded text-xs font-sans uppercase tracking-wider transition-all ${
                    isSelected
                      ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                      : 'text-[#8e8779] hover:text-[#f4efe6] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {cat.name.split('—')[0]} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search & Filtering Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-12">
        <div className="p-4 md:p-6 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8e8779] absolute left-3.5 top-3" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search dishes (e.g. Butter Chicken, Dal Makhani)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] focus:border-[#c5a059] rounded-lg text-xs text-[#f4efe6] pl-10 pr-4 py-2.5 outline-none transition-colors placeholder:text-[#666]"
            />
          </div>

          {/* Veg / Non-Veg Toggle Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setVegFilter('all')}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded font-sans transition-colors ${
                vegFilter === 'all'
                  ? 'bg-[#c5a059] text-[#0a0a0c] font-semibold'
                  : 'bg-[rgba(255,255,255,0.03)] text-[#8e8779] hover:text-[#f4efe6]'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setVegFilter('veg')}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded font-sans transition-colors flex items-center gap-1.5 ${
                vegFilter === 'veg'
                  ? 'bg-[#2d6a3f] text-white font-semibold'
                  : 'bg-[rgba(255,255,255,0.03)] text-[#8e8779] hover:text-[#f4efe6]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#2d6a3f] inline-block" />
              Vegetarian Only
            </button>
            <button
              onClick={() => setVegFilter('nonveg')}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded font-sans transition-colors flex items-center gap-1.5 ${
                vegFilter === 'nonveg'
                  ? 'bg-[#9d0208] text-white font-semibold'
                  : 'bg-[rgba(255,255,255,0.03)] text-[#8e8779] hover:text-[#f4efe6]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#9d0208] inline-block" />
              Non-Vegetarian Only
            </button>
          </div>
        </div>
      </section>

      {/* Menu Item Listings */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-xl border border-[rgba(255,255,255,0.08)] p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-md">
            <Utensils className="w-10 h-10 mx-auto text-[#8e8779] mb-3" />
            <h3 className="font-display text-xl text-[#f4efe6]">No dishes match your query</h3>
            <p className="text-xs text-[#a69e90] mt-1">
              Try changing your search terms or clearing the vegetarian/non-vegetarian filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setVegFilter('all');
                setSelectedCategory('all');
              }}
              className="mt-4 text-xs text-[#c5a059] uppercase tracking-wider underline font-sans"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {menuCategories
              .filter(
                (cat) =>
                  selectedCategory === 'all' || selectedCategory === cat.id
              )
              .map((category) => {
                const categoryItems = filteredItems.filter(
                  (item) => item.category === category.id
                );

                if (categoryItems.length === 0) return null;

                return (
                  <div
                    key={category.id}
                    id={`category-section-${category.id}`}
                    className="space-y-6 scroll-mt-36"
                  >
                    {/* Category Header */}
                    <div className="border-b border-[rgba(218,179,106,0.25)] pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <div>
                          <h2 className="font-display text-2xl sm:text-3xl text-[#f4efe6] uppercase tracking-wide">
                            {category.name}
                          </h2>
                          <div className="font-hindi text-sm text-[#c5a059] mt-0.5">
                            {category.hindiName}
                          </div>
                        </div>
                        <span className="text-xs text-[#8e8779] font-sans uppercase tracking-wider">
                          {categoryItems.length} Offerings
                        </span>
                      </div>
                      <p className="text-xs text-[#cfc8bc] mt-2 font-serif max-w-2xl">
                        {category.description}
                      </p>
                    </div>

                    {/* Editorial Menu Glass Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          id={`menu-item-${item.id}`}
                          className="group p-6 rounded-xl bg-[rgba(255,255,255,0.025)] hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(218,179,106,0.35)] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between relative hover:-translate-y-0.5"
                        >
                          <div>
                            {/* Title & Price Header */}
                            <div className="flex items-start justify-between gap-4 mb-2">
                              <div className="flex items-start gap-2.5">
                                {/* Veg/NonVeg Indicator */}
                                <div
                                  className={`mt-1 w-3.5 h-3.5 border shrink-0 flex items-center justify-center rounded-sm ${
                                    item.isVegetarian
                                      ? 'border-[#2d6a3f]'
                                      : 'border-[#9d0208]'
                                  }`}
                                  title={
                                    item.isVegetarian
                                      ? 'Vegetarian'
                                      : 'Non-Vegetarian'
                                  }
                                >
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      item.isVegetarian
                                        ? 'bg-[#2d6a3f]'
                                        : 'bg-[#9d0208]'
                                    }`}
                                  />
                                </div>

                                <div>
                                  <h3 className="font-display text-lg text-[#f4efe6] group-hover:text-[#c5a059] transition-colors leading-snug">
                                    {item.name}
                                  </h3>
                                  {item.hindiName && (
                                    <span className="font-hindi text-xs text-[#8e8779] block">
                                      {item.hindiName}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="font-display text-lg font-bold text-[#c5a059] shrink-0">
                                ₹{item.price}
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-xs text-[#b8b0a2] font-serif leading-relaxed pl-6 mt-1">
                              {item.description}
                            </p>
                          </div>

                          {/* Order Action Strip */}
                          <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between pl-6 text-xs">
                            <span className="text-[11px] text-[#8e8779] uppercase tracking-wider">
                              {item.portion || 'Chef Special'}
                            </span>
                            <button
                              onClick={onOpenOrder}
                              className="text-[11px] uppercase tracking-wider font-sans text-[#c5a059] hover:text-[#f4efe6] transition-colors flex items-center gap-1 font-medium"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              Order Item
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
    </div>
  );
};
