import { useState, useMemo } from 'react';
import { Package, Truck, HeadphonesIcon, CheckCircle2, Plus, X, Clock, Grid3x3, List } from 'lucide-react';
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
  title="Request Tile Samples"
  subtitle="Free Sample Selection"
  description="Experience our tiles firsthand. Request up to 5 samples and our expert will contact you to arrange delivery and discuss your project needs."
  icon={Package}
  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1618220179428-22790b461013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  badge="Expert Consultation Included"
  breadcrumbs={[{ label: 'Request Samples' }]} 
/>


      {/* === FLOATING BENEFITS CARDS === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Package,
                title: 'Sample Selection',
                description: 'Choose up to 5 samples from our collections',
                value: 'Up to 5'
              },
              {
                icon: HeadphonesIcon,
                title: 'Expert Consultation',
                description: 'Our expert will discuss your project requirements',
                value: '24 Hours'
              },
              {
                icon: Truck,
                title: 'Free Delivery',
                description: 'Samples delivered to your location',
                value: 'Free'
              },
              {
                icon: Clock,
                title: 'No Obligation',
                description: 'Request samples with no purchase required',
                value: '100% Free'
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
                                <p className="text-sm text-[#223B57] mb-1">Expert Consultation</p>
                                <p className="text-xs text-neutral-600">
                                  Our tile expert will contact you within 24 hours to discuss your sample request, project requirements, and arrange convenient delivery.
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
                          Submit Request
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
