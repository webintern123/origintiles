import { useState } from "react";
import {  Download, ArrowRight, Star, Shield, Truck, Package, Eye, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ImageLightbox } from "./ImageLightbox";
import { Breadcrumbs } from "./Breadcrumbs";

import { motion } from "motion/react";
import { toast } from "sonner";

import { products, getProductById } from "../data/products";

interface ProductDetailsPageProps {
  onNavigate: (page: string, productId?: string) => void;
  productId?: string | null;
}

export function ProductDetailsPage({ onNavigate, productId }: ProductDetailsPageProps) {
  // Get actual product data or fallback to first product
  const product = productId ? getProductById(productId) : products[0];
  
  // Fallback to first product if ID not found
  const currentProduct = product || products[0];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  

  // Use product image for all gallery images (in a real app, products would have multiple images)
  const productImages = [
    currentProduct.image,
    currentProduct.image,
    currentProduct.image,
    currentProduct.image
  ];

  // Get related products from same category
  const relatedProducts = products
    .filter(p => 
      p.category === currentProduct.category && 
      p.id !== currentProduct.id
    )
    .slice(0, 4);

  const features = [
    { icon: Shield, title: "10 Year Warranty", description: "Comprehensive coverage" },
    { icon: Truck, title: "Free Delivery", description: "On bulk orders" },
    { icon: Star, title: "Premium Quality", description: "ISO 9001:2015 certified" },
    { icon: Package, title: "Sample Available", description: "Order a sample first" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Product Details Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <Breadcrumbs 
            items={["Products", currentProduct.category, currentProduct.name]} 
            onNavigate={onNavigate}
          />
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery - Premium Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative group/main">
                {/* Glow Effect */}
                <div className="absolute -inset-2 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover/main:opacity-100 blur-2xl transition-opacity duration-500"></div>
                
                <div 
                  className="relative h-[500px] rounded-3xl overflow-hidden mb-4 cursor-pointer group bg-white/60 backdrop-blur-md shadow-xl"
                  onClick={() => setLightboxOpen(true)}
                >
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none z-10"></div>
                  
                  <ImageWithFallback
                    src={productImages[selectedImage]}
                    alt="Product - Click to zoom"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center z-10">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full font-medium text-[#223B57] shadow-lg flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Click to view fullscreen
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 rounded-2xl overflow-hidden transition-all duration-300 bg-white/60 backdrop-blur-sm shadow-md hover:shadow-xl ${
                      selectedImage === index 
                        ? "ring-2 ring-[#223B57] ring-offset-2 scale-105" 
                        : "hover:scale-105"
                    }`}
                  >
                    {/* Glassmorphism Border */}
                    <div className={`absolute inset-0 rounded-2xl pointer-events-none ${
                      selectedImage === index 
                        ? "border-2 border-[#223B57]" 
                        : "border border-white/30"
                    }`}></div>
                    
                    <ImageWithFallback
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4">
                <Badge className="bg-white/95 backdrop-blur-md text-[#223B57] border-0 shadow-md mb-4">
                  {currentProduct.brand} • {currentProduct.category}
                </Badge>
                {(currentProduct.specifications?.Trend?.includes('Trending') || 
                  currentProduct.size.includes('48') || 
                  currentProduct.size.includes('64') || 
                  currentProduct.size.includes('72')) && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white ml-2">
                    Trending
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-[#223B57] mb-4">
                {currentProduct.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#223B57] text-[#223B57]" />
                  ))}
                </div>
                <span className="text-neutral-600">(127 reviews)</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <Badge className="bg-[#223B57]/10 text-[#223B57] text-lg px-4 py-2">In Stock</Badge>
                <Badge className="bg-green-500/10 text-green-700 text-lg px-4 py-2 border border-green-500/20">
                  Available for Quote
                </Badge>
              </div>

              <p className="text-neutral-600 mb-8 leading-relaxed">
                {currentProduct.description}
              </p>

              <div className="relative group mb-8">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                <div className="relative grid grid-cols-2 gap-6 p-6 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 shadow-lg">
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Size</div>
                    <div className="font-semibold text-[#223B57]">{currentProduct.size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Thickness</div>
                    <div className="font-semibold text-[#223B57]">
                      {currentProduct.specifications?.Thickness || '9-10mm'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Finish</div>
                    <div className="font-semibold text-[#223B57]">{currentProduct.finish}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">Application</div>
                    <div className="font-semibold text-[#223B57]">
                      {currentProduct.specifications?.['Suitable For'] || 'Various'}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4 mb-8">
                <Button 
                  size="lg" 
                  className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-14 group"
                  onClick={() => {
                    onNavigate("Contact");
                    toast.success("Redirecting to quote request", {
                      description: "Our team will provide pricing based on your requirements."
                    });
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Request Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                    onClick={() => {
                      onNavigate("Sample Request");
                      toast.success("Redirecting to sample request");
                    }}
                  >
                    <Package className="w-5 h-5 mr-2" />
                    Request Sample
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                    onClick={() => {
                      toast.success("Downloading spec sheet");
                    }}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Spec Sheet
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-[#223B57]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#223B57]">{feature.title}</div>
                      <div className="text-xs text-neutral-600">{feature.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Tabs - Redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Tabs defaultValue="details" className="w-full">
              {/* Modern Tab Navigation */}
              <TabsList className="w-full h-auto p-0 bg-transparent flex gap-3 mb-8 overflow-x-auto pb-2">
                <TabsTrigger 
                  value="details" 
                  className="flex-1 min-w-[140px] h-auto px-6 py-4 rounded-2xl border-2 border-transparent data-[state=active]:border-[#223B57] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-[#223B57] transition-all duration-300 hover:border-[#223B57]/30 bg-white/40 backdrop-blur-sm text-neutral-600 font-semibold"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications" 
                  className="flex-1 min-w-[140px] h-auto px-6 py-4 rounded-2xl border-2 border-transparent data-[state=active]:border-[#223B57] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-[#223B57] transition-all duration-300 hover:border-[#223B57]/30 bg-white/40 backdrop-blur-sm text-neutral-600 font-semibold"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="installation" 
                  className="flex-1 min-w-[140px] h-auto px-6 py-4 rounded-2xl border-2 border-transparent data-[state=active]:border-[#223B57] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-[#223B57] transition-all duration-300 hover:border-[#223B57]/30 bg-white/40 backdrop-blur-sm text-neutral-600 font-semibold"
                >
                  Installation
                </TabsTrigger>
                <TabsTrigger 
                  value="care" 
                  className="flex-1 min-w-[160px] h-auto px-6 py-4 rounded-2xl border-2 border-transparent data-[state=active]:border-[#223B57] data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-[#223B57] transition-all duration-300 hover:border-[#223B57]/30 bg-white/40 backdrop-blur-sm text-neutral-600 font-semibold"
                >
                  Care & Maintenance
                </TabsTrigger>
              </TabsList>

              {/* Tab Content with Premium Card Design */}
              <TabsContent value="details" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-8 lg:p-10">
                      <div className="prose prose-neutral max-w-none">
                        <p className="text-neutral-700 leading-relaxed mb-8">
                          {currentProduct.description}
                        </p>
                        
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-[#223B57] rounded-full"></div>
                            <h4 className="text-2xl font-bold text-[#223B57] m-0">Key Features</h4>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            {currentProduct.features?.map((feature, index) => (

                              <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-[#223B57]/5 to-transparent border border-[#223B57]/10 hover:border-[#223B57]/30 transition-all duration-300 hover:shadow-md group/item"
                              >
                                <div className="w-6 h-6 rounded-full bg-[#223B57] flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                </div>
                                <span className="text-neutral-700 leading-relaxed pt-0.5">{feature}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
                    
              <TabsContent value="specifications" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Technical Specifications Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                      <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-[#223B57] rounded-full"></div>
                          <h4 className="text-2xl font-bold text-[#223B57]">Technical Specs</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {Object.entries(currentProduct.specifications || {}).map(([key, value], index) => (

                            <motion.div
                              key={key}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex justify-between items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-neutral-50 to-transparent hover:from-[#223B57]/5 hover:to-transparent transition-all duration-300 border border-transparent hover:border-[#223B57]/10"
                            >
                              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wide">{key}</span>
                              <span className="font-semibold text-[#223B57] text-right">{value}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Certifications Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                      <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1 h-8 bg-[#223B57] rounded-full"></div>
                          <h4 className="text-2xl font-bold text-[#223B57]">Certifications</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            "ISO 9001:2015 Certified",
                            "ISO 14001 Environmental Management",
                            "ANSI A137.1 Standards Compliant",
                            "Low VOC Emissions",
                            "Lead & Cadmium Free"
                          ].map((cert, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-green-50 to-transparent border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-md group/cert"
                            >
                              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 group-hover/cert:scale-110 transition-transform">
                                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-neutral-700 leading-relaxed pt-0.5">{cert}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
                    
              <TabsContent value="installation" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-8 lg:p-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-1 h-8 bg-[#223B57] rounded-full"></div>
                        <h4 className="text-2xl font-bold text-[#223B57]">Installation Guidelines</h4>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        {[
                          {
                            step: "01",
                            title: "Surface Preparation",
                            desc: "Ensure surface is clean, level, and dry before installation"
                          },
                          {
                            step: "02",
                            title: "Adhesive Selection",
                            desc: "Use appropriate adhesive for tile size and application"
                          },
                          {
                            step: "03",
                            title: "Grout Spacing",
                            desc: "Maintain consistent grout spacing (2-3mm recommended)"
                          },
                          {
                            step: "04",
                            title: "Curing Time",
                            desc: "Allow 24-48 hours for adhesive to cure before grouting"
                          },
                          {
                            step: "05",
                            title: "Sealing",
                            desc: "Seal grout after 72 hours of curing"
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-[#223B57]/5 to-transparent border border-[#223B57]/10 hover:border-[#223B57]/30 transition-all duration-300 hover:shadow-md group/step"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-xl bg-[#223B57] text-white flex items-center justify-center font-bold group-hover/step:scale-110 transition-transform">
                                {item.step}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-semibold text-[#223B57] mb-1">{item.title}</h5>
                              <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur"></div>
                        <div className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-amber-900 mb-1">Professional Installation Recommended</p>
                              <p className="text-amber-800 text-sm">Contact us for certified installer referrals in your area.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
                    
              <TabsContent value="care" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Daily Maintenance Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                      <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-[#223B57]">Daily Maintenance</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            "Sweep or vacuum regularly to remove dirt and debris",
                            "Clean with pH-neutral cleaner and damp mop",
                            "Wipe spills immediately to prevent staining"
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-100 transition-all duration-300 border border-blue-100 hover:border-blue-200"
                            >
                              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-neutral-700 text-sm leading-relaxed">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Deep Cleaning Card */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden h-full">
                      <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h4 className="text-xl font-bold text-[#223B57]">Deep Cleaning</h4>
                        </div>
                        
                        <div className="space-y-3">
                          {[
                            "Use non-abrasive cleaners only",
                            "Avoid acidic or alkaline cleaners",
                            "Test cleaners on small area first",
                            "Rinse thoroughly with clean water",
                            "Reseal grout lines annually"
                          ].map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-transparent hover:from-purple-100 transition-all duration-300 border border-purple-100 hover:border-purple-200"
                            >
                              <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-neutral-700 text-sm leading-relaxed">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#223B57]">Related Products</h2>
              <Button 
                variant="outline" 
                className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl" 
                onClick={() => onNavigate("Products")}
              >
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    onNavigate("Product Details", product.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Glassmorphism Border */}
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-[#223B57] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                            {product.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 space-y-3">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1.5">{product.brand}</p>
                          <h3 className="font-semibold text-[#223B57] leading-tight line-clamp-2 group-hover:text-[#1a2d43] transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        
                        <div className="h-px bg-gradient-to-r from-neutral-200 via-neutral-100 to-transparent"></div>
                        
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
                              window.scrollTo({ top: 0, behavior: 'smooth' });
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
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                  Need Help Deciding?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Let Our Experts Guide You
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Get personalized recommendations, free samples, and professional advice for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Contact Design Team
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Sample Request")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl [&_svg]:text-white"
                  >
                    Request Sample
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={productImages}
        isOpen={lightboxOpen}
        currentIndex={selectedImage}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}