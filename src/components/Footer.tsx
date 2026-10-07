import React from 'react';
import { Phone, MapPin, Instagram, Globe, Clock, ShieldCheck, Heart, Sparkles, Package } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { t, language, setIsDrapeGuideOpen, setIsSilkCareOpen, setIsOrderTrackingOpen } = useShop();

  return (
    <footer id="boutique-contact" className="bg-[#120509] text-amber-100/90 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-sm bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-serif font-bold text-base shadow-sm">
                గ
              </span>
              <span className="font-royal text-xl font-bold tracking-wider text-white uppercase">
                Gundamma
              </span>
              <span className="font-serif-luxury text-sm tracking-widest text-amber-400 font-medium">
                COLLECTIONS
              </span>
            </div>
            <p className="text-xs text-amber-200/70 leading-relaxed font-sans-clean">
              {t.subtagline}
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-amber-300/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Silk Mark Authenticated</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Handloom Mark Certified Weaves</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Weaves & Guides */}
          <div className="space-y-3">
            <h4 className="font-royal text-xs font-bold uppercase tracking-widest text-amber-400">
              Curated Weaves
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/70 font-sans-clean">
              <li>
                <a href="#catalogue-section" className="hover:text-amber-300 transition-colors">
                  Kanchipuram Pure Silk (Pattu)
                </a>
              </li>
              <li>
                <a href="#catalogue-section" className="hover:text-amber-300 transition-colors">
                  Banarasi Kadhwa Brocades
                </a>
              </li>
              <li>
                <a href="#catalogue-section" className="hover:text-amber-300 transition-colors">
                  Maharani Paithani Weaves
                </a>
              </li>
              <li>
                <a href="#catalogue-section" className="hover:text-amber-300 transition-colors">
                  Chanderi Gold Tissue Sarees
                </a>
              </li>
              <li>
                <a href="#catalogue-section" className="hover:text-amber-300 transition-colors">
                  Bandhani Georgette & Organza
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Guides */}
          <div className="space-y-3">
            <h4 className="font-royal text-xs font-bold uppercase tracking-widest text-amber-400">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-amber-200/70 font-sans-clean">
              <li>
                <button
                  onClick={() => setIsDrapeGuideOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  {t.nav.drapeGuide}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSilkCareOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left"
                >
                  {t.nav.silkCare}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsOrderTrackingOpen(true)}
                  className="hover:text-amber-300 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.orderTracking?.title || 'Track Your Saree Order'}</span>
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/919014036564?text=Hi%20Gundamma%20Collections%2C%20I%20would%20like%20to%20book%20a%20video%20call%20saree%20consultation."
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 transition-colors"
                >
                  Book Video Call Saree Inspection
                </a>
              </li>
              <li>
                <span className="text-amber-200/50">Custom Fall & Pico Included</span>
              </li>
              <li>
                <span className="text-amber-200/50">Insured Worldwide Courier</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Boutique Details */}
          <div className="space-y-3">
            <h4 className="font-royal text-xs font-bold uppercase tracking-widest text-amber-400">
              Boutique Location
            </h4>
            <div className="space-y-2.5 text-xs text-amber-200/80 font-sans-clean">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>{t.contact.address}</p>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="https://wa.me/919014036564"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 font-mono"
                >
                  {t.contact.phone} (Call / WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="https://www.instagram.com/gundamma_collections?stkn=MXY2ZW1zc2k0Yjg4bQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-300 truncate"
                >
                  {t.contact.instagram}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">{t.contact.domain}</span>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-amber-200/60 pt-1 border-t border-amber-900/30">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p>{t.contact.hours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Legal */}
        <div className="pt-8 border-t border-amber-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/60 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Gundamma Collections. All rights reserved. Registered Handloom Boutique.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Genuine Silk</span>
            <span>·</span>
            <span>Direct Master Weavers</span>
            <span>·</span>
            <span className="text-amber-400">Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
