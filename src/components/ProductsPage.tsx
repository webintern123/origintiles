import { useState, useEffect } from "react";
import { SlidersHorizontal, Grid3x3, List, Package, Search, ArrowRight, Phone, ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageBanner } from "./PageBanner";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";
import { products } from "../data/products";

interface ProductsPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "category" | "newest">("name");
  
  // Active filters state
  const [activeFilters, setActiveFilters] = useState<{
    category: string[];
    finish: string[];
    size: string[];
  }>({
    category: [],
    finish: [],
    size: []
  });

  // Generate dynamic filter options from actual product data
  const filters = {
    category: [...new Set(products.map(p => p.category))].sort(),
    finish: [...new Set(products.map(p => p.finish))].sort(),
    size: [...new Set(products.map(p => p.size.split(' ')[0]))].sort() // Get just the size part
  };

  // Filter and sort products in real-time
  const filteredProducts = products
    .filter(product => {
      // Search filter
      if (
  searchQuery &&
  !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
  !(product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
) {
  return false;
}

      
      // Category filter
      if (activeFilters.category.length > 0 && !activeFilters.category.includes(product.category)) {
        return false;
      }
      
      // Finish filter
      if (activeFilters.finish.length > 0 && !activeFilters.finish.includes(product.finish)) {
        return false;
      }
      
      // Size filter
      if (activeFilters.size.length > 0 && !activeFilters.size.some(size => product.size.includes(size))) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "newest":
          // Assuming newer products have higher IDs
          return b.id.localeCompare(a.id);
        default:
          return 0;
      }
    });

  // Toggle filter
  const toggleFilter = (filterType: keyof typeof activeFilters, value: string, checked: boolean) => {
    console.log('toggleFilter called:', { filterType, value, checked });
    
    setActiveFilters(prev => {
      const current = prev[filterType];
      const newFilters = checked
        ? [...current, value]
        : current.filter(item => item !== value);
      
      console.log('Current filters:', current);
      console.log('New filters:', newFilters);
      
      // Show feedback
      if (checked) {
        toast.success(`Added: ${value}`);
      } else {
        toast.info(`Removed: ${value}`);
      }
      
      return { ...prev, [filterType]: newFilters };
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      category: [],
      finish: [],
      size: []
    });
    setSearchQuery("");
    toast.success("All filters cleared");
  };

  // Count active filters
  const activeFilterCount = activeFilters.category.length + activeFilters.finish.length + activeFilters.size.length;

  // Get product categories breakdown
  const productCategories = [...new Set(products.map(p => p.category))];
  const trendingProducts = products.filter(p => 
    p.specifications?.Trend?.includes('Trending') || 
    p.size.includes('48') || 
    p.size.includes('64') || 
    p.size.includes('72')
  );

  // Stats data from products database
  const stats = [
    {
      icon: Package,
      value: products.length,
      suffix: "",
      label: "Featured Products",
      description: "Premium selection"
    },
    {
      icon: Grid3x3,
      value: productCategories.length,
      suffix: "",
      label: "Tile Categories",
      description: "Diverse applications"
    },
    {
      icon: SlidersHorizontal,
      value: trendingProducts.length,
      suffix: "+",
      label: "Trending Formats",
      description: "Large size tiles"
    },
    {
      icon: Package,
      value: 6,
      suffix: "",
      label: "Premium Collections",
      description: "Curated series"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === ENHANCED PAGE BANNER === */}
      <PageBanner
        title="Browse Our Premium Collection"
        subtitle="Product Catalog"
        description="Discover over 650+ ceramic tile designs across 6 premium collections. Use our advanced filters to find the perfect tiles for your space—whether it's bathrooms, kitchens, floors, or walls."
        icon={Package}
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1630699144035-c0f6311ec482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
        badge={`${products.length} Featured Products • ${productCategories.length} Categories • ${trendingProducts.length}+ Trending Formats`}
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Products" }
        ]}
      />

      {/* === FLOATING STATS CARDS === */}
      <section className="relative -mt-20 z-10 mb-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-3">
                      {/* Icon Background with Glass Effect */}
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <stat.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#223B57] mb-1">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === PRODUCTS GRID + FILTERS === */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="flex gap-8">
            {/* === FILTERS SIDEBAR === */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <CardContent className="p-6 relative z-10 flex flex-col h-full">
                      {/* Fixed Header */}
                      <div className="flex items-center justify-between mb-6 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center">
                            <SlidersHorizontal className="w-5 h-5 text-[#223B57]" strokeWidth={1.5} />
                          </div>
                          <h2 className="font-bold text-[#223B57]">Filters</h2>
                        </div>
                        {activeFilterCount > 0 && (
                          <Badge className="bg-[#223B57] hover:bg-[#1a2d43]">
                            {activeFilterCount}
                          </Badge>
                        )}
                      </div>

                      {/* Scrollable Content Area with Custom Scrollbar */}
                      <div className="relative flex-1 min-h-0">
                        {/* Top Fade Gradient Indicator */}
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" id="scroll-top-fade"></div>
                        
                        {/* Scrollable Container */}
                        <div 
                          className="h-full overflow-y-auto overflow-x-hidden pr-2 scroll-smooth"
                          style={{ 
                            maxHeight: 'calc(100vh - 280px)',
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#223B57 #F5F3F0'
                          }}
                          onScroll={(e) => {
                            const target = e.currentTarget;
                            const topFade = document.getElementById('scroll-top-fade');
                            const bottomFade = document.getElementById('scroll-bottom-fade');
                            
                            if (topFade && bottomFade) {
                              // Show top fade if scrolled down
                              if (target.scrollTop > 10) {
                                topFade.style.opacity = '1';
                              } else {
                                topFade.style.opacity = '0';
                              }
                              
                              // Show bottom fade if not at bottom
                              const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 10;
                              if (isAtBottom) {
                                bottomFade.style.opacity = '0';
                              } else {
                                bottomFade.style.opacity = '1';
                              }
                            }
                          }}
                        >
                          <style>{`
                            /* Custom Scrollbar Styling - Webkit (Chrome, Safari, Edge) */
                            .overflow-y-auto::-webkit-scrollbar {
                              width: 6px;
                            }
                            
                            .overflow-y-auto::-webkit-scrollbar-track {
                              background: #F5F3F0;
                              border-radius: 10px;
                            }
                            
                            .overflow-y-auto::-webkit-scrollbar-thumb {
                              background: #223B57;
                              border-radius: 10px;
                              transition: background 0.2s ease;
                            }
                            
                            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                              background: #1a2d43;
                            }
                            
                            .overflow-y-auto::-webkit-scrollbar-thumb:active {
                              background: #152338;
                            }
                          `}</style>
                          
                          {/* Search */}
                          <div className="mb-6 pr-2">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                              <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#223B57]/20 focus:border-[#223B57] transition-all duration-200"
                              />
                            </div>
                          </div>

                          {/* Filter Categories */}
                          <div className="pr-2">
                            {Object.entries(filters).map(([filterType, items]) => (
                              <div key={filterType} className="mb-6 last:mb-2">
                                <h3 className="mb-3 capitalize font-semibold text-[#223B57] sticky top-0 bg-white/95 backdrop-blur-sm py-1 -mt-1 z-20">
                                  {filterType.replace('_', ' ')}
                                </h3>
                                <div className="space-y-2">
                                  {items.map((item) => {
                                    const isChecked = activeFilters[filterType as keyof typeof activeFilters]?.includes(item) || false;
                                    return (
                                      <div key={item} className="flex items-center gap-2 relative z-10 group">
                                        <Checkbox 
                                          id={`${filterType}-${item}`}
                                          checked={isChecked}
                                          onCheckedChange={(checked) => {
                                            console.log('Checkbox clicked:', filterType, item, checked);
                                            toggleFilter(filterType as keyof typeof activeFilters, item, checked === true);
                                          }}
                                        />
                                        <Label 
                                          htmlFor={`${filterType}-${item}`} 
                                          className="cursor-pointer text-neutral-600 hover:text-[#223B57] transition-colors flex-1 select-none"
                                        >
                                          {item}
                                        </Label>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Bottom Fade Gradient Indicator */}
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none z-10 opacity-100 transition-opacity duration-300" id="scroll-bottom-fade"></div>
                      </div>

                      {/* Fixed Footer Button */}
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex-shrink-0 bg-white">
                        <Button 
                          variant="outline" 
                          className="w-full bg-white hover:bg-[#223B57]/5 border-[#223B57]/20 text-[#223B57] rounded-xl h-10 transition-all duration-200"
                          onClick={clearAllFilters}
                          disabled={activeFilterCount === 0}
                        >
                          Clear All Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </aside>

            {/* === PRODUCTS GRID === */}
            <div className="flex-1">
              {/* Toolbar - Enhanced with Sort */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="text-neutral-600">
                  Showing <span className="font-semibold text-[#223B57]">{filteredProducts.length}</span> of {products.length} products
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-sm">
                      ({activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="w-4 h-4 text-neutral-500" />
                    <Select value={sortBy} onValueChange={(value: "name" | "category" | "newest") => setSortBy(value)}>
                      <SelectTrigger className="w-[160px] h-9 rounded-xl border-[#223B57]/20 text-sm">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Mode Toggles */}
                  {/* View Mode Toggles */}
<div className="hidden sm:flex items-center gap-2">
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setViewMode("grid")}
    className={`rounded-lg transition-all ${viewMode === "grid" ? "bg-[#223B57] text-white hover:bg-[#1a2d43]" : "text-neutral-600 hover:bg-neutral-100"}`}
  >
    <Grid3x3
      className="w-5 h-5"
      strokeWidth={1.5}
      stroke={viewMode === "grid" ? "white" : "#223B57"}
    />
  </Button>
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setViewMode("list")}
    className={`rounded-lg transition-all ${viewMode === "list" ? "bg-[#223B57] text-white hover:bg-[#1a2d43]" : "text-neutral-600 hover:bg-neutral-100"}`}
  >
    <List
      className="w-5 h-5"
      strokeWidth={1.5}
      stroke={viewMode === "list" ? "white" : "#223B57"}
    />
  </Button>
</div>

                  
                  {/* Mobile Filters Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="lg:hidden rounded-xl border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" strokeWidth={1.5} />
                    Filters
                  </Button>
                </div>
              </div>

              {/* No Results Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-700 mb-2">No products found</h3>
                  <p className="text-neutral-500 mb-6">Try adjusting your filters or search terms</p>
                  <Button 
                    onClick={clearAllFilters}
                    className="bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Products Grid */}
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" : "space-y-6 max-w-4xl mx-auto"}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={viewMode === "grid" ? "" : ""}
                  >
                    {viewMode === "grid" ? (
                      /* GRID VIEW - Premium Card Design like HomePage */
                      <div className="group cursor-pointer" onClick={() => onNavigate("Product Details", product.id)}>
                        <div className="relative">
                          {/* Glow Effect */}
                          <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                          
                          <Card className="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Glassmorphism Border */}
                            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                            
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            {/* Product Image */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                              />
                              
                              {/* Brand Badge */}
                              <div className="absolute top-4 left-4">
                                <Badge className="bg-white/95 backdrop-blur-md text-[#223B57] border-0 shadow-md text-xs">
                                  {product.brand}
                                </Badge>
                              </div>

                              {/* Category Badge */}
                              <div className="absolute top-4 right-4">
                                <Badge className="bg-[#223B57] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                                  {product.category}
                                </Badge>
                              </div>

                              {/* Trending Badge - Show if applicable */}
                              {(product.specifications?.Trend?.includes('Trending') || 
                                product.size.includes('48') || 
                                product.size.includes('64') || 
                                product.size.includes('72')) && (
                                <div className="absolute bottom-4 left-4">
                                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                                    Trending
                                  </Badge>
                                </div>
                              )}
                              
                              {/* Overlay gradient on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Product Info */}
                            <CardContent className="p-6 space-y-3">
                              {/* Brand & Name */}
                              <div>
                                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1.5">{product.brand}</p>
                                <h3 className="font-semibold text-[#223B57] leading-tight line-clamp-2 group-hover:text-[#1a2d43] transition-colors">
                                  {product.name}
                                </h3>
                              </div>
                              
                              {/* Divider */}
                              <div className="h-px bg-gradient-to-r from-neutral-200 via-neutral-100 to-transparent"></div>
                              
                              {/* Specs Row */}
                              <div className="flex items-center gap-2 text-xs text-neutral-600">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-[#223B57]"></div>
                                  <span>{product.size}</span>
                                </div>
                                <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-[#223B57]"></div>
                                  <span>{product.finish}</span>
                                </div>
                              </div>
                              
                              {/* CTA Buttons - Redesigned for Better Visibility */}
                              <div className="flex flex-col gap-2.5 pt-3">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl h-10 group/btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate("Product Details", product.id);
                                  }}
                                >
                                  <span>View Details</span>
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="w-full border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] transition-all duration-300 rounded-xl h-10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate("Contact");
                                  }}
                                >
                                  <Phone className="w-3.5 h-3.5 mr-2" />
                                  <span>Request Quote</span>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ) : (
                      /* LIST VIEW - Clean Premium Design */
                      <div className="group cursor-pointer" onClick={() => onNavigate("Product Details")}>
                        <div className="relative">
                          {/* Glow Effect */}
                          <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                          
                          <Card className="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                            {/* Glassmorphism Border */}
                            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                            
                            <div className="flex flex-col md:flex-row items-stretch gap-0">
                              {/* Product Image */}
                              <div className="relative w-full md:w-64 h-56 md:h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                
                                {/* Category Badge on Image */}
                                <div className="absolute top-4 right-4">
                                  <Badge className="bg-[#223B57] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                    {product.category}
                                  </Badge>
                                </div>
                              </div>

                              {/* Content Area */}
                              <div className="flex-1 p-6 flex flex-col justify-between">
                                <div>
                                  {/* Brand Badge */}
                                  <Badge variant="outline" className="mb-3 text-xs border-[#223B57]/20 text-neutral-600 bg-white/50">
                                    {product.brand}
                                  </Badge>
                                  
                                  {/* Product Name */}
                                  <h3 className="text-lg font-semibold text-[#223B57] mb-2 group-hover:text-[#1a2d43] transition-colors">
                                    {product.name}
                                  </h3>
                                  
                                  {/* Specs */}
                                  <div className="flex items-center gap-3 text-sm text-neutral-600 mb-3">
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-1 h-1 rounded-full bg-[#223B57]"></div>
                                      <span>Size: {product.size}</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                                    <div className="flex items-center gap-1.5">
                                      <div className="w-1 h-1 rounded-full bg-[#223B57]"></div>
                                      <span>{product.finish}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-2.5">
                                  <Button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate("Product Details");
                                    }}
                                    size="sm" 
                                    className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                                  >
                                    View Details
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                  </Button>
                                  <Button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onNavigate("Contact");
                                    }}
                                    size="sm" 
                                    variant="outline"
                                    className="border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] rounded-xl transition-all duration-300"
                                  >
                                    <Phone className="w-3.5 h-3.5 mr-2" />
                                    Request Quote
                                  </Button>
                                </div>
                              </div>
                            </div>
                      </Card>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                  Need Assistance?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Can't Find What You're Looking For?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Our design experts are ready to help you find the perfect tiles for your project. Get personalized recommendations and samples.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Contact Our Experts
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Sample Request")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl [&_svg]:text-white"
                  >
                    Request Samples
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === MOBILE FILTERS SHEET === */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="left" className="w-[300px] overflow-y-auto scroll-smooth scrollbar-thin">
          <SheetHeader>
            <SheetTitle className="text-left text-[#223B57]">Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Search */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#223B57]/20 focus:border-[#223B57]"
                />
              </div>
            </div>
            
            {Object.entries(filters).map(([filterType, items]) => (
              <div key={filterType}>
                <h3 className="mb-3 capitalize font-semibold text-[#223B57]">
                  {filterType.replace('_', ' ')}
                </h3>
                <div className="space-y-2">
                  {items.map((item) => {
                    const isChecked = activeFilters[filterType as keyof typeof activeFilters]?.includes(item) || false;
                    return (
                      <div key={item} className="flex items-center gap-2">
                        <Checkbox 
                          id={`mobile-${filterType}-${item}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            toggleFilter(filterType as keyof typeof activeFilters, item, checked === true);
                          }}
                        />
                        <Label 
                          htmlFor={`mobile-${filterType}-${item}`} 
                          className="cursor-pointer text-neutral-600 text-sm hover:text-[#223B57] transition-colors"
                        >
                          {item}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => {
                  clearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5"
                disabled={activeFilterCount === 0}
              >
                Clear All {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
              <Button 
                className="bg-[#223B57] text-white hover:bg-[#1a2d43]"
                onClick={() => {
                  toast.success("Filters applied");
                  setMobileFiltersOpen(false);
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}