import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { SareeProduct, CartItem, Language, FilterState, CheckoutCustomerData, FabricType, OccasionType } from '../types';
import { products } from '../data/products';
import { translations } from '../data/translations';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ShopContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['en'];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  shippingFee: number;
  couponCode: string;
  setCouponCode: (code: string) => void;
  appliedCoupon: string | null;
  discountAmount: number;
  finalTotal: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addToCart: (product: SareeProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  quickViewProduct: SareeProduct | null;
  setQuickViewProduct: (product: SareeProduct | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isDrapeGuideOpen: boolean;
  setIsDrapeGuideOpen: (open: boolean) => void;
  isSilkCareOpen: boolean;
  setIsSilkCareOpen: (open: boolean) => void;
  isOrderTrackingOpen: boolean;
  setIsOrderTrackingOpen: (open: boolean) => void;
  trackedOrderId: string;
  setTrackedOrderId: (id: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: SareeProduct[];
  dynamicMinPrice: number;
  dynamicMaxPrice: number;
  recentlyViewed: string[];
  trackRecentlyViewed: (productId: string) => void;
  clearRecentlyViewed: () => void;
  openWhatsAppInquiry: (product: SareeProduct) => void;
  openWhatsAppGeneral: () => void;
  submitWhatsAppOrder: (customer: CheckoutCustomerData) => void;
  toasts: Toast[];
  showToast: (
    message: string,
    type?: 'success' | 'info' | 'error',
    action?: { label: string; onClick: () => void }
  ) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const WHATSAPP_PHONE = '919014036564'; // As given: +91 9014036564

// Dynamically calculate min and max prices from available catalogue
const dynamicMinPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 4999;
const dynamicMaxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 19899;

const initialFilters: FilterState = {
  searchQuery: '',
  selectedFabrics: [],
  selectedOccasions: [],
  selectedColors: [],
  priceRange: [dynamicMinPrice, dynamicMaxPrice],
  sortBy: 'featured',
  inStockOnly: false,
  handloomOnly: false,
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gc_lang') as Language;
      if (saved && ['en', 'te', 'hi'].includes(saved)) return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_lang', lang);
    }
  };

  const t = translations[language] || translations.en;

  // 2. Theme state (light / dark) with system preference detection
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gc_theme') as 'light' | 'dark';
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  // Listen for OS system theme changes if no manual preference is saved
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('gc_theme');
      if (!saved) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('gc_theme', next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return next;
    });
  };

  // 3. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gc_cart');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // 4. Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gc_wishlist');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // 5. Recently Viewed Products (persisted in localStorage, max 4 items)
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gc_recently_viewed');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed.slice(0, 4);
        }
      } catch {
        // ignore
      }
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_recently_viewed', JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed]);

  const trackRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 4);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gc_recently_viewed');
    }
  };

  // Modals & Drawers
  const [quickViewProductState, setQuickViewProductState] = useState<SareeProduct | null>(null);

  const setQuickViewProduct = (product: SareeProduct | null) => {
    setQuickViewProductState(product);
    if (product) {
      trackRecentlyViewed(product.id);
    }
  };

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isDrapeGuideOpen, setIsDrapeGuideOpen] = useState(false);
  const [isSilkCareOpen, setIsSilkCareOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackedOrderId, setTrackedOrderId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gc_last_order') || '';
    }
    return '';
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      selectedFabrics: [],
      selectedOccasions: [],
      selectedColors: [],
      priceRange: [dynamicMinPrice, dynamicMaxPrice],
      sortBy: 'featured',
      inStockOnly: false,
      handloomOnly: false,
    });
  };

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: 'success' | 'info' | 'error' = 'success',
    action?: { label: string; onClick: () => void }
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type, action }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 4200);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  };

  // Cart operations
  const addToCart = (product: SareeProduct, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(
      language === 'te'
        ? `"${product.name.te}" బ్యాగ్‌లో చేర్చబడింది!`
        : language === 'hi'
        ? `"${product.name.hi}" बैग में जोड़ी गई!`
        : `"${product.name.en}" added to your bag!`,
      'success',
      {
        label: language === 'te' ? 'బ్యాగ్ చూడండి' : language === 'hi' ? 'बैग देखें' : 'View Bag',
        onClick: () => setIsCartOpen(true),
      }
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const targetProd = products.find(p => p.id === productId);
      if (exists) {
        showToast(
          language === 'te'
            ? 'విష్‌లిస్ట్ నుండి తీసివేయబడింది'
            : language === 'hi'
            ? 'विशलिस्ट से हटाई गई'
            : 'Removed from Wishlist',
          'info'
        );
        return prev.filter(id => id !== productId);
      } else {
        showToast(
          language === 'te'
            ? `"${targetProd?.name.te || 'చీర'}" విష్‌లిస్ట్‌లో భద్రపరచబడింది!`
            : language === 'hi'
            ? `"${targetProd?.name.hi || 'साड़ी'}" विशलिस्ट में सहेजी गई!`
            : `"${targetProd?.name.en || 'Saree'}" saved to Wishlist!`,
          'success',
          {
            label: language === 'te' ? 'విష్‌లిస్ట్ చూడండి' : language === 'hi' ? 'विशलिस्ट देखें' : 'View Wishlist',
            onClick: () => setIsWishlistOpen(true),
          }
        );
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const wishlistCount = wishlist.length;

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Shipping logic: Free shipping over ₹2,999; else ₹250
  const shippingFee = cartSubtotal > 2999 || cartSubtotal === 0 ? 0 : 250;

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GUNDAMMA10' || cleanCode === 'WELCOME10') {
      const discount = Math.round(cartSubtotal * 0.10);
      setDiscountAmount(discount);
      setAppliedCoupon(cleanCode);
      showToast(
        language === 'te'
          ? 'కూపన్ వర్తించబడింది! 10% రాయితీ లభించింది.'
          : language === 'hi'
          ? 'कूपन लागू! 10% छूट प्राप्त हुई।'
          : 'Coupon Applied! 10% discount added.'
      );
      return true;
    } else if (cleanCode === 'FESTIVE500' && cartSubtotal >= 5000) {
      setDiscountAmount(500);
      setAppliedCoupon(cleanCode);
      showToast('Flat ₹500 Festive discount applied!');
      return true;
    } else if (cleanCode === 'ROYALSILK' && cartSubtotal >= 10000) {
      const discount = Math.round(cartSubtotal * 0.15);
      setDiscountAmount(discount);
      setAppliedCoupon(cleanCode);
      showToast('VIP Royal Silk 15% discount applied!');
      return true;
    } else {
      showToast(t.cart.invalidCoupon, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query filter (matches name in all 3 languages, code, fabric, subtitle)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesNameEn = product.name.en.toLowerCase().includes(query);
        const matchesNameTe = product.name.te.toLowerCase().includes(query);
        const matchesNameHi = product.name.hi.toLowerCase().includes(query);
        const matchesCode = product.code.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesColor = product.color.toLowerCase().includes(query);
        const matchesOccasion = product.occasion.toLowerCase().includes(query);
        const matchesZari = product.zariType.toLowerCase().includes(query);
        if (
          !matchesNameEn &&
          !matchesNameTe &&
          !matchesNameHi &&
          !matchesCode &&
          !matchesFabric &&
          !matchesColor &&
          !matchesOccasion &&
          !matchesZari
        ) {
          return false;
        }
      }

      // Fabric filter
      if (
        filters.selectedFabrics.length > 0 &&
        !filters.selectedFabrics.includes(product.fabric)
      ) {
        return false;
      }

      // Occasion filter
      if (
        filters.selectedOccasions.length > 0 &&
        !filters.selectedOccasions.includes(product.occasion)
      ) {
        return false;
      }

      // Color filter
      if (
        filters.selectedColors.length > 0 &&
        !filters.selectedColors.includes(product.colorFamily)
      ) {
        return false;
      }

      // Price range
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // In stock
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // Handloom certified
      if (filters.handloomOnly && !product.isHandloomCertified) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') {
        if (a.isNewArrival && !b.isNewArrival) return -1;
        if (!a.isNewArrival && b.isNewArrival) return 1;
        return 0;
      }
      // 'featured'
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [filters]);

  // WhatsApp Single-Product Inquiry
  const openWhatsAppInquiry = (product: SareeProduct) => {
    const text = encodeURIComponent(
      `*Namaste Gundamma Collections!* 🌸\n\nI am interested in this authentic handloom saree:\n\n` +
      `📌 *Saree:* ${product.name.en}\n` +
      `🔖 *Product Code:* ${product.code}\n` +
      `🧵 *Fabric:* ${product.fabric}\n` +
      `✨ *Zari Work:* ${product.zariType}\n` +
      `💰 *Price:* ₹${product.price.toLocaleString('en-IN')}\n\n` +
      `Could you please confirm if this saree is currently available? Also, do you provide video call inspection before dispatch? Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  // WhatsApp General Concierge
  const openWhatsAppGeneral = () => {
    const text = encodeURIComponent(
      `*Namaste Gundamma Collections!* 🌸\n\n` +
      `I am visiting your online boutique (www.gundammacollections.in) and would like personalized assistance choosing a handloom silk saree for an upcoming celebration. Please guide me!`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
  };

  // WhatsApp Order Submission
  const submitWhatsAppOrder = (customer: CheckoutCustomerData) => {
    if (cart.length === 0) return;

    const orderId = `GC-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name.en}* (${item.product.code})\n` +
          `   Qty: ${item.quantity} × ₹${item.product.price.toLocaleString('en-IN')} = ₹${(item.quantity * item.product.price).toLocaleString('en-IN')}`
      )
      .join('\n\n');

    const paymentLabel =
      customer.paymentPreference === 'upi'
        ? 'UPI / GPay / PhonePe'
        : customer.paymentPreference === 'card'
        ? 'Credit / Debit Card Link'
        : customer.paymentPreference === 'netbanking'
        ? 'Net Banking / NEFT'
        : 'Cash on Delivery (Advance token)';

    const text = encodeURIComponent(
      `🛍️ *NEW ORDER - GUNDAMMA COLLECTIONS*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🆔 *Order Reference:* ${orderId}\n\n` +
      `👤 *CUSTOMER DETAILS:*\n` +
      `• *Name:* ${customer.fullName}\n` +
      `• *Phone:* ${customer.phoneNumber}\n` +
      (customer.alternativePhone ? `• *Alt Phone:* ${customer.alternativePhone}\n` : '') +
      (customer.email ? `• *Email:* ${customer.email}\n` : '') +
      `• *Address:* ${customer.streetAddress}\n` +
      (customer.landmark ? `• *Landmark:* ${customer.landmark}\n` : '') +
      `• *City/State:* ${customer.city}, ${customer.state}\n` +
      `• *PIN Code:* ${customer.pincode}\n\n` +
      `📦 *ORDERED SAREES:*\n` +
      `${itemsList}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💰 *Subtotal:* ₹${cartSubtotal.toLocaleString('en-IN')}\n` +
      (discountAmount > 0 ? `🏷️ *Discount (${appliedCoupon}):* -₹${discountAmount.toLocaleString('en-IN')}\n` : '') +
      `🚚 *Insured Shipping:* ${shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}\n` +
      `✨ *FINAL PAYABLE AMOUNT:* ₹${finalTotal.toLocaleString('en-IN')}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💳 *Preferred Payment:* ${paymentLabel}\n` +
      (customer.orderNotes ? `📝 *Special Notes:* ${customer.orderNotes}\n` : '') +
      `\nKindly confirm saree availability and send the official payment confirmation QR code / payment link. Thank you! 🙏`
    );

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
    setIsCheckoutModalOpen(false);
    clearCart();

    // Persist last order ID for instant tracking
    setTrackedOrderId(orderId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gc_last_order', orderId);
    }

    showToast(
      language === 'te'
        ? `ఆర్డర్ (${orderId}) నమోదు అయింది!`
        : language === 'hi'
        ? `ऑर्डर (${orderId}) दर्ज किया गया!`
        : `Order (${orderId}) confirmed on WhatsApp!`,
      'success',
      {
        label: language === 'te' ? 'ఆర్డర్ ట్రాక్ చేయండి' : language === 'hi' ? 'ऑर्डर ट्रैक करें' : 'Track Order',
        onClick: () => {
          setTrackedOrderId(orderId);
          setIsOrderTrackingOpen(true);
        },
      }
    );
  };

  return (
    <ShopContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        cart,
        cartCount,
        cartSubtotal,
        shippingFee,
        couponCode,
        setCouponCode,
        appliedCoupon,
        discountAmount,
        finalTotal,
        applyCoupon,
        removeCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,
        quickViewProduct: quickViewProductState,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isDrapeGuideOpen,
        setIsDrapeGuideOpen,
        isSilkCareOpen,
        setIsSilkCareOpen,
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        trackedOrderId,
        setTrackedOrderId,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        dynamicMinPrice,
        dynamicMaxPrice,
        recentlyViewed,
        trackRecentlyViewed,
        clearRecentlyViewed,
        openWhatsAppInquiry,
        openWhatsAppGeneral,
        submitWhatsAppOrder,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
