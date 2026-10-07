import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Phone,
  BookOpen,
  ShieldCheck,
  ChevronDown,
  Package,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ThemeToggle } from './ThemeToggle';
import { Language } from '../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsDrapeGuideOpen,
    setIsSilkCareOpen,
    setIsOrderTrackingOpen,
    filters,
    setFilters,
    filteredProducts,
    setQuickViewProduct,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularKeywords = [
    { label: 'Kanchipuram Pattu', query: 'Kanchipuram' },
    { label: 'Banarasi Brocade', query: 'Banarasi' },
    { label: 'Haldi Mustard', query: 'Mustard' },
    { label: 'Paithani Pink', query: 'Paithani' },
    { label: 'Bridal Crimson', query: 'Crimson' },
  ];

  const handleSearchSelect = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
    setIsSearchFocused(false);
  };

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Global' },
    { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#140a0e]/95 backdrop-blur-md border-b border-amber-900/10 dark:border-amber-500/15 transition-colors duration-200">
      {/* Top Auspicious Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-100 text-xs py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <p className="truncate font-medium tracking-wide">
              {t.announcement}
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-amber-200/90 shrink-0">
            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'te'
                  ? 'ఆర్డర్ ట్రాకింగ్'
                  : language === 'hi'
                  ? 'ऑर्डर ट्रैकिंग'
                  : 'Track Order'}
              </span>
            </button>
            <span className="hidden sm:inline text-amber-500">|</span>
            <a
              href="tel:+919014036564"
              className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 9014036564</span>
            </a>
            <span className="hidden md:inline text-amber-500">|</span>
            <span className="hidden md:inline font-mono tracking-wider">
              HYDERABAD BOUTIQUE
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Royal Signature */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, searchQuery: '', selectedFabrics: [], selectedOccasions: [] }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-sm bg-gradient-to-br from-amber-600 via-amber-500 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                  గ
                </span>
                <span className="font-royal text-xl sm:text-2xl font-bold tracking-wider text-amber-950 dark:text-amber-100 uppercase">
                  Gundamma
                </span>
                <span className="font-serif-luxury text-sm tracking-widest text-amber-800 dark:text-amber-400 font-medium">
                  COLLECTIONS
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-stone-500 dark:text-stone-400 uppercase font-sans-clean mt-0.5">
                {language === 'te'
                  ? 'స్వచ్ఛమైన చేనేత పట్టు చీరలు · హైదరాబాద్'
                  : language === 'hi'
                  ? 'प्रामाणिक हथकरघा रेशम · हैदराबाद'
                  : 'Authentic Handloom & Pure Silk Sarees'}
              </p>
            </button>
          </div>

          {/* Search Bar with live autocomplete popup */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-1 max-w-md relative mx-2"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.search.placeholder}
                value={filters.searchQuery}
                onChange={e =>
                  setFilters(prev => ({ ...prev, searchQuery: e.target.value }))
                }
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-9 py-2.5 bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200 dark:border-amber-900/40 rounded text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 transition-all font-sans-clean"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              {filters.searchQuery && (
                <button
                  onClick={() =>
                    setFilters(prev => ({ ...prev, searchQuery: '' }))
                  }
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Box */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#1f1017] border border-amber-900/15 dark:border-amber-500/20 rounded shadow-xl py-3 px-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="text-[11px] font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wider mb-2">
                  {t.search.trending}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {popularKeywords.map(k => (
                    <button
                      key={k.query}
                      type="button"
                      onClick={() => handleSearchSelect(k.query)}
                      className="text-xs px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 rounded border border-amber-200/50 dark:border-amber-800/40 transition-colors"
                    >
                      {k.label}
                    </button>
                  ))}
                </div>

                {filters.searchQuery.trim() && (
                  <div>
                    <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-1.5 border-t border-stone-100 dark:border-stone-800 pt-2">
                      Matching Sarees ({filteredProducts.length})
                    </div>
                    {filteredProducts.slice(0, 3).map(prod => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          setQuickViewProduct(prod);
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-1.5 rounded hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name.en}
                          className="w-10 h-12 object-cover rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif font-medium text-stone-900 dark:text-stone-100 truncate">
                            {prod.name[language] || prod.name.en}
                          </p>
                          <p className="text-[11px] text-amber-700 dark:text-amber-400 font-mono">
                            ₹{prod.price.toLocaleString('en-IN')} · {prod.fabric}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons: Language, Theme, Wishlist, Cart, Mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Guide Quick-Triggers */}
            <button
              onClick={() => setIsDrapeGuideOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 px-2 py-1.5 transition-colors font-medium"
              title="Drape Guide"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.drapeGuide}</span>
            </button>

            <button
              onClick={() => setIsSilkCareOpen(true)}
              className="hidden lg:flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 px-2 py-1.5 transition-colors font-medium"
              title="Silk Care"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.nav.silkCare}</span>
            </button>

            <button
              onClick={() => setIsOrderTrackingOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs text-stone-700 dark:text-stone-300 hover:text-amber-800 dark:hover:text-amber-300 px-2 py-1.5 transition-colors font-medium cursor-pointer"
              title={t.orderTracking?.title || 'Order Tracking'}
            >
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {language === 'te' ? 'ట్రాకింగ్' : language === 'hi' ? 'ट्रैकिंग' : 'Track Order'}
              </span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded border border-stone-200 dark:border-amber-900/40 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span className="font-medium">{currentLangObj.label}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white dark:bg-[#1a0b12] border border-amber-900/15 dark:border-amber-500/20 rounded shadow-xl py-1 z-50 animate-in fade-in duration-100">
                  {languages.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 dark:hover:bg-amber-950/60 transition-colors ${
                        language === l.code
                          ? 'text-amber-900 dark:text-amber-300 font-bold bg-amber-50/70 dark:bg-amber-950/40'
                          : 'text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] text-stone-400 uppercase font-mono">
                        {l.code}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Component (Light / Dark) */}
            <ThemeToggle />

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 relative text-stone-700 dark:text-stone-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              aria-label="View Wishlist"
              title={t.wishlist.title}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-scaleIn">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-amber-50 rounded shadow-sm transition-all"
              aria-label="View Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-amber-950 text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold tracking-wide uppercase">
                {t.cart.title}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-nav Links Bar (Desktop) */}
      <nav className="hidden md:block border-t border-stone-200/60 dark:border-amber-900/20 bg-stone-50/60 dark:bg-[#170c11]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 py-2 text-xs font-medium tracking-wider text-stone-700 dark:text-stone-300">
            <li>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, selectedFabrics: [], selectedOccasions: [] }));
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.allSarees}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, selectedFabrics: ['Kanchipuram Silk'] }));
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.kanchipuram}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, selectedFabrics: ['Banarasi Brocade'] }));
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.banarasi}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, selectedOccasions: ['Bridal & Wedding'] }));
                  const el = document.getElementById('catalogue-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.bridal}
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsDrapeGuideOpen(true)}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.drapeGuide}
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsSilkCareOpen(true)}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.silkCare}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('heritage-story');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.aboutUs}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  const el = document.getElementById('boutique-contact');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-amber-800 dark:hover:text-amber-400 uppercase transition-colors"
              >
                {t.nav.contact}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer / Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-amber-900/30 bg-white dark:bg-[#1a0b12] px-4 py-4 space-y-4 animate-in fade-in duration-150">
          {/* Mobile search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={t.search.placeholder}
              value={filters.searchQuery}
              onChange={e =>
                setFilters(prev => ({ ...prev, searchQuery: e.target.value }))
              }
              className="w-full pl-9 pr-4 py-2 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-amber-900/40 rounded text-sm text-stone-900 dark:text-stone-100"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, selectedFabrics: ['Kanchipuram Silk'] }));
                setIsMobileMenuOpen(false);
                document.getElementById('catalogue-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.kanchipuram}
            </button>
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, selectedFabrics: ['Banarasi Brocade'] }));
                setIsMobileMenuOpen(false);
                document.getElementById('catalogue-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.banarasi}
            </button>
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, selectedOccasions: ['Bridal & Wedding'] }));
                setIsMobileMenuOpen(false);
                document.getElementById('catalogue-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.bridal}
            </button>
            <button
              onClick={() => {
                setIsDrapeGuideOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.drapeGuide}
            </button>
            <button
              onClick={() => {
                setIsSilkCareOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.silkCare}
            </button>
            <button
              onClick={() => {
                setIsOrderTrackingOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-amber-900 dark:text-amber-300 font-medium flex items-center gap-1.5"
            >
              <Package className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.orderTracking?.title || 'Track Order'}</span>
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('boutique-contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2.5 text-left rounded bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
            >
              {t.nav.contact}
            </button>
            <div className="p-1 rounded bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
              <ThemeToggle showLabel className="w-full justify-center" />
            </div>
          </div>

          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
            <span>Direct WhatsApp: +91 9014036564</span>
            <a
              href="https://www.instagram.com/gundamma_collections?stkn=MXY2ZW1zc2k0Yjg4bQ=="
              target="_blank"
              rel="noreferrer"
              className="text-amber-700 dark:text-amber-400 font-medium"
            >
              Instagram @gundamma_collections
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
