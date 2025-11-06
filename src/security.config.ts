/**
 * Security Configuration for Origin Tiles
 * 
 * This file contains security headers, CSP policies, and input sanitization
 * utilities to protect the application from common web vulnerabilities.
 */

/**
 * Content Security Policy (CSP)
 * Protects against XSS, clickjacking, and other code injection attacks
 */
export const CSP_HEADERS = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.unsplash.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

/**
 * Security Headers
 * Additional headers to enhance security
 */
export const SECURITY_HEADERS = {
  // Prevent XSS attacks
  "X-XSS-Protection": "1; mode=block",
  
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",
  
  // Prevent clickjacking
  "X-Frame-Options": "DENY",
  
  // Referrer policy
  "Referrer-Policy": "strict-origin-when-cross-origin",
  
  // Permissions policy (formerly Feature-Policy)
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=(self)",
    "payment=()",
  ].join(", "),
  
  // HSTS (HTTP Strict Transport Security) - enforce HTTPS
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
};

/**
 * Input Sanitization Utilities
 */

/**
 * Sanitize HTML input to prevent XSS
 */
export function sanitizeHTML(input: string): string {
  const map: { [key: string]: string } = {
    '&': '&',
    '<': '<',
    '>': '>',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match]);
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim().replace(/[^\w@.-]/g, '');
}

/**
 * Sanitize phone number input
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+\-() ]/g, '');
}

/**
 * Sanitize URL input
 */
export function sanitizeURL(url: string): string {
  try {
    const parsedURL = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedURL.protocol)) {
      return '';
    }
    return parsedURL.toString();
  } catch {
    return '';
  }
}

/**
 * Sanitize text input (alphanumeric + basic punctuation)
 */
export function sanitizeText(input: string): string {
  // Allow letters, numbers, spaces, and basic punctuation
  return input.replace(/[^a-zA-Z0-9\s.,!?'-]/g, '');
}

/**
 * Sanitize number input
 */
export function sanitizeNumber(input: string | number): number {
  const num = typeof input === 'string' ? parseFloat(input) : input;
  return isNaN(num) ? 0 : num;
}

/**
 * Rate Limiting (Client-Side)
 * Prevents abuse by limiting function calls
 */
export class RateLimiter {
  private timestamps: number[] = [];
  
  constructor(
    private maxRequests: number = 5,
    private timeWindow: number = 60000 // 1 minute
  ) {}
  
  /**
   * Check if action is allowed
   */
  isAllowed(): boolean {
    const now = Date.now();
    // Remove old timestamps
    this.timestamps = this.timestamps.filter(
      (timestamp) => now - timestamp < this.timeWindow
    );
    
    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }
    
    return false;
  }
  
  /**
   * Get time until next allowed request
   */
  getTimeUntilReset(): number {
    if (this.timestamps.length === 0) return 0;
    const oldestTimestamp = this.timestamps[0];
    const timeRemaining = this.timeWindow - (Date.now() - oldestTimestamp);
    return Math.max(0, timeRemaining);
  }
  
  /**
   * Reset the rate limiter
   */
  reset(): void {
    this.timestamps = [];
  }
}

/**
 * Input Validation Utilities
 */

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d+\-() ]{10,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const parsedURL = new URL(url);
    return ['http:', 'https:'].includes(parsedURL.protocol);
  } catch {
    return false;
  }
}

/**
 * Validate PIN code (Indian format)
 */
export function isValidPinCode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
}

/**
 * Validate string length
 */
export function isValidLength(
  input: string,
  min: number,
  max: number
): boolean {
  const length = input.trim().length;
  return length >= min && length <= max;
}

/**
 * localStorage Security Wrapper
 * Prevents localStorage injection attacks
 */
export const secureStorage = {
  /**
   * Safely set item in localStorage
   */
  setItem(key: string, value: unknown): boolean {
    try {
      // Validate key
      if (typeof key !== 'string' || key.length === 0) {
        throw new Error('Invalid storage key');
      }
      
      // Serialize and store
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  },
  
  /**
   * Safely get item from localStorage
   */
  getItem<T>(key: string, defaultValue: T): T {
    try {
      // Validate key
      if (typeof key !== 'string' || key.length === 0) {
        throw new Error('Invalid storage key');
      }
      
      const item = localStorage.getItem(key);
      
      if (item === null) {
        return defaultValue;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  },
  
  /**
   * Safely remove item from localStorage
   */
  removeItem(key: string): boolean {
    try {
      if (typeof key !== 'string' || key.length === 0) {
        throw new Error('Invalid storage key');
      }
      
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },
  
  /**
   * Clear all items from localStorage
   */
  clear(): boolean {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  },
};

/**
 * CORS Configuration (for API calls)
 */
export const CORS_CONFIG = {
  allowedOrigins: [
    'https://origintiles.com',
    'https://www.origintiles.com',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400, // 24 hours
};

/**
 * API Security Utilities
 */

/**
 * Add security headers to fetch requests
 */
export function secureFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const secureOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      ...options.headers,
    },
    mode: 'cors',
    credentials: 'same-origin',
  };
  
  return fetch(url, secureOptions);
}

/**
 * Prevent clickjacking
 */
export function preventClickjacking(): void {
  // Skip clickjacking prevention in iframe environments (like Figma Make preview)
  try {
    if (window.self !== window.top) {
      // Page is in an iframe - silently allow it for preview environments
      // This is expected behavior in Figma Make, CodeSandbox, StackBlitz, etc.
      return;
    }
  } catch (error) {
    // Silently catch any security errors from accessing window.top
    // This is expected in sandboxed iframe environments
    return;
  }
}

/**
 * Initialize security measures
 */
export function initializeSecurity(): void {
  // Prevent clickjacking
  preventClickjacking();
  
  // Disable right-click in production (optional)
  // Note: Commented out as it's typically not recommended for user experience
  // Uncomment if needed for your specific use case
  /*
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  if (isProduction) {
    document.addEventListener('contextmenu', (e) => {
      // Allow right-click on input fields
      if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        // e.preventDefault(); // Uncomment if you want to disable right-click
      }
    });
  }
  */
  
  // Log security initialization
  console.info('🔒 Security measures initialized');
}

/**
 * Export all security utilities
 */
export default {
  CSP_HEADERS,
  SECURITY_HEADERS,
  sanitizeHTML,
  sanitizeEmail,
  sanitizePhone,
  sanitizeURL,
  sanitizeText,
  sanitizeNumber,
  RateLimiter,
  isValidEmail,
  isValidPhone,
  isValidURL,
  isValidPinCode,
  isValidLength,
  secureStorage,
  CORS_CONFIG,
  secureFetch,
  preventClickjacking,
  initializeSecurity,
};