import React, { useState } from 'react';
import { PRIVATE_DINING_ROOMS } from '../../data/tastingMenuData';
import { useToast } from '../../context/ToastContext';
import { X, Users, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';

interface PrivateDiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateDiningModal: React.FC<PrivateDiningModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();

  const [selectedRoom, setSelectedRoom] = useState(PRIVATE_DINING_ROOMS[0].id);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Executive Dinner');
  const [guestCount, setGuestCount] = useState(10);
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !eventDate) {
      showToast('Incomplete Inquiry', 'Please complete the required contact and date fields', 'error');
      return;
    }

    const ref = `EVT-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRef(ref);
    showToast('Inquiry Received', `Our Private Events Concierge will contact you within 24 hours. Ref: ${ref}`);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close private events modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>

            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-mono font-bold tracking-wider mb-2">
                {submittedRef}
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#171714]">
                Private Event Inquiry Confirmed
              </h2>
              <p className="text-xs text-[#77766F] max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, {fullName}. Our Private Dining Director will prepare a customized multi-course proposal and wine selection for your review.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-[#243C24] text-white p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Private Dining & Celebrations</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold">
                Host Your Event at Maison L'Ambre
              </h2>
              <p className="text-xs text-stone-300 mt-1">
                Intimate wine vault dinners, glasshouse cocktail soirees, and full restaurant buyouts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Event Spaces Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
                  Select Event Space
                </label>
                <div className="space-y-2.5">
                  {PRIVATE_DINING_ROOMS.map((room) => {
                    const isSelected = selectedRoom === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                          isSelected
                            ? 'border-[#243C24] bg-[#243C24]/5 shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-stone-800">
                          <span className="font-serif">{room.name}</span>
                          <span className="text-[#243C24] font-semibold">{room.capacity}</span>
                        </div>
                        <p className="text-stone-500 mt-1 text-[11px] leading-relaxed">
                          {room.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Telephone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 ..."
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Occasion
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                  >
                    <option value="Executive Dinner">Executive Dinner</option>
                    <option value="Wedding Reception">Wedding Reception</option>
                    <option value="Birthday / Anniversary">Birthday / Anniversary</option>
                    <option value="Brand Launch">Brand Launch</option>
                    <option value="Cocktail Gala">Cocktail Gala</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                  Specific Requests & Vision (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Wine pairing preferences, dietary allergies, speech setup..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-[#243C24]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#243C24] hover:bg-[#1b2d1b] rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit Private Event Inquiry</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
