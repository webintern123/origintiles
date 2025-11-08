import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send,Sparkles ,MessageSquare, Building2, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowRight, CheckCircle2, MessageCircleMore,HelpCircle} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { PageBanner } from './PageBanner';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { SITE_CONFIG, CONTACT_INFO, SOCIAL_MEDIA } from '../constants';
import { IndiaMap } from './IndiaMap';



interface ContactPageProps {
  onNavigate: (page: string) => void;
}



export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.subject) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (!agreedToTerms) errors.terms = 'You must agree to the terms';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success('Message sent successfully!', {
        description: 'Our team will contact you within 24 hours.'
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setAgreedToTerms(false);
      setFormErrors({});
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      info: CONTACT_INFO.general.phone,
      description: "Mon-Sat: 9:00 AM - 6:00 PM IST",
      action: `tel:${CONTACT_INFO.general.phone}`
    },
    {
      icon: MessageCircleMore,
      title: "WhatsApp",
      info: CONTACT_INFO.general.phone,
      description: "Quick responses via WhatsApp",
      action: `https://wa.me/919093833833`
    },
    {
      icon: Mail,
      title: "Email Us",
      info: CONTACT_INFO.general.email,
      description: "We'll respond within 24 hours",
      action: `mailto:${CONTACT_INFO.general.email}`
    },
    {
      icon: Clock,
      title: "Business Hours",
      info: "Mon-Sat: 9:00 AM - 6:00 PM",
      description: "Sunday: Closed",
      action: null
    }
  ];

  const departments = [
    { icon: MessageSquare, name: "General Inquiry", email: CONTACT_INFO.general.email },
    { icon: Phone, name: "Sales Team", email: CONTACT_INFO.sales.email },
    { icon: Building2, name: "Support", email: CONTACT_INFO.support.email }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PAGE BANNER === */}
      <PageBanner
        title="Get in Touch"
        subtitle="Contact Us"
        description="Have questions about our tiles? We're here to help. Reach out to our team for product inquiries, design consultations, or dealer information."
        icon={MessageSquare}
        variant="gradient"
        badge="24/7 Customer Support • Expert Consultation • Fast Response"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Contact" }
        ]}
      />

      {/* === CONTACT METHODS === */}
      <section className="relative -mt-20 z-10 mb-10">
        <div className="container">
          <div className="grid grid-cols-12 gap-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                className="col-span-12 sm:col-span-6 md:col-span-3 flex"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="relative group w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <Card 
                    className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden h-full ${method.action ? 'cursor-pointer' : ''}`}
                    onClick={() => method.action && window.open(method.action, '_self')}
                  >
                    <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                    
                    <CardContent className="p-6 text-center flex flex-col items-center justify-between min-h-[200px]">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center mx-auto mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-300">
                        <method.icon className="w-7 h-7 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-bold text-[#223B57] mb-2">{method.title}</h3>
                        <p className="text-sm font-semibold text-neutral-700 mb-1">{method.info}</p>
                        <p className="text-xs text-neutral-500">{method.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === CONTACT FORM & INFO === */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            {/* Contact Form */}
            <motion.div
              className="col-span-12 lg:col-span-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 border border-neutral-100 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-10 md:p-12">
                    <div className="mb-8">
                      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
                        Send us a message
                      </Badge>
                      <h2 className="text-[#223B57] mb-3">How Can We Help?</h2>
                      <p className="text-neutral-600">Fill out the form below and our team will get back to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="name" className="text-[#223B57] mb-3 block">Full Name *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                            }}
                            placeholder="John Doe"
                            className={`h-14 border-neutral-200 focus:border-[#223B57] rounded-xl ${formErrors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                          />
                          {formErrors.name && <p className="text-xs text-red-500 mt-2">{formErrors.name}</p>}
                        </div>
                        
                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="email" className="text-[#223B57] mb-3 block">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                            }}
                            placeholder="john@example.com"
                            className={`h-14 border-neutral-200 focus:border-[#223B57] rounded-xl ${formErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                          />
                          {formErrors.email && <p className="text-xs text-red-500 mt-2">{formErrors.email}</p>}
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="phone" className="text-[#223B57] mb-3 block">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 9093833833"
                            className="h-14 border-neutral-200 focus:border-[#223B57] rounded-xl"
                          />
                        </div>

                        <div className="col-span-12 md:col-span-6">
                          <Label htmlFor="subject" className="text-[#223B57] mb-3 block">Subject *</Label>
                          <Select value={formData.subject} onValueChange={(value) => {
                            setFormData({ ...formData, subject: value });
                            if (formErrors.subject) setFormErrors({ ...formErrors, subject: '' });
                          }}>
                            <SelectTrigger className={`h-14 border-neutral-200 focus:border-[#223B57] rounded-xl ${formErrors.subject ? 'border-red-500' : ''}`}>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="product">Product Question</SelectItem>
                              <SelectItem value="dealer">Become a Dealer</SelectItem>
                              <SelectItem value="sample">Request Samples</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.subject && <p className="text-xs text-red-500 mt-2">{formErrors.subject}</p>}
                        </div>

                        <div className="col-span-12">
                          <Label htmlFor="message" className="text-[#223B57] mb-3 block">Message *</Label>
                          <Textarea
                            id="message"
                            rows={6}
                            value={formData.message}
                            onChange={(e) => {
                              setFormData({ ...formData, message: e.target.value });
                              if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                            }}
                            placeholder="Tell us about your project or inquiry..."
                            className={`border-neutral-200 focus:border-[#223B57] rounded-xl resize-none ${formErrors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                          />
                          {formErrors.message && <p className="text-xs text-red-500 mt-2">{formErrors.message}</p>}
                        </div>
                      </div>

                      {/* Privacy Policy Checkbox */}
                      <div className="flex items-start gap-4 p-5 rounded-xl bg-[#F5F3F0]/50 border border-neutral-200">
                        <Checkbox 
                          id="terms" 
                          checked={agreedToTerms}
                          onCheckedChange={(checked) => {
                            setAgreedToTerms(checked as boolean);
                            if (formErrors.terms) setFormErrors({ ...formErrors, terms: '' });
                          }}
                          className={`mt-1 ${formErrors.terms ? 'border-red-500' : ''}`}
                        />
                        <div className="flex-1">
                          <Label 
                            htmlFor="terms" 
                            className="text-sm text-neutral-700 cursor-pointer leading-relaxed"
                          >
                            I agree to the{' '}
                            <button
                              type="button"
                              onClick={() => onNavigate('Privacy Policy')}
                              className="text-[#223B57] underline hover:text-[#1a2d43] transition-colors"
                            >
                              Privacy Policy
                            </button>
                            {' '}and{' '}
                            <button
                              type="button"
                              onClick={() => onNavigate('Terms & Conditions')}
                              className="text-[#223B57] underline hover:text-[#1a2d43] transition-colors"
                            >
                              Terms & Conditions
                            </button>
                          </Label>
                          {formErrors.terms && <p className="text-xs text-red-500 mt-2">{formErrors.terms}</p>}
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="w-full h-14"
                        disabled={!agreedToTerms}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Sidebar Info */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {/* Office Location */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center mb-4">
                        <Building2 className="w-6 h-6 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-bold text-[#223B57] mb-3">Head Office</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-2">{CONTACT_INFO.headOffice.address}</p>
                      <p className="text-sm text-neutral-600">{SITE_CONFIG.city}, {SITE_CONFIG.state} {SITE_CONFIG.pincode}</p>
                      <p className="text-sm text-neutral-600">{SITE_CONFIG.country}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Departments */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[#223B57] mb-4">Contact Departments</h3>
                      <div className="space-y-3">
                        {departments.map((dept, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/60 hover:bg-white/80 transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
                              <dept.icon className="w-4 h-4 text-[#223B57]" strokeWidth={1.5} />
                            </div>
                            <div>
                              <div className="font-semibold text-[#223B57] text-sm">{dept.name}</div>
                              <a href={`mailto:${dept.email}`} className="text-xs text-neutral-600 hover:text-[#223B57]">{dept.email}</a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Social Media */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[#223B57] mb-4">Follow Us</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { icon: Facebook, url: SOCIAL_MEDIA.facebook, name: "Facebook" },
                          { icon: Instagram, url: SOCIAL_MEDIA.instagram, name: "Instagram" },
                          { icon: Twitter, url: SOCIAL_MEDIA.twitter, name: "Twitter" },
                          { icon: Linkedin, url: SOCIAL_MEDIA.linkedin, name: "LinkedIn" },
                          { icon: Youtube, url: SOCIAL_MEDIA.youtube, name: "YouTube" }
                        ].map((social, index) => (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full h-12 rounded-xl bg-[#223B57]/10 hover:bg-[#223B57] transition-all duration-300 group/social"
                            title={social.name}
                          >
                            <social.icon className="w-5 h-5 text-[#223B57] group-hover/social:text-white transition-colors" strokeWidth={1.5} />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === WHY CONTACT US === */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              Why Choose Us
            </Badge>
            <h2 className="text-[#223B57] mb-4">Expert Support Every Step</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our dedicated team is here to assist you with product selection, technical support, and design consultations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Fast Response Time",
                description: "Get answers within 24 hours from our expert team"
              },
              {
                icon: MessageSquare,
                title: "Expert Consultation",
                description: "Free design and technical consultation for your project"
              },
              {
                icon: Phone,
                title: "Direct Contact",
                description: "Speak directly with product specialists and designers"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/60 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-[#223B57]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[#223B57] mb-2">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === LOCATION & MAP === */}
      <section className="py-20 bg-[#F5F3F0]">
  <div className="container">
    <div className="text-center mb-12">
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
        Visit Our Showroom
      </Badge>
      <h2 className="text-[#223B57] mb-4">Find Us on the Map</h2>
      <p className="text-neutral-600 max-w-2xl mx-auto">
        Visit our showroom in {SITE_CONFIG.city} to see our complete collection and get expert consultation
      </p>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <IndiaMap />

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button
          variant="outline"
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=17.4485,78.3908`, '_blank')}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
      </div>
    </motion.div>
  </div>
