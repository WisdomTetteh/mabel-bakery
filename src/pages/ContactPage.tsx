import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Truck,
  Building2
} from 'lucide-react';
import { BAKERY_INFO } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What time are the morning loaves ready for pickup or delivery?',
      a: 'Our primary oven batch is pulled hot at 5:30 AM every morning. Deliveries across Ho begin immediately at 6:30 AM so you receive warm bread in time for breakfast.',
    },
    {
      q: 'Do you deliver to Accra or outside Ho?',
      a: 'Yes! We dispatch fresh batch loaves to our Spintex Road depot in Accra three times a week (Tuesdays, Thursdays, and Saturdays). We also do custom event bulk dispatches across Volta Region.',
    },
    {
      q: 'Can I order sliced bread rather than uncut loaves?',
      a: 'Absolutely. During checkout or in your WhatsApp order message, you can select "Neatly Sliced", "Half Sliced", or traditional "Uncut Whole Loaf".',
    },
    {
      q: 'How can school canteens or tea joints order in wholesale quantities?',
      a: 'We offer special catering & wholesale pricing for orders above 30 loaves. Call us directly or select "Wholesale / Event Supply" in the inquiry form below.',
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" />
          <span>Locate & Reach Us</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">
          Contact Golden Loaf Bakery
        </h1>
        <p className="text-stone-600 text-sm">
          Have a question about our bread, want to place a custom event order, or need directions? We’d love to hear from you.
        </p>
      </div>

      {/* Grid: Left Contact Info & Map Card, Right Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contacts & Operating Hours */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm space-y-6">
            <h2 className="font-serif text-2xl font-bold text-amber-950">
              Bakery Information
            </h2>

            <div className="space-y-4 text-sm text-stone-700">
              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Main Bakery & Oven</h4>
                  <p className="text-stone-600 mt-0.5">{BAKERY_INFO.address}</p>
                  <p className="text-xs text-amber-800 font-medium mt-1">
                    Landmark: Just 200m from Ho Central Market round-about
                  </p>
                </div>
              </div>

              {/* Branch */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Accra Pick-up Depot</h4>
                  <p className="text-stone-600 mt-0.5">{BAKERY_INFO.branch}</p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Telephone & WhatsApp</h4>
                  <p className="text-stone-600 mt-0.5">
                    Customer Desk:{' '}
                    <a href={`tel:${BAKERY_INFO.phone}`} className="text-amber-800 font-semibold hover:underline">
                      {BAKERY_INFO.phone}
                    </a>
                  </p>
                  <div className="mt-2">
                    <a
                      href={`https://wa.me/${BAKERY_INFO.whatsapp}?text=Hello%20Golden%20Loaf%20Bakery,%20I'd%20like%20to%20make%20an%20inquiry`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat Directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Baking Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">Operating Hours</h4>
                  <p className="text-stone-600 mt-0.5">
                    Monday to Saturday: {BAKERY_INFO.hoursWeekday}
                  </p>
                  <p className="text-stone-600">
                    Sundays: {BAKERY_INFO.hoursSunday}
                  </p>
                  <p className="text-xs text-amber-800 font-medium mt-1">
                    Hot Oven Batches: 5:30 AM & 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual Card */}
          <div className="rounded-3xl bg-amber-900 text-white p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Directions in Ho, Volta
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Visiting Our Bakery Counter?
              </h3>
              <p className="text-sm text-amber-100/90 leading-relaxed">
                Take the main Commercial Road towards the Ho Central Market. Look for our distinct Golden Loaf signage with warm wooden windows and the unmistakable scent of hot freshly baked bread!
              </p>
              <div className="pt-2 flex items-center gap-2 text-xs text-amber-200">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Ample street parking and motorcycle pickup bay available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send Message Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm space-y-6">
          <div>
            <h2 className="font-serif text-2xl font-bold text-amber-950">
              Send the Bakery a Message
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Inquire about bread catering, wholesale supply, or general feedback
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-emerald-950">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-emerald-800">
                Medaase, {formData.name}! Our bakery team will reply to you on{' '}
                <strong>{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Wisdom or Akosua"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Phone Number (Ghana) <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="024 412 3456"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Subject / Topic
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                >
                  <option value="General Inquiry">General Bakery Inquiry</option>
                  <option value="Wholesale / School Supply">Wholesale / School / Hotel Supply</option>
                  <option value="Wedding / Funeral Bread Supply">Event / Wedding / Funeral Order</option>
                  <option value="Feedback on Bread">Feedback on Our Bread</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help you or what bread quantities you need..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-[#faf7f2] rounded-3xl p-8 sm:p-12 border border-amber-900/10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-amber-950">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-2"
            >
              <h3 className="font-serif text-base font-bold text-amber-950">
                {faq.q}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
