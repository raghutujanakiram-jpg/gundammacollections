import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartSubtotal,
    shippingFee,
    appliedCoupon,
    discountAmount,
    finalTotal,
    couponCode,
    setCouponCode,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    setIsCheckoutModalOpen,
    language,
    t,
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2999;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#180c12] border-l border-amber-900/20 dark:border-amber-500/20 shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            <h2 className="font-royal text-base font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {t.cart.title}
            </h2>
            <span className="text-xs bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
              {cartCount}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Alert Bar */}
        {cart.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-950/40 px-4 py-2.5 border-b border-amber-200/50 dark:border-amber-800/30 text-xs text-amber-900 dark:text-amber-200">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <p className="flex items-center gap-1.5 font-medium">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} more for <strong>FREE Insured Delivery</strong>
                  </span>
                </p>
                <div className="w-full bg-amber-200 dark:bg-amber-900/60 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="bg-amber-700 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-300">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>🎉 Congratulations! You unlocked <strong>FREE Insured Shipping</strong>!</span>
              </p>
            )}
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-300">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-lg font-bold text-stone-900 dark:text-stone-100">
                  {t.cart.emptyTitle}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                  {t.cart.emptySubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-amber-900 text-amber-50 rounded text-xs font-bold tracking-wider uppercase hover:bg-amber-950 transition-colors cursor-pointer"
              >
                {t.cart.startShopping}
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div
                key={item.product.id}
                className="flex gap-3.5 p-3 rounded-lg border border-stone-200 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-900/40"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name.en}
                  className="w-16 h-20 object-cover object-top rounded shrink-0 border border-stone-200 dark:border-stone-800"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                        {item.product.name[language] || item.product.name.en}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                      {item.product.code} · {item.product.fabric}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/60">
                    <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded text-xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                      >
                        -
                      </button>
                      <span className="px-2 font-mono font-bold text-stone-900 dark:text-stone-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold font-mono text-amber-950 dark:text-amber-200">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Breakdown & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/60 space-y-4">
            {/* Promo Code Input */}
            <div className="space-y-1.5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon}</strong> Applied (-₹{discountAmount.toLocaleString('en-IN')})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-600 text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Use GUNDAMMA10 or FESTIVE500"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-xs text-stone-900 dark:text-stone-100 uppercase"
                    />
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                  </div>
                  <button
                    onClick={() => applyCoupon(couponCode)}
                    disabled={!couponCode.trim()}
                    className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white rounded text-xs font-bold uppercase transition-colors"
                  >
                    {t.cart.apply}
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400 font-sans-clean">
              <div className="flex justify-between">
                <span>{t.cart.subtotal}</span>
                <span className="font-mono text-stone-900 dark:text-stone-200">
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount</span>
                  <span className="font-mono">
                    -₹{discountAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>{t.cart.shipping}</span>
                <span className="font-mono text-stone-900 dark:text-stone-200">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                      {t.cart.shippingFree}
                    </span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                <span>{t.cart.total}</span>
                <span className="font-mono text-base text-amber-950 dark:text-amber-200">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout via WhatsApp Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t.cart.checkoutWhatsApp}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>100% Silk Mark Authenticated · Insured Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
