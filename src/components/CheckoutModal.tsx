import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Banknote,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CheckoutCustomerData } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    shippingFee,
    finalTotal,
    submitWhatsAppOrder,
    language,
    t,
  } = useShop();

  const [formData, setFormData] = useState<CheckoutCustomerData>({
    fullName: '',
    phoneNumber: '',
    alternativePhone: '',
    email: '',
    streetAddress: '',
    landmark: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '',
    paymentPreference: 'upi',
    orderNotes: 'Please inspect zari and pack with muslin cloth for gift presentation.',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutCustomerData, string>>>({});

  if (!isCheckoutModalOpen) return null;

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutCustomerData, string>> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      newErrors.phoneNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Delivery address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      submitWhatsAppOrder(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/20 rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold">
                {t.checkout.title}
              </h2>
              <p className="text-[11px] text-amber-200/80">
                Direct WhatsApp Concierge: +91 9014036564
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Subtitle announcement */}
        <div className="bg-amber-50/80 dark:bg-amber-950/30 p-3.5 border-b border-amber-900/10 dark:border-amber-500/10 text-xs text-amber-900 dark:text-amber-200">
          <p className="font-sans-clean leading-relaxed">
            {t.checkout.subtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Order Snapshot */}
          <div className="p-3 rounded bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
            <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100">
              <span>{cart.length} Saree(s) in Order</span>
              <span className="font-mono text-amber-900 dark:text-amber-300">
                Total Payable: ₹{finalTotal.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 truncate">
              {cart.map(c => `${c.product.name.en} (×${c.quantity})`).join(', ')}
            </p>
          </div>

          {/* Section 1: Customer Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-royal">
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  {t.checkout.fullName}
                </label>
                <input
                  type="text"
                  placeholder={t.checkout.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full p-2.5 rounded border bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-600 ${
                    errors.fullName ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-0.5">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  {t.checkout.phoneNumber}
                </label>
                <input
                  type="tel"
                  placeholder={t.checkout.phonePlaceholder}
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className={`w-full p-2.5 rounded border bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-600 ${
                    errors.phoneNumber ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="text-[11px] text-rose-500 mt-0.5">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  {t.checkout.altPhone}
                </label>
                <input
                  type="tel"
                  placeholder="Optional alternate contact"
                  value={formData.alternativePhone}
                  onChange={e => setFormData({ ...formData, alternativePhone: e.target.value })}
                  className="w-full p-2.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  {t.checkout.email}
                </label>
                <input
                  type="email"
                  placeholder="Optional for tracking emails"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-royal">
              2. Delivery Address
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                  {t.checkout.address}
                </label>
                <input
                  type="text"
                  placeholder={t.checkout.addressPlaceholder}
                  value={formData.streetAddress}
                  onChange={e => setFormData({ ...formData, streetAddress: e.target.value })}
                  className={`w-full p-2.5 rounded border bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-600 ${
                    errors.streetAddress ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                  }`}
                />
                {errors.streetAddress && (
                  <p className="text-[11px] text-rose-500 mt-0.5">{errors.streetAddress}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    {t.checkout.city}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    {t.checkout.state}
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full p-2.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-medium mb-1">
                    {t.checkout.pincode}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 500033"
                    value={formData.pincode}
                    onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full p-2.5 rounded border bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-600 ${
                      errors.pincode ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.pincode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Preference */}
          <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300 font-royal">
              3. {t.checkout.paymentMode}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                {
                  id: 'upi',
                  label: t.checkout.paymentOptions.upi,
                  icon: Banknote,
                },
                {
                  id: 'card',
                  label: t.checkout.paymentOptions.card,
                  icon: CreditCard,
                },
                {
                  id: 'netbanking',
                  label: t.checkout.paymentOptions.netbanking,
                  icon: Building,
                },
                {
                  id: 'cod',
                  label: t.checkout.paymentOptions.cod,
                  icon: Truck,
                },
              ].map(opt => {
                const Icon = opt.icon;
                const isSelected = formData.paymentPreference === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-semibold'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentPreference"
                      value={opt.id}
                      checked={isSelected}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          paymentPreference: opt.id as any,
                        })
                      }
                      className="accent-amber-700"
                    />
                    <Icon className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Special Customization Notes */}
          <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800 text-xs">
            <label className="block text-stone-700 dark:text-stone-300 font-medium">
              {t.checkout.orderNotes}
            </label>
            <textarea
              rows={2}
              value={formData.orderNotes}
              onChange={e => setFormData({ ...formData, orderNotes: e.target.value })}
              placeholder={t.checkout.orderNotesPlaceholder}
              className="w-full p-2.5 rounded border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          {/* Security Note */}
          <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-[11px] text-stone-600 dark:text-stone-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>{t.checkout.securityNote}</p>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.checkout.submitBtn} (+91 9014036564)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
