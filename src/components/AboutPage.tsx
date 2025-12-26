import { Target, Eye, Award, Users, Globe, TrendingUp, Heart, Shield, Lightbulb, Handshake, Sparkles, CheckCircle2, Star, ArrowRight, Building2, Factory, Palette, Package,MapPin, Mail, Briefcase, Clock, DollarSign, Cpu, Settings, Megaphone, ChevronLeft, ChevronRight, Zap, Cog, Microscope, Truck, Box, Trophy, Medal, Home,Leaf } from "lucide-react";
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
        title="Welcome to Origin Tiles – Building Beautiful Spaces"
        subtitle="About Origin Tiles"
        description="Origin Tiles is built on experience, consistency, and a clear focus on quality. For decades, we have been creating tiles that perform well, look refined, and support projects of every scale - from individual homes to large commercial developments."
       
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1662749061774-8da69c898e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
        badge="Design. Detail. Durability. Delivered."
      />

      {/* === QUICK STATS CARDS - Floating Above === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '25+ Years of  ', label: "Industry Experience", icon: Award },
              { value: `${STATS.totalProducts}+`, label: "Distinct Tile Designs", icon: Palette },
              { value: `${STATS.countriesServed}+`, label: "Countries Served", icon: Globe },
              { value: `${STATS.sqFtInstalled}M+Sq Ft`, label: "Successfully Installed", icon: TrendingUp }
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
      {/* === ORIGIN TILES TIMELINE === */}
