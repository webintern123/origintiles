import { useState, useMemo } from 'react';
import { Package, Truck, HeadphonesIcon,ArrowRight, Headset,CalendarClock,PackagePlus,Ban,CheckCircle2,HelpCircle,Target,Plus,Layers,Palette, X, Clock, Grid3x3,Award, List,CheckSquare, Scan } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { PageBanner } from './PageBanner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/products';

interface SampleRequestPageProps {
  onNavigate: (page: string) => void;
}

interface SampleItem {
  id: string;
  name: string;
  brand: string;
  size: string;
  image: string;
  category: string;
}

export function SampleRequestPage({ onNavigate }: SampleRequestPageProps) {

  const [selectedSamples, setSelectedSamples] = useState<SampleItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    contactMethod: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    projectDetails: ''
  });

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category))).sort();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get featured/popular products (first 8)
  const popularProducts = useMemo(() => {
    return products.slice(0, 8);
  }, []);

  const addSample = (product: typeof products[0]) => {
    if (selectedSamples.length >= 5) {
      toast.error('Maximum 5 samples allowed', {
        description: 'You can request up to 5 samples per request'
      });
      return;
    }
    if (selectedSamples.find((s) => s.id === product.id)) {
      toast.error('Sample already added', {
        description: 'This sample is already in your selection'
      });
      return;
    }
    
    const sample: SampleItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      size: product.size,
      image: product.image,
      category: product.category
    };
    
    setSelectedSamples([...selectedSamples, sample]);
    toast.success('Sample added', {
      description: `${product.name} added to your selection`
    });
  };

  const removeSample = (id: string) => {
    setSelectedSamples(selectedSamples.filter((s) => s.id !== id));
    toast.info('Sample removed');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSamples.length === 0) {
      toast.error('Please select at least one sample', {
        description: 'Choose samples from the catalog below'
      });
      return;
    }
    toast.success('Sample request submitted!', {
      description: 'Our tile expert will contact you within 24 hours to discuss your sample request and arrange delivery.'
    });
    setSelectedSamples([]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      timeline: '',
      contactMethod: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      projectDetails: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PAGE BANNER === */}
      <PageBanner
  title="Free Tile Samples with Expert Guidance"
  subtitle="Free Sample Selection"
  description="See and feel the quality of Origin Tiles before making a decision. Request up to 5 tile samples, and our team will get in touch to arrange delivery and understand your project needs."

  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1618220179428-22790b461013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  badge="Expert Consultation Included"
  breadcrumbs={[{ label: 'Request Tile Samples' }]} 
/>


      {/* === FLOATING BENEFITS CARDS === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Package,
                title: '5 Tile Samples Free',
                description: 'Compare our tile collections with designs and finishes',
                
              },
              {
                icon: HeadphonesIcon,
                title: 'Expert Response in 1 Day',
                description: 'Our team will connect with you to guide your selection',
                
              },
              {
                icon: Truck,
                title: 'Free Sample Delivery',
                description: 'Samples delivered directly to your location',
                
              },
              {
                icon: Clock,
                title: 'No Purchase Required (100% Free)',
                description: 'Request samples with zero obligation.',
               
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
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] mb-8">
       Why Request Samples?
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-8">
       See the Tile Before You Decide
      </h2>

      <p className="text-lg text-neutral-600 mb-8">
        Choosing tiles is easier when you can see and feel them in person. Our samples help you make confident decisions before placing an order.
      </p>
    </motion.div>

    {/* Technical Points Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Scan,
          title: "Check Tile Quality",
          description:
            " Feel the finish, thickness, and surface detailing to understand the tile quality better.",
        },
        {
          icon: Layers,
          title: "Compare Designs & Finishes",
          description:
            " Place samples side by side to easily compare colours, textures, and finishes.",
        },
        {
          icon: Palette,
          title: "	Confirm Colour & Texture",
          description:
            " See how the tile looks in your actual space, lighting, and layout.",
        },
        {
          icon: Award,
          title: "Get Client or Family Approval",
          description:
            "Share samples with homeowners, architects, or clients for quicker decisions.",
        },
        {
          icon: CheckSquare,
          title: "Make Informed Choices",
          description:
            "Reduce guesswork and select tiles that truly suit your project needs.",
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

    
  </div>
</section> 
{/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
             Simple Steps 
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
             How Tile Sample Request Works?
            </h2>
            <p className="text-neutral-600 text-lg">
              Get tile samples in four easy steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {[
              {
                step: "01",
                icon: HelpCircle,
                title: "Choose Your Samples",
                description: "Select up to 5 tile samples from our collections."
              },
              {
                step: "02",
                icon: Target,
                title: "Share Your Details",
                description: "Fill in your contact and delivery information, along with basic project details."
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Receive Free Samples",
                description: " We deliver the samples to your location within 3–5 working days across India."
              },
               {
                step: "04",
                icon: CheckCircle2,
                title: "Review & Decide",
                description: " Check the quality, compare finishes, and choose the tiles that suit your space best."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl group h-full">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-[#223B57]/10 mb-4">
                      {step.step}
                    </div>
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <step.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#223B57] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
 {/* Info Text below Contact Support */}
