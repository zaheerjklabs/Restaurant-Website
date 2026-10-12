import React, { useState, useEffect } from 'react';
import { TIME_SLOTS, SEATING_OPTIONS, RESTAURANT_INFO } from '../../data/restaurantData';
import { ConfirmedReservation, ReservationFormData } from '../../types';
import { TableFloorPlanSelector } from './TableFloorPlanSelector';
import { useToast } from '../../context/ToastContext';
import { Calendar, Users, Clock, MapPin, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface ReservationSectionProps {
  onReservationConfirmed: (res: ConfirmedReservation) => void;
  presetExperience?: string | null;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationConfirmed,
  presetExperience,
}) => {
  const { showToast } = useToast();

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    email: '',
    phone: '',
    date: todayStr,
    time: '7:00 PM',
    guests: 2,
    seatingArea: 'hearthside',
    selectedTableId: 'T-101',
    diningExperience: (presetExperience as any) || 'standard',
    specialRequests: '',
    dietaryNotes: '',
  });

  useEffect(() => {
    if (presetExperience) {
      setFormData(prev => ({
        ...prev,
        diningExperience: presetExperience as any,
        specialRequests: prev.specialRequests || `Requested ${presetExperience === 'tasting-7' ? '7-Course Grand Reserve Degustation' : '5-Course Terra & Mare Tasting Menu'}`
      }));
    }
  }, [presetExperience]);

  const [errors, setErrors] = useState<Partial<Record<keyof ReservationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ReservationFormData, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^[\d\s+\-()]{7,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a reservation date';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Reservation date cannot be in the past';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a dining time';
    }

    if (formData.guests < 1 || formData.guests > 16) {
      newErrors.guests = 'Party size must be between 1 and 16 guests';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Incomplete Form', 'Please review the highlighted reservation fields', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `RES-${Math.floor(10000 + Math.random() * 90000)}`;
      const confirmed: ConfirmedReservation = {
        ...formData,
        id: `res-${Date.now()}`,
        confirmationCode: code,
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onReservationConfirmed(confirmed);
      showToast('Table Reserved!', `Confirmation reference ${code} sent to ${formData.email}`);
    }, 850);
  };

  return (
    <section id="reservations" className="py-20 lg:py-28 bg-[#FFFFFF] border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context, Atmosphere & Seating Guide */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
                  Table Service & Reservations
                </span>
                <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171714] tracking-tight">
                Your Table Is Waiting
              </h2>

              <p className="text-sm sm:text-base text-[#77766F] mt-4 leading-relaxed">
                Whether celebrating an anniversary, reserving our multi-course tasting journey, 
                or enjoying an intimate evening, our dining room provides an unhurried, gracious sanctuary.
              </p>
            </div>

            {/* Dining Experience Choice */}
            <div className="space-y-3 pt-4 border-t border-stone-200/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171714]">
                Select Dining Experience
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: 'À La Carte', sub: 'Seasonal dishes' },
                  { id: 'tasting-5', label: '5-Course', sub: 'Terra & Mare' },
                  { id: 'tasting-7', label: '7-Course', sub: 'Grand Reserve' },
                ].map((exp) => (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, diningExperience: exp.id as any })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      formData.diningExperience === exp.id
                        ? 'border-[#E96A24] bg-[#FAF8F3] font-bold text-[#171714]'
                        : 'border-stone-200 text-stone-600 hover:border-stone-300'
                    }`}
                  >
                    <div className="text-xs">{exp.label}</div>
                    <div className="text-[10px] text-stone-400 font-normal mt-0.5">{exp.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Seating Room Highlights */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171714]">
                Choose Seating Atmosphere
              </h3>

              <div className="space-y-2.5">
                {SEATING_OPTIONS.map((area) => (
                  <div 
                    key={area.id}
                    onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      formData.seatingArea === area.id
                        ? 'border-[#E96A24] bg-[#FAF8F3] shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-[#171714]">
                      <span>{area.name}</span>
                      {formData.seatingArea === area.id && (
                        <span className="text-[#E96A24] text-[11px] font-medium">Selected</span>
                      )}
                    </div>
                    <p className="text-[#77766F] mt-0.5 text-[11px]">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact for Large Parties */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-[#77766F] space-y-1">
              <p className="font-semibold text-[#171714]">
                Parties of 8 or more?
              </p>
              <p>
                Please contact our private dining concierge directly at{' '}
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-[#E96A24] underline">
                  {RESTAURANT_INFO.phoneFormatted}
                </a>{' '}
                for bespoke multi-course menus.
              </p>
            </div>

          </div>

          {/* Right Column: Reservation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F3] rounded-2xl p-6 sm:p-10 border border-stone-200/90 shadow-lg">
              
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Guest Details Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Lady Katherine Sterling"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border ${
                        errors.fullName ? 'border-rose-400 ring-1 ring-rose-400' : 'border-stone-200'
                      } focus:outline-none focus:border-[#E96A24]`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. katherine@example.com"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border ${
                        errors.email ? 'border-rose-400 ring-1 ring-rose-400' : 'border-stone-200'
                      } focus:outline-none focus:border-[#E96A24]`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Phone & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Telephone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +44 7911 123456"
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border ${
                        errors.phone ? 'border-rose-400 ring-1 ring-rose-400' : 'border-stone-200'
                      } focus:outline-none focus:border-[#E96A24]`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-[#E96A24] cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                      <Users className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Reservation Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={todayStr}
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border ${
                          errors.date ? 'border-rose-400 ring-1 ring-rose-400' : 'border-stone-200'
                        } focus:outline-none focus:border-[#E96A24]`}
                      />
                    </div>
                    {errors.date && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                      Seating Time *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-[#E96A24] cursor-pointer"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      <Clock className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Visual Table Floor Plan Selector */}
                <TableFloorPlanSelector
                  selectedTableId={formData.selectedTableId}
                  onSelectTable={(tableId) => setFormData({ ...formData, selectedTableId: tableId })}
                  guestCount={formData.guests}
                />

                {/* Special Requests or Dietary Restrictions */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 mb-1.5">
                    Special Occasion or Dietary Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. Birthday anniversary, quiet corner table preferred, gluten allergy..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-lg border border-stone-200 focus:outline-none focus:border-[#E96A24]"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 text-xs font-bold uppercase tracking-wider text-white bg-[#E96A24] hover:bg-[#D35817] disabled:opacity-60 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Checking Table Availability...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Table Reservation</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-stone-500">
                  Instant confirmation code will be generated. No credit card charge for reservations.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
