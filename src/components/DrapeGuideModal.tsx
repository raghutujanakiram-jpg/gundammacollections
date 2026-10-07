import React, { useState } from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DrapeGuideModal: React.FC = () => {
  const { isDrapeGuideOpen, setIsDrapeGuideOpen, t, language } = useShop();
  const [activeTab, setActiveTab] = useState<'nivi' | 'bengali' | 'gujarati'>('nivi');

  if (!isDrapeGuideOpen) return null;

  const guides = {
    nivi: {
      title: t.drapeGuide.niviTitle,
      desc: t.drapeGuide.niviDesc,
      idealFor: 'Kanchipuram Silk, Banarasi, Paithani, Festive occasions',
      steps: [
        {
          step: '1. Basic Tuck & Anchoring',
          detail: 'Start from the right side of your waist, tuck the top plain border securely into the petticoat, and complete one full 360-degree round back to the start, ensuring even floor-skimming length with your footwear on.',
        },
        {
          step: '2. Measure the Grand Pallu',
          detail: 'Take the decorated zari pallu end over your left shoulder. Allow 3 to 4 feet of length to hang gracefully behind your knees so the rich gold zari is prominently displayed.',
        },
        {
          step: '3. Front Waist Pleating',
          detail: 'With the remaining fabric in the center, form 6 to 8 crisp pleats of about 5 inches width using your thumb and index finger. Tap the pleats straight, align the borders, and tuck them firmly 1 inch below the navel.',
        },
        {
          step: '4. Pinning & Finishing',
          detail: 'Secure the waist pleats with a safety pin from the inside. Pin the pallu pleats over your left shoulder with a concealed pin, allowing the zari border to frame your collarbone.',
        },
      ],
    },
    bengali: {
      title: t.drapeGuide.bengaliTitle,
      desc: t.drapeGuide.bengaliDesc,
      idealFor: 'Tussar Handblock, Linen Kasavu, Puja & Cultural Gatherings',
      steps: [
        {
          step: '1. Right-to-Left Base Wrap',
          detail: 'Tuck the saree starting at the right hip, wrap completely around the waist once anti-clockwise.',
        },
        {
          step: '2. Broad Box Pleats',
          detail: 'Unlike Nivi pleats, fold 2 wide box pleats in front that provide comfort and a fluid, voluminous drape.',
        },
        {
          step: '3. Double Shoulder Swag',
          detail: 'Take the pallu over the left shoulder from front to back, bring the remaining tip under the right arm, and throw it over the right shoulder with an ornamental key-bunch (Chabi) tied to the tip.',
        },
      ],
    },
    gujarati: {
      title: t.drapeGuide.gujaratiTitle,
      desc: t.drapeGuide.gujaratiDesc,
      idealFor: 'Bandhani Georgette, Heavy Banarasi Shikargah, Wedding Receptions',
      steps: [
        {
          step: '1. Reverse Pallu Placement',
          detail: 'After base tucking and front pleating, the pallu is brought from behind the back over the right shoulder so it falls forward covering the chest.',
        },
        {
          step: '2. Chest Border Pinning',
          detail: 'Spread the heavy zari pallu across the torso and pin the left corner neatly onto your left waist, creating a grand royal tapestry view.',
        },
      ],
    },
  };

  const current = guides[activeTab];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/20 rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold">
                {t.drapeGuide.title}
              </h2>
              <p className="text-[11px] text-amber-200/80">
                {t.drapeGuide.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDrapeGuideOpen(false)}
            className="p-1.5 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('nivi')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'nivi'
                ? 'border-amber-700 text-amber-900 dark:text-amber-300 bg-white dark:bg-[#180c12]'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Nivi Drape (South Indian)
          </button>
          <button
            onClick={() => setActiveTab('gujarati')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'gujarati'
                ? 'border-amber-700 text-amber-900 dark:text-amber-300 bg-white dark:bg-[#180c12]'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Front Pallu (Seedha Pallu)
          </button>
          <button
            onClick={() => setActiveTab('bengali')}
            className={`flex-1 py-3 px-4 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'bengali'
                ? 'border-amber-700 text-amber-900 dark:text-amber-300 bg-white dark:bg-[#180c12]'
                : 'border-transparent text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            Classic Bengali (Aathpoure)
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-stone-900 dark:text-stone-100">
              {current.title}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              {current.desc}
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 rounded text-amber-900 dark:text-amber-300 text-xs border border-amber-200/50 dark:border-amber-800/40">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Recommended for: {current.idealFor}</span>
            </div>
          </div>

          <div className="space-y-4">
            {current.steps.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 font-sans-clean">
                    {item.step}
                  </h4>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expert Styling Advice */}
          <div className="p-4 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-900/10 dark:border-amber-500/15 text-xs text-stone-700 dark:text-stone-300 space-y-2">
            <h5 className="font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-royal">
              Artisan Drape Tips from Gundamma
            </h5>
            <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400">
              <li>Always put on your high heels or wedding sandals before tying the initial base tuck.</li>
              <li>Use round-head safety pins or wrap a small pearl bead around the pin head so the zari threads do not snag.</li>
              <li>For heavy Kanchipuram silk, iron the pleats gently on mild heat through a cotton handkerchief for razor-sharp fall.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
