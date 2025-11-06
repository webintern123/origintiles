import { MapPin, Phone, Mail, Clock, Search, Navigation, Copy, Building2, Users, Award, Star, Filter, X, Globe, Map } from "lucide-react";
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
  getFeaturedDealers, 
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

  const featuredDealers = getFeaturedDealers();

  const categoryCounts = useMemo(() => {
    return {
      showroom: dealers.filter(d => d.category === "Showroom").length,
      dealer: dealers.filter(d => d.category === "Dealer").length,
      distributor: dealers.filter(d => d.category === "Distributor").length,
    };
  }, []);

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
        title           = "Find Origin Tiles Near You"
        subtitle        = "Dealers Locator"
        description     = "Connect with our authorized dealers across the country. Professional service, expert advice, and genuine Origin Tiles products guaranteed."
        icon            = {MapPin}
        variant         = "image"
        backgroundImage = "https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjE2NDcwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        badge           = {`${dealers.length} Locations`}
        breadcrumbs     = {[{ label: 'Dealers Locator' }]}

      />

      {/* === FLOATING BENEFIT CARDS === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Building2,
                title: 'Showrooms',
                description: 'Exclusive Origin Tiles showrooms',
                value: categoryCounts.showroom.toString()
              },
              {
                icon: Users,
                title: 'Dealers',
                description: 'Authorized dealer network',
                value: categoryCounts.dealer.toString()
              },
              {
                icon: Award,
                title: 'Distributors',
                description: 'Wholesale & project supply',
                value: categoryCounts.distributor.toString()
              },
              {
                icon: Star,
                title: 'Featured',
                description: 'Premium dealer locations',
                value: featuredDealers.length.toString()
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
                    <div className="text-3xl font-bold text-[#223B57] mb-2">
                      {benefit.value}
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

      {/* === SEARCH & FILTERS SECTION === */}
      <section className="py-12">
        <div className="container">
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
                  Join Our Network
                </Badge>
                <h2 className="text-white mb-4">
                  Interested in Becoming a Dealer?
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Join our network of {dealers.length}+ authorized dealers and bring premium ceramic tiles to your customers
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
    size="lg"
    variant="secondary"
    className="h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
    onClick={() => onNavigate("Contact")}
  >
    Contact now
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
