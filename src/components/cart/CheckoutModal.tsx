import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useCurrency } from '../../context/CurrencyContext';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { ActiveOrder } from '../../types';
import { X, CheckCircle, ShieldCheck, Clock, MapPin, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced?: (order: ActiveOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderPlaced }) => {
  const { cart, subtotal, discount, tax, deliveryFee, total, orderType, clearCart } = useCart();
  const { showToast } = useToast();
  const { formatPrice } = useCurrency();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [tableNumber, setTableNumber] = useState('7');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cash'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<ActiveOrder | null>(null);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim()) {
      showToast('Missing Contact Info', 'Please enter your name, email, and phone', 'error');
      return;
    }

    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      showToast('Address Required', 'Please enter your delivery street address', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: ActiveOrder = {
        id: `order-${Date.now()}`,
        orderNumber,
        customerName,
        customerEmail,
        orderType,
        items: [...cart],
        subtotal,
        discount,
        tax,
        deliveryFee,
        total,
        status: 'received',
        estimatedMinutesLeft: orderType === 'delivery' ? 32 : 20,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsProcessing(false);
      setOrderConfirmed(newOrder);
      if (onOrderPlaced) {
        onOrderPlaced(newOrder);
      }
      clearCart();
      showToast('Order Received!', `Order ${orderNumber} is being prepared at the hearth.`);
    }, 1100);
  };

  const handleFinish = () => {
    setOrderConfirmed(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {orderConfirmed ? (
          /* Order Confirmation Screen */
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-bold tracking-wider mb-2">
                {orderConfirmed.orderNumber}
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#171714]">
                Order Confirmed & In Preparation
              </h2>
              <p className="text-xs text-[#77766F] mt-1 max-w-sm mx-auto">
                Thank you, {orderConfirmed.customerName}! Our culinary brigade has received your order.
              </p>
            </div>

            {/* Preparation Timeline */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-3">
              <div className="flex items-center justify-between text-stone-700">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#E96A24]" />
                  <span>Estimated Kitchen Dispatch:</span>
                </span>
                <span className="font-bold text-[#171714]">{orderConfirmed.estimatedMinutesLeft} Minutes</span>
              </div>
              <div className="flex items-center justify-between text-stone-700">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#243C24]" />
                  <span>Service Method:</span>
                </span>
                <span className="font-bold capitalize text-[#171714]">{orderConfirmed.orderType}</span>
              </div>
              <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-[#171714]">
                <span>Total Paid:</span>
                <span className="tabular-nums font-serif">{formatPrice(orderConfirmed.total)}</span>
              </div>
            </div>

            {/* Demo Notice */}
            <p className="text-[11px] text-stone-400 italic">
              *Demo transaction simulation. No live payment provider charged.
            </p>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-xl transition-colors shadow-sm"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="bg-[#171714] text-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wider uppercase mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Checkout Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Complete Your Order
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                {RESTAURANT_INFO.name} Kitchen · {orderType === 'delivery' ? 'Priority Courier Delivery' : 'Table / Counter Service'}
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-5 max-h-[65vh] overflow-y-auto">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Guest Contact
                </h3>

                <div>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name *"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E96A24]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E96A24]"
                  />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Telephone Number *"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E96A24]"
                  />
                </div>
              </div>

              {/* Delivery Address or Table Number */}
              {orderType === 'delivery' ? (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Delivery Address
                  </h3>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street Address, Flat/Apartment, Postal Code..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#E96A24]"
                  />
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Dining In Table Preference
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-stone-600">Table Number (if seated):</span>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. 7"
                      className="w-24 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-center font-bold"
                    />
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Select Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-[#E96A24] bg-[#E96A24]/5 text-[#171714] font-bold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('applepay')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      paymentMethod === 'applepay'
                        ? 'border-[#E96A24] bg-[#E96A24]/5 text-[#171714] font-bold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    Apple Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      paymentMethod === 'cash'
                        ? 'border-[#E96A24] bg-[#E96A24]/5 text-[#171714] font-bold'
                        : 'border-stone-200 text-stone-600'
                    }`}
                  >
                    Pay at Table
                  </button>
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Items ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span className="tabular-nums font-semibold text-stone-800">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="tabular-nums font-semibold">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax & Packaging</span>
                  <span className="tabular-nums text-stone-800">{formatPrice(tax + deliveryFee)}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-[#171714]">
                  <span>Total Amount</span>
                  <span className="tabular-nums font-serif">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] disabled:opacity-60 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Order to Kitchen...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order · {formatPrice(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
