import React from 'react';
import { Heart, Eye, ShoppingBag, MessageCircle, Star, Sparkles, Check } from 'lucide-react';
import { SareeProduct } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: SareeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    language,
    t,
    addToCart,
    cart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    openWhatsAppInquiry,
    trackRecentlyViewed,
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const inCart = cart.some(item => item.product.id === product.id);

  return (
    <article
      onClick={() => trackRecentlyViewed(product.id)}
      className="group bg-white dark:bg-[#180c12] border border-amber-900/10 dark:border-amber-500/15 rounded-lg overflow-hidden flex flex-col transform transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:border-amber-700/50 dark:hover:border-amber-500/50"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-stone-100 dark:bg-stone-900 overflow-hidden cursor-pointer">
        <img
          src={product.images[0]}
          alt={product.name[language] || product.name.en}
          onClick={() => setQuickViewProduct(product)}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-108 will-change-transform"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start pointer-events-none">
          {product.isBestSeller && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-amber-600 text-white rounded shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-rose-800 text-white rounded shadow-sm">
              New Arrival
            </span>
          )}
          {product.isHandloomCertified && (
            <span className="text-[10px] font-medium tracking-wide px-2 py-0.5 bg-stone-900/80 text-amber-200 backdrop-blur-sm rounded flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              Handloom Certified
            </span>
          )}
        </div>

        {/* Top-Right Wishlist Heart Button */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md active:scale-90 hover:scale-110 z-10 ${
            isFavorited
              ? 'bg-rose-600 text-white ring-2 ring-rose-400/50 shadow-rose-900/30'
              : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:bg-white dark:hover:bg-stone-900 hover:text-rose-600'
          }`}
          aria-label={isFavorited ? t.product.inWishlist : t.product.addToWishlist}
          title={isFavorited ? `${t.product.inWishlist} (Click to remove)` : `${t.product.addToWishlist} (Click to save)`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isFavorited ? 'fill-current scale-105' : ''
            }`}
          />
        </button>

        {/* Discount Ribbon */}
        {product.discountPercentage > 0 && (
          <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 bg-rose-700/90 text-white text-[11px] font-bold rounded backdrop-blur-sm font-mono">
            {product.discountPercentage}% OFF
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            className="px-4 py-2 bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 rounded text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:bg-amber-100 dark:hover:bg-amber-950 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.product.viewDetails}</span>
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata: Fabric and Code */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 font-sans-clean">
            <span className="font-medium text-amber-800 dark:text-amber-400">
              {product.fabric}
            </span>
            <span className="font-mono text-stone-400 dark:text-stone-500">
              {product.code}
            </span>
          </div>

          {/* Saree Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-serif-luxury text-base font-semibold text-stone-900 dark:text-stone-100 mt-1 line-clamp-1 hover:text-amber-800 dark:hover:text-amber-300 cursor-pointer transition-colors"
          >
            {product.name[language] || product.name.en}
          </h3>

          {/* Subtitle / Weave Details */}
          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-1 mt-0.5">
            {product.subtitle[language] || product.subtitle.en}
          </p>

          {/* Rating & Stock count */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 text-[11px]">
            <div className="flex items-center gap-1 text-amber-500 font-medium font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>

            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              {product.stockCount <= 3 ? (
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  {t.product.leftInStock.replace('{count}', String(product.stockCount))}
                </span>
              ) : (
                'In Stock'
              )}
            </span>
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold font-mono text-amber-950 dark:text-amber-200">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="line-through text-xs font-mono text-stone-400">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400">
              Blouse Inc.
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className={`flex-1 py-2 px-3 rounded text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                inCart
                  ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                  : 'bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-amber-50 shadow-sm'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.product.inCart}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.product.addToCart}</span>
                </>
              )}
            </button>

            {/* Wishlist Toggle Button */}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              title={isFavorited ? t.product.inWishlist : t.product.addToWishlist}
              aria-label={isFavorited ? t.product.inWishlist : t.product.addToWishlist}
              className={`p-2 rounded border transition-colors cursor-pointer flex items-center justify-center ${
                isFavorited
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800'
                  : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-600 hover:border-rose-300 dark:hover:border-rose-800 bg-stone-50/50 dark:bg-stone-900/40'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-transform ${
                  isFavorited ? 'fill-current scale-105' : ''
                }`}
              />
            </button>

            {/* Direct WhatsApp Product Inquiry */}
            <button
              type="button"
              onClick={() => openWhatsAppInquiry(product)}
              title={t.product.askWhatsApp}
              aria-label={t.product.askWhatsApp}
              className="p-2 rounded bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
