// Constants for Origin Tiles Website
// Centralized configuration and static data

export const SITE_CONFIG = {
  name: "Origin Tiles",
  tagline: "Design. Detail. Durability. Delivered",
  description: "Premium ceramic tiles manufacturer built by experienced professionals with expertise in design excellence and quality craftsmanship.",
  url: "https://origintiles.com",
  email: "info@origintiles.com", 
  phone: "+91 9093833833",
  address: "Plot 3-538, Sri Krishna Heights, 100 feet road, Ayyappa society, Madhapur, Hyderabad 500018",
  city: "Hyderabad",
  state: "Telangana",
  country: "India",
  pincode: "500018",
} as const;

export const CONTACT_INFO = {
  headOffice: {
    name: "Origin Tiles - Head Office",
    address: "Plot 3-538, Sri Krishna Heights, 100 feet road, Ayyappa society, Madhapur, Hyderabad 500018",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500018",
    country: "India",
  },
  general: {
    email: "info@origintiles.com",
    phone: "+91 9093833833",
    address: "Plot 3-538, Sri Krishna Heights, 100 feet road, Ayyappa society, Madhapur, Hyderabad 500018",
  },
  support: {
    email: "support@origintiles.com",
    phone: "+91 9093833833",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM IST",
  },
  sales: {
    email: "sales@origintiles.com",
    phone: "+91 9093833833",
  },
  privacy: {
    email: "privacy@origintiles.com",
    phone: "+91 9093833833",
  },
  legal: {
    email: "legal@origintiles.com",
    phone: "+91 9093833833",
  },
} as const;

export const SOCIAL_MEDIA = {
  facebook: "https://facebook.com/origintiles",
  instagram: "https://instagram.com/origintiles",
  twitter: "https://twitter.com/origintiles",
  linkedin: "https://linkedin.com/company/origintiles",
  pinterest: "https://pinterest.com/origintiles",
  youtube: "https://youtube.com/@origintiles",
} as const;

export const COLLECTIONS = [
  {
    id: "luxury",
    name: "Luxury Collection",
    description: "Premium luxury tiles with sophisticated designs and superior quality finishes",
    established: 1985,
    brand: "Origin Tiles"
  },
  {
    id: "bathroom",
    name: "Modern Bathroom Series",
    description: "Contemporary bathroom tiles combining style with functionality",
    established: 1990,
    brand: "Origin Tiles"
  },
  {
    id: "kitchen",
    name: "Kitchen Floor Collection",
    description: "Durable and stylish floor tiles designed specifically for kitchen spaces",
    established: 1995,
    brand: "Origin Tiles"
  },
  {
    id: "marble",
    name: "Marble Pattern Series",
    description: "Exquisite marble-look tiles offering timeless elegance and luxury",
    established: 2000,
    brand: "Origin Tiles"
  },
  {
    id: "wood",
    name: "Wood Look Collection",
    description: "Natural wood aesthetic with the durability of ceramic tiles",
    established: 2005,
    brand: "Origin Tiles"
  },
  {
    id: "designer",
    name: "Designer Wall Series",
    description: "Artistic wall tiles featuring unique patterns and textures",
    established: 2010,
    brand: "Origin Tiles"
  }
] as const;

// Legacy export for backwards compatibility - will be removed
export const BRANDS = COLLECTIONS;

export const CATEGORIES = [
  { id: "floor", name: "Floor Tiles", icon: "Layers" },
  { id: "wall", name: "Wall Tiles", icon: "Grid" },
  { id: "kitchen", name: "Kitchen Tiles", icon: "ChefHat" },
  { id: "bathroom", name: "Bathroom Tiles", icon: "Droplet" },
  { id: "outdoor", name: "Outdoor Tiles", icon: "Sun" },
  { id: "commercial", name: "Commercial Tiles", icon: "Building" },
] as const;

export const FINISHES = [
  { id: "polished", name: "Polished" },
  { id: "matte", name: "Matte" },
  { id: "glossy", name: "Glossy" },
  { id: "semi-polished", name: "Semi-Polished" },
  { id: "textured", name: "Textured" },
] as const;

export const SIZES = [
  { id: "small", name: "Small", dimensions: "30x30 cm" },
  { id: "medium", name: "Medium", dimensions: "60x60 cm" },
  { id: "large", name: "Large", dimensions: "80x80 cm" },
  { id: "subway", name: "Subway", dimensions: "7.5x15 cm" },
  { id: "plank", name: "Plank", dimensions: "20x120 cm" },
] as const;

export const WARRANTY_YEARS = 10 as const;

export const FEATURES = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "ISO certified manufacturing with highest quality standards",
    icon: "Award",
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "Worldwide shipping with tracking and insurance",
    icon: "Truck",
  },
  {
    id: "warranty",
    title: `${WARRANTY_YEARS}-Year Warranty`,
    description: "Comprehensive warranty on all our ceramic tiles",
    icon: "Shield",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "Expert support team ready to help you anytime",
    icon: "Headphones",
  },
] as const;

export const STATS = {
  yearsExperience: "25",
  totalProducts: "650", // Updated to reflect growing catalog across 6 collections
  countriesServed: "15",
  sqFtInstalled: "50",
  happyCustomers: "10000",
  projectsCompleted: "15000",
  dealerNetwork: "500"
} as const;

export const NAVIGATION = {
  main: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Collection", path: "/collection" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ],
  tools: [
    { name: "Tile Calculator", path: "/tile-calculator" },
    { name: "Visualization", path: "/visualization" },
    { name: "Tile Quiz", path: "/tile-quiz" },
  ],
  resources: [
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Resources", path: "/resources" },
  ],
  company: [
    { name: "Sustainability", path: "/sustainability" },
    { name: "Warranty", path: "/warranty" },
  ],
} as const;

