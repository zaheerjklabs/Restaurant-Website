import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      showToast('Invalid Email', 'Please enter a valid email address to subscribe', 'error');
      return;
    }

    setIsSubmitted(true);
    showToast('Subscribed!', 'Welcome to the Connoisseurs’ Circle. Check your inbox for your 20% tasting invitation.');
  };

  return (
    <section className="py-16 bg-[#FAF8F3] border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#E96A24]">
            Private Cellar & Culinary Journal
          </span>
          <span className="h-px w-6 bg-[#E96A24]/40" aria-hidden="true" />
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#171714] tracking-tight mb-3">
          Join the Connoisseurs' Circle
        </h2>

        <p className="text-sm text-[#77766F] max-w-lg mx-auto mb-8">
          Receive seasonal menu previews, invitations to private winemaker dinners, 
          and culinary reflections directly from Executive Chef Antoine Laurent.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-semibold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Thank you for subscribing. We look forward to welcoming you soon.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-10 pr-4 py-3 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-[#E96A24] focus:ring-1 focus:ring-[#E96A24]"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-white bg-[#171714] hover:bg-[#E96A24] rounded-xl transition-colors shadow-sm shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-3">
          We honor your privacy. Unsubscribe anytime with one click.
        </p>

      </div>
    </section>
  );
};
