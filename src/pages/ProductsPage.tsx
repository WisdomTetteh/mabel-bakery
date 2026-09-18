import React, { useState } from 'react';
import { Search, Filter, Wheat, Info, Sparkles, Check } from 'lucide-react';
import { BreadProduct } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  products: BreadProduct[];
  onAddToCart: (product: BreadProduct, quantity: number) => void;
  onNavigate: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onAddToCart,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Classic', 'Sweet', 'Family', 'Specialty'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-lg">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold tracking-wide uppercase">
            <Wheat className="w-3.5 h-3.5" />
            <span>Golden Loaf Oven Menu</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Our Fresh Bread Selection
          </h1>
          <p className="text-amber-200/80 text-sm sm:text-base leading-relaxed">
            Every loaf is baked fresh daily in traditional deck ovens with pure ingredients. Choose your favorites, customize quantity, and order directly for doorstep delivery or bakery pickup.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider hidden sm:inline mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-200'
              }`}
            >
              {cat === 'All' ? 'All Breads' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Tea Bread, Sugar..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700 text-stone-800"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-3">
          <Wheat className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="font-serif text-lg font-bold text-stone-800">No bread matched your search</h3>
          <p className="text-sm text-stone-500">
            Try adjusting your keyword or reset category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-amber-700 text-white text-xs font-semibold hover:bg-amber-800 transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((bread) => (
            <ProductCard
              key={bread.id}
              product={bread}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      {/* Educational Bread Guide Section */}
      <div className="bg-amber-50 border border-amber-900/10 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Baker's Freshness Advice</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-amber-950">
            How to Keep Your Ghanaian Bread Tender & Soft
          </h3>
          <p className="text-stone-700 text-sm leading-relaxed">
            Our bread is naturally baked without artificial anti-staling chemicals. Keep your loaf inside the bakery pouch at room temperature, away from direct sunlight. Never refrigerate soft Ghanaian bread as cold temperatures accelerate crumb staling!
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs space-y-2.5 text-xs text-stone-700">
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Day 1–2:</strong> Enjoy fresh, soft and warm from the packaging.</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Day 3–4:</strong> Perfect for golden French toast, pan toasting, or microwave steaming for 10 seconds.</span>
          </div>
          <div className="flex items-start gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Freezing tip:</strong> Slices can be frozen airtight and popped straight into the toaster.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