export const LEGAL_PAGES = [
  { name: "Privacy Policy", path: "/privacy-policy", lastUpdated: "2025-10-29" },
  { name: "Terms & Conditions", path: "/terms-conditions", lastUpdated: "2025-10-29" },
  { name: "Sitemap", path: "/sitemap" },
] as const;

export const BUSINESS_HOURS = {
  weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
  saturday: "Saturday: 9:00 AM - 2:00 PM",
  sunday: "Sunday: Closed",
  timezone: "IST (Indian Standard Time)",
} as const;

export const SHIPPING = {
  minOrderValue: 0, // No minimum
  freeShippingThreshold: 50000, // ₹50,000
  estimatedDelivery: "5-10 business days",
  customOrderDelivery: "3-4 weeks",
} as const;

export const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Net Banking",
  "UPI",
  "Cash on Delivery",
] as const;

export const CERTIFICATIONS = [
  { name: "ISO 9001:2015", year: 2022 },
  { name: "ISO 14001:2015", year: 2023 },
  { name: "CE Certification", year: 2021 },
  { name: "Green Building Certification", year: 2023 },
] as const;

export const LEADERSHIP = [
  {
    name: "Rajesh Malhotra",
    role: "CEO & Founder",
    department: "Executive",
    email: "rajesh@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Visionary leader with extensive experience in ceramic manufacturing. Built Origin Tiles with a mission to deliver world-class quality and design excellence.",
    icon: "Briefcase"
  },
  {
    name: "Anita Verma",
    role: "Chief Financial Officer",
    department: "Finance",
    email: "anita@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Strategic financial expert managing operations across 50+ countries. MBA from IIM with extensive experience in global business.",
    icon: "DollarSign"
  },
  {
    name: "Vikram Patel",
    role: "Chief Technology Officer",
    department: "Technology",
    email: "vikram@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Driving digital transformation and AI-powered innovations. Leading the development of cutting-edge visualization and design tools.",
    icon: "Cpu"
  },
  {
    name: "Sarah Mitchell",
    role: "Design Director",
    department: "Creative",
    email: "sarah@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Award-winning designer with expertise in contemporary ceramic aesthetics. Leads creative vision across all 6 premium collections.",
    icon: "Palette"
  },
  {
    name: "Michael Chen",
    role: "Production Head",
    department: "Manufacturing",
    email: "michael@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Expert in lean manufacturing and quality control. Oversees state-of-the-art production facilities and ISO certifications.",
    icon: "Factory"
  },
  {
    name: "Priya Sharma",
    role: "Sales Director",
    department: "Sales",
    email: "priya@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Dynamic sales leader managing global dealer network and B2B partnerships. Achieved exceptional growth in international markets.",
    icon: "TrendingUp"
  },
  {
    name: "Amit Kumar",
    role: "Chief Operating Officer",
    department: "Operations",
    email: "amit@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Operational excellence expert managing supply chain, logistics, and seamless coordination across global operations.",
    icon: "Settings"
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Director",
    department: "Marketing",
    email: "neha@origintiles.com",
    phone: "+91 9093833833",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    bio: "Creative strategist behind Origin Tiles' global brand presence. Expertise in digital marketing and customer engagement.",
    icon: "Megaphone"
  }
] as const;

export const SAMPLE_REQUEST = {
  maxSamplesPerOrder: 5,
  sampleCost: 0, // Free samples
  shippingCost: 200, // ₹200 shipping
  deliveryTime: "3-5 business days",
} as const;

export const TILE_CALCULATOR = {
  defaultWastage: 10, // 10% wastage
  units: ["feet", "meters", "centimeters"],
  shapes: ["rectangle", "square"],
} as const;

export const SLOGANS = [
  "Design. Detail. Durability. Delivered",
  "Where Quality Meets Creativity",
  "More Than Tiles – A Design Partner",
  "Designed for Elegance, Engineered for Strength",
] as const;

export const META = {
  title: "Origin Tiles - Premium Ceramic Tiles Manufacturer",
  description: "Leading manufacturer of premium ceramic tiles built by experienced professionals. Browse our extensive collection of floor, wall, kitchen, and bathroom tiles.",
  keywords: "ceramic tiles, floor tiles, wall tiles, kitchen tiles, bathroom tiles, premium tiles, tile manufacturer, India",
  author: "Origin Tiles",
  ogImage: "/og-image.jpg",
} as const;

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  products: "/api/products",
  collections: "/api/collections",
  dealers: "/api/dealers",
  contact: "/api/contact",
  samples: "/api/samples",
  newsletter: "/api/newsletter",
} as const;

/**
 * Local Storage Keys
 * 
 * Centralized storage keys for localStorage operations.
 * Always use these constants instead of hardcoded strings to maintain consistency.
 * 
 * @example
 * // ✅ Good - Using constants
 * localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(data));
 * 
 * // ❌ Bad - Hardcoded strings
 * localStorage.setItem('favorites', JSON.stringify(data));
 */
export const STORAGE_KEYS = {
  /** User's favorite/saved tiles - prefixed for uniqueness */
  favorites: "origin-tiles-favorites",
  /** Products added to comparison (max 4 items) */
  compare: "origin-tiles-compare",
  /** Recently viewed pages for navigation history */
  recentlyViewed: "recentlyViewed",
  /** User's theme preference (light/dark) */
  theme: "origin-tiles-theme",
} as const;

// Limits
export const LIMITS = {
  maxFavorites: 50,
  maxCompare: 4,
  maxRecentlyViewed: 10,
} as const;