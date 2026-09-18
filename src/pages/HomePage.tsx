import React from 'react';
import { ArrowRight, Flame, Sparkles, Clock, Truck, ShieldCheck, HeartHandshake, CheckCircle2, MessageCircle } from 'lucide-react';
import { BreadProduct } from '../types';
import { ProductCard } from '../components/ProductCard';
import { TESTIMONIALS, BAKERY_INFO } from '../data/mockData';

interface HomePageProps {
  products: BreadProduct[];
  onAddToCart: (product: BreadProduct, quantity: number) => void;
  onNavigate: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onAddToCart,
  onNavigate,
}) => {
  const popularBreads = products.filter((p) => p.popular).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/70 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
                <span>Ho, Ghana’s Premier Fresh Bakery</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-950 tracking-tight leading-[1.12]">
                Fresh Bread. <br />
                <span className="text-amber-700 italic">Every Morning.</span>
              </h1>

              <p className="text-lg sm:text-xl text-stone-700 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Deliciously baked bread made fresh for your family. From pillowy Ghanaian Tea Bread to golden Sugar Bread and whole wheat loaves, baked at dawn with love.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>View Our Bread</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    onNavigate('order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-amber-100/50 text-amber-950 border border-amber-900/20 font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Order Now</span>
                </button>
              </div>

              {/* Feature Micro-Badges */}
              <div className="pt-6 border-t border-amber-900/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl font-bold text-amber-900">5:30 AM</p>
                  <p className="text-xs text-stone-600">Daily First Oven Pull</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-amber-900">GH₵10</p>
                  <p className="text-xs text-stone-600">Starting Price</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-amber-900">100%</p>
                  <p className="text-xs text-stone-600">Real Butter & Flour</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main hero image container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5 bg-amber-100">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85"
                    alt="Freshly baked Ghanaian bread"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-amber-500 text-amber-950 inline-block mb-2">
                      Today's Oven Special
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Classic Ghanaian Sugar Bread</h3>
                    <p className="text-sm text-amber-100/90 mt-1">
                      Golden caramelized crust with a melt-in-your-mouth soft interior. GH₵12
                    </p>
                  </div>
                </div>

                {/* Floating Freshness Badge Card */}
                <div className="absolute -top-6 -right-4 sm:-right-6 bg-white rounded-2xl p-4 shadow-xl border border-amber-900/10 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      Oven Schedule
                    </span>
                    <span className="font-bold text-stone-900 text-sm">
                      Next Batch: 2:00 PM
                    </span>
                  </div>
                </div>

                {/* Floating Fast WhatsApp Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-amber-900 text-white rounded-2xl p-4 shadow-xl border border-amber-800/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-medium text-amber-200">
                      WhatsApp Quick Order
                    </span>
                    <span className="font-bold text-xs">
                      Send order in 1-click
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fresh Batch Live Notice Bar */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-amber-900 text-amber-50 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-sm sm:text-base font-medium">
              <strong className="text-amber-200">Daily Baking Promise:</strong> Every loaf is prepared at dawn using slow fermentation and brick deck baking for superior texture.
            </span>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Check All 6 Loaf Varieties
          </button>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">
              Popular Ghanaian Breads
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Hand-kneaded and freshly baked every dawn. Click "Add to Order" to build your basket.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBreads.map((bread) => (
            <ProductCard
              key={bread.id}
              product={bread}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-amber-100/40 border-y border-amber-900/10 py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
              The Golden Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 mt-1">
              Why Families Choose Golden Loaf
            </h2>
            <p className="text-stone-600 text-sm mt-2">
              For over a decade, we have kept our recipe simple: pure unadulterated flour, warm morning ovens, and genuine Ghanaian warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
                Freshly Baked Daily
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Our ovens light up at 3:30 AM so that your bread arrives warm, crusty, and fragrant by breakfast time.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
                Quality Ingredients
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                We use high-grade fortified flour, churned dairy butter, and natural yeast with zero harmful dough additives.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
                Affordable Prices
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Wholesome loaves priced from GH₵10 to GH₵25, ensuring every Ghanaian home can enjoy a nutritious breakfast.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-amber-950 mb-2">
                Reliable Delivery
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Direct dispatch across Ho town, Mawuli Estate, Bankoe, and express weekly bulk shipments to Accra depot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Spotlight: The Great Ghanaian Bread Tradition */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="bg-amber-950 text-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Ghanaian Breakfast Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-snug">
                Tea Bread or Sugar Bread? <br />
                <span className="text-amber-300 italic">The Debate of Every Ghanaian Morning</span>
              </h2>
              <p className="text-amber-100/80 text-sm sm:text-base leading-relaxed">
                Whether you dunk light, savory Tea Bread into steaming hot Milo with condensed milk, or slice through thick golden Sugar Bread smothered in Blue Band margarine with fried eggs and shito, Golden Loaf honours the craft that makes Ghanaian breakfast legendary.
              </p>
              <div className="space-y-2.5 pt-2 text-sm text-amber-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Custom wood peel deck ovens for that classic crust crunch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Available sliced or uncut according to your family's preference</span>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-sm transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Read Our Bakery Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
                alt="Ghanaian Tea Bread and breakfast"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            Community Love
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950 mt-1">
            Loved by Homes Across Ghana
          </h2>
          <p className="text-stone-600 text-sm mt-2">
            Hear from our everyday customers, teachers, caterers, and families in Ho and Accra.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-base">★</span>
                  ))}
                </div>
                <p className="text-stone-700 text-sm italic leading-relaxed mb-4">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h4 className="font-bold text-amber-950 text-sm">{t.name}</h4>
                <p className="text-xs text-stone-500">{t.role}</p>
                <p className="text-[11px] text-amber-800 mt-0.5">{t.location}</p>
                <div className="mt-2 text-[11px] font-medium text-stone-600 bg-amber-50 px-2 py-1 rounded inline-block">
                  Favorite: {t.favoriteBread}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Pre-order Card */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-amber-800 to-amber-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Ready for Tomorrow’s Breakfast?
            </h2>
            <p className="text-amber-200/90 text-sm sm:text-base leading-relaxed">
              Pre-order your fresh loaves tonight. We’ll bake your bread fresh at 5:00 AM and deliver hot to your doorstep or have it ready for pickup.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onNavigate('order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Place Your Order (GH₵)
              </button>
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsapp}?text=Hello%20Golden%20Loaf%20Bakery,%20I'd%20like%20to%20order%20bread%20for%20tomorrow%20morning`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
