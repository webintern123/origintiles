// Download Center data for Origin Tiles website

export type DownloadCategory = 
  | "Product Catalog"
  | "Technical Specifications"
  | "Installation Guide"
  | "Maintenance Guide"
  | "Brochure"
  | "Certificate"
  | "CAD/BIM Files"
  | "Warranty Document";

export type FileFormat = "PDF" | "ZIP" | "DWG" | "RVT" | "SKP" | "3DS";

export interface Download {
  id: string;
  title: string;
  description: string;
  category: DownloadCategory;
  format: FileFormat;
  fileSize: string;
  pages?: number;
  version?: string;
  lastUpdated: string;
  downloads: number;
  featured: boolean;
  collections?: string[];
  thumbnailUrl: string;
  fileUrl: string; // In production, this would be actual file URLs
  tags: string[];
}

export const downloads: Download[] = [
  // ===== PRODUCT CATALOGS =====
  {
    id: "catalog-1",
    title: "Origin Tiles Complete Product Catalog 2025",
    description: "Comprehensive catalog featuring all 6 collections with high-resolution images, specifications, and design inspiration. Perfect for architects, designers, and homeowners.",
    category: "Product Catalog",
    format: "PDF",
    fileSize: "45 MB",
    pages: 128,
    version: "2025.1",
    lastUpdated: "2025-10-15",
    downloads: 12847,
    featured: true,
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression", "Industrial Chic", "Luxury Collection"],
    thumbnailUrl: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Complete Catalog", "All Collections", "2025", "New Arrivals"]
  },
  {
    id: "catalog-2",
    title: "Timeless Elegance Collection Brochure",
    description: "Dedicated brochure showcasing our premium Timeless Elegance collection with detailed product information, installation suggestions, and room visualizations.",
    category: "Brochure",
    format: "PDF",
    fileSize: "12 MB",
    pages: 24,
    version: "1.0",
    lastUpdated: "2025-09-20",
    downloads: 5432,
    featured: true,
    collections: ["Timeless Elegance"],
    thumbnailUrl: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Timeless Elegance", "Premium", "Marble Look"]
  },
  {
    id: "catalog-3",
    title: "Modern Minimalist Collection Lookbook",
    description: "Sleek lookbook featuring our Modern Minimalist collection with contemporary design concepts and application ideas for modern spaces.",
    category: "Brochure",
    format: "PDF",
    fileSize: "18 MB",
    pages: 32,
    version: "1.0",
    lastUpdated: "2025-09-18",
    downloads: 4891,
    featured: false,
    collections: ["Modern Minimalist"],
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Modern", "Minimalist", "Contemporary"]
  },

  // ===== TECHNICAL SPECIFICATIONS =====
  {
    id: "tech-1",
    title: "Complete Technical Specifications Guide",
    description: "Detailed technical specifications for all Origin Tiles products including dimensions, absorption rates, PEI ratings, slip resistance, and compliance certifications.",
    category: "Technical Specifications",
    format: "PDF",
    fileSize: "8 MB",
    pages: 56,
    version: "2025.1",
    lastUpdated: "2025-10-01",
    downloads: 7654,
    featured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Technical", "Specifications", "Standards", "Compliance"]
  },
  {
    id: "tech-2",
    title: "Natural Stone Collection - Technical Data Sheet",
    description: "Comprehensive technical information specific to our Natural Stone collection including material composition, treatment methods, and performance data.",
    category: "Technical Specifications",
    format: "PDF",
    fileSize: "4 MB",
    pages: 16,
    version: "1.2",
    lastUpdated: "2025-09-25",
    downloads: 3421,
    featured: false,
    collections: ["Natural Stone"],
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Natural Stone", "Technical", "Specifications"]
  },

  // ===== INSTALLATION GUIDES =====
  {
    id: "install-1",
    title: "Professional Installation Guide - All Collections",
    description: "Step-by-step installation instructions covering surface preparation, adhesive selection, grouting techniques, and best practices for all Origin Tiles products.",
    category: "Installation Guide",
    format: "PDF",
    fileSize: "15 MB",
    pages: 48,
    version: "3.0",
    lastUpdated: "2025-10-10",
    downloads: 9876,
    featured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Installation", "How-To", "Professional", "Step-by-Step"]
  },
  {
    id: "install-2",
    title: "Large Format Tiles Installation Guide",
    description: "Specialized guide for installing large format tiles with techniques for handling, lippage prevention, and achieving perfect alignment.",
    category: "Installation Guide",
    format: "PDF",
    fileSize: "6 MB",
    pages: 20,
    version: "2.1",
    lastUpdated: "2025-09-15",
    downloads: 4532,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Large Format", "Installation", "Professional"]
  },
  {
    id: "install-3",
    title: "Bathroom & Wet Areas Installation Guide",
    description: "Specialized installation instructions for bathrooms, showers, and other wet areas including waterproofing requirements and drainage considerations.",
    category: "Installation Guide",
    format: "PDF",
    fileSize: "9 MB",
    pages: 28,
    version: "2.0",
    lastUpdated: "2025-09-10",
    downloads: 6234,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Bathroom", "Wet Areas", "Waterproofing", "Installation"]
  },

  // ===== MAINTENANCE GUIDES =====
  {
    id: "maint-1",
    title: "Complete Tile Care & Maintenance Manual",
    description: "Comprehensive guide to cleaning, maintaining, and protecting your Origin Tiles investment including recommended products and cleaning schedules.",
    category: "Maintenance Guide",
    format: "PDF",
    fileSize: "5 MB",
    pages: 24,
    version: "2.5",
    lastUpdated: "2025-10-05",
    downloads: 8765,
    featured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Maintenance", "Cleaning", "Care", "Protection"]
  },
  {
    id: "maint-2",
    title: "Natural Stone Tiles - Special Care Instructions",
    description: "Specific maintenance guidelines for natural stone tiles including sealing recommendations, stain removal, and preservation techniques.",
    category: "Maintenance Guide",
    format: "PDF",
    fileSize: "3 MB",
    pages: 12,
    version: "1.8",
    lastUpdated: "2025-09-22",
    downloads: 3987,
    featured: false,
    collections: ["Natural Stone"],
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Natural Stone", "Maintenance", "Sealing", "Care"]
  },

  // ===== CAD/BIM FILES =====
  {
    id: "cad-1",
    title: "Complete Product Library - CAD Files",
    description: "AutoCAD files for all Origin Tiles products with accurate dimensions and specifications. Essential for architects and designers.",
    category: "CAD/BIM Files",
    format: "DWG",
    fileSize: "125 MB",
    version: "2025.1",
    lastUpdated: "2025-10-12",
    downloads: 2341,
    featured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["CAD", "AutoCAD", "DWG", "Technical Drawing"]
  },
  {
    id: "bim-1",
    title: "Revit BIM Library - All Collections",
    description: "Complete Revit BIM families for all Origin Tiles products. Compatible with Revit 2020 and newer versions.",
    category: "CAD/BIM Files",
    format: "RVT",
    fileSize: "280 MB",
    version: "2025.1",
    lastUpdated: "2025-10-12",
    downloads: 1876,
    featured: true,
    thumbnailUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["BIM", "Revit", "RVT", "3D Models"]
  },
  {
    id: "3d-1",
    title: "3D Models Package - SketchUp Format",
    description: "High-quality 3D models of Origin Tiles products for SketchUp with realistic textures and materials.",
    category: "CAD/BIM Files",
    format: "SKP",
    fileSize: "195 MB",
    version: "2025.1",
    lastUpdated: "2025-10-08",
    downloads: 1543,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["3D Models", "SketchUp", "Rendering", "Visualization"]
  },

  // ===== CERTIFICATES =====
  {
    id: "cert-1",
    title: "ISO 9001:2015 Quality Management Certificate",
    description: "Official ISO 9001:2015 certification document demonstrating our commitment to quality management and customer satisfaction.",
    category: "Certificate",
    format: "PDF",
    fileSize: "1.2 MB",
    pages: 2,
    version: "2024",
    lastUpdated: "2025-01-15",
    downloads: 2134,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["ISO", "Certificate", "Quality", "Compliance"]
  },
  {
    id: "cert-2",
    title: "Environmental Certifications Package",
    description: "Complete package of environmental certifications including LEED compliance, Green Guard, and sustainable manufacturing certificates.",
    category: "Certificate",
    format: "PDF",
    fileSize: "4.5 MB",
    pages: 12,
    version: "2025",
    lastUpdated: "2025-03-20",
    downloads: 1876,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["LEED", "Green", "Environmental", "Sustainability"]
  },

  // ===== WARRANTY DOCUMENTS =====
  {
    id: "warranty-1",
    title: "Product Warranty Terms & Conditions",
    description: "Complete warranty documentation covering all Origin Tiles products with terms, conditions, and registration information.",
    category: "Warranty Document",
    format: "PDF",
    fileSize: "2.8 MB",
    pages: 8,
    version: "2025.1",
    lastUpdated: "2025-10-01",
    downloads: 5432,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Warranty", "Terms", "Conditions", "Coverage"]
  },
  {
    id: "warranty-2",
    title: "Extended Warranty Registration Form",
    description: "Downloadable form for extending your product warranty coverage. Includes instructions and submission guidelines.",
    category: "Warranty Document",
    format: "PDF",
    fileSize: "850 KB",
    pages: 3,
    version: "1.5",
    lastUpdated: "2025-09-28",
    downloads: 3214,
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600&q=80",
    fileUrl: "#",
    tags: ["Warranty", "Extended", "Registration", "Form"]
  }
];

