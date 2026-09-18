import React, { useState, useEffect } from 'react';
import { BreadProduct, CartItem, CustomerOrder } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { AboutPage } from './pages/AboutPage';
import { OrderPage } from './pages/OrderPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'products' | 'about' | 'order' | 'contact' | 'admin'>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products state (persisted)
  const [products, setProducts] = useState<BreadProduct[]>(() => {
    const saved = localStorage.getItem('golden_loaf_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state (persisted as requested in Phase 5)
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('golden_loaf_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved cart', e);
      }
    }
    return [];
  });

  // Orders state (persisted for Admin Dashboard Phase 10)
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    const saved = localStorage.getItem('golden_loaf_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('golden_loaf_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist products to localStorage
  useEffect(() => {
    localStorage.setItem('golden_loaf_products', JSON.stringify(products));
  }, [products]);

  // Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem('golden_loaf_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (product: BreadProduct, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity} × ${product.name} to basket!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Handlers
  const handleSubmitOrder = (newOrder: CustomerOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Order ${newOrder.orderNumber} received by bakery!`);
  };

  // Admin Product & Order Handlers
  const handleUpdateOrderStatus = (
    orderId: string,
    status: CustomerOrder['status']
  ) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    showToast(`Order status updated to ${status}`);
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    showToast('Bread price updated!');
  };

  const handleToggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleAddProduct = (newProduct: BreadProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added ${newProduct.name} to bakery menu!`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Bread recipe deleted from catalog');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-stone-900 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-950 text-white px-4 py-3 rounded-2xl shadow-xl border border-amber-800/50 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            products={products}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'order' && (
          <OrderPage
            cart={cart}
            products={products}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onSubmitOrder={handleSubmitOrder}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'admin' && (
          <AdminPage
            orders={orders}
            products={products}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateProductPrice={handleUpdateProductPrice}
            onToggleProductStock={handleToggleProductStock}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </main>

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToOrder={() => {
          setActiveTab('order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}

