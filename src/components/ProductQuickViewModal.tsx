import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  MessageCircle,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductQuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    language,
    t,
    addToCart,
    cart,
    toggleWishlist,
    isInWishlist,
    openWhatsAppInquiry,
  } = useShop();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const inCart = cart.some(item => item.product.id === product.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setActiveImageIdx(0);
    setQuantity(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/20 rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-stone-900/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label={t.quickView.close}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-stone-100 dark:bg-stone-950 p-6 flex flex-col items-center justify-between gap-4">
            {/* Main Showcase Image */}
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-stone-200 dark:border-stone-800 shadow-md">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name[language] || product.name.en}
                className="w-full h-full object-cover object-top"
              />
              {product.isHandloomCertified && (
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-semibold rounded flex items-center gap-1.5 border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Silk Mark Authenticated</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-16 rounded overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx
                        ? 'border-amber-600 shadow-md scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Saree Specs & Purchasing Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between text-xs font-sans-clean text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-amber-800 dark:text-amber-400 uppercase tracking-wider">
                    {product.fabric}
                  </span>
                  <span className="font-mono bg-stone-100 dark:bg-stone-900 px-2 py-0.5 rounded">
                    {product.code}
                  </span>
                </div>

                <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 mt-2">
                  {product.name[language] || product.name.en}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                  {product.subtitle[language] || product.subtitle.en}
                </p>
              </div>

              {/* Price & Rating Display */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-amber-950 dark:text-amber-200">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="line-through text-sm font-mono text-stone-400">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">
                      ({product.discountPercentage}% OFF)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 dark:bg-amber-950/60 rounded border border-amber-200/50 dark:border-amber-800/40 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-amber-900 dark:text-amber-200">
                    {product.rating}
                  </span>
                  <span className="text-stone-400">({product.reviewCount})</span>
                </div>
              </div>

              {/* Artisan Description */}
              <div className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans-clean bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded border border-amber-900/10 dark:border-amber-500/15">
                <p>{product.description[language] || product.description.en}</p>
              </div>

              {/* Specifications Grid */}
              <div className="space-y-2 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-royal">
                  {t.quickView.specs}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-stone-700 dark:text-stone-300">
                  <div className="p-2 rounded bg-stone-50 dark:bg-stone-900">
                    <span className="text-stone-400 block text-[10px] uppercase">
                      {t.product.zari}
                    </span>
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {product.zariType}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 dark:bg-stone-900">
                    <span className="text-stone-400 block text-[10px] uppercase">
                      {t.product.origin}
                    </span>
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {product.weaveOrigin}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 dark:bg-stone-900">
                    <span className="text-stone-400 block text-[10px] uppercase">
                      {t.product.length}
                    </span>
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {product.length}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-stone-50 dark:bg-stone-900">
                    <span className="text-stone-400 block text-[10px] uppercase">
                      {t.product.care}
                    </span>
                    <span className="font-medium text-stone-900 dark:text-stone-100">
                      {product.careInstructions[language] || product.careInstructions.en}
                    </span>
                  </div>
                </div>

                {/* Blouse details callout */}
                <div className="p-2.5 rounded bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-800/30 text-emerald-900 dark:text-emerald-200 text-xs">
                  <span className="font-bold">{t.product.blouse} </span>
                  <span>{product.blouseDetails[language] || product.blouseDetails.en}</span>
                </div>
              </div>

              {/* Authenticity Guarantee notice */}
              <div className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-400">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{t.quickView.guaranteeText}</p>
              </div>
            </div>

            {/* Purchasing & WhatsApp Buttons */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity adjuster */}
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded text-xs font-semibold">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-stone-900 dark:text-stone-100 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="px-3 py-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className={`flex-1 py-3 px-4 rounded text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    inCart
                      ? 'bg-emerald-800 text-white hover:bg-emerald-900'
                      : 'bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-amber-50 shadow-md'
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.product.inCart}</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{t.product.addToCart}</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded border transition-colors cursor-pointer ${
                    isFavorited
                      ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/40'
                      : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-900'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Direct WhatsApp Concierge Button */}
              <button
                onClick={() => openWhatsAppInquiry(product)}
                className="w-full py-3 px-4 rounded bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.product.askWhatsApp} (+91 9014036564)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
