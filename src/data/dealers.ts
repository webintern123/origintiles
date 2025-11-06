// Dealer/Showroom data for Dealers Locator Page with District-level filtering and Worldwide expansion support

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
  district: string; // District-level filtering
  state: string;
  country: string; // For worldwide expansion
  pincode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timings: string;
  collections: string[]; // Updated from brands to match Origin Tiles structure
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
  services?: string[]; // Additional services offered
  languages?: string[]; // Languages spoken
}

export const dealers: Dealer[] = [
  // ===== MAHARASHTRA - MUMBAI DISTRICT =====
  {
    id: "dealer-1",
    name: "Origin Tiles Flagship Showroom - Bandra",
    type: "Flagship Showroom",
    category: "Showroom",
    address: "123, Linking Road, Bandra West",
    city: "Mumbai",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    country: "India",
    pincode: "400050",
    phone: "+91 22 2640 1234",
    email: "bandra@origintiles.com",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression", "Industrial Chic", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.9,
    reviews: 542,
    services: ["Free Design Consultation", "Home Visit", "Installation Service", "3D Visualization"],
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: "dealer-2",
    name: "Origin Tiles Experience Center - Andheri",
    type: "Experience Center",
    category: "Showroom",
    address: "456, Veera Desai Road, Andheri West",
    city: "Mumbai",
    district: "Mumbai Suburban",
    state: "Maharashtra",
    country: "India",
    pincode: "400053",
    phone: "+91 22 2673 4567",
    email: "andheri@origintiles.com",
    coordinates: { lat: 19.1358, lng: 72.8354 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.8,
    reviews: 389,
    services: ["AR Visualization", "Free Samples", "Installation Service", "Design Consultation"],
    languages: ["English", "Hindi", "Gujarati"]
  },
  
  // ===== MAHARASHTRA - PUNE DISTRICT =====
  {
    id: "dealer-3",
    name: "City Tiles & Sanitaryware - Pune",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "234, FC Road, Shivajinagar",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411005",
    phone: "+91 20 2553 2345",
    email: "pune@citytiles.com",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    timings: "Mon-Sat: 9:30 AM - 7:30 PM, Sun: Closed",
    collections: ["Timeless Elegance", "Modern Minimalist", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.6,
    reviews: 234,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Marathi"]
  },
  {
    id: "dealer-4",
    name: "Origin Tiles Showroom - Viman Nagar",
    type: "Exclusive Showroom",
    category: "Showroom",
    address: "789, Phoenix Market City, Viman Nagar",
    city: "Pune",
    district: "Pune",
    state: "Maharashtra",
    country: "India",
    pincode: "411014",
    phone: "+91 20 4567 8901",
    email: "vimannagar@origintiles.com",
    coordinates: { lat: 18.5679, lng: 73.9143 },
    timings: "Mon-Sun: 11:00 AM - 9:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.7,
    reviews: 298,
    services: ["Free Design Consultation", "Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Marathi"]
  },

  // ===== DELHI NCR =====
  {
    id: "dealer-5",
    name: "Origin Tiles Premium Store - Nehru Place",
    type: "Flagship Showroom",
    category: "Showroom",
    address: "45, Nehru Place, South Delhi",
    city: "New Delhi",
    district: "South Delhi",
    state: "Delhi",
    country: "India",
    pincode: "110019",
    phone: "+91 11 2644 5678",
    email: "nehruplace@origintiles.com",
    coordinates: { lat: 28.5494, lng: 77.2501 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: Closed",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.8,
    reviews: 398,
    services: ["Free Design Consultation", "Home Visit", "Installation Service", "3D Visualization"],
    languages: ["English", "Hindi"]
  },
  {
    id: "dealer-6",
    name: "Elite Tiles Gallery - Gurgaon",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "123, Sector 29, MG Road",
    city: "Gurgaon",
    district: "Gurgaon",
    state: "Haryana",
    country: "India",
    pincode: "122001",
    phone: "+91 124 4567 890",
    email: "gurgaon@elitetiles.com",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    timings: "Mon-Sat: 10:00 AM - 7:30 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Modern Minimalist", "Industrial Chic", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.5,
    reviews: 187,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi"]
  },

  // ===== KARNATAKA - BANGALORE =====
  {
    id: "dealer-7",
    name: "Origin Tiles Showroom - Bangalore",
    type: "Flagship Showroom",
    category: "Showroom",
    address: "78, MG Road, Ashok Nagar",
    city: "Bangalore",
    district: "Bangalore Urban",
    state: "Karnataka",
    country: "India",
    pincode: "560025",
    phone: "+91 80 2550 9012",
    email: "mgroad@origintiles.com",
    coordinates: { lat: 12.9716, lng: 77.5946 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.9,
    reviews: 467,
    services: ["Free Design Consultation", "Home Visit", "Installation Service", "AR Visualization"],
    languages: ["English", "Hindi", "Kannada"]
  },
  {
    id: "dealer-8",
    name: "Modern Tiles Hub - Whitefield",
    type: "Partner Store",
    category: "Dealer",
    address: "234, ITPL Main Road, Whitefield",
    city: "Bangalore",
    district: "Bangalore Urban",
    state: "Karnataka",
    country: "India",
    pincode: "560066",
    phone: "+91 80 4123 5678",
    email: "whitefield@moderntiles.com",
    coordinates: { lat: 12.9698, lng: 77.7499 },
    timings: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed",
    collections: ["Modern Minimalist", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.4,
    reviews: 156,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Kannada", "Tamil"]
  },

  // ===== TELANGANA - HYDERABAD =====
  {
    id: "dealer-9",
    name: "Premium Tiles Gallery - Banjara Hills",
    type: "Exclusive Showroom",
    category: "Showroom",
    address: "56, Banjara Hills Road No. 12",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500034",
    phone: "+91 40 2339 6789",
    email: "banjarahills@premiumtiles.com",
    coordinates: { lat: 17.4065, lng: 78.4772 },
    timings: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: 11:00 AM - 5:00 PM",
    collections: ["Modern Minimalist", "Natural Stone", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.7,
    reviews: 289,
    services: ["Free Design Consultation", "Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: "dealer-10",
    name: "Origin Tiles - Madhapur",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "123, Hitech City Main Road, Madhapur",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    country: "India",
    pincode: "500081",
    phone: "+91 40 4567 1234",
    email: "madhapur@origintiles.com",
    coordinates: { lat: 17.4485, lng: 78.3908 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.6,
    reviews: 198,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Telugu"]
  },

  // ===== TAMIL NADU - CHENNAI =====
  {
    id: "dealer-11",
    name: "Origin Tiles Experience Center - Chennai",
    type: "Experience Center",
    category: "Showroom",
    address: "789, Anna Salai, Teynampet",
    city: "Chennai",
    district: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    pincode: "600018",
    phone: "+91 44 2434 5678",
    email: "chennai@origintiles.com",
    coordinates: { lat: 13.0358, lng: 80.2502 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.8,
    reviews: 356,
    services: ["Free Design Consultation", "AR Visualization", "Installation Service", "3D Visualization"],
    languages: ["English", "Hindi", "Tamil"]
  },

  // ===== GUJARAT - AHMEDABAD =====
  {
    id: "dealer-12",
    name: "Royal Tiles & Marbles - Ahmedabad",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "456, CG Road, Navrangpura",
    city: "Ahmedabad",
    district: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    pincode: "380009",
    phone: "+91 79 2640 3456",
    email: "ahmedabad@royaltiles.com",
    coordinates: { lat: 23.0359, lng: 72.5566 },
    timings: "Mon-Sat: 9:30 AM - 7:30 PM, Sun: Closed",
    collections: ["Timeless Elegance", "Natural Stone", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.5,
    reviews: 178,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Gujarati"]
  },

  // ===== WEST BENGAL - KOLKATA =====
  {
    id: "dealer-13",
    name: "Origin Tiles Premium Store - Kolkata",
    type: "Exclusive Showroom",
    category: "Showroom",
    address: "123, Park Street, Park Street Area",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    country: "India",
    pincode: "700016",
    phone: "+91 33 2229 5678",
    email: "kolkata@origintiles.com",
    coordinates: { lat: 22.5548, lng: 88.3515 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Artistic Expression", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.7,
    reviews: 312,
    services: ["Free Design Consultation", "Home Visit", "Installation Service"],
    languages: ["English", "Hindi", "Bengali"]
  },

  // ===== RAJASTHAN - JAIPUR =====
  {
    id: "dealer-14",
    name: "Heritage Tiles - Jaipur",
    type: "Partner Store",
    category: "Dealer",
    address: "234, MI Road, Jaipur",
    city: "Jaipur",
    district: "Jaipur",
    state: "Rajasthan",
    country: "India",
    pincode: "302001",
    phone: "+91 141 2367 890",
    email: "jaipur@heritagetiles.com",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    timings: "Mon-Sat: 10:00 AM - 7:00 PM, Sun: Closed",
    collections: ["Timeless Elegance", "Natural Stone", "Artistic Expression"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.6,
    reviews: 145,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi"]
  },

  // ===== KERALA - KOCHI =====
  {
    id: "dealer-15",
    name: "Coastal Tiles Gallery - Kochi",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "567, MG Road, Ernakulam",
    city: "Kochi",
    district: "Ernakulam",
    state: "Kerala",
    country: "India",
    pincode: "682016",
    phone: "+91 484 2398 765",
    email: "kochi@coastaltiles.com",
    coordinates: { lat: 9.9816, lng: 76.2999 },
    timings: "Mon-Sat: 9:30 AM - 7:30 PM, Sun: 10:00 AM - 5:00 PM",
    collections: ["Modern Minimalist", "Natural Stone", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.5,
    reviews: 167,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Malayalam"]
  },

  // ===== PUNJAB - CHANDIGARH =====
  {
    id: "dealer-16",
    name: "Modern Interiors - Chandigarh",
    type: "Distributor",
    category: "Distributor",
    address: "890, Sector 17, Chandigarh",
    city: "Chandigarh",
    district: "Chandigarh",
    state: "Chandigarh",
    country: "India",
    pincode: "160017",
    phone: "+91 172 2704 567",
    email: "chandigarh@moderninteriors.com",
    coordinates: { lat: 30.7410, lng: 76.7791 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Industrial Chic", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.7,
    reviews: 234,
    services: ["Free Design Consultation", "Bulk Orders", "Project Supply", "Installation Service"],
    languages: ["English", "Hindi", "Punjabi"]
  },

  // ===== ANDHRA PRADESH =====
  {
    id: "dealer-17",
    name: "Origin Tiles Flagship Showroom - Visakhapatnam",
    type: "Flagship Showroom",
    category: "Showroom",
    address: "Beach Road, Opposite RTC Complex, Dwaraka Nagar",
    city: "Visakhapatnam",
    district: "Visakhapatnam",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "530016",
    phone: "+91 891 2756 789",
    email: "visakhapatnam@origintiles.com",
    coordinates: { lat: 17.7231, lng: 83.3012 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 7:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Artistic Expression", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.8,
    reviews: 328,
    services: ["Free Design Consultation", "Home Visit", "Installation Service", "3D Visualization"],
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: "dealer-18",
    name: "Origin Tiles Experience Center - Vijayawada",
    type: "Experience Center",
    category: "Showroom",
    address: "MG Road, Labbipet, Near Gandhi Nagar",
    city: "Vijayawada",
    district: "Krishna",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "520010",
    phone: "+91 866 2442 456",
    email: "vijayawada@origintiles.com",
    coordinates: { lat: 16.5062, lng: 80.6480 },
    timings: "Mon-Sat: 10:00 AM - 8:00 PM, Sun: 11:00 AM - 6:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Natural Stone", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.7,
    reviews: 267,
    services: ["AR Visualization", "Free Samples", "Installation Service", "Design Consultation"],
    languages: ["English", "Hindi", "Telugu"]
  },
  {
    id: "dealer-19",
    name: "Sacred City Tiles - Tirupati",
    type: "Authorized Dealer",
    category: "Dealer",
    address: "Renigunta Road, AIR Bypass Road",
    city: "Tirupati",
    district: "Chittoor",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "517501",
    phone: "+91 877 2287 345",
    email: "tirupati@sacredcitytiles.com",
    coordinates: { lat: 13.6288, lng: 79.4192 },
    timings: "Mon-Sat: 9:30 AM - 7:30 PM, Sun: 10:00 AM - 5:00 PM",
    collections: ["Timeless Elegance", "Modern Minimalist", "Artistic Expression"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.6,
    reviews: 189,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Telugu", "Tamil"]
  },
  {
    id: "dealer-20",
    name: "Rayalaseema Tiles Gallery - Kadapa",
    type: "Partner Store",
    category: "Dealer",
    address: "Bypass Road, Near APSRTC Bus Stand",
    city: "Kadapa",
    district: "YSR Kadapa",
    state: "Andhra Pradesh",
    country: "India",
    pincode: "516001",
    phone: "+91 8562 225 678",
    email: "kadapa@rayalaseematiles.com",
    coordinates: { lat: 14.4673, lng: 78.8242 },
    timings: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed",
    collections: ["Modern Minimalist", "Natural Stone", "Industrial Chic"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: false,
    rating: 4.5,
    reviews: 143,
    services: ["Free Samples", "Installation Service"],
    languages: ["English", "Hindi", "Telugu"]
  },

  // ===== FUTURE WORLDWIDE LOCATIONS (PLACEHOLDER) =====
  // These can be activated when expanding internationally
  /*
  {
    id: "dealer-int-1",
    name: "Origin Tiles Middle East - Dubai",
    type: "Flagship Showroom",
    category: "Showroom",
    address: "Dubai Design District, Al Khail Road",
    city: "Dubai",
    district: "Dubai",
    state: "Dubai",
    country: "UAE",
    pincode: "00000",
    phone: "+971 4 567 8901",
    email: "dubai@origintiles.com",
    coordinates: { lat: 25.1972, lng: 55.2744 },
    timings: "Sat-Thu: 10:00 AM - 8:00 PM, Fri: Closed",
    collections: ["Timeless Elegance", "Modern Minimalist", "Luxury Collection"],
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    featured: true,
    rating: 4.9,
    reviews: 421,
    services: ["Free Design Consultation", "Home Visit", "Installation Service", "Project Supply"],
    languages: ["English", "Arabic", "Hindi"]
  },
  */
];

// Utility functions for filtering dealers

export const getDealersByCity = (city: string) => {
  return dealers.filter(dealer => 
    dealer.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const getDealersByState = (state: string) => {
  return dealers.filter(dealer => 
    dealer.state.toLowerCase() === state.toLowerCase()
  );
};

export const getDealersByDistrict = (district: string) => {
  return dealers.filter(dealer => 
    dealer.district.toLowerCase() === district.toLowerCase()
  );
};

export const getDealersByCountry = (country: string) => {
  return dealers.filter(dealer => 
    dealer.country.toLowerCase() === country.toLowerCase()
  );
};

export const getDealersByCategory = (category: "Showroom" | "Dealer" | "Distributor") => {
  return dealers.filter(dealer => dealer.category === category);
};

export const getDealersByType = (type: DealerType) => {
  return dealers.filter(dealer => dealer.type === type);
};

export const getFeaturedDealers = () => {
  return dealers.filter(dealer => dealer.featured);
};

export const getDealerById = (id: string) => {
  return dealers.find(dealer => dealer.id === id);
};

// Get unique values for filters
export const getUniqueStates = () => {
  return Array.from(new Set(dealers.map(d => d.state))).sort();
};

export const getUniqueDistricts = (state?: string) => {
  const filtered = state 
    ? dealers.filter(d => d.state === state)
    : dealers;
  return Array.from(new Set(filtered.map(d => d.district))).sort();
};

export const getUniqueCountries = () => {
  return Array.from(new Set(dealers.map(d => d.country))).sort();
};

export const getUniqueCities = (district?: string) => {
  const filtered = district
    ? dealers.filter(d => d.district === district)
    : dealers;
  return Array.from(new Set(filtered.map(d => d.city))).sort();
};

export const getDealerCategories = () => {
  return ["Showroom", "Dealer", "Distributor"] as const;
};

export const getDealerTypes = (): DealerType[] => {
  return [
    "Flagship Showroom",
    "Exclusive Showroom",
    "Experience Center",
    "Authorized Dealer",
    "Distributor",
    "Partner Store"
  ];
};
