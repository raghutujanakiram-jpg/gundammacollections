import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { DrapeGuideModal } from './components/DrapeGuideModal';
import { SilkCareModal } from './components/SilkCareModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { HeritageStory } from './components/HeritageStory';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastContainer } from './components/ToastContainer';
import { RecentlyViewedSection } from './components/RecentlyViewedSection';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw, Sparkles } from 'lucide-react';

const CatalogueView: React.FC = () => {
  const { filteredProducts, filters, setFilters, resetFilters, t, language } = useShop();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <HeroBanner />

      {/* Main Catalogue Section */}
      <section id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Controls Bar: Results count, Mobile Filter Trigger, Sort dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <h2 className="font-royal text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {language === 'te'
                ? 'ప్రత్యేక చేనేత చీరల కలెక్షన్'
                : language === 'hi'
                ? 'विशेष हथकरघा साड़ी संग्रह'
                : 'Curated Handloom & Silk Drapes'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans-clean">
              {t.filters.showingCount.replace('{count}', String(filteredProducts.length))}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold text-stone-800 dark:text-stone-200"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.filters.title}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0 hidden sm:block" />
              <label htmlFor="sort-select" className="sr-only">
                {t.filters.sortBy}
              </label>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="w-full sm:w-auto px-3 py-2 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-600"
              >
                <option value="featured">{t.filters.sortOptions.featured}</option>
                <option value="price-asc">{t.filters.sortOptions.priceAsc}</option>
                <option value="price-desc">{t.filters.sortOptions.priceDesc}</option>
                <option value="rating">{t.filters.sortOptions.rating}</option>
                <option value="newest">{t.filters.sortOptions.newest}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Pills (Zero-pill text styling) */}
        {(filters.selectedFabrics.length > 0 ||
          filters.selectedOccasions.length > 0 ||
          filters.selectedColors.length > 0 ||
          filters.searchQuery.trim() ||
          filters.handloomOnly ||
          filters.inStockOnly) && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
            <span className="font-semibold text-amber-900 dark:text-amber-300">
              Active Filters:
            </span>
            {filters.searchQuery.trim() && (
              <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 text-[11px]">
                Search: "{filters.searchQuery}"
                <button
                  onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                  className="hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </span>
            )}
            {filters.selectedFabrics.map(f => (
              <span
                key={f}
                className="inline-flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px]"
              >
                {f}
                <button
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      selectedFabrics: prev.selectedFabrics.filter(x => x !== f),
                    }))
                  }
                  className="hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.selectedOccasions.map(o => (
              <span
                key={o}
                className="inline-flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px]"
              >
                {o}
                <button
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      selectedOccasions: prev.selectedOccasions.filter(x => x !== o),
                    }))
                  }
                  className="hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            {filters.selectedColors.map(c => (
              <span
                key={c}
                className="inline-flex items-center gap-1 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-[11px]"
              >
                Color: {c}
                <button
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      selectedColors: prev.selectedColors.filter(x => x !== c),
                    }))
                  }
                  className="hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={resetFilters}
              className="text-rose-600 dark:text-rose-400 font-semibold underline text-[11px] ml-2"
            >
              {t.filters.clearAll}
            </button>
          </div>
        )}

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <FilterSidebar />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-lg border border-dashed border-stone-300 dark:border-stone-800 space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/60 mx-auto flex items-center justify-center text-amber-700">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-lg font-bold text-stone-900 dark:text-stone-100">
                    {t.search.noResults}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try adjusting your fabric, occasion, or price range filters to discover our royal handloom drapes.
                  </p>
                </div>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-amber-900 text-white rounded text-xs font-semibold uppercase hover:bg-amber-950 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                  {t.filters.clearAll}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed Sarees Section */}
        <RecentlyViewedSection />
      </section>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center lg:hidden animate-in fade-in">
          <div className="relative w-full max-w-md bg-white dark:bg-[#180c12] rounded-xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-royal text-sm font-bold uppercase text-stone-900 dark:text-stone-100">
                {t.filters.title}
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-amber-900 text-white rounded text-xs font-bold uppercase hover:bg-amber-950"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}

      {/* Brand Proof & Story */}
      <HeritageStory />
      <TestimonialsSection />
      <Footer />

      {/* Interactive Global Overlays & Modals */}
      <ProductQuickViewModal />
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <DrapeGuideModal />
      <SilkCareModal />
      <OrderTrackingModal />
      <FloatingWhatsApp />
      <ToastContainer />
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-stone-50 dark:bg-[#12080d] text-stone-900 dark:text-stone-100 transition-colors duration-200 font-sans-clean">
        <Header />
        <CatalogueView />
      </div>
    </ShopProvider>
  );
}