<div className="mt-10 max-w-4xl mx-auto text-center">
  <br></br>
  <Badge className="mb-8 bg-[#223B57]/10 text-[#223B57] px-4 py-3">
           Sample Request Form
            </Badge>
  <h3 className="text-4xl font-bold text-[#223B57] mb-8">
    Select Your Samples & Submit the Request
  </h3>

  <p className="text-lg text-[#223B57] mb-8">
    Choose the tiles you’d like to experience and share your delivery details. This helps us ensure the right samples reach you on time.
  </p>
  <div className="bg-white/70 backdrop-blur-md border border-[#223B57]/10 rounded-2xl p-6 text-left shadow-md">
    <p className="text-sm font-semibold text-[#223B57] mb-2">
      Note for Dealers & Business Partners:
    </p>
    <p className="text-sm text-neutral-600">
      This form is meant for customer sample requests (up to 5 pieces).
      For dealership enquiries, bulk display kits, or partnership opportunities,
      please visit our{" "}
      <span
        onClick={() => onNavigate("Dealers Locator")}
        className="text-[#223B57] font-medium underline cursor-pointer hover:text-[#1a2d43]"
      >
        Dealers & Partnership
      </span>{" "}
      page.
    </p>
  </div>
</div>


      {/* === MAIN CONTENT === */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            {/* Sample Selection */}
            <motion.div
              className="col-span-12 lg:col-span-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              
              {/* Tabs: Popular vs Browse All */}
              <Tabs defaultValue="popular" className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#223B57]">Select Samples</h2>
                  <TabsList className="bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">
                    <TabsTrigger value="popular" className="data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                      <Grid3x3 className="w-4 h-4 mr-2" />
                      Popular
                    </TabsTrigger>
                    <TabsTrigger value="browse" className="data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                      <List className="w-4 h-4 mr-2" />
                      Browse All ({products.length})
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* === POPULAR SAMPLES TAB === */}
                <TabsContent value="popular" className="mt-0">
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {popularProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                          <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <CardContent className="relative p-4">
                            <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
                              <ImageWithFallback
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <h4 className="text-[#223B57] mb-1">{product.name}</h4>
                            <p className="text-sm text-neutral-600 mb-1">{product.brand}</p>
                            <p className="text-xs text-neutral-500 mb-1">{product.size}</p>
                            <Badge variant="outline" className="text-xs border-[#223B57]/30 text-[#223B57] mb-3">
                              {product.category}
                            </Badge>
                            <Button
                              onClick={() => addSample(product)}
                              variant="outline"
                              size="sm"
                              className="w-full group/btn"
                              disabled={selectedSamples.some(s => s.id === product.id)}
                            >
                              {selectedSamples.some(s => s.id === product.id) ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Added
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                                  Add Sample
                                </>
                              )}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* === BROWSE ALL TAB === */}
                <TabsContent value="browse" className="mt-0">
                  {/* Search & Filters */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6"
                  >
                    <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          {/* Search */}
                          <div className="md:col-span-2">
                            <Input
                              placeholder="Search products..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full"
                            />
                          </div>

                          {/* Category Filter */}
                          <div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                              <SelectTrigger>
                                <SelectValue placeholder="All Categories" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Clear Filters */}
                          {hasActiveFilters && (
                            <div className="flex items-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="w-full"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Clear Filters
                              </Button>
                            </div>
                          )}
                        </div>

                        <p className="text-sm text-neutral-600">
                          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Products Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <CardContent className="relative p-4">
                              <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>
                              <h4 className="text-[#223B57] mb-1">{product.name}</h4>
                              <p className="text-sm text-neutral-600 mb-1">{product.brand}</p>
                              <p className="text-xs text-neutral-500 mb-1">{product.size}</p>
                              <Badge variant="outline" className="text-xs border-[#223B57]/30 text-[#223B57] mb-3">
                                {product.category}
                              </Badge>
                              <Button
                                onClick={() => addSample(product)}
                                variant="outline"
                                size="sm"
                                className="w-full group/btn"
                                disabled={selectedSamples.some(s => s.id === product.id)}
                              >
                                {selectedSamples.some(s => s.id === product.id) ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Added
                                  </>
                                ) : (
                                  <>
                                    <Plus className="w-4 h-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" />
                                    Add Sample
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-2">
                        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl">
                          <CardContent className="p-12 text-center">
                            <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                            <h3 className="text-[#223B57] mb-2">No Products Found</h3>
                            <p className="text-neutral-600 mb-6">
                              We couldn't find any products matching your filters.
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
              </Tabs>

              {/* Need Help Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-[#223B57] mb-2">Can't find what you're looking for?</h3>
                      <p className="text-sm text-neutral-600 mb-4">
                        Contact our expert team and we'll help you request specific samples or guide you to the perfect tiles for your project.
                      </p>
                      <div className="flex gap-3">
                        <Button onClick={() => onNavigate("Products")}>
  Browse All Products
</Button>

<Button onClick={() => onNavigate("Contact")}>
  Contact Expert
</Button>

                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>

            {/* Order Summary & Form */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden sticky top-4">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[#223B57]">Selected Samples</h3>
                      <Badge className="bg-[#223B57] text-white">
                        {selectedSamples.length}/5
                      </Badge>
                    </div>
                    
                    {selectedSamples.length === 0 ? (
                      <div className="text-center py-8">
                        <Package className="w-12 h-12 mx-auto mb-3 text-[#223B57]/30" />
                        <p className="text-sm text-neutral-500">No samples selected yet</p>
                        <p className="text-xs text-neutral-400 mt-1">Select up to 5 samples from the catalog</p>
                      </div>
                    ) : (
                      <div className="space-y-3 mb-4">
                        <AnimatePresence>
                          {selectedSamples.map((sample) => (
                            <motion.div
                              key={sample.id}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex items-start gap-3 p-3 bg-[#223B57]/5 rounded-lg"
                            >
                              <ImageWithFallback
                                src={sample.image}
                                alt={sample.name}
                                className="w-12 h-12 rounded object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-[#223B57] truncate">{sample.name}</p>
                                <p className="text-xs text-neutral-600 truncate">{sample.brand}</p>
                                <Badge className="mt-1 text-xs bg-[#223B57]/10 text-[#223B57] border-0">
                                  {sample.category}
                                </Badge>
                              </div>
                              <Button
                                onClick={() => removeSample(sample.id)}
                                variant="ghost"
                                size="sm"
                                className="h-auto p-1 hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}

                    {selectedSamples.length > 0 && (
                      <>
                        <div className="border-t border-[#223B57]/10 pt-4 mb-4">
                          <div className="bg-[#223B57]/5 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <HeadphonesIcon className="w-5 h-5 text-[#223B57] mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-[#223B57] mb-1">Expert Support Included</p>
                                <p className="text-xs text-neutral-600">
                                  One of our tile experts will contact you within 24 hours to understand your requirements, guide you on sample selection, and coordinate delivery.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedSamples.length > 0 && (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="projectType">Project Type *</Label>
                          <Select
                            value={formData.projectType}
                            onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                            required
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential-flooring">Residential - Flooring</SelectItem>
                              <SelectItem value="residential-bathroom">Residential - Bathroom</SelectItem>
                              <SelectItem value="residential-kitchen">Residential - Kitchen</SelectItem>
                              <SelectItem value="residential-wall">Residential - Wall Cladding</SelectItem>
                              <SelectItem value="commercial-office">Commercial - Office</SelectItem>
                              <SelectItem value="commercial-retail">Commercial - Retail</SelectItem>
                              <SelectItem value="commercial-hospitality">Commercial - Hospitality</SelectItem>
                              <SelectItem value="outdoor-parking">Outdoor - Parking/Driveway</SelectItem>
                              <SelectItem value="outdoor-patio">Outdoor - Patio/Terrace</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timeline">When do you need tiles? *</Label>
                          <Select
                            value={formData.timeline}
                            onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                            required
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="urgent">Urgent (Within 1 week)</SelectItem>
                              <SelectItem value="2-4weeks">2-4 Weeks</SelectItem>
                              <SelectItem value="1-2months">1-2 Months</SelectItem>
                              <SelectItem value="3+months">3+ Months</SelectItem>
                              <SelectItem value="planning">Just Planning</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="contactMethod">Preferred Contact Method *</Label>
                          <Select
                            value={formData.contactMethod}
                            onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                            required
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="How should we reach you?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="address">Delivery Address *</Label>
                          <Textarea
                            id="address"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="mt-1"
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              required
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="mt-1"
                              placeholder="e.g., Maharashtra"
                            />
                          </div>
                          <div>
                            <Label htmlFor="pincode">Pincode *</Label>
                            <Input
                              id="pincode"
                              required
                              value={formData.pincode}
                              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="projectDetails">Project Details</Label>
                          <Textarea
                            id="projectDetails"
                            value={formData.projectDetails}
                            onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                            className="mt-1"
                            rows={3}
                            placeholder="Tell us about your project - area size, design preferences, budget considerations, etc."
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#223B57] to-[#2d4a6a] hover:from-[#1a2d43] hover:to-[#223B57] text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Free Sample Request
                        </Button>
                        {/* Delivery Timeline Info */}
<div className="mt-6">
  <Card className="border border-green-300 bg-green-100 rounded-2xl shadow-sm">
    <CardContent className="p-4 flex gap-3 items-start">
      <Truck className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />

      <div>
        <p className="text-sm font-semibold text-green-900 mb-1">
          Delivery Timeline
        </p>
        <p className="text-sm text-green-800 leading-relaxed">
          Sample orders are delivered within{" "}
          <span className="font-semibold">3–5 working days</span>.
          Tracking details will be shared via email or SMS once dispatched.
        </p>
      </div>
    </CardContent>
  </Card>
</div>

                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
     <section className="py-20 bg-white">
  <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[300px]">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Need Assistance?
      </h2>

      <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
        Origin Tiles support team is happy to help you choose the right samples and recommend suitable tiles for your project.
      </p>

      {/* Contact Support Button */}
      <Button
        size="lg"
        className="bg-[#223B57] hover:bg-[#1a2d43] text-white px-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
        onClick={() => onNavigate("Contact")}
      >
        Contact Support
      </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-8">
             Free Sample Guidelines
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
           To ensure fair access and timely delivery, please note the following:
            </p>
          </motion.div>
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: PackagePlus, // Bathroom
                title: "You can request up to 5 tile samples in one submission",
                
              },
              {
                icon:  Truck, // Kitchen Floor (replace Kitchen with a suitable icon from lucide-react)
                title: "Free delivery is available across India",
                
              },
              {
                icon: CalendarClock, // Living Room
                title: "One sample request is allowed every 30 days",
                
              },
              {
                icon: Clock, // Bedroom (use any suitable icon for bedroom, e.g., Bed icon if available)
                title: "Samples are delivered within 3–5 working days",
                
              },
              {
                icon: Ban, // Outdoor & Parking
                title: "Samples provided are not returnable",
                
              },
              {
                icon: Headset, // Commercial Use
                title: "For large or bulk orders, please contact our sales team.",
                
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
                   
                  </CardContent>
      
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ QUICK SECTION - Top Questions === */}
                             <section className="section-padding bg-white">
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
                                   <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                                     Tile Sample Request FAQs
                                   </h2>
                                   <p className="text-lg text-neutral-600">
                                    Quick answers about our free tile sample service and delivery.
                                   </p>
                                 </motion.div>
                       
                                 <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                                   {[
                                     {
                                       icon: CheckCircle2,
                                       question: "Who can request tile samples?",
                                       answer: " Anyone can request samples like homeowners, architects, designers, builders, and dealers."
                                     },
                                     {
                                       icon:  CheckCircle2,
                                       question: "How long does it take to receive samples?",
                                       answer: " Samples are usually delivered within 3 to 4 working days, depending on your location."
                                     },
                                     {
                                       icon: CheckCircle2,
                                       question: "Are the samples really free?",
                                       answer: "Yes, our sample service is completely free, with no obligation to place an order."
                                     },
                                     {
                                       icon: CheckCircle2,
                                       question: "How should I check or test the samples?",
                                       answer: " View the samples in natural light, feel the surface finish, and place them in the actual space to see how they look with your interiors."
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
                       
                                 <motion.div
                                   className="text-center"
                                   initial={{ opacity: 0 }}
                                   whileInView={{ opacity: 1 }}
                                   viewport={{ once: true }}
                                 >
                                   <Button
                                     onClick={() => onNavigate("Contact")}
                                     variant="outline"
                                     size="lg"
                                     className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white"
                                   >
                                    Reach Our Team 
                                     <ArrowRight className="ml-2 w-5 h-5 group-hover:text-white" />
                                   </Button>
                                 </motion.div>
                               </div>
                             </section>
   <section className="py-20 bg-[#F5F3F0]">
  <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center justify-center min-h-[60vh]">
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-8">
        Looking for a Specific Tile?
      </h2>

      <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-8">
        If you can’t find the sample you’re looking for, our team is here to assist.
        We’ll help you request specific samples or guide you toward tiles that suit
        your space and needs.
      </p>

      {/* ✅ Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          variant="outline"
          className="border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white px-10 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          onClick={() => onNavigate("Products")}
        >
          Browse All Tiles
        </Button>

        <Button
          size="lg"
          className="bg-[#223B57] hover:bg-[#1a2d43] text-white px-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
          onClick={() => onNavigate("Contact")}
        >
          Talk to an Expert
        </Button>
      </div>
    </motion.div>
  </div>
</section>

 {/* === STAY UPDATED CTA SECTION === */}
<section className="py-20 bg-white">
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
           Sample Updates
          </Badge>

          {/* Heading */}
          <h2 className="text-white text-4xl font-bold mb-4">
           Stay Informed About New Tile Samples
          </h2>

          {/* Description */}
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Get updates when new tile samples are available, along with helpful tips on testing finishes and quality before selection.
          </p>

        
          {/* Email Input */}
<div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-6">
  
  <Input
    type="email"
    placeholder="Enter your email address"
    className="
      h-14
      px-6
      rounded-xl
      border-0
      bg-white/95
      text-[#223B57]
      text-base
      placeholder:text-neutral-400
      placeholder:text-sm
      focus-visible:ring-2
      focus-visible:ring-white
      flex-1
    "
  />

  <Button
    variant="outline"
    className="bg-white/10 backdrop-blur-md
    text-white border-white/30
    hover:bg-white/20 hover:border-white/50
    hover:text-white
    rounded-xl h-12 px-8
    [&_svg]:text-white hover:[&_svg]:text-white
  "
  >
   Subscribe
  </Button>

</div>


          {/* Trust Line */}
          <p className="text-sm text-white/80">
            Join <span className="font-semibold text-white">5,000+</span> professionals
            &nbsp;|&nbsp; Sample Alerts & Tips  &nbsp;|&nbsp; Unsubscribe anytime
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      
    </div>
  );
}
