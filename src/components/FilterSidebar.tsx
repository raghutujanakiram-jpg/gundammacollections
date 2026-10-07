import React from 'react';
import { Filter, RotateCcw, Check, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { FabricType, OccasionType } from '../types';

const allFabrics: FabricType[] = [
  'Kanchipuram Silk',
  'Banarasi Brocade',
  'Paithani Pure Silk',
  'Chanderi Silk',
  'Organza Tissue',
  'Tussar Handblock',
  'Bandhani Georgette',
  'Pure Linen Handloom',
];

const allOccasions: OccasionType[] = [
  'Bridal & Wedding',
  'Festive Celebrations',
  'Party & Reception',
  'Puja & Rituals',
  'Daily Elegance',
];

const allColorPalettes = [
  { name: 'Red', label: 'Crimson / Red', hex: '#991B1B' },
  { name: 'Blue', label: 'Peacock Blue', hex: '#1E3A8A' },
  { name: 'Gold', label: 'Zari Gold', hex: '#D97706' },
  { name: 'Pink', label: 'Rani Pink', hex: '#BE185D' },
  { name: 'Yellow', label: 'Haldi Mustard', hex: '#CA8A04' },
  { name: 'Green', label: 'Emerald Green', hex: '#047857' },
  { name: 'Lavender', label: 'Pastel Lilac', hex: '#7C3AED' },
  { name: 'White', label: 'Kasavu Ivory', hex: '#F5F5F4' },
];

export const FilterSidebar: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    dynamicMinPrice,
    dynamicMaxPrice,
    t,
    language,
  } = useShop();

  const toggleFabric = (fabric: FabricType) => {
    setFilters(prev => {
      const exists = prev.selectedFabrics.includes(fabric);
      return {
        ...prev,
        selectedFabrics: exists
          ? prev.selectedFabrics.filter(f => f !== fabric)
          : [...prev.selectedFabrics, fabric],
      };
    });
  };

  const toggleOccasion = (occasion: OccasionType) => {
    setFilters(prev => {
      const exists = prev.selectedOccasions.includes(occasion);
      return {
        ...prev,
        selectedOccasions: exists
          ? prev.selectedOccasions.filter(o => o !== occasion)
          : [...prev.selectedOccasions, occasion],
      };
    });
  };

  const toggleColor = (colorFamily: string) => {
    setFilters(prev => {
      const exists = prev.selectedColors.includes(colorFamily);
      return {
        ...prev,
        selectedColors: exists
          ? prev.selectedColors.filter(c => c !== colorFamily)
          : [...prev.selectedColors, colorFamily],
      };
    });
  };

  const handleMinPriceChange = (val: number) => {
    const safeVal = Math.max(dynamicMinPrice, Math.min(val, filters.priceRange[1] - 500));
    setFilters(prev => ({
      ...prev,
      priceRange: [safeVal, prev.priceRange[1]],
    }));
  };

  const handleMaxPriceChange = (val: number) => {
    const safeVal = Math.min(dynamicMaxPrice, Math.max(val, filters.priceRange[0] + 500));
    setFilters(prev => ({
      ...prev,
      priceRange: [prev.priceRange[0], safeVal],
    }));
  };

  const resetPriceRange = () => {
    setFilters(prev => ({
      ...prev,
      priceRange: [dynamicMinPrice, dynamicMaxPrice],
    }));
  };

  const isPriceFiltered =
    filters.priceRange[0] > dynamicMinPrice || filters.priceRange[1] < dynamicMaxPrice;

  const activeFiltersCount =
    (filters.selectedFabrics.length > 0 ? 1 : 0) +
    (filters.selectedOccasions.length > 0 ? 1 : 0) +
    (filters.selectedColors.length > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.handloomOnly ? 1 : 0) +
    (isPriceFiltered ? 1 : 0);

  // Calculate percentage of track for visual fill bar
  const priceSpan = dynamicMaxPrice - dynamicMinPrice || 1;
  const minPercent = Math.min(100, Math.max(0, ((filters.priceRange[0] - dynamicMinPrice) / priceSpan) * 100));
  const maxPercent = Math.min(100, Math.max(0, ((filters.priceRange[1] - dynamicMinPrice) / priceSpan) * 100));

  return (
    <aside className="w-full bg-white dark:bg-[#180c12] border border-amber-900/10 dark:border-amber-500/15 rounded-lg p-5 space-y-6 shadow-sm">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <h3 className="font-royal text-sm font-bold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
            {t.filters.title}
          </h3>
          {activeFiltersCount > 0 && (
            <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t.filters.clearAll}</span>
          </button>
        )}
      </div>

      {/* Handloom & In-Stock Toggles */}
      <div className="space-y-3 pb-4 border-b border-stone-200 dark:border-stone-800 text-xs">
        <label className="flex items-center justify-between cursor-pointer select-none">
          <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-medium">{t.filters.handloomCertifiedOnly}</span>
          </div>
          <input
            type="checkbox"
            checked={filters.handloomOnly}
            onChange={e =>
              setFilters(prev => ({ ...prev, handloomOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer select-none">
          <span className="text-stone-800 dark:text-stone-200 font-medium">
            {t.filters.inStockOnly}
          </span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e =>
              setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-amber-700 rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Fabric / Weave Filter */}
      <div className="space-y-3 pb-4 border-b border-stone-200 dark:border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          {t.filters.fabric}
        </h4>
        <div className="space-y-2 text-xs">
          {allFabrics.map(fabric => {
            const isSelected = filters.selectedFabrics.includes(fabric);
            return (
              <label
                key={fabric}
                className="flex items-center justify-between text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-200 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-800 border-amber-800 text-white'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{fabric}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Occasion Filter */}
      <div className="space-y-3 pb-4 border-b border-stone-200 dark:border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          {t.filters.occasion}
        </h4>
        <div className="space-y-2 text-xs">
          {allOccasions.map(occ => {
            const isSelected = filters.selectedOccasions.includes(occ);
            return (
              <label
                key={occ}
                className="flex items-center justify-between text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-200 cursor-pointer select-none"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-amber-800 border-amber-800 text-white'
                        : 'border-stone-300 dark:border-stone-700'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{occ}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color Swatch Filter */}
      <div className="space-y-3 pb-4 border-b border-stone-200 dark:border-stone-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
          {t.filters.color}
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {allColorPalettes.map(c => {
            const isSelected = filters.selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleColor(c.name)}
                className={`flex flex-col items-center gap-1 p-1 rounded transition-all cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-amber-600 bg-amber-50 dark:bg-amber-950/40'
                    : 'hover:bg-stone-50 dark:hover:bg-stone-900'
                }`}
                title={c.label}
              >
                <span
                  className="w-6 h-6 rounded-full border border-stone-300 dark:border-stone-600 shadow-sm flex items-center justify-center"
                  style={{ backgroundColor: c.hex }}
                >
                  {isSelected && (
                    <Check
                      className={`w-3 h-3 ${
                        c.name === 'White' || c.name === 'Gold'
                          ? 'text-stone-900'
                          : 'text-white'
                      }`}
                    />
                  )}
                </span>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 truncate max-w-full">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Price Range Slider */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              {t.filters.price}
            </h4>
            {isPriceFiltered && (
              <button
                type="button"
                onClick={resetPriceRange}
                className="text-[10px] text-rose-600 dark:text-rose-400 hover:underline cursor-pointer font-medium"
              >
                (Reset)
              </button>
            )}
          </div>
          <span className="font-mono text-stone-800 dark:text-amber-300 font-bold text-xs bg-amber-50/80 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200/50 dark:border-amber-800/40">
            ₹{filters.priceRange[0].toLocaleString('en-IN')} – ₹{filters.priceRange[1].toLocaleString('en-IN')}
          </span>
        </div>

        {/* Dual Range Track Visualization */}
        <div className="relative pt-2 pb-1">
          {/* Base Gray Track */}
          <div className="relative h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
            {/* Active Range Highlight */}
            <div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-amber-700 to-amber-500 rounded-full transition-all"
              style={{
                left: `${minPercent}%`,
                width: `${Math.max(0, maxPercent - minPercent)}%`,
              }}
            />
          </div>

          {/* Min Price Thumb Slider */}
          <input
            type="range"
            min={dynamicMinPrice}
            max={dynamicMaxPrice}
            step={500}
            value={filters.priceRange[0]}
            onChange={e => handleMinPriceChange(Number(e.target.value))}
            className="w-full accent-amber-700 cursor-pointer mt-2"
            aria-label="Minimum Price"
          />

          {/* Max Price Thumb Slider */}
          <input
            type="range"
            min={dynamicMinPrice}
            max={dynamicMaxPrice}
            step={500}
            value={filters.priceRange[1]}
            onChange={e => handleMaxPriceChange(Number(e.target.value))}
            className="w-full accent-amber-700 cursor-pointer mt-1"
            aria-label="Maximum Price"
          />
        </div>

        {/* Dynamic Bounds Labels */}
        <div className="flex justify-between text-[11px] text-stone-500 dark:text-stone-400 font-mono">
          <span title="Lowest price saree in collection">
            Min: ₹{dynamicMinPrice.toLocaleString('en-IN')}
          </span>
          <span title="Highest price saree in collection">
            Max: ₹{dynamicMaxPrice.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Quick Price Bracket Chips */}
        <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
          <button
            type="button"
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                priceRange: [dynamicMinPrice, Math.min(8000, dynamicMaxPrice)],
              }))
            }
            className={`px-2 py-1 rounded text-center border transition-colors cursor-pointer ${
              filters.priceRange[0] === dynamicMinPrice && filters.priceRange[1] === 8000
                ? 'bg-amber-800 text-white border-amber-800'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300'
            }`}
          >
            Under ₹8,000
          </button>

          <button
            type="button"
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                priceRange: [8000, 15000],
              }))
            }
            className={`px-2 py-1 rounded text-center border transition-colors cursor-pointer ${
              filters.priceRange[0] === 8000 && filters.priceRange[1] === 15000
                ? 'bg-amber-800 text-white border-amber-800'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300'
            }`}
          >
            ₹8,000 – ₹15,000
          </button>

          <button
            type="button"
            onClick={() =>
              setFilters(prev => ({
                ...prev,
                priceRange: [15000, dynamicMaxPrice],
              }))
            }
            className={`px-2 py-1 rounded text-center border transition-colors cursor-pointer ${
              filters.priceRange[0] === 15000 && filters.priceRange[1] === dynamicMaxPrice
                ? 'bg-amber-800 text-white border-amber-800'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300'
            }`}
          >
            Above ₹15,000
          </button>

          <button
            type="button"
            onClick={resetPriceRange}
            className={`px-2 py-1 rounded text-center border transition-colors cursor-pointer ${
              !isPriceFiltered
                ? 'bg-amber-800 text-white border-amber-800'
                : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-700 dark:text-stone-300'
            }`}
          >
            All Prices
          </button>
        </div>
      </div>
    </aside>
  );
};
