import { ArrowRight, Award, Truck, Shield, HeadphonesIcon, Star, Users, Eye, Calculator, Sparkles, ChevronRight, ChevronLeft, TrendingUp, Palette, Building2, MapPin, Package,Zap, Gift, HelpCircle, Phone, CheckCircle2, Pause, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { collections } from "../data/collections";
import { products } from "../data/products";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
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

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hero background images carousel - Tile Showroom & Ceramic Tiles
  const heroImages = [
    "https://images.unsplash.com/photo-1728486885790-1454260d9246?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80", // Luxury tile showroom
    "https://images.unsplash.com/photo-1695191388218-f6259600223f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80", // Modern bathroom tiles
    "https://images.unsplash.com/photo-1582765705476-0a438dc80edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80", // Tile wall texture
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-play testimonials carousel
  useEffect(() => {
    if (!isAutoPlaying || isPaused) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    const scrollAmount = 470; // Card width + gap

    autoPlayIntervalRef.current = setInterval(() => {
      if (testimonialsRef.current) {
        const container = testimonialsRef.current;
        const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10;
        
        if (isAtEnd) {
          // Loop back to start with smooth scroll
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 5000); // Auto-play every 5 seconds

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused]);

  // Handle manual arrow click - pause auto-play temporarily
  const handleManualScroll = (direction: 'left' | 'right') => {
    const scrollAmount = 470;
    
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }

    // Pause auto-play temporarily when user manually navigates
    setIsPaused(true);
    
    // Clear any existing pause timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    
    // Resume auto-play after 10 seconds of inactivity
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Get featured products - select diverse products from the actual data
  const featuredProducts = [
    products[0],  // Classic White Wall Tile - Wall Tiles
    products[3],  // Ivory Porcelain Classic - Floor Tiles
    products[6],  // Shadow Gray Vitrified - Floor Tiles
    products[2]   // Metro White Subway - Wall Tiles
  ];

  const inspirationGallery = [
    {
      title: "Modern Bathroom Design",
      image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
      category: "Bathroom"
    },
    {
      title: "Luxury Kitchen Space",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
      category: "Kitchen"
    },
    {
      title: "Elegant Living Room",
      image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
      category: "Living Room"
    },
    {
      title: "Outdoor Terrace",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
      category: "Outdoor"
    }
  ];

  // Customer avatars for trust badge
  const customerImages = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=faces"
  ];

  return (
    <div className="bg-white">
      {/* === HERO SECTION - Full Screen with Image Carousel === */}
      <section className="relative min-h-[90vh] text-white overflow-hidden">
        {/* Background Image Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            >
              <ImageWithFallback 
                src={img}
                alt="Hero Background"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
          {/* Navy Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#223B57]/95 via-[#223B57]/85 to-[#223B57]/70"></div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60 w-2'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hero Content - Proper Container */}
        <div className="container relative z-10" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full py-20">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.div 
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full mb-6 border border-white/30 shadow-[0_8px_32px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium">Premium Ceramic Tiles Since 1985</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  Transform Your
                  <span className="block text-[#F5F3F0] mt-2 drop-shadow-[0_2px_8px_rgba(245,243,240,0.3)]">Space with Elegance</span>
                </h1>

                <p className="text-xl text-white/90 leading-relaxed max-w-xl">
                  Discover premium ceramic tiles that blend luxury, durability, and timeless design. 
                  Your journey to a beautiful home starts here.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => onNavigate("Collection")}
                  size="lg"
                  className="bg-white !text-[#223B57] hover:bg-[#F5F3F0] active:bg-white active:!text-[#223B57] focus:ring-4 focus:ring-white/50 h-14 px-8 text-lg group"
                  aria-label="Explore our ceramic tile collections"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 w-5 h-5 text-[#223B57] group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => onNavigate("Tile Calculator")}
                  size="lg"
                  variant="outline"
                  className="group border-2 border-white text-white hover:bg-white hover:text-[#223B57] active:bg-white active:text-[#223B57] active:border-white focus:ring-4 focus:ring-white/50 h-14 px-8 text-lg"
                  aria-label="Calculate how many tiles you need"
                >
                  <Calculator className="mr-2 w-5 h-5 !text-white group-hover:!text-[#223B57]" />
                  Calculate Tiles
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-white/30">
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-lg">4.9/5</div>
                    <div className="text-sm text-white/80">2,500+ reviews</div>
                  </div>
                </motion.div>
                <div className="h-12 w-px bg-white/30"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-bold text-2xl"><AnimatedCounter end={10000} suffix="+" /></div>
                  <div className="text-sm text-white/80">Happy Customers</div>
                </motion.div>
                <div className="h-12 w-px bg-white/30"></div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="font-bold text-2xl">40+ Years</div>
                  <div className="text-sm text-white/80">Excellence</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Featured Tiles Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(34,59,87,0.1)] hover:shadow-[0_8px_40px_rgba(34,59,87,0.2)] transition-shadow duration-300"
                    style={{ height: index === 3 ? '280px' : '200px' }}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/95 via-[#223B57]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Glassmorphism Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl p-3 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                        <div className="font-semibold text-base">{product.name}</div>
                        <div className="text-sm text-white/90">{product.brand}</div>
                      </div>
                    </div>
                    
                    {/* Glassmorphism Badge */}
                    {product.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 backdrop-blur-md text-[#223B57] border-0 shadow-lg font-semibold hover:bg-white transition-colors">
                          {product.badge}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Glass Border */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/40 rounded-2xl transition-all duration-300 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0)] group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2 text-white/80 bg-white/5 backdrop-blur-sm px-4 py-3 rounded-full border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
            <span className="text-xs uppercase tracking-wider font-medium">Scroll to Explore</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* === FLOATING STATS CARDS - Match AboutPage === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "25+", label: "Years Experience", icon: Award },
              { value: "650+", label: "Unique Designs", icon: Palette },
              { value: "15+", label: "Countries Served", icon: TrendingUp },
              { value: "50M+", label: "Sq Ft Installed", icon: Building2 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  
                  {/* Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6 text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                      <stat.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    {/* Stats Value */}
                    <div className="mb-2">
                      <AnimatedCounter end={parseInt(stat.value.replace(/\D/g, '') || '0')} suffix={stat.value.replace(/[0-9]/g, '')} />
                    </div>
                    
                    {/* Stats Label */}
                    <p className="text-sm text-neutral-600 group-hover:text-[#223B57] transition-colors duration-300">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURED COLLECTIONS - Full Width Image Cards === */}
      <section className="section-padding bg-[#F5F3F0]">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Our Premium Collections
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collections designed to transform your space
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={index}
                className="group relative rounded-3xl overflow-hidden cursor-pointer h-[400px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate("Collection")}
              >
                {/* Image */}
                <ImageWithFallback
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/95 via-[#223B57]/50 to-transparent"></div>
                
                {/* Content - Glassmorphism */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 group-hover:bg-white/15 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-all duration-300">
                    <div className="mb-2 text-sm text-white/90 uppercase tracking-wider font-semibold">
                      {collection.brand}
                    </div>
                    <h3 className="text-3xl font-bold mb-3 text-white">{collection.name}</h3>
                    <p className="text-white/90 mb-4 max-w-md">
                      {collection.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-white group-hover:gap-3 transition-all font-semibold">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Glassmorphism Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURES SECTION - Visual with Icons === */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Glass Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzIyM0I1NyIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50"></div>
        
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Why Choose Origin Tiles
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experience excellence in every tile with our commitment to quality and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Premium Quality",
                description: "ISO certified ceramic tiles with superior durability and finish"
              },
              {
                icon: Truck,
                title: "Free Delivery",
                description: "Complimentary shipping on bulk orders"
              },
              {
                icon: Shield,
                title: "10-Year Warranty",
                description: "Complete protection with our comprehensive warranty coverage"
              },
              {
                icon: HeadphonesIcon,
                title: "24/7 Support",
                description: "Expert assistance whenever you need guidance"
              }
            ].map((feature, index) => (
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
                        <feature.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[#223B57]">{feature.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FEATURED PRODUCTS - Premium Card Design === */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#223B57] mb-2">
                Featured Products
              </h2>
              <p className="text-neutral-600">
                Hand-picked selections from our premium range
              </p>
            </div>
            <Button 
              onClick={() => onNavigate("Products")}
              variant="outline"
              className="hidden md:inline-flex border border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white hover:border-[#223B57] transition-all group"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4 group-hover:text-white" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate("Product Details")}
              >
                {/* Premium Card with Shadow */}
                <div className="relative">
                  {/* Card Shadow Layer */}
                  <div className="absolute inset-0 bg-neutral-900/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Card className="relative overflow-hidden bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Premium Badge */}
                      {product.badge && (
                        <div className="absolute top-4 right-4">
                          <div className="bg-[#223B57] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                            {product.badge}
                          </div>
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
  className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-md hover:shadow-xl transition-all duration-300 rounded-xl h-10"
  onClick={(e) => {
    e.stopPropagation();  // Prevent card click
    onNavigate("Product Details", product.id); // Pass the product ID
  }}
>
  <span>View Details</span>
  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
</Button>

                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate("Contact");
                          }}
                          className="w-full border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] transition-all duration-300 rounded-xl h-10"
                        >
                          <Phone className="w-3.5 h-3.5 mr-2 text-[#223B57]" />
                          <span>Request Quote</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Button 
              onClick={() => onNavigate("Products")}
              className="bg-[#223B57] hover:bg-[#1a2d43] text-white"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* === INSPIRATION GALLERY - Full Width Images === */}
      <section className="section-padding bg-[#F5F3F0]">
        <div className="container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Design Inspiration
            </h2>
            <p className="text-lg text-neutral-600">
              See how our tiles transform real spaces
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inspirationGallery.map((item, index) => (
              <motion.div
                key={index}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] bg-neutral-100 ring-1 ring-neutral-200 hover:ring-[#223B57]/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onNavigate("Products")}
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/90 to-transparent"></div>
                
                {/* Glassmorphism Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 group-hover:bg-white/15 transition-all">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                
                {/* Glassmorphism Border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-2xl transition-all"></div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => onNavigate("Products")}
              size="lg"
              className="bg-[#223B57] hover:bg-[#1a2d43] text-white"
            >
              Explore All Products
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS SECTION - 3 Step Process === */}
      <section className="section-padding bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Your journey to beautiful tiles in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative max-w-6xl mx-auto">
            {/* Subtle Connection Lines - Desktop Only */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#223B57]/10 to-transparent"></div>
            
            {[
              {
                step: "01",
                icon: Palette,
                title: "Browse & Select",
                description: "Explore our premium collection of ceramic tiles. Filter by style, size, color, and room type to find your perfect match."
              },
              {
                step: "02",
                icon: Calculator,
                title: "Calculate & Plan",
                description: "Use our smart calculator to determine exactly how many tiles you need. Get instant wastage calculations and cost estimates."
              },
              {
                step: "03",
                icon: Zap,
                title: "Order & Install",
                description: "Place your order with confidence. Get free delivery on bulk orders and expert installation guidance."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                {/* Light Glassmorphism Card */}
                <div className="relative h-full bg-white/50 backdrop-blur-sm rounded-2xl border border-[#223B57]/5 hover:border-[#223B57]/10 transition-all duration-300 hover:shadow-md p-6">
                  {/* Step Number Badge - Light & Minimal */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#223B57] flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {step.step}
                  </div>

                  {/* Icon - Minimal */}
                  <div className="relative mb-5 inline-flex">
                    <div className="w-16 h-16 rounded-2xl bg-[#223B57]/5 flex items-center justify-center group-hover:bg-[#223B57] transition-all duration-300">
                      <step.icon className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#223B57] mb-3">{step.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow Indicator - Minimal */}
                {index < 2 && (
                  <div className="hidden md:flex absolute top-8 -right-3 z-10 items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm">
                    <ArrowRight className="w-4 h-4 text-[#223B57]/40" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Below Steps */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => onNavigate("Collection")}
              size="lg"
              className="bg-[#223B57] hover:bg-[#1a2d43] text-white h-14 px-8"
            >
              Start Browsing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* === STATS SECTION - Premium Layout === */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Premium Dark Background with Subtle Pattern */}
        <div className="absolute inset-0 bg-[#223B57]">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Gradient Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#223B57] via-[#2d4a6a]/50 to-[#223B57]"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {[
              { value: 10000, suffix: "+", label: "Happy Customers", icon: Users },
              { value: 500, suffix: "+", label: "Products", icon: Package },
              { value: 50, suffix: "+", label: "Countries Served", icon: MapPin },
              { value: 40, suffix: " Years", label: "Excellence", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Icon accent above number */}
                <div className="mb-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  <stat.icon className="w-8 h-8 mx-auto text-white" />
                </div>
                
                {/* Stat Number - Enhanced */}
                <div className="mb-2">
                  <div className="inline-block relative">
                    {/* Enhanced glow effect on hover */}
                    <div className="absolute inset-0 blur-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                    <div className="relative text-white font-bold tracking-tight leading-none text-4xl md:text-5xl lg:text-6xl group-hover:scale-105 transition-transform duration-300">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                  </div>
                </div>

                {/* Stat Label - Enhanced */}
                <div className="text-white/70 text-sm lg:text-base font-normal group-hover:text-white/90 transition-colors duration-300">
                  {stat.label}
                </div>

                {/* Separator Line - Desktop Only */}
                {index < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-neutral-600">
              Quick answers to common questions about our tiles
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              {
                icon: HelpCircle,
                question: "What sizes are available?",
                answer: "We offer tiles in various sizes from 7.5x15cm to 120x240cm, including popular sizes like 60x60cm and 30x30cm."
              },
              {
                icon: Truck,
                question: "Do you provide delivery?",
                answer: "Yes! Free delivery on bulk orders. For standard orders, delivery charges apply based on location and order size."
              },
              {
                icon: Shield,
                question: "What's the warranty period?",
                answer: "All our ceramic tiles come with a comprehensive 10-year warranty covering manufacturing defects."
              },
              {
                icon: Phone,
                question: "Can I get samples?",
                answer: "Absolutely! Request up to 5 free tile samples. We'll ship them to you within 3-5 business days."
              }
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

          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button
              onClick={() => onNavigate("FAQ")}
              variant="outline"
              size="lg"
              className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white"
            >
              View All FAQs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:text-white" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* === VIRTUAL SHOWROOM TEASER === */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Image */}
              <div className="relative h-80 lg:h-auto">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615873968403-89e068629265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80"
                  alt="Showroom"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#223B57]/90 to-[#223B57]/60"></div>
                
                {/* Floating Info Cards */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    {[
                      { icon: Building2, label: "50+ Showrooms" },
                      { icon: MapPin, label: "Pan India" },
                      { icon: Users, label: "Expert Staff" },
                      { icon: Gift, label: "Exclusive Offers" }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <item.icon className="w-8 h-8 text-white mx-auto mb-2" />
                        <div className="text-sm text-white font-semibold">{item.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Content */}
              <div className="bg-gradient-to-br from-[#F5F3F0] to-white p-8 lg:p-12 flex items-center">
                <div>
                  <motion.div
                    className="inline-flex items-center gap-2 bg-[#223B57]/10 px-4 py-2 rounded-full mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <Building2 className="w-4 h-4 text-[#223B57]" />
                    <span className="text-sm font-semibold text-[#223B57]">Visit Our Showrooms</span>
                  </motion.div>

                  <motion.h2
                    className="text-3xl md:text-4xl font-bold text-[#223B57] mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Experience Tiles in Person
                  </motion.h2>

                  <motion.p
                    className="text-lg text-neutral-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Visit our premium showrooms across India to see, touch, and feel our tiles. Our expert staff will help you find the perfect match for your project.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Button
                      onClick={() => onNavigate("Dealers Locator")}
                      size="lg"
                      className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] active:scale-95 text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <MapPin className="mr-2 w-5 h-5" />
                      Find Nearest Showroom
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      onClick={() => onNavigate("Sample Request")}
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white active:bg-[#223B57] active:text-white active:scale-95 h-14 px-8 transition-all"
                    >
                      <Package className="mr-2 w-5 h-5" />
                      Request Samples
                    </Button>
                  </motion.div>

                  {/* Quick Contact */}
                  <motion.div
                    className="flex items-center gap-4 mt-8 pt-8 border-t border-neutral-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#223B57]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#223B57]" />
                    </div>
                    <div>
                      <div className="text-sm text-neutral-500">Call Us Anytime</div>
                      <div className="font-bold text-[#223B57]">+91 98765 43210</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === TESTIMONIALS SECTION - Horizontal Scroll === */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 mb-4">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Real experiences from homeowners, architects, and builders who transformed their spaces with Origin Tiles
            </p>
          </motion.div>

          {/* Arrow Navigation Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Navigation Arrow */}
            <button
              onClick={() => handleManualScroll('left')}
              disabled={!canScrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl flex items-center justify-center transition-all duration-300 ${
                !canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'
              }`}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Navigation Arrow */}
            <button
              onClick={() => handleManualScroll('right')}
              disabled={!canScrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl flex items-center justify-center transition-all duration-300 ${
                !canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'
              }`}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Left Fade Gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            
            {/* Right Fade Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>

            {/* Scrollable Testimonials */}
            <div 
              ref={testimonialsRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-6 px-4 md:px-16"
              onScroll={(e) => {
                const target = e.currentTarget;
                setCanScrollLeft(target.scrollLeft > 10);
                setCanScrollRight(
                  target.scrollLeft < target.scrollWidth - target.clientWidth - 10
                );
              }}
            >
              {[
                {
                  name: "Priya Sharma",
                  role: "Homeowner, Mumbai",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "Origin Tiles completely transformed our bathroom! The quality is exceptional, and the team helped us choose the perfect design. The glassmorphism effect looks stunning in natural light.",
                  project: "Bathroom Renovation"
                },
                {
                  name: "Rajesh Kumar",
                  role: "Interior Designer, Delhi",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "As an interior designer, I recommend Origin Tiles to all my clients. Their collection is diverse, quality is top-notch, and the customer service is unmatched. The 3D visualization tool is a game-changer!",
                  project: "Commercial Projects"
                },
                {
                  name: "Anita Patel",
                  role: "Architect, Bangalore",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "Working with Origin Tiles has been a pleasure. Their technical specifications are detailed, delivery is always on time, and the tiles exceed expectations every single time. Perfect for premium projects.",
                  project: "Luxury Villa Project"
                },
                {
                  name: "Vikram Singh",
                  role: "Contractor, Pune",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "I've been using Origin Tiles for over 5 years. The consistency in quality, competitive pricing, and excellent dealer support makes them my first choice for all residential and commercial projects.",
                  project: "Multiple Projects"
                },
                {
                  name: "Meera Reddy",
                  role: "Homeowner, Hyderabad",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "We used Origin Tiles for our entire home renovation. The kitchen backsplash and living room floor tiles are absolutely gorgeous. Guests always compliment the beautiful design!",
                  project: "Full Home Renovation"
                },
                {
                  name: "Arjun Mehta",
                  role: "Builder, Ahmedabad",
                  image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
                  rating: 5,
                  text: "Origin Tiles is our trusted partner for all our construction projects. Bulk orders are handled efficiently, and the warranty support gives our buyers complete peace of mind. Highly recommended!",
                  project: "Residential Complex"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-[400px] md:w-[450px]"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl group">
                    {/* Glassmorphism Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="relative p-8 flex flex-col h-full">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-[#223B57] text-[#223B57]" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-neutral-700 leading-relaxed mb-6 flex-1">
                        "{testimonial.text}"
                      </p>

                      {/* Project Badge */}
                      <div className="mb-4">
                        <Badge className="bg-[#223B57]/10 text-[#223B57] border-0">
                          {testimonial.project}
                        </Badge>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                        <Avatar className="w-14 h-14 ring-2 ring-[#223B57]/20">
                          <ImageWithFallback
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                          <AvatarFallback className="bg-[#223B57] text-white">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-[#223B57]">{testimonial.name}</div>
                          <div className="text-sm text-neutral-500">{testimonial.role}</div>
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <svg className="w-12 h-12 text-[#223B57]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                      </div>
                    </CardContent>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Instructions & Auto-Play Control */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Navigation Hint */}
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#223B57]/10 flex items-center justify-center">
                    <ChevronLeft className="w-4 h-4 text-[#223B57]" />
                  </div>
                  <span>Use arrows to navigate</span>
                  <div className="w-8 h-8 rounded-full bg-[#223B57]/10 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#223B57]" />
                  </div>
                </div>
                <div className="md:hidden text-neutral-400 text-sm">
                  Swipe to see more stories
                </div>
              </div>

              {/* Auto-Play Toggle Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#223B57]/5 hover:bg-[#223B57]/10 transition-all duration-300 border border-[#223B57]/20"
                aria-label={isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'}
              >
                <div className="w-5 h-5 rounded-full bg-[#223B57] flex items-center justify-center text-white">
                  {isAutoPlaying && !isPaused ? (
                    <Pause className="w-3 h-3" />
                  ) : (
                    <Play className="w-3 h-3 ml-0.5" />
                  )}
                </div>
                <span className="text-sm text-[#223B57]">
                  {isAutoPlaying && !isPaused ? 'Auto-playing' : 'Paused'}
                </span>
                {isAutoPlaying && !isPaused && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === CTA SECTION - Visual with Split Design === */}
      <section className="relative section-padding overflow-hidden bg-[#F5F3F0]">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
              {/* Left: Image with Overlay */}
              <div className="relative h-80 lg:h-auto order-2 lg:order-1">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1525578309444-30d2f67cf02f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1000&q=80"
                  alt="Tile Calculator"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/80 via-[#223B57]/60 to-transparent"></div>
                
                {/* Decorative Elements */}
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/20 rounded-full"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white/10 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 backdrop-blur-sm rounded-2xl transform -rotate-12"></div>
                </div>

                {/* Stats on Image */}
                <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
                  {[
                    { value: "98%", label: "Accuracy" },
                    { value: "5min", label: "Quick" },
                    { value: "Free", label: "Always" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="font-bold text-2xl text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: Content with Premium Design */}
              <div className="relative bg-white p-8 lg:p-12 flex items-center order-1 lg:order-2">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="cta-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="2" fill="#223B57" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                  </svg>
                </div>

                <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 bg-[#223B57]/5 px-4 py-2 rounded-full mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <Sparkles className="w-4 h-4 text-[#223B57]" />
                    <span className="text-sm font-semibold text-[#223B57]">Smart Planning Tool</span>
                  </motion.div>

                  {/* Heading */}
                  <motion.h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#223B57] mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Calculate Your Tile Needs
                  </motion.h2>

                  {/* Subheading */}
                  <motion.p 
                    className="text-lg text-neutral-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    Use our intelligent calculator to determine exactly how many tiles you need for your project. Get instant results with wastage calculations and cost estimates.
                  </motion.p>

                  {/* Features List */}
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {[
                      { icon: Calculator, text: "Instant Calculations" },
                      { icon: TrendingUp, text: "Wastage Included" },
                      { icon: Badge, text: "Cost Estimation" },
                      { icon: CheckCircle2, text: "100% Free" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-5 h-5 text-[#223B57]" />
                        </div>
                        <span className="text-neutral-700 font-medium">{feature.text}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Button 
                      onClick={() => onNavigate("Tile Calculator")}
                      size="lg"
                      className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] active:scale-95 text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
                    >
                      <Calculator className="mr-2 w-5 h-5" />
                      Start Calculator
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button 
                      onClick={() => onNavigate("Visualization")}
                      size="lg"
                      variant="outline"
                      className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white h-14 px-8"
                    >
                      <Eye className="mr-2 w-5 h-5" />
                      Visualize Design
                    </Button>
                  </motion.div>

                  {/* Trust Badge */}
                  <motion.div 
                    className="flex items-center gap-3 mt-8 pt-8 border-t border-neutral-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex -space-x-2">
                      {customerImages.slice(0, 3).map((img, i) => (
                        <ImageWithFallback
                          key={i}
                          src={img}
                          alt="User"
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-[#223B57]">Join 10,000+ happy customers</div>
                      <div className="text-neutral-500">who planned their projects with us</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}