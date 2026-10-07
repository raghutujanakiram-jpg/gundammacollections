import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    wishlistCount,
    toggleWishlist,
    addToCart,
    setQuickViewProduct,
    openWhatsAppInquiry,
    language,
    t,
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#180c12] border-l border-amber-900/20 dark:border-amber-500/20 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
            <h2 className="font-royal text-base font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t.wishlist.title}
            </h2>
            <span className="text-xs bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 px-2 py-0.5 rounded-full font-bold">
              {wishlistCount}
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {savedProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-600">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900 dark:text-stone-100">
                  {t.wishlist.emptyTitle}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                  {t.wishlist.emptySubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-amber-900 text-amber-50 rounded text-xs font-bold tracking-wider uppercase hover:bg-amber-950 transition-colors cursor-pointer"
              >
                {t.cart.startShopping}
              </button>
            </div>
          ) : (
            savedProducts.map(product => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40"
              >
                <img
                  src={product.images[0]}
                  alt={product.name.en}
                  onClick={() => {
                    setQuickViewProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-16 h-20 object-cover object-top rounded shrink-0 cursor-pointer border border-stone-200 dark:border-stone-800"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-1 cursor-pointer hover:underline"
                      >
                        {product.name[language] || product.name.en}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                      {product.code} · {product.fabric}
                    </p>

                    <p className="text-xs font-bold font-mono text-amber-950 dark:text-amber-200 mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product.id);
                      }}
                      className="flex-1 py-1.5 px-2 bg-amber-900 hover:bg-amber-950 text-white rounded text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{t.wishlist.moveToCart}</span>
                    </button>

                    <button
                      onClick={() => openWhatsAppInquiry(product)}
                      className="p-1.5 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/40 transition-colors"
                      title="Ask on WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
