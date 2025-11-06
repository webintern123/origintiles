// Resources data for Resources Page

export interface Resource {
  id: string;
  title: string;
  category: "Guide" | "Brochure" | "Catalog" | "Technical" | "Installation" | "Maintenance";
  description: string;
  fileType: "PDF" | "Video" | "Image";
  fileSize?: string;
  thumbnail: string;
  downloadUrl?: string;
  featured: boolean;
  downloads: number;
}

export const resources: Resource[] = [
  {
    id: "resource-1",
    title: "Complete Tile Installation Guide",
    category: "Installation",
    description: "Comprehensive guide covering tile installation best practices, tools required, and step-by-step instructions for perfect results.",
    fileType: "PDF",
    fileSize: "8.5 MB",
    thumbnail: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: true,
    downloads: 12458
  },
  {
    id: "resource-2",
    title: "2024 Product Catalog - BHL Ceramic",
    category: "Catalog",
    description: "Full product catalog featuring our premium BHL Ceramic collection with specifications, prices, and design inspirations.",
    fileType: "PDF",
    fileSize: "15.2 MB",
    thumbnail: "https://images.unsplash.com/photo-1572596116404-98f227c01ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: true,
    downloads: 18932
  },
  {
    id: "resource-3",
    title: "Tile Care & Maintenance Manual",
    category: "Maintenance",
    description: "Essential guide to maintaining your ceramic tiles, including cleaning techniques, stain removal, and long-term care tips.",
    fileType: "PDF",
    fileSize: "3.2 MB",
    thumbnail: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: true,
    downloads: 9876
  },
  {
    id: "resource-4",
    title: "Choosing the Right Tile - Buyer's Guide",
    category: "Guide",
    description: "Expert advice on selecting the perfect tiles for your space, covering material types, finishes, sizes, and design considerations.",
    fileType: "PDF",
    fileSize: "5.8 MB",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 7543
  },
  {
    id: "resource-5",
    title: "Technical Specifications - All Collections",
    category: "Technical",
    description: "Detailed technical specifications including water absorption, breaking strength, slip resistance, and chemical resistance data.",
    fileType: "PDF",
    fileSize: "4.1 MB",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 5234
  },
  {
    id: "resource-6",
    title: "Origin Tiles Company Brochure",
    category: "Brochure",
    description: "Complete company profile featuring our story, manufacturing capabilities, certifications, and commitment to quality.",
    fileType: "PDF",
    fileSize: "6.7 MB",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 4567
  },
  {
    id: "resource-7",
    title: "How to Install Subway Tiles - Video Tutorial",
    category: "Installation",
    description: "Step-by-step video demonstration showing professional installation techniques for subway tiles in kitchen backsplashes.",
    fileType: "Video",
    thumbnail: "https://images.unsplash.com/photo-1590474504715-91ae491e4938?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: true,
    downloads: 15678
  },
  {
    id: "resource-8",
    title: "Kenyh Ceramic - Modern Collection Catalog",
    category: "Catalog",
    description: "Explore the complete Kenyh Ceramic modern collection featuring contemporary designs and innovative patterns.",
    fileType: "PDF",
    fileSize: "12.4 MB",
    thumbnail: "https://images.unsplash.com/photo-1741335661519-316ae1e31b03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 8934
  },
  {
    id: "resource-9",
    title: "Bathroom Tile Design Ideas",
    category: "Guide",
    description: "Inspirational guide featuring bathroom design trends, tile pattern ideas, and color combination suggestions.",
    fileType: "PDF",
    fileSize: "9.3 MB",
    thumbnail: "https://images.unsplash.com/photo-1620626011761-996317b8d101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 11245
  },
  {
    id: "resource-10",
    title: "Grout Selection & Application Guide",
    category: "Technical",
    description: "Technical guide covering grout types, color selection, mixing ratios, and proper application techniques.",
    fileType: "PDF",
    fileSize: "2.8 MB",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80",
    downloadUrl: "#",
    featured: false,
    downloads: 6123
  }
];

export const getResourcesByCategory = (category: Resource["category"]) => {
  return resources.filter(resource => resource.category === category);
};

export const getFeaturedResources = () => {
  return resources.filter(resource => resource.featured);
};

export const getResourceById = (id: string) => {
  return resources.find(resource => resource.id === id);
};

export const getPopularResources = (limit: number = 5) => {
  return resources
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
};
