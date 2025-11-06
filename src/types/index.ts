// Core Type Definitions for Origin Tiles Website

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  size: string;
  finish: string;
  price: string;
  image: string;
  description?: string;
  features?: string[];
  specifications?: {
    [key: string]: string | undefined;
    Trend?: string;
  };
  badge?: string;
}

export interface Collection {
  id: string;
  name: string;
  brand: string;
  description: string;
  image: string;
  productCount?: number;
}



export interface NavigationItem {
  name: string;
  page: string;
  icon?: any;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt?: string;
  category?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export type DealerType = 
  | "Flagship Showroom"
  | "Exclusive Showroom" 
  | "Authorized Dealer"
  | "Distributor"
  | "Partner Store"
  | "Experience Center";

export interface Dealer {
  id: string;
  name: string;
  type: DealerType;
  category: "Showroom" | "Dealer" | "Distributor";
  address: string;
  city: string;
  district: string;
  state: string;
  country: string;
  pincode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timings: string;
  collections: string[];
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
  services?: string[];
  languages?: string[];
}

export type PageName = 
  | "Home"
  | "About"
  | "Collection"
  | "Products"
  | "Product Details"
  | "Tile Calculator"
  | "Visualization"
  | "Tile Quiz"
  | "Dealers Locator"
  | "Blog"
  | "Contact"
  | "FAQ"
  | "Sample Request"
  | "Resources"
  | "Warranty"
  | "Privacy Policy"
  | "Terms & Conditions"
  | "Sitemap"
  | "404";
