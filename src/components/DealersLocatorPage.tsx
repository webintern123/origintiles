import { MapPin, Phone, Mail,Layers, PhoneCall,Ruler, Clock, Search,Layers3,Headset,CheckCircle2, Megaphone,Navigation,BadgeCheck, Package,ShieldCheck,Copy, Store,Building2, Users, Award, Star, Filter, X, Globe, Map } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { PageBanner } from "./PageBanner";
import { GoogleMap } from "./GoogleMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";


import { 
  dealers, 
  
  getUniqueStates, 
  getUniqueDistricts,
  getUniqueCountries,
  getDealerCategories,
  getDealerTypes
} from "../data/dealers";

interface DealersLocatorPageProps {
  onNavigate: (page: string) => void;
}

export function DealersLocatorPage({ onNavigate }: DealersLocatorPageProps) {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const countries = useMemo(() => getUniqueCountries(), []);
  const states = useMemo(() => getUniqueStates(), []);
  
  // Districts depend on selected state
  const districts = useMemo(() => {
    return getUniqueDistricts(selectedState !== "all" ? selectedState : undefined);
  }, [selectedState]);
  
  const categories = getDealerCategories();
  const dealerTypes = getDealerTypes();

  // Filter dealers with hierarchical location and category filters
  const filteredDealers = useMemo(() => {
    return dealers.filter(dealer => {
      // Search filter
      const matchesSearch = searchQuery
        ? dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dealer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dealer.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dealer.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dealer.state.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      // Location filters (hierarchical)
      const matchesCountry = selectedCountry === "all" || dealer.country === selectedCountry;
      const matchesState = selectedState === "all" || dealer.state === selectedState;
      const matchesDistrict = selectedDistrict === "all" || dealer.district === selectedDistrict;
      
      // Category filters
      const matchesCategory = selectedCategory === "all" || dealer.category === selectedCategory;
      const matchesType = selectedType === "all" || dealer.type === selectedType;

      return matchesSearch && matchesCountry && matchesState && matchesDistrict && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedCountry, selectedState, selectedDistrict, selectedCategory, selectedType]);

 

   

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountry("all");
    setSelectedState("all");
    setSelectedDistrict("all");
    setSelectedCategory("all");
    setSelectedType("all");
  };

  // Reset district when state changes
  const handleStateChange = (value: string) => {
    setSelectedState(value);
    setSelectedDistrict("all");
  };

  const hasActiveFilters = searchQuery || 
    selectedCountry !== "all" || 
    selectedState !== "all" || 
    selectedDistrict !== "all" ||
    selectedCategory !== "all" || 
    selectedType !== "all";

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PAGE BANNER === */}
      <PageBanner
        title           = "Find an Origin Tiles Partner Near You"
        subtitle        = "Dealers Locator"
        description     = "Locate authorised Origin Tiles dealers across the country for genuine products, expert guidance, and reliable service."
       
        variant         = "image"
        backgroundImage = "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NDcwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        badge           = {`${dealers.length} + Locations Nationwide`}
        breadcrumbs     = {[{ label: 'Dealer Locator' }]}

      />

      {/* === FLOATING BENEFIT CARDS === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Building2,
                title: '24+ Showrooms ',
                description: 'Exclusive Origin Tiles display centres ',
                
              },
              {
                icon: Users,
                title: '30 Authorised Dealers',
                description: 'Trusted dealer network',
               
              },
              {
                icon: Award,
                title: '10+ Distributors   ',
                description: 'Bulk supply for projects and wholesale',
                
              },
              {
                icon: Star,
                title: '20+ Featured Locations',
                description: 'Premium dealer outlets',
                
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6 text-center">
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                      <benefit.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="font-bold text-[#223B57] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-600 group-hover:text-[#223B57] transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  <section className="relative py-24 bg-white ">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>
  
    <div className="container relative z-10">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
          Quick Guide
        </Badge>
  
        <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
          Find an Origin Tiles Dealer Near You
          
        </h2>
  
        <p className="text-lg text-neutral-600 mb-4">
          Use our easy search options to locate the nearest authorised Origin Tiles dealer in just a few steps.
        </p>
      </motion.div>
  
      {/* Technical Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {[
          {
            icon: Map,
            title: "Select Your State",
            description:
              " Choose your state from our growing network across India.",
          },
          {
            icon: MapPin,
            title: "Pick Your District",
            description:
              " Narrow your search by selecting the district closest to you.",
          },
          {
            icon: Filter,
            title: "Choose Dealer Type",
            description:
              " Filter results by Partner, Dealer, or Distributor based on your requirement.",
          },
          {
            icon: Store,
            title: "Connect or Visit",
            description:
              "View dealer details and get in touch for product information or a showroom visit.",
          },
          
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Glass Border */}
              <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none"></div>
  
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                    <item.icon
                      className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
  
                {/* Content */}
                <h3 className="text-xl font-bold text-[#223B57] mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
  <br></br>
     
    </div>
  </section> 

  <section className="relative py-24 bg-white ">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>
  
    <div className="container relative z-10">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
          Our Dealer Network
        </Badge>
  
        <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
         Why Buy from Origin Tiles Authorised Dealers
          
        </h2>
  
        <p className="text-lg text-neutral-600 mb-4">
          Our authorised dealers are trusted partners who offer genuine products and reliable support across India.
        </p>
      </motion.div>
  
      {/* Technical Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {[
          {
            icon: ShieldCheck,
            title: "Authorised & Verified",
            description:
              "All dealers are officially approved and trained by Origin Tiles.",
          },
          {
            icon: BadgeCheck,
            title: "Genuine Products",
            description:
              " Assured quality tiles with proper bills and product details.",
          },
          {
            icon: Users,
            title: "Expert Assistance",
            description:
              "Get help from knowledgeable staff for selection and guidance.",
          },
          {
            icon: MapPin,
            title: "Wide Reach Across India",
            description:
              " Available in 24+ locations across 5 states.",
          },
          
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Glass Border */}
              <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none"></div>
  
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                    <item.icon
                      className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
  
                {/* Content */}
                <h3 className="text-xl font-bold text-[#223B57] mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
  <br></br>
     
    </div>
  </section> 

      {/* === SEARCH & FILTERS SECTION === */}
      <section className="py-12">
        <div className="container">
          {/* === ADVANCED SEARCH HEADING === */}
<div className="text-center max-w-3xl mx-auto mb-8">
  <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
    Advanced Search
  </Badge>

  <h2 className="text-3xl md:text-4xl font-bold text-[#223B57] mb-3">
    Find Dealers Easily with Smart Filters
  </h2>

  <p className="text-sm md:text-base text-neutral-600">
    Search by city and refine results using state, district, or dealer type for quick and accurate results.
  </p>
</div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              
              <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                
                <CardContent className="p-6">
                  
                  {/* Search Bar */}
                  
                  <div className="flex gap-3 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <Input
                        type="text"
                        placeholder="Search by dealer name, city, district, or state..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter className="w-4 h-4" />
                      Filters
                      {hasActiveFilters && (
                        <Badge className="ml-1 h-5 w-5 rounded-full bg-[#223B57] text-white p-0 flex items-center justify-center text-xs">
                          {[
                            searchQuery, 
                            selectedCountry !== "all", 
                            selectedState !== "all", 
                            selectedDistrict !== "all",
                            selectedCategory !== "all",
                            selectedType !== "all"
                          ].filter(Boolean).length}
                        </Badge>
                      )}
                    </Button>
                  </div>

                  {/* Filters Panel */}
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-neutral-200">
                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            {/* Country Filter (for worldwide expansion) */}
                            <div>
                              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-1.5">
                                <Globe className="w-4 h-4" />
                                Country
                              </label>
                              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Countries" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Countries</SelectItem>
                                  {countries.map(country => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* State Filter */}
                            <div>
                              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-1.5">
                                <Map className="w-4 h-4" />
                                State / Province
                              </label>
                              <Select value={selectedState} onValueChange={handleStateChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="All States" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All States</SelectItem>
                                  {states.map(state => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* District Filter (cascading) */}
                            <div>
                              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                District
                              </label>
                              <Select 
                                value={selectedDistrict} 
                                onValueChange={setSelectedDistrict}
                                disabled={selectedState === "all"}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="All Districts" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Districts</SelectItem>
                                  {districts.map(district => (
                                    <SelectItem key={district} value={district}>
                                      {district}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            {/* Category Filter */}
                            <div>
                              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-1.5">
                                <Building2 className="w-4 h-4" />
                                Category
                              </label>
                              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Categories</SelectItem>
                                  {categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      {category}s ({dealers.filter(d => d.category === category).length})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Type Filter */}
                            <div>
                              <label className="text-sm font-medium text-neutral-700 mb-2 flex items-center gap-1.5">
                                <Award className="w-4 h-4" />
                                Dealer Type
                              </label>
                              <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger>
                                  <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Types</SelectItem>
                                  {dealerTypes.map(type => (
                                    <SelectItem key={type} value={type}>
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Active Filters & Clear */}
                          {hasActiveFilters && (
                            <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                              <p className="text-sm text-neutral-600">
                                {filteredDealers.length} {filteredDealers.length === 1 ? 'dealer' : 'dealers'} found
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="text-[#223B57] hover:text-[#223B57] hover:bg-[#223B57]/10"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Clear Filters
                              </Button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showFilters && (
                    <p className="text-sm text-neutral-600">
                      {filteredDealers.length} {filteredDealers.length === 1 ? 'dealer' : 'dealers'} found • Use filters to refine your search
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === TABS: LIST & MAP VIEW === */}
      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="list" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
                <TabsTrigger value="list" className="data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  <Building2 className="w-4 h-4 mr-2" />
                  Dealer List
                </TabsTrigger>
                <TabsTrigger value="map" className="data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  <MapPin className="w-4 h-4 mr-2" />
                  Map View
                </TabsTrigger>
              </TabsList>
            </div>

            {/* === DEALER LIST VIEW === */}
            <TabsContent value="list" className="mt-0">
              <div className="grid grid-cols-12 gap-6">
                {filteredDealers.length > 0 ? (
                  filteredDealers.map((dealer, index) => (
                    <motion.div
                      key={dealer.id}
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="relative group h-full">
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                        
                        <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl cursor-pointer h-full flex flex-col">
                          <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                          
                          {/* Dealer Image */}
                          <div className="relative h-48 overflow-hidden rounded-t-3xl">
                            <img 
                              src={dealer.image} 
                              alt={dealer.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {dealer.featured && (
                              <Badge className="absolute top-4 right-4 bg-amber-400 text-[#223B57] border-0 shadow-lg">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            )}
                          </div>

                          <CardContent className="p-6 flex-1 flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1">
                                <h3 className="text-[#223B57] mb-2 leading-tight">{dealer.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
                                    {dealer.type}
                                  </Badge>
                                  <Badge className="bg-emerald-500/10 text-emerald-700 border-0 text-xs">
                                    {dealer.category}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="font-bold text-[#223B57]">{dealer.rating}</span>
                              </div>
                              <span className="text-sm text-neutral-600">
                                ({dealer.reviews} reviews)
                              </span>
                            </div>

                            <div className="space-y-3 text-sm text-neutral-600 mb-4 flex-1">
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#223B57]" />
                                <span>{dealer.address}, {dealer.city}, {dealer.district}, {dealer.state} - {dealer.pincode}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 group/item">
                                <Phone className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                                <span className="flex-1">{dealer.phone}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(dealer.phone);
                                    toast.success("Copied!", {
                                      description: "Phone number copied to clipboard"
                                    });
                                  }}
                                  className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                >
                                  <Copy className="w-3 h-3 text-[#223B57]" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-2 group/item">
                                <Mail className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                                <span className="flex-1">{dealer.email}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(dealer.email);
                                    toast.success("Copied!", {
                                      description: "Email address copied to clipboard"
                                    });
                                  }}
                                  className="opacity-0 group-hover/item:opacity-100 transition-opacity"
                                >
                                  <Copy className="w-3 h-3 text-[#223B57]" />
                                </button>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                                <span>{dealer.timings}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${dealer.coordinates.lat},${dealer.coordinates.lng}`, '_blank');
                                  toast.success("Opening directions", {
                                    description: `Getting directions to ${dealer.name}`
                                  });
                                }}
                              >
                                <Navigation className="w-4 h-4 mr-2" />
                                Directions
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  window.location.href = `tel:${dealer.phone}`;
                                  toast.info("Calling dealer", {
                                    description: `Calling ${dealer.phone}`
                                  });
                                }}
                              >
                                <Phone className="w-4 h-4 mr-2" />
                                Call Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-12">
                    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl">
                      <CardContent className="p-12 text-center">
                        <MapPin className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-[#223B57] mb-2">No Dealers Found</h3>
                        <p className="text-neutral-600 mb-6">
                          We couldn't find any dealers matching your search criteria.
                        </p>
                        <Button onClick={clearFilters}>
                          Clear All Filters
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* === MAP VIEW WITH GOOGLE MAPS === */}
            <TabsContent value="map" className="mt-0">
              <div className="grid grid-cols-12 gap-8">
                {/* Dealers List Sidebar */}
                <motion.div
                  className="col-span-12 lg:col-span-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="sticky top-24 space-y-4">
                    {/* Scrollable Dealers List with Fade Indicators */}
                    <div className="relative">
                      {/* Top Fade Indicator */}
                      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#F5F3F0] to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" id="dealers-scroll-top-fade"></div>
                      
                      <div 
                        className="max-h-[700px] overflow-y-auto space-y-4 pr-2 scroll-smooth scrollbar-thin"
                        onScroll={(e) => {
                          const target = e.currentTarget;
                          const topFade = document.getElementById('dealers-scroll-top-fade');
                          const bottomFade = document.getElementById('dealers-scroll-bottom-fade');
                          
                          if (topFade && bottomFade) {
                            if (target.scrollTop > 10) {
                              topFade.style.opacity = '1';
                            } else {
                              topFade.style.opacity = '0';
                            }
                            
                            const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 10;
                            if (isAtBottom) {
                              bottomFade.style.opacity = '0';
                            } else {
                              bottomFade.style.opacity = '1';
                            }
                          }
                        }}
                      >
                        {filteredDealers.map((dealer, index) => (
                        <motion.div
                          key={dealer.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                            
                            <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl cursor-pointer">
                              <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                              
                              <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <h3 className="text-[#223B57] mb-2 leading-tight">{dealer.name}</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                      <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
                                        {dealer.type}
                                      </Badge>
                                      <Badge className="bg-emerald-500/10 text-emerald-700 border-0 text-xs">
                                        {dealer.category}
                                      </Badge>
                                    </div>
                                  </div>
                                  {dealer.featured && (
                                    <Badge className="bg-amber-400 text-[#223B57] border-0 ml-2">
                                      <Star className="w-3 h-3 mr-1 fill-current" />
                                      Featured
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                  <span className="font-bold text-[#223B57]">{dealer.rating}</span>
                                  <span className="text-sm text-neutral-600">({dealer.reviews})</span>
                                </div>

                                <div className="space-y-2 text-sm text-neutral-600 mb-4">
                                  <div className="flex items-start gap-2">
                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#223B57]" />
                                    <span>{dealer.district}, {dealer.state}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 flex-shrink-0 text-[#223B57]" />
                                    <span>{dealer.phone}</span>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => {
                                      window.open(`https://www.google.com/maps/search/?api=1&query=${dealer.coordinates.lat},${dealer.coordinates.lng}`, '_blank');
                                    }}
                                  >
                                    <Navigation className="w-4 h-4 mr-2" />
                                    Directions
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => window.location.href = `tel:${dealer.phone}`}
                                  >
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </motion.div>
                      ))}
                      </div>
                      
                      {/* Bottom Fade Indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F5F3F0] to-transparent pointer-events-none z-10 opacity-100 transition-opacity duration-300" id="dealers-scroll-bottom-fade"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Google Map */}
                <motion.div
                  className="col-span-12 lg:col-span-8"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="sticky top-24">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                      
                      <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none z-10"></div>
                        
                        <CardContent className="p-0">
                          <GoogleMap 
                            dealers={filteredDealers}
                            height="700px"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
   <section className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
                <Package className="w-3 h-3 mr-1" />
                Partnership Opportunity
              </Badge>
              <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
                Become an Origin Tiles Authorised Dealer 
              </h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Partner with Origin Tiles and grow your business with a premium tile brand trusted by customers across India. We support our dealers with the right products, guidance, and long-term partnership.
              </p>
            </motion.div>
  
           
          </div>
        </section>
<section className="py-20 bg-[#F5F3F0]">
  <div className="container">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        What You’ll Offer Your Customers
      </h2>
      
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Layers3, // Bathroom
          title: "Premium Tile Range",
          description: "Access our complete range of ceramic and vitrified tiles with authorised dealer pricing and margins."
        },
        {
          icon: Headset, // Kitchen Floor (replace Kitchen with a suitable icon from lucide-react)
          title: "	Expert Support",
          description: "Dedicated assistance for business growth, product knowledge, and technical guidance."
        },
        {
          icon: Megaphone, // Living Room
          title: "Marketing & Display Support",
          description: "Showroom display samples, catalogues, branding material, and digital marketing assets."
        },
        
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
            {/* Glassmorphism Border */}
            <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardContent className="relative p-8 text-center">
              <div className="relative inline-block mb-6">
                {/* Icon Background with Glass Effect */}
                <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                  <item.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-3 text-[#223B57]">{item.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{item.description}</p>
            </CardContent>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* === DEALER REQUIREMENTS & BENEFITS === */}
<section className="py-24 bg-white">
  <div className="container">
    {/* Header */}
    <motion.div
      className="text-center max-w-3xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      

      <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
        Dealer Requirements
      </h2>

      
    </motion.div>

    {/* Content Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">




      
      {/* === BUSINESS CRITERIA === */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Card className="relative h-full border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl">
          <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>

          <CardContent className="p-10">
            <h3 className="text-2xl font-bold text-[#223B57] mb-6">
              Business Criteria:
            </h3>

            <ul className="space-y-4 text-neutral-700">
              {[
                "GST-registered business",
                "Adequate showroom or display space for tiles",
                "Experience in tiles, building materials, or interiors preferred",
                "Ability to manage stock and local distribution",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* === WHAT YOU’LL RECEIVE === */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <Card className="relative h-full border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl">
          <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>

          <CardContent className="p-10">
            <h3 className="text-2xl font-bold text-[#223B57] mb-6">
              What You’ll Receive
            </h3>

            <div className="space-y-5">
              {[
                {
                  title: "Complete Sample Display Kit",
                  desc: "A full set of tile samples to showcase collections and finishes.",
                },
                {
                  title: "Branding & Marketing Support",
                  desc: "Printed and digital materials to support sales and visibility.",
                },
                {
                  title: "Product & Technical Training",
                  desc: "Guidance on tile applications, finishes, and customer handling.",
                },
                {
                  title: "Attractive Pricing & Incentives",
                  desc: "Competitive margins and dealer-focused benefits.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Star className="w-5 h-5 text-[#223B57] mt-1" />
                  <div>
                    <h4 className="font-semibold text-[#223B57]">
                      {item.title}
                    </h4>
                    <p className="text-sm text-neutral-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

    </div>
  </div>
</section>

<section className="relative py-24 bg-[#F5F3F0] ">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>
  
    <div className="container relative z-10">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
          Trusted Across India
        </Badge>
  
        <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
         Our Dealer Network at a Glance
          
        </h2>
  
        
      </motion.div>
  
      {/* Technical Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {[
          {
            icon: Store,
            title: "24+ Authorised Dealers",
            description:
              " Serving customers across multiple regions",
          },
          {
            icon: Building2,
            title: "	Presence in 5 Cities",
            description:
              "Wide reach with local support",
          },
          {
            icon: Star,
            title: "4.7/5 Customer Rating",
            description:
              " Trusted for quality and service",
          },
          {
            icon:  Map,
            title: "	Across 23+ Districts",
            description:
              " Growing network in key markets.",
          },
          
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Glass Border */}
              <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none"></div>
  
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                    <item.icon
                      className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
  
                {/* Content */}
                <h3 className="text-xl font-bold text-[#223B57] mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
  <br></br>
     
    </div>
  </section> 

  <section className="relative py-24 bg-white ">
    {/* Subtle Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>
  
    <div className="container relative z-10">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
          Helpful Tips
        </Badge>
  
        <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
          Make the Most of Your Dealer Visit
          
        </h2>

         <p className="text-lg text-neutral-600 mb-4">
          A few simple steps can help you choose the right tiles with confidence.
        </p>
  
        
      </motion.div>
  
      {/* Technical Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {[
          {
            icon:  PhoneCall,
            title: "Call Before You Visit",
            description:
              "Check availability and confirm showroom timings in advance.",
          },
          {
            icon: Ruler,
            title: "Carry Your Measurements",
            description:
              "Bring room dimensions to get accurate tile quantity guidance.",
          },
          {
            icon: Layers,
            title: "Ask to See Samples",
            description:
              "View and feel tile samples to compare finishes and quality.",
          },
          {
            icon:  ShieldCheck,
            title: "Choose Authorised Dealers",
            description:
              "Ensure the dealer is officially approved by Origin Tiles for genuine products.",
          },
          
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Card className="relative h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Glass Border */}
              <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none"></div>
  
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
              <CardContent className="relative p-8">
                {/* Icon */}
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                    <item.icon
                      className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
  
                {/* Content */}
                <h3 className="text-xl font-bold text-[#223B57] mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-neutral-600 text-center leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
  <br></br>
     
    </div>
  </section> 
   {/* === FAQ QUICK SECTION - Top Questions === */}
   <section className="section-padding bg-[#F5F3F0]">
      <div className="container">
                                   <motion.div
                                     className="text-center mb-12"
                                     initial={{ opacity: 0, y: 20 }}
                                     whileInView={{ opacity: 1, y: 0 }}
                                     viewport={{ once: true }}
                                   >
                                     <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
        Have Questions?
        </Badge>                           
                                     <h2 className="text-3xl md:text-5xl font-bold text-[#223B57] mb-4">
                                      Frequently Asked Dealer Locator Questions
                                     </h2>
                                     <p className="text-lg text-neutral-600">
                                      Quick answers about our free tile sample service and delivery.
                                     </p>
                                   </motion.div>
                         
                                   <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                     {[
                                       {
                                         icon: CheckCircle2,
                                         question: "How do I find the nearest Origin Tiles dealer?",
                                         answer: " Use our Dealer Locator to search by city, district, or state. The tool will show authorised dealers nearest to your location."
                                       },
                                       {
                                         icon:  CheckCircle2,
                                         question: "Are all listed dealers authorised by Origin Tiles?",
                                         answer: " Yes, every dealer shown in our locator is officially authorised and approved by Origin Tiles."
                                       },
                                       {
                                         icon: CheckCircle2,
                                         question: "Can I check tile availability before visiting a dealer?",
                                         answer: "Yes, we recommend calling the dealer in advance to confirm stock availability and showroom timings."
                                       },
                                       {
                                         icon: CheckCircle2,
                                         question: "Do dealers provide product guidance and samples?",
                                         answer: "Yes, Our authorised dealers can guide you on tile selection and show available samples."
                                       },
                                       {
                                         icon: CheckCircle2,
                                         question: "Can I place bulk or project orders through a dealer?",
                                         answer: "Absolutely, Dealers can assist with bulk requirements for homes, commercial projects, and large developments."
                                       },
                                       {
                                         icon: CheckCircle2,
                                         question: "What if there is no dealer in my city?",
                                         answer: "If a dealer is not available nearby, you can contact our team directly. We will help you with alternative options or connect you to the nearest location."
                                       },
                                       
                                       
                                       
                                      
                                     ].map((faq, index) => (
                                       <motion.div
                                         key={index}
                                         className="group"
                                         initial={{ opacity: 0, y: 20 }}
                                         whileInView={{ opacity: 1, y: 0 }}
                                         viewport={{ once: true }}
                                         transition={{ delay: index * 0.1 }}
                                       >
                                         {/* Glassmorphism FAQ Card */}
                                         <div className="relative h-full">
                                           {/* Glow Effect */}
                                           <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                                           
                                           <Card className="relative border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                                             {/* Glassmorphism Border */}
                                             <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
                                             
                                             <CardContent className="relative p-6">
                                               <div className="flex items-start gap-4">
                                                 <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-300 border border-[#223B57]/10 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1">
                                                   <faq.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-300 group-hover:scale-110" />
                                                 </div>
                                                 <div>
                                                   <h3 className="font-bold text-[#223B57] mb-2 group-hover:text-[#2d4a6a] transition-colors">{faq.question}</h3>
                                                   <p className="text-neutral-600 text-sm leading-relaxed">{faq.answer}</p>
                                                 </div>
                                               </div>
                                             </CardContent>
                                             
                                             {/* Shine Effect */}
                                             <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                                           </Card>
                                         </div>
                                       </motion.div>
                                     ))}
                                   </div>
                         
                                   
                                 </div>
                               </section>                        
  



      {/* === BECOME A DEALER CTA === */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                 Partner with Origin Tiles
                </Badge>
                <h2 className="text-white mb-4">
                 Let’s Grow Your Business Together
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Become an authorised Origin Tiles dealer and offer high-quality ceramic tiles trusted across India.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
    size="lg"
    variant="secondary"
    className="h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
    onClick={() => onNavigate("Contact")}
  >
   Enquire Now                   
  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 !bg-transparent border-white/30 !text-white hover:!bg-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => toast.info('Download brochure', {
                      description: 'Downloading dealer information brochure...'
                    })}
                  >
                    Download Brochure
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
