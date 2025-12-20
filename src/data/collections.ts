import { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: "c1",
    name: "Luxury Collection",
    brand: "Origin Tiles",
    description: "Elegant designs with premium finishes for high-end interiors.Best for “Luxury Homes & Villas”",
    image: "https://images.unsplash.com/photo-1572596116404-98f227c01ac1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 150,
    bestSuitedFor: ["Luxury homes", "Villas", "Premium interiors"],
    availableFinishes: ["Polished", "Glossy"],
    applications: ["Floors", "Feature Walls"],
    recommended: true
  },
  {
    id: "c2",
    name: "Modern Bathroom Series",
    brand: "Origin Tiles",
    description: "Stylish, slip-safe tiles designed for everyday comfort.Best for “Bathrooms & Wet Areas”",
    image: "https://images.unsplash.com/photo-1695191388188-1141e9f50016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 120,
    bestSuitedFor: ["Bathrooms", "Wet Areas"],
    availableFinishes: ["Matte", "Anti-Slip"],
    applications: ["Walls", "Floors"],
    recommended: true
  },
  {
    id: "c3",
    name: "Kitchen Floor Collection",
    brand: "Origin Tiles",
    description: "Strong, easy-to-maintain tiles built for daily use.Best for “Kitchens & High-Use Areas”",
    image: "https://images.unsplash.com/photo-1589530006797-d67347f18caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 95,
    bestSuitedFor: ["Kitchens", "High-use Areas"],
    availableFinishes: ["Matte", "Semi-polished"],
    applications: ["Floors"],
    recommended: true
  },
  {
    id: "c4",
    name: "Marble Pattern Series",
    brand: "Origin Tiles",
    description: "Marble-inspired designs with long-lasting performance.Best for “Living Rooms & Feature Spaces”",

    image: "https://images.unsplash.com/photo-1708919268837-2b4857323447?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 85,
    bestSuitedFor: ["Living Rooms", "Large Spaces"],
    availableFinishes: ["Polished", "High-Gloss"],
    applications: ["Floors", "Feature Walls"],
    recommended: true
  },
  {
    id: "c5",
    name: "Wood Look Collection",
    brand: "Origin Tiles",
    description: "Natural wood aesthetics with ceramic durability.Best for “Bedrooms & Warm Interiors”",
    image: "https://images.unsplash.com/photo-1684783777567-1866b5221857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 110,
    bestSuitedFor: ["Bedrooms", "Warm Interiors"],
    availableFinishes: ["Textured", "Matte"],
    applications: ["Floors"],
    recommended: true
  },
  {
    id: "c6",
    name: "Designer Wall Series",
    brand: "Origin Tiles",
    description: "Unique patterns that add character to any space.Best for “Accent Walls & Elevations”",
    image: "https://images.unsplash.com/photo-1656646523907-97b094c7e63a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    productCount: 90,
    bestSuitedFor: ["Accent Walls", "Outdoor", "Elevation Areas"],
    availableFinishes: ["Textured", "Matte"],
    applications: ["Walls"],
    recommended: true
  }
];

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(c => c.id === id);
};

export const getCollectionByName = (name: string): Collection | undefined => {
  return collections.find(c => c.name === name);
};
