/**
 * SEO and Meta Tags Configuration
 * Origin Tiles - Premium Ceramic Tiles
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SITE_NAME = 'Origin Tiles';
const SITE_URL = 'https://origintiles.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const BRAND_COLOR = '#223B57';

/**
 * Default SEO configuration
 */
export const DEFAULT_SEO: SEOConfig = {
  title: 'Origin Tiles - Premium Ceramic Tiles | Quality & Innovation',
  description: 'Discover premium ceramic tiles from Origin Tiles. 6 exclusive collections featuring urban, natural, marble, metro, terracotta, and geometric designs. Quality craftsmanship meets modern innovation.',
  keywords: [
    'ceramic tiles',
    'premium tiles',
    'floor tiles',
    'wall tiles',
    'bathroom tiles',
    'kitchen tiles',
    'Origin Tiles',
    'tile collections',
    'interior design tiles',
    'home renovation tiles'
  ],
  image: DEFAULT_IMAGE,
  url: SITE_URL,
  type: 'website'
};

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO: Record<string, SEOConfig> = {
  Home: {
    title: 'Origin Tiles - Premium Ceramic Tiles | Quality & Innovation',
    description: 'Explore 6 exclusive tile collections from Origin Tiles. Modern designs, superior quality, and innovative solutions for your dream space. Free samples available.',
    keywords: ['ceramic tiles', 'premium tiles', 'tile collections', 'Origin Tiles', 'floor tiles', 'wall tiles'],
    type: 'website'
  },

  Products: {
    title: 'All Tile Collections - Origin Tiles',
    description: 'Browse our complete range of premium ceramic tiles. 6 distinct collections featuring 60+ unique designs for floors, walls, kitchens, and bathrooms.',
    keywords: ['tile catalog', 'ceramic tile collections', 'floor tiles', 'wall tiles', 'bathroom tiles', 'kitchen tiles'],
    type: 'website'
  },

  About: {
    title: 'About Us - Origin Tiles | Our Story & Values',
    description: 'Learn about Origin Tiles - a leader in premium ceramic tiles since [year]. Committed to quality, innovation, and sustainability in every tile we create.',
    keywords: ['about Origin Tiles', 'tile manufacturer', 'ceramic tile company', 'tile quality', 'sustainable tiles'],
    type: 'website'
  },

  Contact: {
    title: 'Contact Us - Origin Tiles | Get in Touch',
    description: 'Contact Origin Tiles for product inquiries, design consultations, or dealer information. Call +91 9093833833 or visit our showroom. 24/7 customer support.',
    keywords: ['contact Origin Tiles', 'tile inquiry', 'customer support', 'tile consultation', 'showroom location'],
    type: 'website'
  },

  Blog: {
    title: 'Tile Blog - Design Ideas & Tips | Origin Tiles',
    description: 'Expert insights on tile design, installation tips, trends, and inspiration. Learn from Origin Tiles professionals about creating beautiful spaces.',
    keywords: ['tile blog', 'tile design ideas', 'installation tips', 'tile trends', 'interior design'],
    type: 'website'
  },

  'Sample Request': {
    title: 'Request Free Tile Samples - Origin Tiles',
    description: 'Order free tile samples from Origin Tiles. Up to 3 samples delivered to your doorstep. Expert consultation included. Experience our quality firsthand.',
    keywords: ['tile samples', 'free samples', 'request samples', 'tile swatches', 'Origin Tiles samples'],
    type: 'website'
  },

  'Dealers Locator': {
    title: 'Find a Dealer - Origin Tiles Authorized Dealers',
    description: 'Locate authorized Origin Tiles dealers near you. 150+ dealers across 28+ states in India and worldwide. Find expert guidance and authentic products.',
    keywords: ['tile dealers', 'Origin Tiles dealers', 'authorized dealers', 'tile showrooms', 'find dealer'],
    type: 'website'
  },

  Visualization: {
    title: '3D Tile Visualizer - See Your Space in Real-Time | Origin Tiles',
    description: 'Visualize tiles in your space with our advanced 3D and VR technology. Try different collections, patterns, and layouts before you buy.',
    keywords: ['tile visualizer', '3D tile viewer', 'VR tile tool', 'tile preview', 'virtual room designer'],
    type: 'website'
  },

  'Tile Calculator': {
    title: 'Tile Calculator - Estimate Tiles & Cost | Origin Tiles',
    description: 'Calculate exactly how many tiles you need with our advanced tile calculator. Get instant cost estimates, wastage calculations, and expert recommendations.',
    keywords: ['tile calculator', 'how many tiles', 'tile quantity calculator', 'tile cost estimate', 'floor area calculator'],
    type: 'website'
  },

  FAQ: {
    title: 'Frequently Asked Questions - Origin Tiles Help Center',
    description: 'Find answers to common questions about tile selection, installation, maintenance, warranty, and more. Get expert help from Origin Tiles.',
    keywords: ['tile FAQ', 'tile questions', 'tile help', 'installation questions', 'maintenance guide'],
    type: 'website'
  },

  Warranty: {
    title: 'Warranty Information - Origin Tiles Quality Guarantee',
    description: '20-year warranty on all Origin Tiles products. Comprehensive coverage, easy claims process, and dedicated support for residential and commercial use.',
    keywords: ['tile warranty', 'product guarantee', 'warranty coverage', 'quality assurance', 'warranty claim'],
    type: 'website'
  },

  'Download Center': {
    title: 'Download Center - Catalogs, Brochures & Technical Specs',
    description: 'Download product catalogs, installation guides, technical specifications, care manuals, and design inspiration from Origin Tiles.',
    keywords: ['tile catalog download', 'product brochures', 'technical specs', 'installation guide', 'tile resources'],
    type: 'website'
  }
};

