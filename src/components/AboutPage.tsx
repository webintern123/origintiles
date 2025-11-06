import { Target, Eye, Award, Users, Globe, TrendingUp, Heart, Shield, Lightbulb, Handshake, Sparkles, CheckCircle2, Star, ArrowRight, Building2, Factory, Palette, Package,MapPin, Mail, Briefcase, Clock, DollarSign, Cpu, Settings, Megaphone, ChevronLeft, ChevronRight, Zap, Cog, Microscope, Truck, Box, Trophy, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { PageBanner } from "./PageBanner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { IndiaMap } from "./IndiaMap";
import { motion } from "motion/react";
import { SITE_CONFIG, STATS, CERTIFICATIONS, COLLECTIONS, LEADERSHIP } from "../constants";
import { useState, useEffect, useRef } from "react";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, hasAnimated]);

  return <>{count.toLocaleString()}{suffix}</>;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  // Icon mapping for leadership team
  const iconMap: Record<string, any> = {
    Briefcase,
    DollarSign,
    Cpu,
    Palette,
    Factory,
    TrendingUp,
    Settings,
    Megaphone
  };

  // Leadership carousel scroll ref
  const leadershipScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollLeadership = (direction: 'left' | 'right') => {
    if (leadershipScrollRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = leadershipScrollRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      leadershipScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollPosition = () => {
    if (leadershipScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = leadershipScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = leadershipScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PREMIUM PAGE BANNER === */}
      <PageBanner
        title="Built by Experienced Professionals"
        subtitle="About Origin Tiles"
        description="A brand showcasing expertise, creativity, and commitment to design excellence. Transforming spaces with premium tiles that blend timeless craftsmanship with contemporary innovation. Trusted by architects, designers, and homeowners worldwide."
        icon={Building2}
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1662749061774-8da69c898e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
        badge="Design. Detail. Durability. Delivered"
      />

      {/* === QUICK STATS CARDS - Floating Above === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: `${STATS.yearsExperience}+`, label: "Years Experience", icon: Award },
              { value: `${STATS.totalProducts}+`, label: "Unique Designs", icon: Palette },
              { value: `${STATS.countriesServed}+`, label: "Countries Served", icon: Globe },
              { value: `${STATS.sqFtInstalled}M+`, label: "Sq Ft Installed", icon: TrendingUp }
            ].map((stat, index) => (
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
                    <div className="text-3xl font-bold text-[#223B57] mb-1"><AnimatedCounter end={parseInt(stat.value.replace(/\D/g, ''))} suffix={stat.value.replace(/\d+/g, '')} /></div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHO WE ARE - PREMIUM SPLIT === */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              className="col-span-12 lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20 px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Our Story
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-8 leading-tight">
                Transforming Spaces with Premium Ceramic Tiles
              </h2>
              
              <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                {SITE_CONFIG.name} is at the forefront of ceramic tile innovation. We specialize in manufacturing and distributing <span className="font-semibold text-[#223B57]">premium tiles</span> that combine exceptional quality with stunning design. Built by experienced professionals, we are dedicated to craftsmanship and excellence in every product.
              </p>
              
              <p className="text-base text-neutral-600 mb-10 leading-relaxed">
                Our extensive portfolio includes <span className="font-semibold text-[#223B57]">six premium collections</span> – {COLLECTIONS[0].name}, {COLLECTIONS[1].name}, {COLLECTIONS[2].name}, {COLLECTIONS[3].name}, {COLLECTIONS[4].name}, and {COLLECTIONS[5].name} – each catering to distinct design preferences and applications, from luxury residential to commercial projects.
              </p>

              {/* Quick Stats Cards - Horizontal Layout */}
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: "Happy Customers", value: "10,000+", icon: Users },
                  { label: "Projects Completed", value: "15,000+", icon: CheckCircle2 }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="group"
                  >
                    <div className="relative p-6 rounded-2xl bg-white border border-neutral-200 hover:border-[#223B57]/20 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#223B57]/10 flex items-center justify-center group-hover:bg-[#223B57] transition-all duration-300">
                          <item.icon className="w-5 h-5 text-[#223B57] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-[#223B57] mb-1">{item.value}</div>
                      <div className="text-sm text-neutral-600">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button 
                onClick={() => onNavigate("Contact")}
                size="lg"
                className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] active:scale-95 text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right: Premium Image with Floating Card */}
            <motion.div
              className="col-span-12 lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                    alt="Premium Tile Showroom"
                    className="w-full h-[600px] object-cover"
                  />
                  
                  {/* Bottom Left Glassmorphism Card */}
                  <motion.div 
                    className="absolute bottom-8 left-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl border border-white/60 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#223B57] flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-xs text-neutral-600 mb-0.5">Premium Quality</div>
                        <div className="text-2xl font-bold text-[#223B57]">ISO Certified</div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Action Buttons - Right Side */}
                <div className="absolute bottom-8 right-8 flex flex-col gap-3">
                  <motion.button
                    className="w-14 h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                  </motion.button>
                  
                  <motion.button
                    className="w-14 h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    <ArrowRight className="w-6 h-6 rotate-[-90deg]" strokeWidth={1.5} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === MISSION & VISION - PREMIUM HIGHLIGHT === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Target className="w-3 h-3 mr-1" />
              Our Purpose
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Mission & Vision
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Driven by excellence and inspired by innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-8">
            {/* Mission - Premium Card */}
            <motion.div 
              className="col-span-12 md:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative group h-full">
                {/* Premium Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#223B57] via-[#2d4a6a] to-[#223B57] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm h-full">
                  <CardContent className="p-0">
                    {/* Premium Header with Background Pattern */}
                    <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] p-8 pb-16 backdrop-blur-sm">
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="mission-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#mission-pattern)" />
                        </svg>
                      </div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30">
                          <Target className="w-8 h-8 text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Our Mission</h3>
                        <div className="w-20 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 -mt-8 relative z-10">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-neutral-700 leading-relaxed text-lg">
                          To provide our customers with the <span className="font-bold text-[#223B57]">finest ceramic tiles</span> that combine superior quality, innovative designs, and sustainable manufacturing practices. We strive to exceed expectations in every aspect of our business, from product development to customer service, ensuring every space we touch becomes a masterpiece.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Vision - Premium Card */}
            <motion.div 
              className="col-span-12 md:col-span-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative group h-full">
                {/* Premium Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#223B57] via-[#2d4a6a] to-[#223B57] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm h-full">
                  <CardContent className="p-0">
                    {/* Premium Header with Background Pattern */}
                    <div className="relative bg-gradient-to-br from-[#2d4a6a] to-[#223B57] p-8 pb-16 backdrop-blur-sm">
                      {/* Decorative Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id="vision-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                              <circle cx="20" cy="20" r="1.5" fill="white" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#vision-pattern)" />
                        </svg>
                      </div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/30">
                          <Eye className="w-8 h-8 text-white" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">Our Vision</h3>
                        <div className="w-20 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8 -mt-8 relative z-10">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <p className="text-neutral-700 leading-relaxed text-lg">
                          To be the <span className="font-bold text-[#223B57]">global leader</span> in ceramic tile manufacturing, recognized for our commitment to innovation, sustainability, and customer satisfaction. We envision a future where {SITE_CONFIG.name} products inspire and transform spaces worldwide, setting new standards for quality and design excellence.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CORE VALUES - PREMIUM CARDS === */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Heart className="w-3 h-3 mr-1" />
              What We Stand For
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              The principles that guide every decision we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Quality Excellence",
                description: "We never compromise on quality. Every tile undergoes rigorous testing to meet international standards and exceed customer expectations."
              },
              {
                icon: Lightbulb,
                title: "Innovation First",
                description: "Constantly pushing boundaries with cutting-edge designs and manufacturing techniques to stay ahead in the ceramic tile industry."
              },
              {
                icon: Users,
                title: "Customer Centric",
                description: "Our customers are at the heart of everything we do. We build lasting relationships through exceptional service and support."
              },
              {
                icon: Globe,
                title: "Sustainability",
                description: "Committed to eco-friendly practices and sustainable manufacturing to protect our planet for future generations."
              },
              {
                icon: Shield,
                title: "Integrity",
                description: "Operating with honesty and transparency in all our business dealings, building trust with customers and partners."
              },
              {
                icon: Handshake,
                title: "Partnership",
                description: "Fostering strong relationships with dealers, architects, and designers to create mutual success and growth."
              }
            ].map((value, index) => (
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
                        <value.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[#223B57]">{value.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === COLLECTION SHOWCASE === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Package className="w-3 h-3 mr-1" />
              Our Portfolio
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Origin Tiles Collections
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Six distinctive collections, each with unique character and appeal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COLLECTIONS.map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => onNavigate("Collection")}
              >
                <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {/* Icon Background with Glass Effect */}
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <Palette className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-[#223B57] mb-3">{collection.name}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{collection.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === LEADERSHIP TEAM - PREMIUM CARDS === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Users className="w-3 h-3 mr-1" />
              Meet Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Leadership Excellence
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Experienced professionals driving innovation and excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Scroll Buttons */}
            <motion.button
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-2xl transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center ${ !canScrollLeft ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
              whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
              whileTap={{ scale: canScrollLeft ? 0.95 : 1 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: canScrollLeft ? 1 : 0.3, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollLeadership('left')}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </motion.button>
            
            <motion.button
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-2xl transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center ${!canScrollRight ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
              whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
              whileTap={{ scale: canScrollRight ? 0.95 : 1 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: canScrollRight ? 1 : 0.3, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              onClick={() => scrollLeadership('right')}
              disabled={!canScrollRight}
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </motion.button>

            {/* Horizontal Scrolling Container */}
            <div 
              ref={leadershipScrollRef}
              className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-8 pb-4 px-1">
                {LEADERSHIP.map((member, index) => {
                  const MemberIcon = iconMap[member.icon];
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex-shrink-0 w-[280px]"
                    >
                      <div className="relative h-full">
                        {/* Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                        
                        <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden h-full">
                          <CardContent className="p-0">
                            {/* Photo */}
                            <div className="relative aspect-square overflow-hidden">
                              <ImageWithFallback
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Overlay on hover */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#223B57] via-[#223B57]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                              
                              {/* Icon overlay */}
                              <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <MemberIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 text-center">
                              <h3 className="font-bold text-lg text-[#223B57] mb-1">{member.name}</h3>
                              <p className="text-sm text-neutral-600 mb-3">{member.role}</p>
                              <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
                                <Mail className="w-3 h-3" />
                                <span>{member.email}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Star className="w-3 h-3 mr-1" />
              Why Origin Tiles
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              What sets us apart in the ceramic tile industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "State-of-the-Art Manufacturing",
                description: "Advanced production facilities with cutting-edge technology ensuring precision and consistency in every tile."
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description: "Dedicated design consultants to help you choose the perfect tiles for your project needs."
              },
              {
                icon: Package,
                title: "Extensive Inventory",
                description: "650+ unique designs across 6 premium collections, ready for immediate delivery worldwide."
              },
              {
                icon: Shield,
                title: "Quality Guarantee",
                description: "Comprehensive warranty and quality assurance on all products with ISO certifications."
              },
              {
                icon: Globe,
                title: "Global Presence",
                description: "Serving 50+ countries with local support and international shipping capabilities."
              },
              {
                icon: CheckCircle2,
                title: "Proven Track Record",
                description: "15,000+ successful projects and 10,000+ satisfied customers across four decades."
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

      {/* === MANUFACTURING EXCELLENCE === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Factory className="w-3 h-3 mr-1" />
              Our Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Manufacturing Excellence
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              State-of-the-art facilities and precision craftsmanship
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-8 mb-12">
            {/* Left: Image */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                  alt="Manufacturing Facility"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/80 via-[#223B57]/20 to-transparent"></div>
                
                {/* Bottom Stats Card */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/60">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#223B57] mb-1">500+</div>
                        <div className="text-xs text-neutral-600">Products</div>
                      </div>
                      <div className="text-center border-x border-neutral-200">
                        <div className="text-2xl font-bold text-[#223B57] mb-1">24/7</div>
                        <div className="text-xs text-neutral-600">Production</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-[#223B57] mb-1">100%</div>
                        <div className="text-xs text-neutral-600">Quality</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Process Steps */}
            <motion.div
              className="col-span-12 lg:col-span-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {[
                  {
                    icon: Microscope,
                    title: "Advanced Technology",
                    description: "Italian machinery and German precision tools ensure consistent quality across every tile production batch."
                  },
                  {
                    icon: Cog,
                    title: "Quality Control",
                    description: "Multi-stage inspection process with ISO-certified quality checks at every manufacturing step."
                  },
                  {
                    icon: Zap,
                    title: "Innovation Lab",
                    description: "Dedicated R&D facility developing new designs, patterns, and sustainable materials."
                  },
                  {
                    icon: Box,
                    title: "Smart Packaging",
                    description: "Protective packaging and efficient logistics ensuring damage-free delivery worldwide."
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
                      {/* Glassmorphism Border */}
                      <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardContent className="relative p-6 flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          {/* Icon Background with Glass Effect */}
                          <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                          <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                            <step.icon className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-[#223B57] mb-2">{step.title}</h3>
                          <p className="text-sm text-neutral-600 leading-relaxed">{step.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === AWARDS & RECOGNITION === */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Trophy className="w-3 h-3 mr-1" />
              Industry Recognition
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Awards & Achievements
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Recognized for excellence in design, quality, and innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Trophy,
                title: "Best Tile Manufacturer",
                year: "2024",
                organization: "India Ceramic Awards",
                color: "from-amber-500/20 to-amber-600/10"
              },
              {
                icon: Medal,
                title: "Design Excellence",
                year: "2023",
                organization: "National Design Council",
                color: "from-blue-500/20 to-blue-600/10"
              },
              {
                icon: Award,
                title: "Export Excellence",
                year: "2023",
                organization: "Federation of Indian Export",
                color: "from-green-500/20 to-green-600/10"
              },
              {
                icon: Star,
                title: "Quality Leadership",
                year: "2024",
                organization: "Quality Council of India",
                color: "from-purple-500/20 to-purple-600/10"
              }
            ].map((award, index) => (
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
                  
                  {/* Colored Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardContent className="relative p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {/* Icon Background with Glass Effect */}
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-12 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <award.icon className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <Badge className="mb-3 bg-[#223B57] text-white">{award.year}</Badge>
                    <h3 className="font-bold text-lg text-[#223B57] mb-2">{award.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{award.organization}</p>
                  </CardContent>
                  
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === INDIA PRESENCE === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <MapPin className="w-3 h-3 mr-1" />
              Where We Are
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Our Presence
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Serving India with plans for global expansion
            </p>
          </motion.div>

          <div className="grid grid-cols-12 gap-8">
            {/* Left: Interactive India Map */}
            <motion.div
              className="col-span-12 lg:col-span-7"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <IndiaMap />
            </motion.div>

            {/* Right: Location Details */}
            <motion.div
              className="col-span-12 lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {/* Headquarters Card */}
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                          <Building2 className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-2 bg-[#223B57] text-white">Headquarters</Badge>
                        <h3 className="font-bold text-xl text-[#223B57] mb-2">Hyderabad, Telangana</h3>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                      {SITE_CONFIG.address}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-4 h-4 text-[#223B57]" />
                        <span>{SITE_CONFIG.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Clock className="w-4 h-4 text-[#223B57]" />
                        <span>Mon-Sat: 9:00 AM - 6:00 PM IST</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Coverage Areas */}
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                          <Truck className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-[#223B57] mb-2">Pan-India Delivery</h3>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                      We deliver across all major Indian cities and regions with our extensive dealer network.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Pune", "Jaipur", "Ahmedabad"].map((city, idx) => (
                        <Badge key={idx} className="bg-[#223B57]/5 text-[#223B57] border-[#223B57]/10">
                          {city}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Future Expansion */}
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-gradient-to-br from-[#223B57] to-[#2d4a6a] group">
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="expansion-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                          <circle cx="20" cy="20" r="1.5" fill="white" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#expansion-pattern)" />
                    </svg>
                  </div>
                  
                  <CardContent className="relative p-6 text-center">
                    <Globe className="w-12 h-12 mx-auto text-white mb-4" strokeWidth={1.5} />
                    <h3 className="font-bold text-xl text-white mb-2">Global Expansion Coming Soon</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      We're planning to expand internationally, bringing Origin Tiles quality to customers worldwide.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === CERTIFICATIONS - PREMIUM BADGES === */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <Award className="w-3 h-3 mr-1" />
              Quality Assurance
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Certifications & Recognition
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Meeting and exceeding international quality standards
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
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
                  
                  <CardContent className="relative p-6 text-center">
                    <div className="relative inline-block mb-4">
                      {/* Icon Background with Glass Effect */}
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <Award className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-[#223B57] mb-2">{cert.name}</h3>
                    <Badge className="bg-[#223B57]/5 text-[#223B57] border-[#223B57]/20">
                      Since {cert.year}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/30 to-transparent rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              {/* Decorative Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                </svg>
              </div>

              <div className="relative z-10">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Let's Work Together
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Explore our premium collections or get in touch with our experts for personalized guidance
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate("Collection")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 rounded-xl h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Palette className="w-4 h-4 mr-2 text-[#223B57]" />
                    Explore Collections
                  </Button>
                  <Button
                    onClick={() => onNavigate("Contact")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 rounded-xl h-12 px-8 [&_svg]:text-white"
                  >
                    Contact Our Team
                    <ArrowRight className="w-4 h-4 ml-2" />
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