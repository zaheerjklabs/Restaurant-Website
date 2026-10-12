import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { useToast } from '../../context/ToastContext';
import { X, Plus, Minus, Trash2, ArrowRight, Tag, Utensils, Bike } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
    tax,
    deliveryFee,
    total,
    orderType,
    setOrderType,
  } = useCart();

  const { formatPrice } = useCurrency();
  const { showToast } = useToast();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscountCode(promoInput);
    if (res.success) {
      setPromoError('');
      setPromoInput('');
      showToast('Promo Code Applied', res.message);
    } else {
      setPromoError(res.message);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F3]">
            <div className="flex items-center gap-2">
              <h2 id="cart-drawer-heading" className="text-lg font-serif font-bold text-[#171714]">
                Your Culinary Order
              </h2>
              <span className="text-xs text-[#77766F] tabular-nums font-semibold">
                ({cart.reduce((a, b) => a + b.quantity, 0)} {cart.reduce((a, b) => a + b.quantity, 0) === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dining Type Selector */}
          <div className="px-5 py-3 bg-stone-50 border-b border-stone-200 flex items-center gap-2">
            <button
              onClick={() => setOrderType('dinein')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                orderType === 'dinein'
                  ? 'bg-white shadow-xs text-[#171714] border border-stone-200'
                  : 'text-[#77766F] hover:text-[#171714]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Table / Pickup</span>
            </button>

            <button
              onClick={() => setOrderType('delivery')}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                orderType === 'delivery'
                  ? 'bg-white shadow-xs text-[#171714] border border-stone-200'
                  : 'text-[#77766F] hover:text-[#171714]'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Priority Delivery</span>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-300">
                  <Utensils className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#171714] mb-1">
                  Your Cart Is Empty
                </h3>
                <p className="text-xs text-[#77766F] max-w-xs mb-6">
                  Explore our seasonal menu and add your favorite wood-fired dishes, fresh pastas, and cellar wines.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-lg transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div 
                      key={item.id}
                      className="flex gap-3.5 p-3.5 rounded-xl border border-stone-200 bg-white shadow-xs"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <ImageWithFallback
                          src={item.item.image}
                          alt={item.item.name}
                          fallbackTitle={item.item.name}
                          fallbackGradient={item.item.fallbackGradient}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-serif font-bold text-[#171714] truncate">
                              {item.item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-stone-400 hover:text-rose-500 p-0.5 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Selected Portion or Addons */}
                          {item.selectedPortion && item.selectedPortion.priceDelta !== 0 && (
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              Portion: {item.selectedPortion.name}
                            </p>
                          )}

                          {item.selectedAddons && item.selectedAddons.length > 0 && (
                            <p className="text-[11px] text-stone-500 truncate mt-0.5">
                              + {item.selectedAddons.map(a => a.name).join(', ')}
                            </p>
                          )}

                          {item.specialInstructions && (
                            <p className="text-[10px] text-stone-400 italic mt-0.5 line-clamp-1">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                        </div>

                        {/* Quantity controls and price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-stone-200 rounded-md p-0.5 bg-stone-50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-stone-800 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-stone-500 hover:text-stone-800 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold font-serif text-[#171714] tabular-nums">
                            {formatPrice(item.itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="text-right pt-1">
                  <button
                    onClick={() => {
                      clearCart();
                      showToast('Cart Cleared', 'All dishes have been removed', 'info');
                    }}
                    className="text-[11px] text-stone-400 hover:text-rose-500 transition-colors underline"
                  >
                    Clear all items
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-[#FAF8F3] space-y-4">
              
              {/* Promo Code Input */}
              {discountCode ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Promo <strong>{discountCode}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-stone-500 hover:text-rose-600 text-xs font-medium underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError('');
                      }}
                      placeholder="Promo code (e.g. LAMBRE20)"
                      className="flex-1 px-3 py-2 text-xs bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-[#E96A24]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-500">{promoError}</p>
                  )}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#77766F] pt-2 border-t border-stone-200/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171714] tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Savings</span>
                    <span className="font-semibold tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Packaging & Courier</span>
                    <span className="font-medium text-[#171714] tabular-nums">
                      {deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-medium text-[#171714] tabular-nums">{formatPrice(tax)}</span>
                </div>

                <div className="flex justify-between text-base font-bold font-serif text-[#171714] pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