/**
 * Collection-specific SEO
 */
export const COLLECTION_SEO: Record<string, Partial<SEOConfig>> = {
  'urban-canvas': {
    title: 'Urban Canvas Collection - Contemporary Concrete Tiles | Origin Tiles',
    description: 'Explore Urban Canvas - modern concrete-effect ceramic tiles. Perfect for industrial-chic interiors, minimalist spaces, and contemporary designs.',
    keywords: ['urban tiles', 'concrete tiles', 'industrial tiles', 'contemporary tiles', 'modern floor tiles']
  },
  'natura-stone': {
    title: 'Natura Stone Collection - Natural Stone Effect Tiles | Origin Tiles',
    description: 'Natura Stone collection features authentic stone-look ceramic tiles. Natural beauty with easy maintenance for elegant, timeless spaces.',
    keywords: ['stone effect tiles', 'natural tiles', 'stone look tiles', 'travertine tiles', 'slate tiles']
  },
  'marble-luxe': {
    title: 'Marble Luxe Collection - Premium Marble Effect Tiles | Origin Tiles',
    description: 'Marble Luxe offers luxury marble-look tiles at affordable prices. Italian-inspired designs with superior durability and stunning veining.',
    keywords: ['marble tiles', 'luxury tiles', 'marble effect', 'Italian marble tiles', 'premium tiles']
  },
  'metro-chic': {
    title: 'Metro Chic Collection - Classic Subway Tiles | Origin Tiles',
    description: 'Metro Chic features timeless subway tiles in various finishes. Perfect for kitchens, bathrooms, and accent walls with endless pattern possibilities.',
    keywords: ['subway tiles', 'metro tiles', 'kitchen tiles', 'bathroom tiles', 'classic tiles']
  },
  'terracotta-heritage': {
    title: 'Terracotta Heritage Collection - Rustic Terracotta Tiles | Origin Tiles',
    description: 'Terracotta Heritage brings warmth with authentic terracotta-look tiles. Perfect for Mediterranean, rustic, and traditional interiors.',
    keywords: ['terracotta tiles', 'rustic tiles', 'Mediterranean tiles', 'traditional tiles', 'warm tiles']
  },
  'geometric-fusion': {
    title: 'Geometric Fusion Collection - Bold Pattern Tiles | Origin Tiles',
    description: 'Geometric Fusion features bold patterns and modern geometry. Make a statement with eye-catching designs for floors and feature walls.',
    keywords: ['geometric tiles', 'pattern tiles', 'decorative tiles', 'bold tiles', 'statement tiles']
  }
};

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    image = DEFAULT_IMAGE,
    url = SITE_URL,
    type = 'website',
    author = SITE_NAME,
    publishedTime,
    modifiedTime
  } = config;

  return {
    // Basic Meta Tags
    title,
    description,
    keywords: keywords.join(', '),
    author,
    
    // Open Graph (Facebook, LinkedIn)
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'og:locale': 'en_IN',
    
    // Twitter Card
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
    'twitter:site': '@origintiles',
    'twitter:creator': '@origintiles',
    
    // Article Meta (for blog posts)
    ...(type === 'article' && {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': author
    }),
    
    // Additional Meta
    'theme-color': BRAND_COLOR,
    'msapplication-TileColor': BRAND_COLOR,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  };
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateStructuredData(type: 'organization' | 'product' | 'article' | 'breadcrumb', data?: any) {
  const baseUrl = SITE_URL;

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: DEFAULT_SEO.description,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-9093833833',
          contactType: 'Customer Service',
          availableLanguage: ['en', 'hi']
        },
        sameAs: [
          'https://facebook.com/origintiles',
          'https://instagram.com/origintiles',
          'https://linkedin.com/company/origintiles',
          'https://twitter.com/origintiles'
        ]
      };

    case 'product':
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data?.name || 'Origin Tiles Product',
        description: data?.description || '',
        image: data?.image || DEFAULT_IMAGE,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'INR',
          seller: {
            '@type': 'Organization',
            name: SITE_NAME
          }
        }
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data?.title || '',
        description: data?.description || '',
        image: data?.image || DEFAULT_IMAGE,
        author: {
          '@type': 'Organization',
          name: SITE_NAME
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`
          }
        },
        datePublished: data?.publishedTime || new Date().toISOString(),
        dateModified: data?.modifiedTime || new Date().toISOString()
      };

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data?.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`
        })) || []
      };

    default:
      return {};
  }
}

/**
 * Get SEO config for a specific page
 */
export function getPageSEO(pageName: string, customConfig?: Partial<SEOConfig>): SEOConfig {
  const baseSEO = PAGE_SEO[pageName] || DEFAULT_SEO;
  
  return {
    ...baseSEO,
    ...customConfig,
    image: customConfig?.image || baseSEO.image || DEFAULT_IMAGE,
    url: customConfig?.url || `${SITE_URL}/${pageName.toLowerCase().replace(/\s+/g, '-')}`
  };
}

/**
 * Get collection SEO config
 */
export function getCollectionSEO(collectionSlug: string, customConfig?: Partial<SEOConfig>): SEOConfig {
  const collectionSEO = COLLECTION_SEO[collectionSlug] || {};
  
  return {
    ...DEFAULT_SEO,
    ...collectionSEO,
    ...customConfig,
    url: `${SITE_URL}/collection/${collectionSlug}`
  };
}
