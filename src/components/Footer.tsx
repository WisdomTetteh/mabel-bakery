import React from 'react';
import { Wheat, Phone, Mail, MapPin, Clock, MessageCircle, Heart } from 'lucide-react';
import { BAKERY_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-amber-950 text-amber-100/90 pt-16 pb-12 border-t-4 border-amber-600">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-amber-900/60">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Wheat className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                GOLDEN LOAF
              </span>
            </div>
            <p className="text-sm text-amber-200/75 leading-relaxed">
              Crafting Ghana's finest artisanal loaves, from soft and tender Tea Bread to sweet golden Sugar Bread. Baked fresh every morning with traditional techniques.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsapp}?text=Hello%20Golden%20Loaf%20Bakery,%20I'd%20like%20to%20inquire%20about%20fresh%20bread`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200">Bakery Pages</h4>
            <ul className="space-y-2.5 text-sm text-amber-100/80">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Home & Fresh Batches
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Our Bread Menu & Prices
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  About Our Bakery & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('order');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Place an Order (Delivery / Pickup)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Contact & Find Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-amber-400/90 hover:text-amber-300 transition-colors text-left cursor-pointer text-xs flex items-center gap-1 mt-2"
                >
                  <span>Baker Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Batches */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200">Baking Hours</h4>
            <div className="space-y-2.5 text-sm text-amber-100/80">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Mon – Sat</p>
                  <p className="text-xs text-amber-300">{BAKERY_INFO.hoursWeekday}</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Sundays</p>
                  <p className="text-xs text-amber-300">{BAKERY_INFO.hoursSunday}</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-900/60 border border-amber-800/40 text-xs text-amber-200 mt-3">
                <p className="font-bold text-white mb-1">Fresh Oven Batches:</p>
                <p>• Morning Batch: 5:30 AM</p>
                <p>• Afternoon Warm Batch: 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-amber-200">Our Location</h4>
            <div className="space-y-3 text-sm text-amber-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Main Bakery & Oven:</p>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {BAKERY_INFO.address}
                  </p>
                  <p className="text-xs text-amber-300/80 mt-1">
                    Accra Depot: Spintex Road, Opposite Shell Station
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${BAKERY_INFO.phone}`} className="hover:text-white transition-colors text-xs">
                  {BAKERY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${BAKERY_INFO.email}`} className="hover:text-white transition-colors text-xs">
                  {BAKERY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-400/70 gap-4">
          <p>© {new Date().getFullYear()} Golden Loaf Bakery Ghana. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Baked with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 mx-0.5" />
            <span>in Ho & Accra, Ghana</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
