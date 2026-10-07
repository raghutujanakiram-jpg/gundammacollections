import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FabricType } from '../types';

export const HeroBanner: React.FC = () => {
  const { t, language, openWhatsAppGeneral, setFilters } = useShop();

  const handleCategoryClick = (fabric: FabricType) => {
    setFilters(prev => ({ ...prev, selectedFabrics: [fabric] }));
    const el = document.getElementById('catalogue-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2d0914] via-[#20050d] to-[#120307] text-amber-50 py-12 md:py-20 border-b border-amber-900/30">
      {/* Subtle traditional gold weave motif overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Decorative ambient gradient orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-rose-700/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Handloom Authenticity Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/80 border border-amber-500/30 rounded text-amber-300 text-xs tracking-widest uppercase font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Typographic Display */}
            <div className="space-y-2">
              <h2 className="text-amber-400/90 font-serif-luxury italic text-xl sm:text-2xl md:text-3xl font-normal tracking-wide">
                {t.hero.titleHighlight}
              </h2>
              <h1 className="font-royal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                {t.hero.titleMain}
              </h1>
            </div>

            <p className="text-amber-100/80 text-sm sm:text-base md:text-lg max-w-2xl font-sans-clean leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-amber-950 font-bold text-sm tracking-wider uppercase rounded shadow-lg shadow-amber-950/50 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{t.hero.exploreCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={openWhatsAppGeneral}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#4ADE80] font-semibold text-sm tracking-wider rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>{t.hero.whatsappCta}</span>
              </button>
            </div>

            {/* Credibility Badges & Proof Math */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/30 text-amber-200/90">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t.hero.stats.weavers}</span>
                </div>
                <span className="text-[11px] text-amber-200/60 mt-0.5">
                  Direct loom provenance
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t.hero.stats.purity}</span>
                </div>
                <span className="text-[11px] text-amber-200/60 mt-0.5">
                  Govt. laboratory tested
                </span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-300">
                  <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{t.hero.stats.happyClients}</span>
                </div>
                <span className="text-[11px] text-amber-200/60 mt-0.5">
                  Worldwide delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Saree Showcase Carousel Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg p-2 bg-gradient-to-b from-amber-600/30 via-amber-800/10 to-amber-950/60 border border-amber-500/30 shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/5] rounded overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                  alt="Swarna Kamalam Kanchipuram Bridal Saree"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Saree Card Callout */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                      Code: GC-KP-801
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-rose-900/80 text-rose-200 font-semibold rounded">
                      Bridal Heritage
                    </span>
                  </div>
                  <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white mt-1">
                    Swarna Kamalam Kanchipuram Pure Silk
                  </h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-500/20 text-xs">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold font-mono text-amber-300">
                        ₹18,499
                      </span>
                      <span className="line-through text-stone-400 text-xs font-mono">
                        ₹24,999
                      </span>
                    </div>
                    <button
                      onClick={() => handleCategoryClick('Kanchipuram Silk')}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Pattu</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Fabric Chips Bar */}
        <div className="mt-12 pt-8 border-t border-amber-900/30">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-400/80 mb-3 text-center sm:text-left">
            {language === 'te'
              ? 'ప్రసిద్ధ నేత రకాలు:'
              : language === 'hi'
              ? 'प्रमुख बुनाई श्रेणियां:'
              : 'Popular Handloom Weaves:'}
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
            {[
              { label: 'Kanchipuram Silk', fabric: 'Kanchipuram Silk' as FabricType },
              { label: 'Banarasi Brocade', fabric: 'Banarasi Brocade' as FabricType },
              { label: 'Paithani Pure Silk', fabric: 'Paithani Pure Silk' as FabricType },
              { label: 'Chanderi Silk', fabric: 'Chanderi Silk' as FabricType },
              { label: 'Organza Tissue', fabric: 'Organza Tissue' as FabricType },
              { label: 'Tussar Handblock', fabric: 'Tussar Handblock' as FabricType },
              { label: 'Bandhani Georgette', fabric: 'Bandhani Georgette' as FabricType },
            ].map(item => (
              <button
                key={item.fabric}
                onClick={() => handleCategoryClick(item.fabric)}
                className="px-3 py-1.5 text-xs rounded bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-800/40 hover:border-amber-500/60 transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
