import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Award, Shield, Truck, Clock, Youtube } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { useState } from "react";
import { SITE_CONFIG } from "../constants";
import { motion } from "motion/react";
import { XIcon } from "./icons/XIcon";
import OriginLogo from '../assets/Origin.svg';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  
  return (
    <footer className="relative bg-[#223B57] text-white overflow-hidden">
      {/* Premium Background with Pattern */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1739476670234-ddbb5efbbb38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjZXJhbWljJTIwdGlsZXMlMjBwYXR0ZXJufGVufDF8fHx8MTc2MTgyMjk2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Ceramic tiles pattern background"
          className="w-full h-full object-cover opacity-5"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#223B57] via-[#1e3449] to-[#223B57]"></div>
        
        {/* Decorative SVG Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="footer-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="white" />
                <circle cx="0" cy="0" r="2" fill="white" />
                <circle cx="100" cy="100" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-pattern)" />
          </svg>
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      {/* Premium Top Section - Trust Badges */}
      <div className="relative z-10 border-b border-white/10">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "ISO Certified" },
              { icon: Shield, title: "10-Year Warranty", desc: "Complete Protection" },
              { icon: Truck, title: "Free Delivery", desc: "On Bulk Orders" },
              { icon: Clock, title: "24/7 Support", desc: "Expert Assistance" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors border border-white/20">
                  <badge.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-0.5">{badge.title}</div>
                  <div className="text-xs text-white/70">{badge.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Company Info - Premium Design */}
          <div className="lg:col-span-4">
            {/* Logo Section */}
  <div className = "flex items-center gap-3 mb-6">
  <div className = "relative">
  <div className = "absolute inset-0 bg-white/20 rounded-full blur-md"></div>
  <div className = "relative w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 overflow-hidden">
  <img src       = {OriginLogo} alt = "Origin Tiles Logo" className = "w-12 h-12 object-contain" />
</div>


              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-wide">ORIGIN TILES</div>
                <div className="text-xs text-white/60">Since 1985</div>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed mb-6">
              Leading manufacturer of premium ceramic tiles, delivering exceptional quality, innovative designs, and timeless elegance to transform your spaces.
            </p>

            {/* Social Media - Premium Style */}
            <div className="mb-6">
              <div className="text-sm font-semibold text-white mb-3">Follow Us</div>
              <div className="flex gap-3">
                <button
                  className="group relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white/70 group-hover:text-[#223B57] transition-colors" strokeWidth={1.5} />
                </button>
                <button
                  className="group relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white/70 group-hover:text-[#223B57] transition-colors" strokeWidth={1.5} />
                </button>
                <button
                  className="group relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300"
                  aria-label="X"
                >
                  <XIcon className="w-5 h-5 text-white/70 group-hover:text-[#223B57] transition-colors" />
                </button>
                <button
                  className="group relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-[#223B57] transition-colors" strokeWidth={1.5} />
                </button>
                <button
                  className="group relative w-11 h-11 rounded-xl bg-white/5 hover:bg-white border border-white/20 hover:border-white flex items-center justify-center transition-all duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white/70 group-hover:text-[#223B57] transition-colors" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Awards */}
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <Award className="w-10 h-10 text-yellow-400" />
              <div>
                <div className="text-xs text-white/60">Award Winning</div>
                <div className="font-semibold text-white text-sm">Best Ceramic Tiles 2024</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-white rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                "Products",
                "Collection",
                "Tile Calculator",
                "Visualization",
                "Dealers Locator",
                "About"
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link)}
                    className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-white rounded-full"></div>
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                "Tile Quiz",
                "Sample Request",
                "Download Center",
                "Resources",
                "Blog",
                "FAQ"
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link)}
                    className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - Premium Design */}
          <div className="lg:col-span-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-bold mb-3">Stay Connected</h3>
              <p className="text-sm text-white/70 mb-5 leading-relaxed">
                Subscribe to our newsletter for exclusive offers, new product launches, and design inspiration.
              </p>
              
              {/* Newsletter Form */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl focus:ring-2 focus:ring-white/50 h-12 pl-12 backdrop-blur-sm"
                  />
                </div>
                <Button 
                  onClick={async () => {
                    if (email && email.includes("@")) {
                      setIsSubscribing(true);
                      await new Promise(resolve => setTimeout(resolve, 1000));
                      toast.success("Successfully subscribed!", {
                        description: "You'll receive updates on new products and exclusive offers."
                      });
                      setEmail("");
                      setIsSubscribing(false);
                    } else {
                      toast.error("Invalid email", {
                        description: "Please enter a valid email address."
                      });
                    }
                  }}
                  disabled={isSubscribing}
                  className="bg-white !text-[#223B57] hover:bg-white/90 active:bg-white/80 active:!text-[#223B57] rounded-xl transition-all duration-200 w-full h-12 disabled:opacity-50 disabled:cursor-not-allowed font-semibold group"
                >
                  {isSubscribing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="ml-2 w-4 h-4 text-[#223B57] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              {/* Download Brochure */}
              <Button 
                onClick={() => {
                  toast.success("Brochure download started!", {
                    description: "Your Origin Tiles brochure is downloading."
                  });
                }}
                variant="outline"
                className="w-full bg-transparent border-white/30 text-white hover:bg-white hover:text-[#223B57] hover:border-white active:bg-white active:text-[#223B57] active:border-white rounded-xl transition-all duration-200 h-11"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information - Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-white/10">
          <div className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
              <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Visit Our Showroom</p>
              <p className="text-sm text-white/70 leading-relaxed">{SITE_CONFIG.address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
              <Phone className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Call Us Anytime</p>
              <p className="text-sm text-white/70">{SITE_CONFIG.phone}</p>
              <p className="text-xs text-white/50 mt-1">Mon-Sat: 9AM-7PM</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
              <Mail className="w-6 h-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-white mb-1">Email Support</p>
              <p className="text-sm text-white/70 break-all">{SITE_CONFIG.email}</p>
              <p className="text-xs text-white/50 mt-1">24/7 Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Premium Design */}
      <div className="relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-white/60 text-sm">© 2025 Origin Tiles. All rights reserved.</p>
              <div className="hidden md:flex items-center gap-2 text-xs text-white/40">
                <Shield className="w-3 h-3" />
                <span>Secure & Trusted</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <button 
                onClick={() => onNavigate("Privacy Policy")} 
                className="text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <span className="text-white/20">•</span>
              <button 
                onClick={() => onNavigate("Terms & Conditions")} 
                className="text-white/60 hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <span className="text-white/20">•</span>
              <button 
                onClick={() => onNavigate("Sitemap")} 
                className="text-white/60 hover:text-white transition-colors"
              >
                Sitemap
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}