</section>

      {/* === FAQ QUICK LINKS === */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
              <HelpCircle className="w-3 h-3 mr-1" />
              Before You Contact
            </Badge>
            <h2 className="text-[#223B57] mb-4">Quick Answers</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Find instant answers to common questions. Save time and get help faster.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Shipping & Delivery', icon: '📦', count: '12 articles' },
                    { title: 'Product Warranties', icon: '🛡️', count: '8 articles' },
                    { title: 'Installation Guide', icon: '🔧', count: '15 articles' },
                    { title: 'Payment Methods', icon: '💳', count: '6 articles' },
                    { title: 'Tile Calculator Help', icon: '📐', count: '10 articles' },
                    { title: 'Sample Requests', icon: '📋', count: '7 articles' }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => onNavigate('FAQ')}
                      className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-[#223B57]/5 hover:border-[#223B57]/20 border border-transparent transition-all duration-300 text-left group"
                    >
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#223B57] group-hover:text-[#1a2d43] transition-colors">
                          {item.title}
                        </div>
                        <div className="text-xs text-neutral-500">{item.count}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#223B57] transition-colors" />
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-6"
                  onClick={() => onNavigate('FAQ')}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  View All FAQs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
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
                  Quick Actions
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Explore More Options
                </h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Browse Our Complete Collection, Calculate tiles needed, or request samples for project.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => onNavigate("Products")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 rounded-xl h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    
                    View Products
                  </Button>
                  <Button
                    onClick={() => onNavigate("Sample Request")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:border-white/50 rounded-xl h-12 px-8 [&_svg]:text-white"
                  >
                    Request samples
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