import React from 'react';
import { Wheat, Award, Heart, Users, Clock, Flame, CheckCircle, ArrowRight } from 'lucide-react';
import { BAKERY_INFO } from '../data/mockData';

interface AboutPageProps {
  onNavigate: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Hero / Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Wheat className="w-3.5 h-3.5" />
          <span>Our Story & Craft</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-amber-950 tracking-tight">
          Baked with Ghanaian Passion in Ho
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Golden Loaf Bakery was founded with a singular purpose: to preserve the authentic taste, fluffiness, and warmth of genuine Ghanaian bread while raising the standard of purity and hygiene.
        </p>
      </div>

      {/* Origin Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-4/3 bg-stone-100 border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1000&q=80"
              alt="Golden Loaf Bakery dough preparation"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-amber-900 text-amber-50 p-4 sm:p-5 rounded-2xl shadow-xl max-w-xs text-xs space-y-1 border border-amber-800">
            <p className="font-serif text-base font-bold text-amber-200">The 3:30 AM Ritual</p>
            <p className="text-amber-100/80">
              When the town is asleep, our master bakers sift the flour, nurture the yeast, and tend the oven fires.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            Tradition Meets Excellence
          </span>
          <h2 className="font-serif text-3xl font-bold text-amber-950 leading-tight">
            The Soul of Ghanaian Breakfast
          </h2>
          <p className="text-stone-700 text-sm leading-relaxed">
            In Ghana, bread is not just a food staple—it is an emotion. It is the aroma drifting through early morning streets, the comforting crunch of a toasted loaf bought from a roadside vendor, and the warmth of gathering with family around cups of hot Milo or roasted groundnut soup.
          </p>
          <p className="text-stone-700 text-sm leading-relaxed">
            At Golden Loaf, we honour this heritage. We reject shortcuts, artificial bromates, and cheap fillers. Every batch of our Tea Bread, Sugar Bread, and Butter Loaves uses pure churned butter, spring water, and high-protein wheat flour.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-900/10">
              <span className="font-serif text-2xl font-bold text-amber-900 block">500+</span>
              <span className="text-xs text-stone-600 font-medium">Loaves Baked Daily</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-900/10">
              <span className="font-serif text-2xl font-bold text-amber-900 block">100%</span>
              <span className="text-xs text-stone-600 font-medium">Safe, Bromate-Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* The Difference: Tea Bread vs Sugar Bread */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-amber-900/10 shadow-sm space-y-8">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider">
            Ghanaian Culinary Heritage
          </span>
          <h2 className="font-serif text-3xl font-bold text-amber-950">
            Tea Bread vs. Sugar Bread: What's the Difference?
          </h2>
          <p className="text-stone-600 text-sm">
            Two Ghanaian icons, each with its own loyal following. Here is what makes each unique:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tea Bread Card */}
          <div className="p-6 rounded-2xl bg-[#faf7f2] border border-amber-900/10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">Savory & Light</span>
                <h3 className="font-serif text-2xl font-bold text-amber-950">Ghanaian Tea Bread</h3>
              </div>
              <span className="text-lg font-bold text-amber-800">GH₵10</span>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              Light, airy, and gently savory with a delicate crust. Named because it was traditionally formulated to absorb morning tea, cocoa, or coffee without disintegrating into mush.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-amber-900/10">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>Lower sugar content, subtly salted</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>Pairs with fried eggs, sardines, or spicy shito</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>The ultimate breakfast dipper for hot Milo</span>
              </li>
            </ul>
          </div>

          {/* Sugar Bread Card */}
          <div className="p-6 rounded-2xl bg-[#faf7f2] border border-amber-900/10 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase">Golden & Sweet</span>
                <h3 className="font-serif text-2xl font-bold text-amber-950">Ghanaian Sugar Bread</h3>
              </div>
              <span className="text-lg font-bold text-amber-800">GH₵12</span>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed">
              Dense, buttery, richly sweet, and aromatic. Baked until the crust caramelizes into a deep golden bronze with a tender pillowy center that melts pleasantly on the tongue.
            </p>
            <ul className="text-xs text-stone-700 space-y-2 pt-2 border-t border-amber-900/10">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>Enriched with cane sugar and vanilla aroma</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>Famous pairing with Blue Band margarine and groundnuts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>Delicious snack straight from the packet</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Our 4 Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Wheat className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg font-bold text-amber-950">Pure Ingredients</h4>
          <p className="text-stone-600 text-xs leading-relaxed">
            Non-GMO flour, natural butter, purified water, and clean cane sugar.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg font-bold text-amber-950">Slow Fermentation</h4>
          <p className="text-stone-600 text-xs leading-relaxed">
            We don't rush the yeast. Long proofing produces superior flavor and easy digestion.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg font-bold text-amber-950">Community First</h4>
          <p className="text-stone-600 text-xs leading-relaxed">
            Employing local youth in Ho and supporting community sports and schools.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-amber-900/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg font-bold text-amber-950">Clean Kitchen</h4>
          <p className="text-stone-600 text-xs leading-relaxed">
            Rigorous sanitary standards certified by the Food & Drugs Authority (FDA) Ghana.
          </p>
        </div>
      </div>

      {/* Call to Action to Order */}
      <div className="bg-amber-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Taste the Golden Difference Today
          </h3>
          <p className="text-amber-200 text-sm max-w-xl">
            Order your fresh loaves now. Warm delivery to your home or easy pickup at our Ho bakery.
          </p>
        </div>
        <button
          onClick={() => {
            onNavigate('order');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm transition-colors cursor-pointer shrink-0 flex items-center gap-2"
        >
          <span>Order Fresh Bread</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
