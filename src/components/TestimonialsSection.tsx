import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TestimonialsSection: React.FC = () => {
  const { language } = useShop();

  const reviews = [
    {
      author: 'Dr. Keerthi Varma',
      city: 'Hyderabad, Telangana',
      occasion: 'Bridal Muhurtham Pattu',
      saree: 'Swarna Kamalam Kanchipuram (GC-KP-801)',
      rating: 5,
      date: 'September 2026',
      quote:
        'I ordered my muhurtham saree via WhatsApp after seeing their video demonstration. When the saree arrived, the gold zari glow and the weight of pure silk surpassed my expectations. Everyone at my wedding asked where I purchased it!',
    },
    {
      author: 'Sunita Aggarwal',
      city: 'New Delhi',
      occasion: 'Daughter’s Wedding Reception',
      saree: 'Shahi Kadhwa Banarasi (GC-BN-504)',
      rating: 5,
      date: 'August 2026',
      quote:
        'The Kadhwa weave is genuinely authentic with zero loose threads underneath. Ordering directly on WhatsApp was effortless, and the team shared multiple close-up videos under daylight. Exceptional boutique service.',
    },
    {
      author: 'Aparna Nair',
      city: 'Bangalore, Karnataka',
      occasion: 'Housewarming & Puja',
      saree: 'Pasupu Haldi Kanchi Pattu (GC-KP-420)',
      rating: 5,
      date: 'July 2026',
      quote:
        'The mustard yellow with deep maroon double temple border was stunning for our puja. The fall and pico stitching were done perfectly as requested in the WhatsApp order notes. Truly grateful to Gundamma Collections.',
    },
  ];

  return (
    <section className="py-16 bg-amber-50/40 dark:bg-[#14080e] border-y border-amber-900/10 dark:border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 font-royal">
            {language === 'te'
              ? 'సంతృప్తి చెందిన కస్టమర్ల మాటలు'
              : language === 'hi'
              ? 'प्रसन्न ग्राहकों के अनुभव'
              : 'Voices of Royal Grace'}
          </p>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">
            {language === 'te'
              ? '15,000+ కుటుంబాల విశ్వాసం'
              : language === 'hi'
              ? '15,000+ परिवारों का अटूट विश्वास'
              : 'Trusted Across 15,000+ Auspicious Weddings'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans-clean">
            Hear from our discerning patrons who cherish the authenticity of pure handloom silk and direct weaver craftsmanship.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1b0d14] border border-amber-900/10 dark:border-amber-500/15 rounded-lg p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-600/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {rev.date}
                  </span>
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 italic font-serif leading-relaxed">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-stone-100">
                    {rev.author}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Buyer
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  {rev.city} · {rev.occasion}
                </p>
                <p className="text-[10px] text-amber-800 dark:text-amber-400 font-mono font-medium truncate">
                  {rev.saree}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
