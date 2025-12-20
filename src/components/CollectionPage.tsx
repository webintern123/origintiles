import { ArrowRight, Sparkles, Package, Star, Award,  Globe, ChevronLeft, ChevronRight, Phone, Send, CheckCircle2, Factory, Home,Coffee,Briefcase,Trees,Users,Shield} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageBanner } from "./PageBanner";
import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { collections } from "../data/collections";
import { products } from "../data/products";
import { BRANDS } from "../constants";
import { useState, useEffect, useRef } from "react";

interface CollectionPageProps {
  onNavigate: (page: string) => void;
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

export function CollectionPage({ onNavigate }: CollectionPageProps) {
  const collectionsData = collections.map((collection, index) => ({
    ...collection,
    established: BRANDS[index]?.established || 1985,
    tagline: BRANDS[index]?.description || collection.description,
    features: [
      `${collection.productCount}+ Products`,
      "Premium Quality",
      "Latest Designs"
    ]
  }));

  // Calculate total products across all collections
  


  // Featured Products Carousel
  const featuredProducts = products.slice(0, 6); // Get first 6 products
  const productsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsScrollRef.current) {
      const scrollAmount = 420;
      const newScrollLeft = productsScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      productsScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollPosition = () => {
    if (productsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = productsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = productsScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Stats data
  const stats = [
  {
    icon: Sparkles,
    value: 650,
    suffix: "+",
    label: "Distinct Tile Designs",
  },
  {
    icon: Globe,
    value: "PAN India",
    label: "Tile Delivery",
  },
  {
    icon: Package,
    value: 50,
    suffix: "M+ Sq. Ft.",
    label: "of Tiles Successfully Installed",
  },
  {
    icon: Award,
    value: 25,
    suffix: "+ Years",
    label: "Experience",
  },
];


  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === ENHANCED PAGE BANNER === */}
      <PageBanner
        title="High Quality Collections Designed for Every Space"
        subtitle="Origin Tiles Collections Range "
        description="Explore Origin Tiles 6 carefully developed collections, created for bathrooms, kitchens, living spaces, outdoor areas, and commercial projects. Each collection is designed with a clear purpose, balancing design, and long-term use."
       
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1662749061774-8da69c898e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
        badge="6 Designer Collections | 650+ Products"
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
                      {typeof stat.value === "number" ? (
  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
) : (
  <span className="text-3xl font-bold text-[#223B57]">
    {stat.value}
  </span>
)}

                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === COLLECTIONS GRID === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Our Exclusive Range Of Collections
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
             A thoughtfully designed range of tile collections created for different spaces, styles, and everyday needs.
            </p>
          
          </motion.div>
      
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            {collectionsData.map((collection, index) => (
              <motion.div
                key={collection.id}
                className="col-span-12 md:col-span-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <div className="relative group cursor-pointer h-full" onClick={() => onNavigate("Products")}>
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
                    
                    {/* Image Section */}
                    <div className="relative h-96 overflow-hidden">
                      <ImageWithFallback
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/95 via-[#223B57]/50 to-transparent"></div>
                      
                      {/* Badge - Featured */}
                      <div className="absolute top-6 right-6">
                        <Badge className="bg-white/95 backdrop-blur-md text-[#223B57] border-0 shadow-lg font-semibold hover:bg-white transition-colors">
                          <Star className="w-3 h-3 mr-1 fill-[#223B57]" />
                          Recommended
                        </Badge>
                      </div>

                      {/* Bottom Content - Glassmorphism */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 group-hover:bg-white/15 group-hover:scale-[1.02] transition-all duration-300">
                          
                          <h2 className="text-white text-3xl font-bold mb-2">{collection.name}</h2>
                          <p className="text-white/90 mb-4">{collection.tagline}</p>
                          
                         <div className="flex flex-col gap-1 mb-4">
  {collection.bestSuitedFor && (
    <span className="text-sm text-white/90">
      <strong>Best Suited For:</strong> {collection.bestSuitedFor.join(", ")}
    </span>
  )}
  {collection.availableFinishes && (
    <span className="text-sm text-white/90">
      <strong>Available Finishes:</strong> {collection.availableFinishes.join(", ")}
    </span>
  )}
  {collection.applications && (
    <span className="text-sm text-white/90">
      <strong>Recommended Applications:</strong> {collection.applications.join(", ")}
    </span>
  )}
</div>


                          {/* View Products Count */}
                          <div className="flex items-center gap-2 text-white/90">
                            <Package className="w-4 h-4" />
                            <span className="text-sm font-semibold">{collection.productCount}+ Products</span>
                          </div>
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-all duration-300 pointer-events-none"></div>
                    </div>
                    
                    {/* Card Content */}
                    <CardContent className="p-8">
                      <p className="text-neutral-600 mb-6 leading-relaxed">
                        {collection.description}
                      </p>
                      
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("Products");
                        }}
                        className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white rounded-xl h-12 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                       
                        Explore {collection.name}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
               
              </motion.div>
            ))}
          </div>
           </div>
        </div>
      </section>


      {/* === WHY CHOOSE OUR COLLECTIONS === */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              Why We Are a Trusted Tile Brand?
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-[#223B57]">Quality You Can Rely On Across Every Collection</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
             Each Origin Tiles collection is created with a strong focus on design clarity, consistent quality, and long-term performance.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Distinct Designs",
                description: "A wide range of styles from modern to classic, to suit different spaces and preferences."
              },
              {
                icon: Award,
                title: "Reliable Quality",
                description: "Manufactured in ISO-certified facilities with strict quality checks for lasting performance."
              },
              {
                icon: Package,
                title: "Wide Range of Options",
                description: "650+ tile options across six collections, suitable for homes, commercial spaces, and varied budgets.",
              },
              {
                icon: Star,
                title: "Proven Experience",
                description: "Decades of industry experience, trusted by thousands of customers across India."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative group h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center mx-auto mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-300">
                      <feature.icon className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-[#223B57] mb-2">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

{/* === WHY CHOOSE US === */}
     <section className="py-20 bg-[#F5F3F0]">
  <div className="container">
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Browse Collections By Application
      </h2>
      <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
        Quickly find the right collection based on where you plan to use it.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Factory, // Bathroom
          title: "Bathroom Collections",
          description: "Modern Bathroom Series"
        },
        {
          icon: Home, // Kitchen Floor (replace Kitchen with a suitable icon from lucide-react)
          title: "Kitchen Floor Collections",
          description: "Kitchen Floor Collection"
        },
        {
          icon: Home, // Living Room
          title: "Living Room Collections",
          description: "Marble Pattern Series, Luxury Collection"
        },
        {
          icon: Coffee, // Bedroom (use any suitable icon for bedroom, e.g., Bed icon if available)
          title: "Bedroom Collections",
          description: "Wood Look Collection"
        },
        {
          icon: Trees, // Outdoor & Parking
          title: "Outdoor & Parking Collections",
          description: "Designer Wall Series (textured finishes)"
        },
        {
          icon: Briefcase, // Commercial Use
          title: "Commercial Use Collections",
          description: "Kitchen Floor & selected Marble Pattern tiles"
        }
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
{/* === WHY CHOOSE US === */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
           
            <h2 className="text-3xl md:text-4xl font-bold text-[#223B57] mb-4">
              Why Origin Tiles Collections Last Longer?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Consistency You Can Trust, Project After Project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Consistent Shade Control",
                description: "Uniform colour matching across batches to maintain visual consistency."
              },
              {
                icon: Users,
                title: "Even Surface Finish",
                description: "Smooth and uniform finish across large areas and installations."
              },
              {
                icon: Package,
                title: "Reliable Availability",
                description: " Continuous supply to support phased and long-duration projects."
              },
             
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
        <br></br>
        {/* Tagline */}
            <motion.div
              className="text-center mt-20 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-1xl font-semibold text-[#223B57] italic mb-4">
                “This ensures your space looks consistent and even in large or multi-stage installations.”
              </p>
            </motion.div>
      </section>

      

      {/* === FEATURED PRODUCTS CAROUSEL === */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              Highlighted Products
            </Badge>
            <h2 className="text-3xl font-bold text-[#223B57] mb-3">Popular Picks from Our Collections</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore a curated selection of tiles from different Origin Tiles collections, chosen for their design appeal and everyday performance.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                onClick={() => scrollProducts('left')}
                disabled={!canScrollLeft}
                className={`w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                  canScrollLeft ? 'opacity-100 hover:scale-110' : 'opacity-30 cursor-not-allowed'
                }`}
                variant="ghost"
              >
                <ChevronLeft className="w-6 h-6 text-[#223B57]" />
              </Button>
            </div>

            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <Button
                onClick={() => scrollProducts('right')}
                disabled={!canScrollRight}
                className={`w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                  canScrollRight ? 'opacity-100 hover:scale-110' : 'opacity-30 cursor-not-allowed'
                }`}
                variant="ghost"
              >
                <ChevronRight className="w-6 h-6 text-[#223B57]" />
              </Button>
            </div>

            {/* Scrollable Products Container */}
            <div
              ref={productsScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-[380px]"
                >
                  <div className="relative group cursor-pointer h-full" onClick={() => onNavigate("Products")}>
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative overflow-hidden bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
                      {/* Product Image */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        
                        {/* Premium Badge */}
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-[#223B57] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                            {product.category}
                          </Badge>
                        </div>
                        
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
                              onNavigate("Products");
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
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Products Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => onNavigate("Products")}
              className="bg-[#223B57] hover:bg-[#1a2d43] text-white h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* === SAMPLE REQUEST SECTION === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left: Sample Request Content */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20 px-4 py-2">
                <Send className="w-3.5 h-3.5 mr-2" />
                  Free Tile Samples
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-6 leading-tight">
                Experience the Quality Before You Choose
              </h2>
              
              <p className="text-base text-neutral-600 mb-6 leading-relaxed">
               Get a real feel of Origin Tiles before making your final choice. We offer  <span className="font-semibold text-[#223B57]">free samples</span> from our collections to help you select the right tile for your space.
              </p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                {[
                  "Order up to 5 free samples per request",
"Delivered within 3 - 5 working days",
"	Check actual colours, textures, and finishes",
"	No commitment — completely free.",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-md rounded-full"></div>
                      <div className="relative w-6 h-6 rounded-full bg-[#223B57] flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">{benefit}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => onNavigate("Sample Request")}
                  size="lg"
                  className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] active:scale-95 text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Request Free Samples
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  onClick={() => onNavigate("Contact")}
                  size="lg"
                  variant="outline"
                  className="border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] h-14 px-8 transition-all"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Talk to an Expert
                </Button>
              </div>
            </motion.div>

            {/* Right: Premium Image with Floating Cards */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                    alt="Tile Samples"
                    className="w-full h-[500px] object-cover"
                  />
                  
                  {/* Top Right Glassmorphism Card */}
                  <motion.div 
                    className="absolute top-8 right-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#223B57] flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-600 mb-0.5">Free Shipping</div>
                          <div className="text-lg font-bold text-[#223B57]">Pan India</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bottom Left Glassmorphism Card */}
                  <motion.div 
                    className="absolute bottom-8 left-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-5 py-4 shadow-2xl border border-white/60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-xs text-neutral-600 mb-0.5">Quick Delivery</div>
                          <div className="text-lg font-bold text-[#223B57]">3-5 Days</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
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
                  Ready to Transform Your Space?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Need Help Choosing the Right Collection?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Our design experts are ready to guide you through our collections and help you find the perfect tiles for your project
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
                    onClick={() => onNavigate("Tile Calculator")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl [&_svg]:text-white"
                  >
                    Try Tile Calculator
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