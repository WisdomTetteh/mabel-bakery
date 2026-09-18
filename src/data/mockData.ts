import { BreadProduct, Testimonial, CustomerOrder } from '../types';

export const INITIAL_PRODUCTS: BreadProduct[] = [
  {
    id: 'tea-bread',
    name: 'Tea Bread',
    category: 'Classic',
    price: 10,
    description: 'The beloved Ghanaian morning classic. Light, airy, subtly savory crust with a soft tender crumb that absorbs hot Milo, tea, or fried egg perfectly.',
    pairingNote: 'Best enjoyed warm with hot beverage or fried eggs with shito.',
    weight: '350g',
    inStock: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Enriched Wheat Flour', 'Water', 'Yeast', 'Vegetable Shortening', 'Pure Salt', 'Trace Sugar']
  },
  {
    id: 'sugar-bread',
    name: 'Sugar Bread',
    category: 'Sweet',
    price: 12,
    description: 'Authentic Ghanaian sweetened bread. Golden-brown caramelized crust with a pillowy, slightly sweet, aromatic crumb.',
    pairingNote: 'Incredible with Blue Band margarine, roasted groundnuts, or on its own.',
    weight: '400g',
    inStock: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Premium Flour', 'Granulated Cane Sugar', 'Yeast', 'Salted Butter', 'Vanilla Essence', 'Warm Milk']
  },
  {
    id: 'butter-bread',
    name: 'Butter Bread',
    category: 'Classic',
    price: 15,
    description: 'Enriched luxury loaf made with real churned butter. Ultra-soft texture, delicate fragrance, and a melt-in-your-mouth bite.',
    pairingNote: 'Perfect for morning French toast, sandwiches, or afternoon tea.',
    weight: '450g',
    inStock: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Fine Patent Flour', 'Churned Dairy Butter', 'Fresh Milk', 'Eggs', 'Yeast', 'Golden Sugar', 'Sea Salt']
  },
  {
    id: 'wheat-bread',
    name: 'Wheat Bread',
    category: 'Specialty',
    price: 18,
    description: 'Wholesome stone-ground whole wheat loaf. Nutty, fiber-rich, satisfying texture baked with traditional Ghanaian softness.',
    pairingNote: 'Ideal for health-conscious breakfast, avocado spread, or hearty sandwiches.',
    weight: '500g',
    inStock: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    ingredients: ['100% Whole Wheat Flour', 'Cracked Wheat', 'Malted Barley', 'Pure Honey', 'Yeast', 'Cold-Pressed Oil']
  },
  {
    id: 'family-loaf',
    name: 'Family Loaf',
    category: 'Family',
    price: 20,
    description: 'Generous medium-large loaf crafted to feed the entire household breakfast. Soft, resilient crumb that holds sandwich spreads well.',
    pairingNote: 'A family table staple for morning breakfasts, sardines, and baked beans.',
    weight: '750g',
    inStock: true,
    popular: false,
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Wheat Flour', 'Yeast', 'Spring Water', 'Butter Blend', 'Sugar', 'Iodized Salt']
  },
  {
    id: 'large-family-loaf',
    name: 'Large Family Loaf',
    category: 'Family',
    price: 25,
    description: 'Our signature extra-large bakery masterpiece. Oven-baked in custom tins to achieve an even golden crust and supreme fluffiness.',
    pairingNote: 'Generous 18-20 hearty slices. The grand feast loaf for gatherings and big households.',
    weight: '1000g',
    inStock: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Flour Blend', 'Cultured Starter', 'Butter', 'Cane Sugar', 'Yeast', 'Milk Solids', 'Salt']
  },
  {
    id: 'coconut-bread',
    name: 'Coconut Sweet Loaf',
    category: 'Sweet',
    price: 16,
    description: 'Infused with freshly grated local coastal coconut milk and flakes. Aromatic sweet loaf reminiscent of Ghanaian beach bakeries.',
    pairingNote: 'Delicious snack with chilled Sobolo or freshly tapped coconut water.',
    weight: '420g',
    inStock: true,
    popular: false,
    image: 'https://images.unsplash.com/photo-1579697096985-41fe1430e5df?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Flour', 'Coconut Milk', 'Roasted Coconut Flakes', 'Raw Sugar', 'Butter', 'Nutmeg']
  },
  {
    id: 'spiced-raisin-loaf',
    name: 'Spiced Raisin Loaf',
    category: 'Specialty',
    price: 22,
    description: 'Studded with juicy plump raisins and infused with nutmeg and cinnamon. Baked golden with a honey glaze.',
    pairingNote: 'Toasted with butter for a comforting afternoon treat.',
    weight: '500g',
    inStock: true,
    popular: false,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Wheat Flour', 'Golden Sultanas', 'Cinnamon', 'Ground Nutmeg', 'Honey Glaze', 'Butter']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Auntie Mansa',
    role: 'Local School Caterer',
    location: 'Ho Central, Volta Region',
    comment: 'Golden Loaf’s Tea Bread is unmatched! It has that genuine fresh, soft texture that stays tender all day. We order 40 loaves every Tuesday morning for school breakfast.',
    rating: 5,
    favoriteBread: 'Tea Bread'
  },
  {
    id: '2',
    name: 'Kwame Asante',
    role: 'Civil Engineer',
    location: 'Mawuli Estate, Ho',
    comment: 'Their Sugar Bread with hot tea reminds me of my grandmother baking in the early 90s. Ordering via WhatsApp is super convenient—they deliver right to my gate before 7:00 AM.',
    rating: 5,
    favoriteBread: 'Sugar Bread'
  },
  {
    id: '3',
    name: 'Akosua Serwaa',
    role: 'Mother of Three',
    location: 'Bankoe, Ho',
    comment: 'The Large Family Loaf easily lasts our house for two full breakfasts. Perfectly baked, no hollow pockets, and the crust has just the right golden color.',
    rating: 5,
    favoriteBread: 'Large Family Loaf'
  },
  {
    id: '4',
    name: 'Wisdom K. Tetteh',
    role: 'Teacher & Food Lover',
    location: 'Ho Polytechnic Road',
    comment: 'Freshly baked every morning, warm from the oven. The Butter Bread is so rich you don’t even need butter spread on it! Best bakery in town.',
    rating: 5,
    favoriteBread: 'Butter Bread'
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-1024',
    orderNumber: '#GL-1024',
    createdAt: 'Today, 06:15 AM',
    customerName: 'Kwame Asante',
    customerPhone: '024 412 8901',
    customerEmail: 'kwame.asante@example.com',
    deliveryMethod: 'delivery',
    deliveryLocation: 'House 14B, Mawuli Estate Road',
    deliveryTown: 'Ho',
    deliveryTimeSlot: 'Morning Batch (06:30 - 08:30)',
    slicingPreference: 'sliced',
    notes: 'Please honk at the green gate.',
    items: [
      { productId: 'tea-bread', productName: 'Tea Bread', quantity: 3, price: 10 },
      { productId: 'sugar-bread', productName: 'Sugar Bread', quantity: 2, price: 12 },
      { productId: 'wheat-bread', productName: 'Wheat Bread', quantity: 1, price: 18 }
    ],
    subtotal: 72,
    deliveryFee: 10,
    total: 82,
    status: 'Baking',
    paymentMethod: 'Mobile Money (MoMo)'
  },
  {
    id: 'ord-1025',
    orderNumber: '#GL-1025',
    createdAt: 'Today, 07:05 AM',
    customerName: 'Auntie Mansa',
    customerPhone: '020 894 3321',
    deliveryMethod: 'pickup',
    deliveryLocation: 'Bakery Counter Pickup',
    deliveryTown: 'Ho Central',
    deliveryTimeSlot: 'Morning Batch (07:30 - 09:00)',
    slicingPreference: 'unsliced',
    items: [
      { productId: 'large-family-loaf', productName: 'Large Family Loaf', quantity: 2, price: 25 },
      { productId: 'butter-bread', productName: 'Butter Bread', quantity: 2, price: 15 }
    ],
    subtotal: 80,
    deliveryFee: 0,
    total: 80,
    status: 'Pending',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'ord-1023',
    orderNumber: '#GL-1023',
    createdAt: 'Today, 05:40 AM',
    customerName: 'Wisdom Tetteh',
    customerPhone: '055 921 4480',
    deliveryMethod: 'delivery',
    deliveryLocation: 'Opposite Presbyterian Church, Civic Centre Area',
    deliveryTown: 'Ho',
    deliveryTimeSlot: 'Early Batch (06:00 - 07:00)',
    slicingPreference: 'sliced',
    items: [
      { productId: 'tea-bread', productName: 'Tea Bread', quantity: 2, price: 10 },
      { productId: 'butter-bread', productName: 'Butter Bread', quantity: 1, price: 15 }
    ],
    subtotal: 35,
    deliveryFee: 10,
    total: 45,
    status: 'Completed',
    paymentMethod: 'WhatsApp Order'
  }
];

export const BAKERY_INFO = {
  name: 'Golden Loaf Bakery',
  tagline: 'Fresh Bread. Every Morning.',
  description: 'Deliciously baked Ghanaian bread made fresh for your family with tradition, love, and fine ingredients.',
  phone: '+233 24 555 0192',
  whatsapp: '233245550192',
  email: 'orders@goldenloafbakery.com',
  address: 'Commercial Road, Near Ho Central Market, Volta Region, Ghana',
  branch: 'Pick-up depot: Spintex Road (Opposite Shell Station), Accra',
  hoursWeekday: '5:30 AM – 8:30 PM',
  hoursSunday: '6:00 AM – 7:30 PM',
  morningBatchTime: '05:30 AM',
  afternoonBatchTime: '02:00 PM'
};
