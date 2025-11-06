import { useState } from 'react';
import { Shield, FileCheck, AlertCircle, CheckCircle2, Upload, Award, Clock, FileText, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PageBanner } from './PageBanner';
import { toast } from 'sonner';
import { SITE_CONFIG } from '../constants';
import { motion } from 'motion/react';
import { dealers } from '../data/dealers';

export function WarrantyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productCode: '',
    purchaseDate: '',
    invoiceNumber: '',
    dealerId: '',
    address: ''
  });

  const selectedDealer = dealers.find(d => d.id === formData.dealerId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.dealerId) {
      toast.error('Dealer selection required', {
        description: 'Please select the authorized dealer where you purchased the tiles.'
      });
      return;
    }
    
    toast.success('Warranty registered successfully!', {
      description: `Your warranty has been registered. Confirmation email sent to ${formData.email}. Dealer: ${selectedDealer?.name}`
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      productCode: '',
      purchaseDate: '',
      invoiceNumber: '',
      dealerId: '',
      address: ''
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PAGE BANNER === */}
      <PageBanner
  title="Product Warranty"
  subtitle="Warranty Registration & Coverage"
  description="Register your products and understand our comprehensive warranty coverage for peace of mind."
  icon={Shield}
  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  badge="10-Year Standard Coverage"
  breadcrumbs={[{ label: 'Warranty Registration' }]} 
/>


      {/* === FLOATING BENEFIT CARDS === */}
      <section className="relative -mt-20 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                title: 'Standard Warranty',
                description: 'Comprehensive coverage for all products',
                value: '10 Years'
              },
              {
                icon: Clock,
                title: 'Quick Registration',
                description: 'Register within 30 days of purchase',
                value: '30 Days'
              },
              {
                icon: Award,
                title: 'Extended Options',
                description: 'Premium coverage available',
                value: 'Up to 20'
              },
              {
                icon: FileText,
                title: 'Easy Claims',
                description: 'Simple claim process with fast resolution',
                value: '3-5 Days'
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
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  
                  {/* Hover Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="relative p-6 text-center">
                    {/* Icon Circle */}
                    <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                      <benefit.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    
                    {/* Value */}
                    <div className="text-3xl font-bold text-[#223B57] mb-2">
                      {benefit.value}
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-[#223B57] mb-2">{benefit.title}</h3>
                    
                    {/* Description */}
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
          <Tabs defaultValue="register" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 h-auto">
              <TabsTrigger value="register" className="py-3">
                <FileCheck className="w-4 h-4 mr-2" />
                Register Product
              </TabsTrigger>
              <TabsTrigger value="coverage" className="py-3">
                <Shield className="w-4 h-4 mr-2" />
                Warranty Coverage
              </TabsTrigger>
              <TabsTrigger value="claim" className="py-3">
                <AlertCircle className="w-4 h-4 mr-2" />
                File a Claim
              </TabsTrigger>
            </TabsList>

            {/* Register Product Tab */}
            <TabsContent value="register">
              <div className="grid grid-cols-12 gap-8">
                <motion.div
                  className="col-span-12 lg:col-span-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <h2 className="text-[#223b57] mb-6">Register Your Warranty</h2>
                        
                        <Alert className="mb-6 border-[#223B57]/20 bg-[#223B57]/5">
                          <AlertCircle className="w-4 h-4 text-[#223B57]" />
                          <AlertDescription className="text-neutral-600">
                            Register within 30 days of purchase to activate your warranty coverage.
                          </AlertDescription>
                        </Alert>

                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Full Name *</Label>
                              <Input
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-2"
                              />
                            </div>
                            <div>
                              <Label htmlFor="email">Email Address *</Label>
                              <Input
                                id="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-2"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="mt-2"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="productCode">Product Code *</Label>
                              <Input
                                id="productCode"
                                required
                                value={formData.productCode}
                                onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                                className="mt-2"
                                placeholder="e.g., OT-CL-600"
                              />
                            </div>
                            <div>
                              <Label htmlFor="purchaseDate">Purchase Date *</Label>
                              <Input
                                id="purchaseDate"
                                type="date"
                                required
                                value={formData.purchaseDate}
                                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                                className="mt-2"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="invoiceNumber">Invoice Number *</Label>
                            <Input
                              id="invoiceNumber"
                              required
                              value={formData.invoiceNumber}
                              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                              className="mt-2"
                              placeholder="e.g., INV-2024-12345"
                            />
                          </div>

                          <div>
                            <Label htmlFor="dealerId">Authorized Dealer / Showroom *</Label>
                            <Select
                              value={formData.dealerId}
                              onValueChange={(value) => setFormData({ ...formData, dealerId: value })}
                              required
                            >
                              <SelectTrigger className="mt-2">
                                <SelectValue placeholder="Select the dealer where you purchased" />
                              </SelectTrigger>
                              <SelectContent>
                                {dealers.map((dealer) => (
                                  <SelectItem key={dealer.id} value={dealer.id}>
                                    {dealer.name} - {dealer.city}, {dealer.state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-neutral-500 mt-1.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              Only products purchased from authorized dealers are eligible for warranty
                            </p>
                          </div>

                          {selectedDealer && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="overflow-hidden"
                            >
                              <Alert className="border-[#223B57]/20 bg-[#223B57]/5">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <AlertDescription>
                                  <p className="text-sm text-[#223B57] mb-1">
                                    <strong>Selected Dealer:</strong> {selectedDealer.name}
                                  </p>
                                  <p className="text-xs text-neutral-600">
                                    {selectedDealer.address}, {selectedDealer.city}, {selectedDealer.state}
                                  </p>
                                  <p className="text-xs text-neutral-600 mt-1">
                                    Phone: {selectedDealer.phone} | Email: {selectedDealer.email}
                                  </p>
                                </AlertDescription>
                              </Alert>
                            </motion.div>
                          )}

                          <div className="border-t border-neutral-200 -mx-8 my-2"></div>

                          <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-neutral-700">Can't find your dealer?</span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => window.open('/dealers', '_blank')}
                            >
                              Find Dealers
                              <ExternalLink className="w-3 h-3 ml-1" />
                            </Button>
                          </div>

                          <div>
                            <Label htmlFor="address">Installation Address *</Label>
                            <Textarea
                              id="address"
                              required
                              value={formData.address}
                              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                              className="mt-2"
                              rows={3}
                            />
                          </div>

                          <div>
                            <Label htmlFor="invoice">Upload Invoice (Optional)</Label>
                            <div className="mt-2 border-2 border-dashed border-[#223b57]/20 rounded-lg p-8 text-center hover:border-[#223B57] transition-colors cursor-pointer">
                              <Upload className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                              <p className="text-sm text-neutral-600 mb-1">Click to upload or drag and drop</p>
                              <p className="text-xs text-neutral-500">PDF, JPG, PNG (max 5MB)</p>
                            </div>
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#223B57] to-[#2d4a6a] hover:from-[#1a2d43] hover:to-[#223B57] text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Register Warranty
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                {/* Info Sidebar */}
                <motion.div
                  className="col-span-12 lg:col-span-4 space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-6">
                        <h3 className="text-[#223b57] mb-4">Why Register?</h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Activate warranty coverage</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Verify authorized dealer purchase</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Faster claim processing</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Product authenticity guarantee</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Product recall notifications</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>Exclusive offers and updates</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative bg-gradient-to-br from-[#223b57] to-[#2d4a6a] text-white border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                      <CardContent className="p-6">
                        <Shield className="w-12 h-12 mb-3" />
                        <h3 className="mb-2">Need Help?</h3>
                        <p className="text-white/80 text-sm mb-4">
                          Our warranty team is here to assist you.
                        </p>
                        <p className="text-sm">warranty@origintiles.com</p>
                        <p className="text-sm">{SITE_CONFIG.phone}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* Warranty Coverage Tab */}
            <TabsContent value="coverage">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group mb-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <h2 className="text-[#223b57] mb-6">Warranty Coverage Details</h2>
                        
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-[#223B57] text-white">Standard Warranty</Badge>
                              <span className="text-[#223b57]">10 Years</span>
                            </div>
                            <p className="text-neutral-600 text-sm mb-4">
                              All Origin Tiles products purchased through authorized dealers come with a standard 10-year limited warranty from the date of purchase.
                            </p>
                            <h4 className="text-[#223b57] mb-2">What's Covered:</h4>
                            <ul className="space-y-2 text-sm text-neutral-600">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Manufacturing defects in materials</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Structural integrity issues</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Glaze cracking or crazing (not impact related)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span>Color variation beyond specified tolerance</span>
                              </li>
                            </ul>
                          </div>

                          <div className="border-t border-[#223b57]/10 pt-6">
                            <h4 className="text-[#223b57] mb-2">What's Not Covered:</h4>
                            <ul className="space-y-2 text-sm text-neutral-600">
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Improper installation or use</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Physical damage from impact or abuse</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Normal wear and tear</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Damage from harsh chemicals or improper cleaning</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Installation by uncertified contractors</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span>Products purchased from unauthorized dealers or distributors</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <h3 className="text-[#223b57] mb-4">Extended Warranty Options</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-6 border border-[#223b57]/10 rounded-lg hover:border-[#223B57] transition-colors">
                            <Badge className="mb-3 bg-[#7B8B78] text-white">Extended - 15 Years</Badge>
                            <Button size="sm" variant="outline" className="mb-2 w-full">
                              Contact for Details
                            </Button>
                            <p className="text-sm text-neutral-600">
                              Extends coverage to 15 years with additional benefits
                            </p>
                          </div>
                          <div className="p-6 border-2 border-[#223B57] rounded-lg bg-[#223B57]/5">
                            <Badge className="mb-3 bg-[#223B57] text-white">Premium - 20 Years</Badge>
                            <Button size="sm" variant="outline" className="mb-2 w-full">
                              Contact for Details
                            </Button>
                            <p className="text-sm text-neutral-600">
                              Lifetime coverage with priority service and replacement
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </TabsContent>

            {/* File Claim Tab */}
            <TabsContent value="claim">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-8">
                        <h2 className="text-[#223b57] mb-6">File a Warranty Claim</h2>
                        <Alert className="mb-6 border-[#223B57]/20 bg-[#223B57]/5">
                          <AlertCircle className="w-4 h-4 text-[#223B57]" />
                          <AlertDescription className="text-neutral-600">
                            Before filing a claim, please ensure your product is registered and within warranty period.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-[#223b57] mb-3">Claim Process:</h4>
                            <ol className="space-y-3 text-sm text-neutral-600">
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#223B57] text-white rounded-full flex items-center justify-center text-xs">
                                  1
                                </span>
                                <span>Contact our warranty team via email or phone</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#223B57] text-white rounded-full flex items-center justify-center text-xs">
                                  2
                                </span>
                                <span>Provide warranty registration details and photos of the issue</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#223B57] text-white rounded-full flex items-center justify-center text-xs">
                                  3
                                </span>
                                <span>Our team will review and assess the claim within 3-5 business days</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 bg-[#223B57] text-white rounded-full flex items-center justify-center text-xs">
                                  4
                                </span>
                                <span>If approved, replacement tiles will be shipped within 7-10 days</span>
                              </li>
                            </ol>
                          </div>

                          <div className="border-t border-[#223b57]/10 pt-6">
                            <h4 className="text-[#223b57] mb-3">Required Information:</h4>
                            <ul className="space-y-2 text-sm text-neutral-600">
                              <li>• Warranty registration number</li>
                              <li>• Clear photos showing the defect</li>
                              <li>• Original purchase invoice</li>
                              <li>• Installation certificate (if applicable)</li>
                              <li>• Detailed description of the issue</li>
                            </ul>
                          </div>

                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => toast.info('Claim process coming soon', {
                              description: 'Please contact our warranty team directly for assistance.'
                            })}
                          >
                            Start Claim Process
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
