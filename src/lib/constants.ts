/**
 * Business Logic Constants
 * Centralized constants for business rules and calculations
 */

export const BUSINESS_CONSTANTS = {
  // Tile Calculator
  TILE_WASTAGE_PERCENTAGE: 10,
  MIN_TILE_SIZE: 100, // mm
  MAX_TILE_SIZE: 2400, // mm
  
  // Sample Request
  MIN_SAMPLE_QUANTITY: 1,
  MAX_SAMPLE_QUANTITY: 5,
  FREE_SAMPLE_THRESHOLD: 3,
  
  // Dealer Locator
  DEFAULT_MAP_ZOOM: 12,
  DEALER_SEARCH_RADIUS: 50, // km
  
  // Products
  PRODUCTS_PER_PAGE: 12,
  MAX_COMPARE_ITEMS: 4,
  
  // Recently Viewed
  MAX_RECENT_ITEMS: 5,
  RECENT_ITEMS_EXPIRY: 30 * 24 * 60 * 60 * 1000, // 30 days
} as const;

export const BRAND_INFO = {
  name: "Origin Tiles",
  phone: "+91 9098383833",
  email: "info@origintiles.com",
  address: "Origin Tiles Manufacturing Pvt. Ltd.",
  brandColor: "#223b57",
  brandColorHover: "#2a4561",
} as const;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;