// Utility functions for filtering downloads

export const getDownloadsByCategory = (category: DownloadCategory) => {
  return downloads.filter(download => download.category === category);
};

export const getFeaturedDownloads = () => {
  return downloads.filter(download => download.featured);
};

export const getDownloadsByCollection = (collection: string) => {
  return downloads.filter(download => 
    download.collections?.includes(collection)
  );
};

export const getDownloadsByFormat = (format: FileFormat) => {
  return downloads.filter(download => download.format === format);
};

export const searchDownloads = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return downloads.filter(download =>
    download.title.toLowerCase().includes(lowerQuery) ||
    download.description.toLowerCase().includes(lowerQuery) ||
    download.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getMostDownloaded = (limit: number = 5) => {
  return [...downloads]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
};

export const getRecentDownloads = (limit: number = 5) => {
  return [...downloads]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, limit);
};

export const getDownloadCategories = (): DownloadCategory[] => {
  return [
    "Product Catalog",
    "Technical Specifications",
    "Installation Guide",
    "Maintenance Guide",
    "Brochure",
    "Certificate",
    "CAD/BIM Files",
    "Warranty Document"
  ];
};

export const getFileFormats = (): FileFormat[] => {
  return ["PDF", "ZIP", "DWG", "RVT", "SKP", "3DS"];
};

export const getCategoryIcon = (category: DownloadCategory): string => {
  const icons: Record<DownloadCategory, string> = {
    "Product Catalog": "BookOpen",
    "Technical Specifications": "FileText",
    "Installation Guide": "Wrench",
    "Maintenance Guide": "Shield",
    "Brochure": "Layers",
    "Certificate": "Award",
    "CAD/BIM Files": "Box",
    "Warranty Document": "FileCheck"
  };
  return icons[category] || "File";
};

export const formatFileSize = (size: string): string => {
  return size;
};

export const formatDownloads = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};
