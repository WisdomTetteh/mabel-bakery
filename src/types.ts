export interface BreadProduct {
  id: string;
  name: string;
  category: 'Classic' | 'Sweet' | 'Family' | 'Specialty';
  price: number; // in Ghana Cedis (GH₵)
  description: string;
  pairingNote: string;
  weight: string;
  inStock: boolean;
  image: string;
  popular?: boolean;
  ingredients: string[];
}

export interface CartItem {
  product: BreadProduct;
  quantity: number;
}

export type DeliveryMethod = 'delivery' | 'pickup';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryMethod: DeliveryMethod;
  deliveryLocation: string;
  deliveryTown: string;
  deliveryTimeSlot: string;
  slicingPreference: 'unsliced' | 'sliced' | 'half-sliced';
  notes?: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'Pending' | 'Baking' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'Mobile Money (MoMo)' | 'WhatsApp Order';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  favoriteBread: string;
}