<section className="py-24 bg-white">
  <div className="container mx-auto px-6">

    {/* Header */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20 px-5 py-2">
        <Clock className="w-4 h-4 mr-2" />
        Our Journey at a Glance
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Brand Legacy & Trust Metrics
      </h2>

      <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-4">
        From our early beginnings to becoming a trusted tile brand, Origin Tiles has grown with a clear focus on consistency, design, and long-term performance.
      </p>
    </motion.div>

    {/* Timeline */}
    <div className="relative max-w-5xl mx-auto">

      {/* Vertical Line */}
       <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-[#223B57] z-0" />
      {/* Timeline Items */}
      {[
        {
          year: '1998',
          title: 'The Beginning',
          description: 'Origin Tiles was founded with a clear aim to manufacture reliable, high-quality ceramic tiles for Indian homes.',
          icon: Sparkles,
          side: 'left'
        },
        {
          year: '2005',
          title: 'Manufacturing Expansion',
          description: 'Production capacity was increased to meet rising demand, along with the introduction of new tile designs and sizes.',
          icon: TrendingUp,
          side: 'right'
        },
        {
          year: '2010',
          title: 'Quality Systems Strengthened',
          description: ' ISO-certified processes were adopted to ensure consistent quality, batch control, and dependable performance.',
          icon: Award,
          side: 'left'
        },
        {
          year: '2014',
          title: 'Design-Led Growth',
          description: 'Expanded tile collections to meet evolving design needs across residential and commercial spaces in India.',
          icon: Globe,
          side: 'right'
        },
        {
          year: '2018',
          title: 'Pan-India Reach',
          description: 'Strengthened dealer and distribution network to serve multiple cities and regions across the country.',
          icon: Factory,
          side: 'left'
        },
        {
          year: '2022',
          title: 'Technology Upgrade',
          description: 'Manufacturing processes were upgraded to improve finish quality, consistency, and production efficiency.',
          icon: Leaf,
          side: 'right'
        },
        {
          year: '2024',
          title: 'Trusted Indian Brand',
          description: 'Recognised as a dependable tile partner for homeowners, architects, and builders across India.',
          icon: Trophy,
          side: 'left'
        },
      ].map((milestone, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: milestone.side === 'left' ? -60 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.12 }}
          className="relative grid grid-cols-2 gap-8 mb-24 z-10"
        >
          {/* Left Card */}
          <div className={milestone.side === 'left' ? 'text-right pr-12' : ''}>
            {milestone.side === 'left' && (
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center justify-end gap-4 mb-3">
                  <span className="text-4xl font-bold text-[#223B57]">{milestone.year}</span>
                  <div className="w-14 h-14 rounded-xl bg-[#223B57]/10 flex items-center justify-center">
                    <milestone.icon className="w-7 h-7 text-[#223B57]" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[#223B57] mb-2">{milestone.title}</h4>
                <p className="text-neutral-600">{milestone.description}</p>
              </div>
            )}
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2 z-20">
            <motion.div
              whileHover={{ scale: 1.3 }}
              className="w-6 h-6 rounded-full bg-gradient-to-br from-[#223B57] to-[#2d4a6a] border-4 border-white shadow-xl"
            />
          </div>

          {/* Right Card */}
          <div className={milestone.side === 'right' ? 'pl-12' : ''}>
            {milestone.side === 'right' && (
              <div className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-xl bg-[#223B57]/10 flex items-center justify-center">
                    <milestone.icon className="w-7 h-7 text-[#223B57]" />
                  </div>
                  <span className="text-4xl font-bold text-[#223B57]">{milestone.year}</span>
                </div>
                <h4 className="text-xl font-bold text-[#223B57] mb-2">{milestone.title}</h4>
                <p className="text-neutral-600">{milestone.description}</p>
              </div>
            )}
          </div>
        </motion.div>
      ))}
     
    </div>
     {/* Timeline Footer Quote */}
<div className="text-center mt-16">
  <p className="text-2xl md:text-3xl font-semibold text-[#223B57]">
    “Built on Quality, Grown on Trust”
  </p>
</div>
  </div>
</section>

<br></br>
<br></br>
<br></br>
<br></br>
<br></br>





      {/* === WHO WE ARE - PREMIUM SPLIT === */}
       <section className="relative -mt-20 z-10 mb-10">
        <div className="container">
          <div className="grid grid-cols-12 gap-12 items-start">

            {/* Left: Text Content */}
            <motion.div
              className="col-span-12 lg:col-span-5 h-full flex flex-col"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-6 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20 px-4 py-2">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Our Story
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-8 leading-tight">
                Creating Better Spaces with Premium Ceramic Tiles
              </h2>
              
              <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                {SITE_CONFIG.name} was founded to create tiles that look good and perform reliably for years. From the start, our focus has been on quality, design, and consistency. We manufacture premium ceramic tiles that combine refined design with dependable performance.
              </p>
              
              <p className="text-base text-neutral-600 mb-10 leading-relaxed">
                With experienced professionals behind every product, each tile is made for durability and long-term use. Unlike brands that focus only on design or pricing, we give equal importance to consistent manufacturing, technical performance, and reliable service. This helps avoid common issues like shade variation and uneven quality.
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
  className="mt-auto bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] active:scale-95 text-white h-14 px-8 shadow-lg hover:shadow-xl transition-all group"
>

                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right: Premium Image with Floating Card */}
            <motion.div
              className="col-span-12 lg:col-span-7 h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full">
                {/* Main Image Container */}
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">

                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200&q=80"
                    alt="Premium Tile Showroom"
                      className="w-full h-full object-cover"
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

      {/* === BUILT FOR PROJECTS OF EVERY SCALE === */}
<section className="py-20 bg-white">
  <div className="container">
    {/* Heading */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
        <Building2 className="w-3.5 h-3.5 mr-2" />
        Projects & Partnerships
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Built for Projects of Every Scale
      </h2>

      <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
        Whether it’s a single home renovation or a large commercial development,
        Origin Tiles is equipped to support projects of all sizes.
      </p>
      <br></br>
      <h4 className="text-3xl md:text-4xl font-bold text-[#223B57] mb-4">
         Clients We Serve
      </h4>
    </motion.div>
    

    {/* Clients We Serve */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      
      {[
        {
          title: "Homeowners",
          description: "For long-lasting, stylish spaces",
          icon: Home,
        },
        {
          title: "Architects & Interior Designers",
          description: "For design freedom and consistency",
          icon: Palette,
        },
        {
          title: "Builders & Developers",
          description: "For dependable bulk supply",
          icon: Factory,
        },
        {
          title: "Dealers & Distributors",
          description: "For a stable partnership",
          icon: Handshake,
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border border-neutral-200 hover:border-[#223B57]/30 hover:shadow-xl transition-all duration-300 rounded-2xl">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center mb-4">
                <item.icon
                  className="w-6 h-6 text-[#223B57]"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-lg font-semibold text-[#223B57] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Supporting Text */}
    <motion.p
      className="text-center text-neutral-600 max-w-4xl mx-auto mb-16 leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      Our production capacity and supply planning allow us to manage both small and
      bulk requirements smoothly, without compromising on quality or timelines.
    </motion.p>

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {[
        {
          value: 10000,
          label: "Happy Customers",
          icon: Users,
        },
        {
          value: 15000,
          label: "Projects Completed",
          icon: CheckCircle2,
        },
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-0 shadow-lg rounded-2xl bg-[#F5F3F0]">
            <CardContent className="p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#223B57] flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <div className="text-4xl font-bold text-[#223B57] mb-1">
                <AnimatedCounter end={stat.value} suffix="+" />
              </div>
              <div className="text-sm text-neutral-600">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <div className="text-center mt-16">
      <Button
        onClick={() => onNavigate("Contact")}
        size="lg"
        className="bg-[#223B57] hover:bg-[#1a2d43] text-white h-14 px-10 shadow-lg hover:shadow-xl transition-all group"
      >
        Get in Touch
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
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
              Guided by Quality, Shaped by Innovation
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
                          To create ceramic tiles that offer reliable quality, thoughtful design, and responsible manufacturing. We aim to support our customers, architects, ad dealers at every stage - from product selection to service, we helping them build spaces they can trust and enjoy.
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
                          To grow as a trusted tile brand known for consistent quality, smart design or innovation, and sustainable practices. We aspire to set higher standards in how tiles are made, used, and experienced across homes and projects.
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

       {/* === CORE VALUES - PREMIUM CARDS WITH BULLETS === */}
<section className="py-20 bg-white">
  <div className="max-w-[1440px] mx-auto px-6 md:px-12">
    {/* Header */}
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
        <Heart className="w-3 h-3 mr-1" />
        Values & Principles
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Our Core Values
      </h2>
      <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
        What Guides Every Decision of Ours
      </p>
    </motion.div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Award,
          title: "Quality Excellence",
          bullets: [
            "Strict raw material selection",
            "Batch-wise shade and calibre control",
            "ISO-certified quality checks at every stage",
          ],
          description: "We never compromise on quality.",
        },
        {
          icon: Lightbulb,
          title: "Innovation with Purpose",
          bullets: [
            "Research-driven designs",
            "Practical finishes and formats",
            "Focus on long-term usability",
          ],
          description: "We create designs that are useful, relevant, and long-lasting.",
        },
        {
          icon: Users,
          title: "Customer-Centric Approach",
          bullets: [
            "Guidance during selection",
            "Reliable supply and delivery",
            "Responsive after-sales support",
          ],
          description: "We support our customers at every step of the journey.",
        },
        {
          icon: Globe,
          title: "Sustainability in Action",
          bullets: [
            "Energy-efficient manufacturing",
            "Water recycling processes",
            "Reduced waste generation",
            "Low-emission manufacturing",
          ],
          description: "We work responsibly to reduce environmental impact.",
        },
        {
          icon: Shield,
          title: "Integrity & Transparency",
          bullets: [
            "Open communication",
            "Realistic commitments",
            "Dependable delivery timelines",
          ],
          description: "We believe in clear and honest business practices.",
        },
        {
          icon: Handshake,
          title: "Dealer Network & Partnership",
          bullets: [
            
            "Fair business practices & margin protection",
            "Shared growth mindset",
            "Marketing and branding assistance",
            "Reliable supply planning",
          ],
          description: "We build long-term relationships based on trust.",
        },
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
  {/* Icon */}
  <div className="relative inline-block mb-6">
    <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
    <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
      <value.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
    </div>
  </div>

  {/* Title & Description */}
  <h3 className="font-bold text-xl mb-2 text-[#223B57]">{value.title}</h3>
  <p className="text-neutral-600 mb-4">{value.description}</p>

  {/* Left-aligned "In practice" section */}
  <div className="text-left">
    <h4 className="font-semibold text-[#223B57] mb-2">In practice:</h4>
    <ul className="list-disc list-inside text-neutral-600 space-y-1">
      {value.bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  </div>
</CardContent>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>



{/* === CORE VALUES - PREMIUM CARDS WITH BULLETS === */}
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
        What Makes Origin Tiles Different?
      </h2>
    
    </motion.div>

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Award,
          title: "Manufacturing Strength",
          bullets: [
            "	Advanced High Production Capacity ",
"Multiple- Stage Quality Checkpoints",
"	Secure Packaging for Safe Delivery.",

          ],
         
        },
        {
          icon: Lightbulb,
          title: "Design & Innovation",
          bullets: [
           "	Research-driven collections",
"	Modern finishes and sizes",
"Design support for professionals.",

          ],
          
        },
        {
          icon: Users,
          title: "Service & Delivery",
          bullets: [
            "	Reliable logistics",
"Dealer and project support",
"	Post-purchase assistance."
          ],
          
        },
       
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
  {/* Icon */}
  <div className="relative inline-block mb-6">
    <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
    <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
      <value.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
    </div>
  </div>

  {/* Title & Description */}
  <h3 className="font-bold text-xl mb-2 text-[#223B57]">{value.title}</h3>
  

  {/* Left-aligned "In practice" section */}
  <div className="text-left">
    
    <ul className="list-disc list-inside text-neutral-600 space-y-1">
      {value.bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  </div>
</CardContent>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* === INNOVATION & R&D === */}
<section className="py-24 bg-white relative overflow-hidden">
  {/* Soft Background Accent */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 via-transparent to-transparent pointer-events-none"></div>

  <div className="container relative z-10">
    {/* Heading */}
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-5 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20 px-5 py-2">
        <Lightbulb className="w-4 h-4 mr-2" />
        Shaping What’s Next
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Innovation & R&D
      </h2>
      

      <p className="text-lg text-neutral-600 max-w-3xl mb-4 mx-auto">
        Our R&D team focuses on:
      </p>
    </motion.div>

    {/* R&D Focus Areas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { title: "Trend Forecasting", icon: TrendingUp },
        { title: "Design Research", icon: Microscope },
        { title: "New Finishes & Surface Technologies", icon: Sparkles },
        { title: "Future-Ready Sizes & Formats", icon: Box },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.12 }}
          className="group"
        >
          <Card className="relative h-full border border-neutral-200 rounded-3xl bg-white/90 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardContent className="relative p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center border border-[#223B57]/20 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                <item.icon
                  className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors duration-500"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#223B57] leading-snug">
                {item.title}
              </h3>
            </CardContent>
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
              Our Collections
            </Badge>
            <h2 className="text-4xl md:text-4xl font-bold text-[#223B57] mb-4">
              Tiles Designed for Different Spaces and Styles
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Origin Tiles offers six thoughtfully developed collections, each created to suit specific design needs and applications.
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
              What Makes Us a Trusted Tile Brand
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Factory,
                title: "Advanced Manufacturing",
                description: "Modern production facilities ensure accuracy, consistency, and reliable quality."
              },
              {
                icon: Users,
                title: "	Expert Guidance",
                description: "Experienced teams to support tile selection based on your project needs."
              },
              {
                icon: Package,
                title: "Wide Design Range",
                description: "650+ designs across six premium collections, readily available."
              },
              {
                icon: Shield,
                title: "Quality Assurance",
                description: "ISO-certified processes with warranty-backed quality standards."
              },
              {
                icon: Globe,
                title: "Strong Market Presence",
                description: "A well-established network serving multiple regions reliably."
              },
              {
                icon: CheckCircle2,
                title: "Proven Experience",
                description: "15,000+ completed projects and 10,000+ satisfied customers built over decades."
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
              Modern facilities combined with precise workmanship.
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
                        <div className="text-xs text-neutral-600">Quality Focus</div>
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
                    title: "Innovation Lab",
                    description: "In-house R&D focused on new designs, finishes, and better materials."
                  },
                  {
                    icon: Cog,
                    title: "Quality Control",
                    description: "Multiple inspection stages with ISO-certified checks throughout manufacturing."
                  },
                  {
                    icon: Zap,
                    title: "Advanced Technology",
                    description: "High-precision machinery ensures consistent quality across every production batch."
                  },
                  {
                    icon: Box,
                    title: "Smart Packaging",
                    description: "Secure packing and organised logistics to ensure safe, damage-free delivery."
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
      </section> {/* === AWARDS & RECOGNITION === */}
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
              Honoured for quality, design, and consistent performance
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
                organization: "Federation of Indian Export Organisations",
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
              Our Presence Across India
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Origin Tiles serves customers across India through a strong dealer and distribution network.
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
                        <Badge className="mb-2 bg-[#223B57] text-white">Head Office</Badge>
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
                        <span>Monday to Saturday | 9:00 AM – 6:00 PM IST</span>
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
                     We supply tiles across major cities and regions in India through our well-connected dealer network.
                    </p>
                     <h2 className="font-bold text-xl text-[#223B57] mb-2">Key Cities Served:</h2>
                    <div className="flex flex-wrap gap-2">
                      {["Hyderabad" , "Nellore "," Chennai ", "Bangalore"," Vijayawada",].map((city, idx) => (
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
      <section className="py-20 bg-white">
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
              Certifications & Compliance
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Following recognised standards for quality, safety, and responsible manufacturing in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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
                    <h3 className="font-bold text-lg text-[#223B57] mb-2">
  {cert.name}
</h3>

<p className="text-sm text-neutral-600 mb-4 leading-relaxed">
  {cert.description}
</p>

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
                  Partner with Origin Tiles
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  We Help You Choose the Right Tiles 
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                 Ready to work with a tile brand built on trust and performance? Browse our collections or get personal support from our expert team.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate("Collection")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 rounded-xl h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Palette className="w-4 h-4 mr-2 text-[#223B57]" />
                    Explore Collections – For buyers 
                  </Button>
                  <Button
                    onClick={() => onNavigate("Contact")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 rounded-xl h-12 px-8 [&_svg]:text-white"
                  >
                    Become a Dealer – Grow with us 
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