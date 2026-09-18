import React, { useState } from 'react';
import { Plus, Minus, Check, Flame, ShoppingBag } from 'lucide-react';
import { BreadProduct } from '../types';

interface ProductCardProps {
  product: BreadProduct;
  onAddToCart: (product: BreadProduct, quantity: number) => void;
  onQuickOrder?: (product: BreadProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickOrder,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, 50));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <div
      id={`product-${product.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 w-full overflow-hidden bg-amber-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-900/90 text-amber-100 backdrop-blur-xs">
              {product.category}
            </span>
            {product.popular && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-950 shadow-xs">
                <Flame className="w-3 h-3 fill-amber-950" />
                Popular Choice
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[11px] font-medium text-stone-700 shadow-xs">
            {product.weight}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5">
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl font-bold text-amber-950 group-hover:text-amber-800 transition-colors">
              {product.name}
            </h3>
            <span className="text-xl font-black text-amber-800 shrink-0">
              GH₵{product.price}
            </span>
          </div>

          <p className="text-stone-600 text-sm line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-amber-50/70 border border-amber-900/5 rounded-xl p-2.5 mb-4 text-xs text-amber-900/90">
            <span className="font-semibold text-amber-950">Serving tip: </span>
            {product.pairingNote}
          </div>
        </div>
      </div>

      {/* Card Footer / Actions */}
      <div className="p-5 pt-0 border-t border-stone-100 mt-auto">
        <div className="flex items-center justify-between gap-3 pt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shrink-0">
            <button
              onClick={handleDecrement}
              className="p-2 text-stone-600 hover:text-amber-950 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-stone-800 select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="p-2 text-stone-600 hover:text-amber-950 hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
              !product.inStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : !product.inStock ? (
              <span>Sold Out Today</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Order</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
