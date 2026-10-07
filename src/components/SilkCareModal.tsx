import React from 'react';
import { X, ShieldCheck, Sun, Wind, Sparkles, AlertTriangle } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SilkCareModal: React.FC = () => {
  const { isSilkCareOpen, setIsSilkCareOpen, t } = useShop();

  if (!isSilkCareOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/20 rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold">
                {t.silkCare.title}
              </h2>
              <p className="text-[11px] text-amber-200/80">
                {t.silkCare.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSilkCareOpen(false)}
            className="p-1.5 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rule 1 */}
            <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 space-y-2">
              <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {t.silkCare.tip1Title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.silkCare.tip1Desc}
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 space-y-2">
              <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <Wind className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {t.silkCare.tip2Title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.silkCare.tip2Desc}
              </p>
            </div>

            {/* Rule 3 */}
            <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 space-y-2">
              <div className="w-8 h-8 rounded bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {t.silkCare.tip3Title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.silkCare.tip3Desc}
              </p>
            </div>

            {/* Rule 4 */}
            <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 space-y-2">
              <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-800 dark:text-amber-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900 dark:text-stone-100">
                {t.silkCare.tip4Title}
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {t.silkCare.tip4Desc}
              </p>
            </div>
          </div>

          {/* Scent & Pest Prevention */}
          <div className="p-4 rounded bg-stone-100 dark:bg-stone-900 text-xs text-stone-700 dark:text-stone-300 space-y-1.5 border border-stone-200 dark:border-stone-800">
            <h5 className="font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 font-royal">
              Natural Pest Deterrents
            </h5>
            <p className="text-stone-600 dark:text-stone-400">
              Place dried neem leaves wrapped in tiny cloth pouches or natural sandalwood chips inside your saree trunk. Avoid direct contact between naphthalene balls and zari threads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
