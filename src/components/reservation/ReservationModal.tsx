import React from 'react';
import { ConfirmedReservation } from '../../types';
import { RESTAURANT_INFO, SEATING_OPTIONS } from '../../data/restaurantData';
import { RESTAURANT_TABLES } from '../../data/tastingMenuData';
import { X, CheckCircle, Calendar, Users, Clock, MapPin, Share2, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ReservationModalProps {
  confirmedReservation: ConfirmedReservation | null;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  confirmedReservation,
  onClose,
}) => {
  const { showToast } = useToast();

  if (!confirmedReservation) return null;

  const seatingName = SEATING_OPTIONS.find(s => s.id === confirmedReservation.seatingArea)?.name || 'Main Dining Room';
  const tableName = RESTAURANT_TABLES.find(t => t.id === confirmedReservation.selectedTableId)?.name;

  const experienceLabel = 
    confirmedReservation.diningExperience === 'tasting-7'
      ? '7-Course Grand Reserve Degustation'
      : confirmedReservation.diningExperience === 'tasting-5'
      ? '5-Course Terra & Mare Tasting Menu'
      : 'Seasonal À La Carte Dining';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(confirmedReservation.confirmationCode);
    showToast('Copied to Clipboard', `Reference: ${confirmedReservation.confirmationCode}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmed-modal-title"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close confirmation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Card */}
        <div className="bg-[#243C24] text-white p-8 text-center relative overflow-hidden">
          <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
            <CheckCircle className="w-8 h-8 text-[#E96A24]" />
          </div>
          <h2 id="confirmed-modal-title" className="text-2xl font-serif font-bold tracking-tight">
            Reservation Confirmed
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            We are honored to welcome you to {RESTAURANT_INFO.name}
          </p>

          {/* Reference badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 text-xs">
            <span className="text-stone-300">Booking Reference:</span>
            <span className="font-mono font-bold tracking-wider text-amber-300">
              {confirmedReservation.confirmationCode}
            </span>
          </div>
        </div>

        {/* Reservation Breakdown */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Experience tag */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2.5 text-xs text-amber-900 font-medium">
            <Sparkles className="w-4 h-4 text-[#E96A24] shrink-0" />
            <span>Reserved Experience: <strong>{experienceLabel}</strong></span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <div className="text-stone-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Date</span>
              </div>
              <div className="font-semibold text-stone-800 text-sm">
                {new Date(confirmedReservation.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <div className="text-stone-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Time</span>
              </div>
              <div className="font-semibold text-stone-800 text-sm">
                {confirmedReservation.time}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <div className="text-stone-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Party Size</span>
              </div>
              <div className="font-semibold text-stone-800 text-sm">
                {confirmedReservation.guests} {confirmedReservation.guests === 1 ? 'Guest' : 'Guests'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-stone-50 border border-stone-100 space-y-1">
              <div className="text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Seating & Table</span>
              </div>
              <div className="font-semibold text-stone-800 text-sm truncate">
                {tableName ? `${tableName} (${seatingName})` : seatingName}
              </div>
            </div>
          </div>

          <div className="text-xs text-stone-600 border-t border-stone-100 pt-4 space-y-1">
            <p><strong>Primary Guest:</strong> {confirmedReservation.fullName}</p>
            <p><strong>Contact Email:</strong> {confirmedReservation.email}</p>
            <p><strong>Phone:</strong> {confirmedReservation.phone}</p>
            {confirmedReservation.specialRequests && (
              <p className="mt-2 text-stone-500 italic bg-stone-50 p-2.5 rounded border border-stone-200">
                "{confirmedReservation.specialRequests}"
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopyCode}
              className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Copy Reference</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
