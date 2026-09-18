import React, { useState } from 'react';
import { 
  BarChart3, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Flame, 
  Truck, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  DollarSign, 
  Phone, 
  MessageCircle,
  Eye,
  AlertCircle
} from 'lucide-react';
import { CustomerOrder, BreadProduct } from '../types';
import { BAKERY_INFO } from '../data/mockData';

interface AdminPageProps {
  orders: CustomerOrder[];
  products: BreadProduct[];
  onUpdateOrderStatus: (orderId: string, status: CustomerOrder['status']) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onToggleProductStock: (productId: string) => void;
  onAddProduct: (newProduct: BreadProduct) => void;
  onDeleteProduct: (productId: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  orders,
  products,
  onUpdateOrderStatus,
  onUpdateProductPrice,
  onToggleProductStock,
  onAddProduct,
  onDeleteProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orderFilter, setOrderFilter] = useState<'All' | 'Pending' | 'Baking' | 'Completed'>('All');
  
  // Price editing state
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  // New product modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBread, setNewBread] = useState({
    name: '',
    category: 'Classic' as BreadProduct['category'],
    price: 15,
    description: '',
    pairingNote: 'Best enjoyed warm with tea or butter.',
    weight: '450g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    ingredients: 'Flour, Water, Butter, Sugar, Yeast, Salt',
  });

  // Calculate stats
  const totalOrdersCount = orders.length + 21; // include previous morning orders
  const todaySales = orders.reduce((sum, o) => sum + o.total, 1165); // baseline morning sales
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Baking').length + 5;
  const completedOrdersCount = orders.filter((o) => o.status === 'Completed').length + 16;

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'All') return true;
    if (orderFilter === 'Pending') return o.status === 'Pending';
    if (orderFilter === 'Baking') return o.status === 'Baking';
    if (orderFilter === 'Completed') return o.status === 'Completed';
    return true;
  });

  const handleStartEditPrice = (product: BreadProduct) => {
    setEditingPriceId(product.id);
    setTempPrice(product.price);
  };

  const handleSavePrice = (productId: string) => {
    if (tempPrice > 0) {
      onUpdateProductPrice(productId, tempPrice);
    }
    setEditingPriceId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBread.name || newBread.price <= 0) return;

    const created: BreadProduct = {
      id: `bread-${Date.now()}`,
      name: newBread.name,
      category: newBread.category,
      price: Number(newBread.price),
      description: newBread.description || 'Freshly baked artisanal loaf.',
      pairingNote: newBread.pairingNote,
      weight: newBread.weight,
      inStock: true,
      popular: false,
      image: newBread.image,
      ingredients: newBread.ingredients.split(',').map((s) => s.trim()),
    };

    onAddProduct(created);
    setShowAddModal(false);
    setNewBread({
      name: '',
      category: 'Classic',
      price: 15,
      description: '',
      pairingNote: 'Best enjoyed warm with tea or butter.',
      weight: '450g',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      ingredients: 'Flour, Water, Butter, Sugar, Yeast, Salt',
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-amber-900/10 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            Bakery Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-amber-950">
            Golden Loaf Admin Dashboard
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Monitor real-time orders, manage oven batches, and update bread pricing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-amber-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            Bread Inventory ({products.length})
          </button>
        </div>
      </div>

      {/* 4 Core Metrics Cards from Phase 10 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Today's Orders */}
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Today's Orders
            </p>
            <p className="font-serif text-3xl font-bold text-stone-900 mt-1">
              {totalOrdersCount}
            </p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              +6 new in last 2 hours
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Today's Sales */}
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Today's Sales
            </p>
            <p className="font-serif text-3xl font-bold text-amber-900 mt-1">
              GH₵{todaySales.toLocaleString()}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Cedis collected & pending
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Pending / In Oven
            </p>
            <p className="font-serif text-3xl font-bold text-amber-600 mt-1">
              {pendingOrdersCount}
            </p>
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              Awaiting packaging or bake
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-6 rounded-2xl border border-amber-900/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Completed Orders
            </p>
            <p className="font-serif text-3xl font-bold text-emerald-700 mt-1">
              {completedOrdersCount}
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Delivered or picked up
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tab 1: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="font-serif text-2xl font-bold text-amber-950">
              Customer Orders Queue
            </h2>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              {(['All', 'Pending', 'Baking', 'Completed'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    orderFilter === filter
                      ? 'bg-amber-800 text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300 text-stone-500 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-stone-300" />
                <p className="font-semibold text-stone-800">No orders under this filter.</p>
                <p className="text-xs">New online and WhatsApp orders will appear here automatically.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  {/* Order Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-bold bg-amber-100 text-amber-950 px-2.5 py-1 rounded-md">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-stone-400">• {order.createdAt}</span>

                      {/* Status Tag */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          order.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : order.status === 'Baking'
                            ? 'bg-orange-100 text-orange-800'
                            : order.status === 'Out for Delivery'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </span>

                      <span className="text-xs px-2 py-0.5 rounded bg-stone-100 text-stone-600 capitalize">
                        {order.deliveryMethod} ({order.deliveryTown})
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-stone-500 block">Customer:</span>
                        <strong className="text-stone-900 text-sm font-serif">
                          {order.customerName}
                        </strong>
                        <div className="flex items-center gap-2 mt-1">
                          <a
                            href={`tel:${order.customerPhone}`}
                            className="text-amber-800 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{order.customerPhone}</span>
                          </a>
                          <a
                            href={`https://wa.me/233${order.customerPhone.replace(/[^0-9]/g, '').replace(/^0/, '')}?text=Hello%20${order.customerName},%20Golden%20Loaf%20Bakery%20updating%20you%20on%20order%20${order.orderNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-700 hover:text-emerald-800"
                            title="Message on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>

                      <div>
                        <span className="text-stone-500 block">Location / Address:</span>
                        <p className="text-stone-800 font-medium">{order.deliveryLocation}</p>
                        <p className="text-stone-500 mt-0.5">Time: {order.deliveryTimeSlot}</p>
                      </div>

                      <div>
                        <span className="text-stone-500 block">Preferences:</span>
                        <p className="text-stone-800 font-medium capitalize">
                          Slicing: {order.slicingPreference}
                        </p>
                        <p className="text-stone-500">Payment: {order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Items Ordered */}
                    <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-stone-500">Items:</span>
                      {order.items.map((i, idx) => (
                        <span
                          key={idx}
                          className="bg-[#faf7f2] border border-amber-900/10 px-2 py-0.5 rounded text-xs text-stone-800 font-medium"
                        >
                          {i.quantity} × {i.productName}
                        </span>
                      ))}
                      {order.notes && (
                        <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded italic">
                          Note: "{order.notes}"
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Total & Action Buttons */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100">
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-stone-500 block">Total</span>
                      <span className="font-serif text-2xl font-black text-amber-900">
                        GH₵{order.total}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {order.status === 'Pending' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Baking')}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>Start Baking</span>
                        </button>
                      )}

                      {order.status === 'Baking' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Out for Delivery')}
                          className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Dispatch</span>
                        </button>
                      )}

                      {(order.status === 'Pending' || order.status === 'Baking' || order.status === 'Out for Delivery') && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Completed')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Complete</span>
                        </button>
                      )}

                      {order.status === 'Completed' && (
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Fulfilled</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Products & Price Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-amber-950">
                Bakery Bread Catalog & Pricing
              </h2>
              <p className="text-xs text-stone-500">
                Update bread prices, mark loaves out of stock, or introduce new recipes
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Bread Recipe</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-3xl border border-amber-900/10 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-stone-700">
                <thead className="bg-[#faf7f2] border-b border-amber-900/10 text-xs uppercase font-bold text-amber-950">
                  <tr>
                    <th className="p-4">Bread Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price (GH₵)</th>
                    <th className="p-4">Weight</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-stone-100 shrink-0"
                        />
                        <div>
                          <p className="font-serif font-bold text-amber-950">{product.name}</p>
                          <p className="text-xs text-stone-500 line-clamp-1">{product.description}</p>
                        </div>
                      </td>

                      <td className="p-4 text-xs font-semibold">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {product.category}
                        </span>
                      </td>

                      <td className="p-4 font-bold text-amber-900 text-base">
                        {editingPriceId === product.id ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">GH₵</span>
                            <input
                              type="number"
                              min="1"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-16 px-2 py-1 border border-amber-500 rounded text-sm focus:outline-none"
                            />
                            <button
                              onClick={() => handleSavePrice(product.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer"
                              title="Save Price"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>GH₵{product.price}</span>
                            <button
                              onClick={() => handleStartEditPrice(product)}
                              className="text-stone-400 hover:text-amber-800 p-1 cursor-pointer"
                              title="Edit Price"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-xs text-stone-600">{product.weight}</td>

                      <td className="p-4">
                        <button
                          onClick={() => onToggleProductStock(product.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                            product.inStock
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                          }`}
                        >
                          {product.inStock ? 'In Stock (Hot)' : 'Sold Out Today'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="text-stone-400 hover:text-red-600 p-2 transition-colors cursor-pointer"
                          title="Delete Recipe"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add New Bread Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-900/10 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <h3 className="font-serif text-xl font-bold text-amber-950">
                Add New Bread Loaf
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Bread Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newBread.name}
                    onChange={(e) => setNewBread({ ...newBread, name: e.target.value })}
                    placeholder="e.g. Milk & Honey Loaf"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Price (GH₵)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newBread.price}
                    onChange={(e) => setNewBread({ ...newBread, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newBread.category}
                    onChange={(e) => setNewBread({ ...newBread, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm bg-white"
                  >
                    <option value="Classic">Classic</option>
                    <option value="Sweet">Sweet</option>
                    <option value="Family">Family</option>
                    <option value="Specialty">Specialty</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                    Loaf Weight
                  </label>
                  <input
                    type="text"
                    value={newBread.weight}
                    onChange={(e) => setNewBread({ ...newBread, weight: e.target.value })}
                    placeholder="e.g. 500g"
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newBread.description}
                  onChange={(e) => setNewBread({ ...newBread, description: e.target.value })}
                  placeholder="Delicious golden-baked crust with soft tender crumb..."
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={newBread.image}
                  onChange={(e) => setNewBread({ ...newBread, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold cursor-pointer"
                >
                  Create Bread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
