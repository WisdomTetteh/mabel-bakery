import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MessageCircle, 
  CheckCircle2, 
  Truck, 
  Store, 
  Plus, 
  Minus, 
  Trash2, 
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CartItem, CustomerOrder, DeliveryMethod, BreadProduct } from '../types';
import { BAKERY_INFO } from '../data/mockData';

interface OrderPageProps {
  cart: CartItem[];
  products: BreadProduct[];
  onAddToCart: (product: BreadProduct, quantity: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onSubmitOrder: (order: CustomerOrder) => void;
  onNavigate: (tab: 'home' | 'products' | 'about' | 'order' | 'contact' | 'admin') => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  cart,
  products,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onSubmitOrder,
  onNavigate,
}) => {
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('delivery');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryTown, setDeliveryTown] = useState('Ho');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Morning Batch (06:30 - 08:30)');
  const [slicingPreference, setSlicingPreference] = useState<'unsliced' | 'sliced' | 'half-sliced'>('unsliced');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Mobile Money (MoMo)' | 'WhatsApp Order'>('Cash on Delivery');

  // Form Validation & submission feedback
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderConfirmed, setOrderConfirmed] = useState<CustomerOrder | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'delivery' ? (deliveryTown === 'Accra Dispatch' ? 25 : 10) : 0;
  const total = subtotal + deliveryFee;

  // Validate form
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!customerName.trim()) {
      errs.customerName = 'Please enter your full name.';
    }

    const cleanPhone = customerPhone.replace(/\s+/g, '');
    if (!cleanPhone) {
      errs.customerPhone = 'Please enter a contact phone number.';
    } else if (cleanPhone.length < 9) {
      errs.customerPhone = 'Please enter a valid Ghana phone number (e.g. 024 123 4567).';
    }

    if (deliveryMethod === 'delivery' && !deliveryLocation.trim()) {
      errs.deliveryLocation = 'Please provide your street or landmark for delivery.';
    }

    if (cart.length === 0) {
      errs.cart = 'Your basket is empty. Please select at least one bread loaf.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // WhatsApp Order Handler (Phase 7 implementation)
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity} × ${item.product.name} (GH₵${item.product.price * item.quantity})`
      )
      .join('\n');

    const message = `Hello ${BAKERY_INFO.name},\n\nI would like to order fresh bread:\n\n${itemsText}\n\n*Subtotal:* GH₵${subtotal}\n*Delivery Fee:* GH₵${deliveryFee} (${deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'})\n*Total:* GH₵${total}\n\n*Customer Details:*\nName: ${customerName}\nPhone: ${customerPhone}\nLocation: ${deliveryMethod === 'delivery' ? deliveryLocation + ', ' + deliveryTown : 'Bakery Pickup Counter'}\nTime Slot: ${deliveryTimeSlot}\nSlicing: ${slicingPreference}\n${notes ? `Notes: ${notes}\n` : ''}\nThank you!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BAKERY_INFO.whatsapp}?text=${encoded}`;

    // Also record order in app state
    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `#GL-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      customerName,
      customerPhone,
      deliveryMethod,
      deliveryLocation: deliveryMethod === 'delivery' ? deliveryLocation : 'Bakery Counter Pickup',
      deliveryTown,
      deliveryTimeSlot,
      slicingPreference,
      notes,
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      deliveryFee,
      total,
      status: 'Pending',
      paymentMethod: 'WhatsApp Order',
    };

    onSubmitOrder(newOrder);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setOrderConfirmed(newOrder);
  };

  // Online Order Handler
  const handleDirectOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: `#GL-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: 'Just now',
      customerName,
      customerPhone,
      deliveryMethod,
      deliveryLocation: deliveryMethod === 'delivery' ? deliveryLocation : 'Bakery Counter Pickup',
      deliveryTown,
      deliveryTimeSlot,
      slicingPreference,
      notes,
      items: cart.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      deliveryFee,
      total,
      status: 'Pending',
      paymentMethod,
    };

    onSubmitOrder(newOrder);
    setOrderConfirmed(newOrder);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Truck className="w-3.5 h-3.5" />
          <span>Fresh Bread Ordering</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-amber-950">
          Place Your Bakery Order
        </h1>
        <p className="text-stone-600 text-sm">
          Select delivery to your doorstep in Ho & Accra or pick up fresh from our oven counter. Pay via Cash on Delivery, Mobile Money, or WhatsApp.
        </p>
      </div>

      {/* Confirmation Modal */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-900/10 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Order Received!
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Medaase, {orderConfirmed.customerName}!
              </h3>
              <p className="text-xs text-stone-500">
                Order Ref: <strong className="text-amber-900">{orderConfirmed.orderNumber}</strong> • {orderConfirmed.createdAt}
              </p>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-900/10 text-xs text-stone-700 space-y-2">
              <div className="flex justify-between font-semibold text-stone-900">
                <span>Total Amount:</span>
                <span className="text-amber-900 text-sm font-bold">GH₵{orderConfirmed.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Fulfillment:</span>
                <span className="capitalize">{orderConfirmed.deliveryMethod} ({orderConfirmed.deliveryTown})</span>
              </div>
              <div className="flex justify-between">
                <span>Time Slot:</span>
                <span>{orderConfirmed.deliveryTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span>{orderConfirmed.paymentMethod}</span>
              </div>
            </div>

            <div className="text-xs text-stone-600 space-y-2 bg-stone-50 p-3 rounded-xl">
              <p>
                🍞 Our master baker is reviewing your order. We will call you on <strong>{orderConfirmed.customerPhone}</strong> to confirm dispatch.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href={`https://wa.me/${BAKERY_INFO.whatsapp}?text=Hello%20Golden%20Loaf,%20following%20up%20on%20my%20order%20${orderConfirmed.orderNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Track or Chat via WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setOrderConfirmed(null);
                  onClearCart();
                  onNavigate('home');
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Back to Bakery Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left Form, Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Customer Information */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-amber-950">
                Customer Information
              </h2>
              <p className="text-xs text-stone-500">
                Please provide your contact and delivery location details
              </p>
            </div>
            <span className="text-xs text-amber-800 font-semibold bg-amber-100 px-2.5 py-1 rounded-md">
              Step 1 of 2
            </span>
          </div>

          <form onSubmit={handleDirectOrderSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  if (errors.customerName) setErrors({ ...errors, customerName: '' });
                }}
                placeholder="e.g. Kwame Asante or Auntie Mansa"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 text-stone-800 ${
                  errors.customerName
                    ? 'border-red-500 focus:ring-red-300'
                    : 'border-stone-200 focus:ring-amber-700/30 focus:border-amber-700'
                }`}
              />
              {errors.customerName && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.customerName}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Phone Number (Ghana Mobile / MoMo) <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => {
                  setCustomerPhone(e.target.value);
                  if (errors.customerPhone) setErrors({ ...errors, customerPhone: '' });
                }}
                placeholder="e.g. 024 412 8901 or 055 921 4480"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 text-stone-800 ${
                  errors.customerPhone
                    ? 'border-red-500 focus:ring-red-300'
                    : 'border-stone-200 focus:ring-amber-700/30 focus:border-amber-700'
                }`}
              />
              {errors.customerPhone && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.customerPhone}
                </p>
              )}
            </div>

            {/* Delivery or Pickup Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Order Fulfillment Method <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('delivery')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryMethod === 'delivery'
                      ? 'border-amber-700 bg-amber-50/70 text-amber-950 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <Truck className={`w-5 h-5 mt-0.5 ${deliveryMethod === 'delivery' ? 'text-amber-800' : 'text-stone-400'}`} />
                  <div>
                    <span className="font-bold text-sm block">Doorstep Delivery</span>
                    <span className="text-[11px] text-stone-500">Delivered directly to your home or office</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryMethod === 'pickup'
                      ? 'border-amber-700 bg-amber-50/70 text-amber-950 shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <Store className={`w-5 h-5 mt-0.5 ${deliveryMethod === 'pickup' ? 'text-amber-800' : 'text-stone-400'}`} />
                  <div>
                    <span className="font-bold text-sm block">Bakery Pickup</span>
                    <span className="text-[11px] text-stone-500">Free pickup at Ho Central Market Road</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Location & Town (if delivery) */}
            {deliveryMethod === 'delivery' ? (
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Town / Area <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={deliveryTown}
                      onChange={(e) => setDeliveryTown(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                    >
                      <option value="Ho">Ho (Local Town)</option>
                      <option value="Mawuli Estate">Mawuli Estate, Ho</option>
                      <option value="Bankoe">Bankoe, Ho</option>
                      <option value="Ho Polytechnic Area">Ho Polytechnic / Technical Univ</option>
                      <option value="Kpassa / Outskirts">Volta Outskirts</option>
                      <option value="Accra Dispatch">Accra Depot Dispatch (+GH₵25)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Preferred Batch Time
                    </label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                    >
                      <option value="Morning Batch (06:30 - 08:30)">Morning Batch (06:30 - 08:30)</option>
                      <option value="Afternoon Warm Batch (14:00 - 16:30)">Afternoon Warm Batch (14:00 - 16:30)</option>
                      <option value="Evening Dinner Batch (17:00 - 19:30)">Evening Dinner Batch (17:00 - 19:30)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Street Address / Landmark <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => {
                      setDeliveryLocation(e.target.value);
                      if (errors.deliveryLocation) setErrors({ ...errors, deliveryLocation: '' });
                    }}
                    placeholder="e.g. Near Civic Centre, opposite Melcom, House No. 24"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 text-stone-800 ${
                      errors.deliveryLocation
                        ? 'border-red-500 focus:ring-red-300'
                        : 'border-stone-200 focus:ring-amber-700/30 focus:border-amber-700'
                    }`}
                  />
                  {errors.deliveryLocation && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.deliveryLocation}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-900/10 text-xs text-stone-700 space-y-1">
                <p className="font-bold text-amber-950">Pickup Counter Location:</p>
                <p>{BAKERY_INFO.address}</p>
                <p className="text-amber-800 font-medium">Ready within 20 minutes of oven pull.</p>
              </div>
            )}

            {/* Slicing & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Loaf Slicing Preference
                </label>
                <div className="flex items-center gap-3 text-xs">
                  {[
                    { id: 'unsliced', label: 'Uncut Whole Loaf' },
                    { id: 'sliced', label: 'Neatly Sliced' },
                    { id: 'half-sliced', label: 'Half Sliced' },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-1.5 text-stone-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="slicing"
                        value={opt.id}
                        checked={slicingPreference === opt.id}
                        onChange={() => setSlicingPreference(opt.id as any)}
                        className="accent-amber-700"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Payment Preference
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
                >
                  <option value="Cash on Delivery">Cash on Delivery / Pickup</option>
                  <option value="Mobile Money (MoMo)">MTN / Telecel Mobile Money</option>
                  <option value="WhatsApp Order">Coordinate via WhatsApp</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Special Instructions (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please honk at gate, extra warm loaf, call before arrival..."
                rows={2}
                className="w-full px-4 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-700/30 text-stone-800"
              />
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary & Action Buttons */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-800" />
                <h2 className="font-serif text-xl font-bold text-amber-950">
                  Your Bread Basket
                </h2>
              </div>
              <span className="text-xs text-stone-500">
                {cart.reduce((s, i) => s + i.quantity, 0)} loaves
              </span>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <p className="text-stone-500 text-sm">
                  You haven't added any bread to your order yet!
                </p>
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    Quick Add Ghanaian Favorites:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {products.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onAddToCart(p, 1)}
                        className="p-2 text-left rounded-xl border border-stone-200 hover:border-amber-400 bg-amber-50/50 hover:bg-amber-100/50 transition-colors text-xs cursor-pointer"
                      >
                        <span className="font-bold block text-stone-900 truncate">{p.name}</span>
                        <span className="text-amber-800 font-semibold">+ GH₵{p.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#faf7f2] border border-amber-900/10 text-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-sm text-amber-950 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-stone-500">GH₵{item.product.price} each</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-amber-950 text-sm">
                        GH₵{item.product.price * item.quantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-stone-400 hover:text-red-500 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.cart && (
              <p className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.cart}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-stone-100 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Bread Subtotal</span>
                <span className="font-semibold text-stone-900">GH₵{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'Free (Pickup)' : `GH₵${deliveryFee}`}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-serif text-lg font-bold text-amber-950">Grand Total</span>
                <span className="font-serif text-2xl font-black text-amber-800">
                  GH₵{total}
                </span>
              </div>
            </div>

            {/* Phase 7 WhatsApp Ordering Button + Online Order Button */}
            <div className="space-y-3 pt-2">
              {/* WhatsApp Ordering (Prominently featured from Phase 7) */}
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                disabled={cart.length === 0}
                className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm ${
                  cart.length === 0
                    ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-700/20 hover:shadow-md'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order via WhatsApp (Recommended)</span>
              </button>

              {/* Standard Online Order submission */}
              <button
                type="button"
                onClick={handleDirectOrderSubmit}
                disabled={cart.length === 0}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  cart.length === 0
                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    : 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs'
                }`}
              >
                <span>Confirm & Place Order Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-center text-stone-500">
              ⚡ Instant WhatsApp ordering pre-populates your selected loaves, prices, delivery town, and address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
