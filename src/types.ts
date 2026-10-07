export type Language = 'en' | 'te' | 'hi';

export type FabricType =
  | 'Kanchipuram Silk'
  | 'Banarasi Brocade'
  | 'Chanderi Silk'
  | 'Paithani Pure Silk'
  | 'Organza Tissue'
  | 'Tussar Handblock'
  | 'Bandhani Georgette'
  | 'Pure Linen Handloom';

export type OccasionType =
  | 'Bridal & Wedding'
  | 'Festive Celebrations'
  | 'Party & Reception'
  | 'Puja & Rituals'
  | 'Daily Elegance';

export interface ProductReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface SareeProduct {
  id: string;
  code: string;
  name: {
    en: string;
    te: string;
    hi: string;
  };
  subtitle: {
    en: string;
    te: string;
    hi: string;
  };
  fabric: FabricType;
  occasion: OccasionType;
  color: string;
  colorFamily: string;
  colorHex: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  inStock: boolean;
  stockCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isHandloomCertified?: boolean;
  zariType: string;
  weaveOrigin: string;
  length: string; // e.g. "6.3 meters (includes 0.8m unstitched blouse)"
  blouseIncluded: boolean;
  blouseDetails: {
    en: string;
    te: string;
    hi: string;
  };
  careInstructions: {
    en: string;
    te: string;
    hi: string;
  };
  description: {
    en: string;
    te: string;
    hi: string;
  };
  images: string[];
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: SareeProduct;
  quantity: number;
}

export interface FilterState {
  searchQuery: string;
  selectedFabrics: FabricType[];
  selectedOccasions: OccasionType[];
  selectedColors: string[];
  priceRange: [number, number];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
  handloomOnly: boolean;
}

export interface CheckoutCustomerData {
  fullName: string;
  phoneNumber: string;
  alternativePhone: string;
  email: string;
  streetAddress: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  paymentPreference: 'upi' | 'card' | 'netbanking' | 'cod';
  orderNotes: string;
}
