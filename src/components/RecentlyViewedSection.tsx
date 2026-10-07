import React from 'react';
import { Clock, Trash2, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export const RecentlyViewedSection: React.FC = () => {
  const { recentlyViewed, clearRecentlyViewed, t, language } = useShop();

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  // Map the IDs back to products in order of recency, taking up to 4
  const recentProducts = recentlyViewed
    .map(id => products.find(p => p.id === id))
    .filter((p): p is typeof products[0] => Boolean(p))
    .slice(0, 4);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-amber-900/15 dark:border-amber-500/15 space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 font-royal">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {t.recentlyViewed?.title || 'Recently Viewed Drapes'}
            </span>
            <span className="text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.2 rounded-full text-amber-900 dark:text-amber-200">
              {recentProducts.length}
            </span>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans-clean">
            {t.recentlyViewed?.subtitle ||
              'Pick up where you left off. Handwoven sarees you explored recently.'}
          </p>
        </div>

        <button
          type="button"
          onClick={clearRecentlyViewed}
          className="text-xs text-stone-500 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          title="Clear recently viewed history"
        >
          <Trash2 className="w-3 h-3" />
          <span>{t.recentlyViewed?.clear || 'Clear History'}</span>
        </button>
      </div>

      {/* Grid of recently viewed sarees (up to 4 items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProducts.map(product => (
          <ProductCard key={`recent-${product.id}`} product={product} />
        ))}
      </div>
    </section>
  );
};
