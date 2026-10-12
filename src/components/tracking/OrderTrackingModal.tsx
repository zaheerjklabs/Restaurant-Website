import React, { useState, useEffect } from 'react';
import { ActiveOrder } from '../../types';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Clock, Flame, CheckCircle2, Phone, Utensils, Bike } from 'lucide-react';
import { RESTAURANT_INFO } from '../../data/restaurantData';

interface OrderTrackingModalProps {
  order: ActiveOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const { formatPrice } = useCurrency();
  const [minutesLeft, setMinutesLeft] = useState(order?.estimatedMinutesLeft || 22);

  useEffect(() => {
    if (!isOpen || !order) return;
    const interval = setInterval(() => {
      setMinutesLeft((prev) => Math.max(1, prev - 1));
    }, 15000); // simulated quick progression
    return () => clearInterval(interval);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const steps = [
    { title: 'Order Received', desc: 'Concierge validated', icon: CheckCircle2, active: true },
    { title: 'Hearth Ember Fired', desc: 'Roasting at 800°F', icon: Flame, active: minutesLeft <= 20 },
    { title: 'Artisanal Plating', desc: 'Chef garnish & inspection', icon: Utensils, active: minutesLeft <= 8 },
    { title: 'Ready for Service', desc: order.orderType === 'delivery' ? 'Courier en route' : 'Table dispatch', icon: Bike, active: minutesLeft <= 2 },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close tracking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-[#171714] text-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold tracking-wider text-amber-400">
              {order.orderNumber}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-stone-200 capitalize">
              {order.orderType}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Live Kitchen Order Tracking
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Preparing for {order.customerName} · Hearth Station 2
          </p>
        </div>

        {/* Live Timer Pill */}
        <div className="p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E96A24]/10 text-[#E96A24] flex items-center justify-center animate-pulse">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Estimated Time Remaining
              </div>
              <div className="text-lg font-bold font-serif text-[#171714] tabular-nums">
                ~ {minutesLeft} Minutes
              </div>
            </div>
          </div>

          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-medium text-stone-700 hover:bg-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E96A24]" />
            <span>Kitchen Desk</span>
          </a>
        </div>

        {/* Stepper Progress */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative pl-6 space-y-6 border-l-2 border-stone-200">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white ${
                    step.active
                      ? 'border-[#E96A24] text-[#E96A24]'
                      : 'border-stone-300 text-stone-400'
                  }`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${
                      step.active ? 'text-[#171714]' : 'text-stone-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#77766F] mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Items Summary Accordion */}
          <div className="pt-4 border-t border-stone-100">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Dishes in Preparation ({order.items.reduce((a, b) => a + b.quantity, 0)})
            </div>
            <div className="space-y-1 text-xs text-stone-700">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.item.name}</span>
                  <span className="font-semibold tabular-nums">{formatPrice(item.itemTotal)}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-sm text-[#171714]">
                <span>Total Paid</span>
                <span className="font-serif tabular-nums">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
