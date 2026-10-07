import React, { useState, useEffect } from 'react';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  MessageCircle,
  ExternalLink,
  MapPin,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

interface MockOrderRecord {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  courier: string;
  awbNumber: string;
  status: 'confirmed' | 'quality_check' | 'stitching' | 'dispatched' | 'out_for_delivery' | 'delivered';
  statusLabel: string;
  destination: string;
  product: typeof products[0];
  quantity: number;
  totalAmount: number;
  fallPicoCompleted: boolean;
  transitInsurance: boolean;
  updates: {
    time: string;
    description: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const mockOrdersDatabase: Record<string, MockOrderRecord> = {
  'GC-ORD-883102': {
    orderId: 'GC-ORD-883102',
    orderDate: 'October 4, 2026',
    estimatedDelivery: 'October 8, 2026 (Tomorrow)',
    courier: 'Blue Dart Apex Priority Air',
    awbNumber: 'BD-HYD-99482104',
    status: 'out_for_delivery',
    statusLabel: 'Out for Delivery (Hyderabad Hub)',
    destination: 'Banjara Hills, Hyderabad, Telangana - 500034',
    product: products[0], // Swarna Kamalam Kanchipuram
    quantity: 1,
    totalAmount: 18499,
    fallPicoCompleted: true,
    transitInsurance: true,
    updates: [
      {
        time: 'Oct 4, 11:30 AM',
        description: 'Order confirmed & direct weaver reservation completed.',
        completed: true,
      },
      {
        time: 'Oct 5, 02:15 PM',
        description: 'Pure Silk Mark inspection & Gold Zari metallurgy authenticated.',
        completed: true,
      },
      {
        time: 'Oct 6, 10:45 AM',
        description: 'Custom Fall & Pico hand-stitching finished in boutique workshop.',
        completed: true,
      },
      {
        time: 'Oct 6, 06:20 PM',
        description: 'Packed in unbleached pure muslin cloth. Dispatched via Blue Dart Air.',
        completed: true,
      },
      {
        time: 'Today, 08:30 AM',
        description: 'Arrived at delivery hub. Out for delivery with courier associate.',
        completed: true,
        current: true,
      },
    ],
  },
  'GC-ORD-742918': {
    orderId: 'GC-ORD-742918',
    orderDate: 'October 5, 2026',
    estimatedDelivery: 'October 10, 2026',
    courier: 'DTDC Premium Express Air',
    awbNumber: 'DTDC-VNS-7128941',
    status: 'stitching',
    statusLabel: 'Fall & Pico Hand-Stitching in Boutique',
    destination: 'Indiranagar, Bangalore, Karnataka - 560038',
    product: products[1], // Shahi Kadhwa Banarasi
    quantity: 1,
    totalAmount: 16999,
    fallPicoCompleted: false,
    transitInsurance: true,
    updates: [
      {
        time: 'Oct 5, 03:40 PM',
        description: 'Order confirmed on WhatsApp. Loom verification complete.',
        completed: true,
      },
      {
        time: 'Oct 6, 11:00 AM',
        description: 'Master weaver Kadhwa inspection verified with zero loose threads.',
        completed: true,
      },
      {
        time: 'Today, 09:15 AM',
        description: 'Custom cotton fall & pico edging in progress by master tailor.',
        completed: true,
        current: true,
      },
      {
        time: 'Upcoming (Est. Oct 7)',
        description: 'Insured muslin packaging and pickup by DTDC Air Courier.',
        completed: false,
      },
      {
        time: 'Upcoming (Est. Oct 10)',
        description: 'Delivery at client destination.',
        completed: false,
      },
    ],
  },
  'GC-ORD-519403': {
    orderId: 'GC-ORD-519403',
    orderDate: 'October 3, 2026',
    estimatedDelivery: 'October 9, 2026',
    courier: 'Delhivery Surface Express',
    awbNumber: 'DLHV-HYD-3810294',
    status: 'dispatched',
    statusLabel: 'In Transit (Inter-State Courier)',
    destination: 'Anna Nagar, Chennai, Tamil Nadu - 600040',
    product: products[3], // Maharani Paithani
    quantity: 1,
    totalAmount: 19899,
    fallPicoCompleted: true,
    transitInsurance: true,
    updates: [
      {
        time: 'Oct 3, 10:15 AM',
        description: 'Order confirmed with advance token.',
        completed: true,
      },
      {
        time: 'Oct 4, 12:00 PM',
        description: '24k Gold plated zari quality and tapestry peacock pallu inspected.',
        completed: true,
      },
      {
        time: 'Oct 5, 04:30 PM',
        description: 'Fall & pico finished. Video inspection sent to customer.',
        completed: true,
      },
      {
        time: 'Oct 6, 07:10 PM',
        description: 'Dispatched from Hyderabad central sorting facility. In transit.',
        completed: true,
        current: true,
      },
      {
        time: 'Upcoming (Est. Oct 9)',
        description: 'Out for delivery in Chennai.',
        completed: false,
      },
    ],
  },
};

export const OrderTrackingModal: React.FC = () => {
  const {
    isOrderTrackingOpen,
    setIsOrderTrackingOpen,
    trackedOrderId,
    setTrackedOrderId,
    language,
    t,
  } = useShop();

  const [inputOrderId, setInputOrderId] = useState('');
  const [activeOrder, setActiveOrder] = useState<MockOrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Sync initial search with context trackedOrderId if provided
  useEffect(() => {
    if (isOrderTrackingOpen) {
      const initialId = trackedOrderId || 'GC-ORD-883102';
      setInputOrderId(initialId);
      lookupOrder(initialId);
    }
  }, [isOrderTrackingOpen, trackedOrderId]);

  if (!isOrderTrackingOpen) return null;

  const lookupOrder = (queryId: string) => {
    const cleanId = queryId.trim().toUpperCase();
    setHasSearched(true);
    setTrackedOrderId(cleanId);

    if (mockOrdersDatabase[cleanId]) {
      setActiveOrder(mockOrdersDatabase[cleanId]);
    } else {
      // Dynamic fallback order record for any user-generated order ID from checkout!
      const randomProduct = products[0];
      setActiveOrder({
        orderId: cleanId,
        orderDate: 'October 6, 2026',
        estimatedDelivery: 'October 11, 2026 (in 4 days)',
        courier: 'Blue Dart Express Air Priority',
        awbNumber: `BD-EXP-${cleanId.replace(/[^0-9]/g, '') || '914036'}`,
        status: 'quality_check',
        statusLabel: 'Quality Verified & Saree Fall in Progress',
        destination: 'Customer Delivery Address (Verified on WhatsApp)',
        product: randomProduct,
        quantity: 1,
        totalAmount: randomProduct.price,
        fallPicoCompleted: false,
        transitInsurance: true,
        updates: [
          {
            time: 'Today, Just Now',
            description: `Order ${cleanId} logged with concierge. Direct weaver reservation confirmed.`,
            completed: true,
            current: true,
          },
          {
            time: 'Upcoming (Within 24h)',
            description: 'Silk Mark burn test & gold zari metallurgy authentication.',
            completed: false,
          },
          {
            time: 'Upcoming (Within 48h)',
            description: 'Custom Fall & Pico hand-stitching in boutique.',
            completed: false,
          },
          {
            time: 'Upcoming (Oct 9, 2026)',
            description: 'Muslin cloth packing & dispatch with insured tracking.',
            completed: false,
          },
        ],
      });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputOrderId.trim()) {
      lookupOrder(inputOrderId);
    }
  };

  const openWhatsAppOrderInquiry = (orderId: string) => {
    const text = encodeURIComponent(
      `*Namaste Gundamma Collections!* 🌸\n\nI am tracking my saree order with ID: *${orderId}*.\nCould you please share the latest courier status or dispatch video? Thank you!`
    );
    window.open(`https://wa.me/919014036564?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#180c12] border border-amber-900/20 dark:border-amber-500/20 rounded-xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950 via-[#701a2b] to-amber-950 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-white">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-royal text-base sm:text-lg font-bold">
                {t.orderTracking?.title || 'Track Your Saree Order'}
              </h2>
              <p className="text-[11px] text-amber-200/80">
                {t.orderTracking?.subtitle ||
                  'Enter your order ID to check courier status and estimated delivery.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 text-amber-200 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Sample ID Chips */}
        <div className="p-5 bg-amber-50/60 dark:bg-amber-950/20 border-b border-stone-200 dark:border-stone-800 space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.orderTracking?.placeholder || 'Enter Order ID (e.g. GC-ORD-883102)'}
                value={inputOrderId}
                onChange={e => setInputOrderId(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded text-xs text-stone-900 dark:text-stone-100 uppercase font-mono font-medium focus:outline-none focus:ring-1 focus:ring-amber-600"
              />
              <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-900 hover:bg-amber-950 text-amber-50 rounded text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {t.orderTracking?.trackButton || 'Track Status'}
            </button>
          </form>

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <span className="text-[11px] font-semibold text-amber-900 dark:text-amber-300">
              {t.orderTracking?.quickSamples || 'Sample Orders:'}
            </span>
            {['GC-ORD-883102', 'GC-ORD-742918', 'GC-ORD-519403'].map(sampleId => (
              <button
                key={sampleId}
                type="button"
                onClick={() => {
                  setInputOrderId(sampleId);
                  lookupOrder(sampleId);
                }}
                className={`text-[11px] px-2 py-0.5 rounded font-mono border transition-colors cursor-pointer ${
                  inputOrderId.toUpperCase() === sampleId
                    ? 'bg-amber-800 text-white border-amber-800'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                {sampleId}
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details View */}
        {activeOrder ? (
          <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Top Status & Estimated Delivery Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/40 dark:to-stone-900/60 p-4 rounded-lg border border-amber-200/80 dark:border-amber-800/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-200/60 dark:border-amber-800/30">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-800 dark:text-amber-400">
                    Order Reference #{activeOrder.orderId}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">
                      {activeOrder.statusLabel}
                    </h3>
                  </div>
                </div>

                <div className="sm:text-right bg-white/80 dark:bg-stone-900/80 px-3 py-1.5 rounded border border-amber-200/60 dark:border-amber-800/40">
                  <div className="text-[10px] uppercase font-semibold text-stone-500">
                    {t.orderTracking?.estimatedDelivery || 'Estimated Delivery'}
                  </div>
                  <div className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center sm:justify-end gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{activeOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Courier & AWB specifics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700 dark:text-stone-300">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">
                    {t.orderTracking?.courierPartner || 'Courier Partner'}
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1 mt-0.5">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    {activeOrder.courier}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">
                    {t.orderTracking?.awbNumber || 'Tracking AWB'}
                  </span>
                  <span className="font-mono font-bold text-stone-900 dark:text-stone-100 block mt-0.5">
                    {activeOrder.awbNumber}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 uppercase block">
                    Insurance & Packing
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Insured Pure Muslin Box
                  </span>
                </div>
              </div>
            </div>

            {/* Saree Item Snapshot */}
            <div className="p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 flex items-center gap-3.5">
              <img
                src={activeOrder.product.images[0]}
                alt={activeOrder.product.name.en}
                className="w-14 h-18 object-cover object-top rounded border border-stone-200 dark:border-stone-800"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400">
                  {activeOrder.product.code} · {activeOrder.product.fabric}
                </span>
                <h4 className="text-xs font-serif font-bold text-stone-900 dark:text-stone-100 truncate">
                  {activeOrder.product.name[language] || activeOrder.product.name.en}
                </h4>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-stone-500 font-mono">
                    Qty: {activeOrder.quantity} · Fall & Pico Included
                  </span>
                  <span className="font-mono font-bold text-amber-950 dark:text-amber-200">
                    ₹{activeOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Milestones Timeline */}
            <div className="space-y-3">
              <h4 className="font-royal text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-300">
                {t.orderTracking?.timelineTitle || 'Dispatch & Delivery Milestones'}
              </h4>

              <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
                {activeOrder.updates.map((update, idx) => (
                  <div key={idx} className="relative flex items-start gap-3.5 pl-1 text-xs">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        update.current
                          ? 'bg-amber-600 text-white ring-4 ring-amber-100 dark:ring-amber-950'
                          : update.completed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>

                    <div className="flex-1 bg-stone-50 dark:bg-stone-900/40 p-2.5 rounded border border-stone-200/80 dark:border-stone-800/80">
                      <div className="flex items-center justify-between text-[11px] mb-0.5">
                        <span className="font-semibold text-stone-900 dark:text-stone-100">
                          {update.description}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400 shrink-0 ml-2">
                          {update.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions: WhatsApp Concierge Link */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate max-w-xs">{activeOrder.destination}</span>
              </div>

              <button
                type="button"
                onClick={() => openWhatsAppOrderInquiry(activeOrder.orderId)}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.orderTracking?.askWhatsApp || 'Inquire on WhatsApp'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-stone-500 space-y-3">
            <p>{t.orderTracking?.notFound}</p>
          </div>
        )}
      </div>
    </div>
  );
};
