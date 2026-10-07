import React from 'react';
import { Award, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeritageStory: React.FC = () => {
  const { language } = useShop();

  return (
    <section id="heritage-story" className="py-16 bg-white dark:bg-[#160a10] border-b border-amber-900/10 dark:border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Story Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-amber-900/20 dark:border-amber-500/20 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80"
                alt="Master Weavers Handcrafting Zari Saree"
                className="w-full h-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-black/60 backdrop-blur-sm border border-amber-500/20 text-white">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400">
                  Direct From Loom
                </span>
                <p className="font-serif text-sm font-semibold mt-1">
                  Over 400 weaver families supported through fair compensation and zero intermediary markups.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 font-royal">
                {language === 'te'
                  ? 'మా పరంపర మరియు సంకల్పం'
                  : language === 'hi'
                  ? 'हमारी बुनाई विरासत'
                  : 'The Gundamma Collections Philosophy'}
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-100">
                {language === 'te'
                  ? 'కళాకారుడి ప్రతి దారానికి న్యాయం'
                  : language === 'hi'
                  ? 'हर धागे में शुद्धता और शिल्पकार का सम्मान'
                  : 'Preserving Sacred Weaves with Uncompromising Purity'}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-sans-clean">
              Gundamma Collections was founded with a singular devotion: bringing authentic, heritage handloom sarees straight from master weavers in Kanchipuram, Varanasi, Yeola, and Chanderi directly to patrons worldwide. By removing layers of middlemen, we ensure that our master craftsmen receive fair wages while you receive generational heirloom sarees at direct weaver valuation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-900/10 dark:border-amber-500/15 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Certified Silk Mark Guarantee</span>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                  Every pure pattu saree undergoes stringent laboratory burn and chemical tests to certify 100% natural mulberry silk.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-900/10 dark:border-amber-500/15 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-stone-100">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Pure & Tested Zari Metallurgy</span>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-[11px] leading-relaxed">
                  We use genuine silver and gold plated threads, ensuring your saree’s pallu does not fade or oxidize over decades.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pre-Dispatch Video Inspection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Custom Saree Fall & Pico Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Worldwide Insured Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
