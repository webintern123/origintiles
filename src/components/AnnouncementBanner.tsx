import { useState, useEffect } from "react";
import { X, Sparkles, Phone, Mail, Gift, Zap, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

interface AnnouncementBannerProps {
  onNavigate?: (page: string) => void;
}

// Announcement messages that rotat
const ANNOUNCEMENTS = [
  {
    id: 1,
    badge: "New Launch",
    badgeColor: "bg-gradient-to-r from-[#F1B24A] to-[#e89f2f]",
    icon: Sparkles,
    message: "Try our Room Visualization tool - See tiles in your space before you buy",
    mobileMessage: "3D Room Visualization available",
    cta: "Try Now",
    ctaPage: "Visualization",
    urgency: false,
  },
  {
    id: 2,
    badge: "Limited Time",
    badgeColor: "bg-gradient-to-r from-red-500 to-orange-500",
    icon: Gift,
    message: "Free sample delivery on orders above 3 tiles - Premium collections included",
    mobileMessage: "Free sample delivery available",
    cta: "Request Samples",
    ctaPage: "SampleRequest",
    urgency: true,
  },
  {
    id: 3,
    badge: "Just Arrived",
    badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
    icon: TrendingUp,
    message: "Explore our latest Geometric Fusion collection - 12 stunning new designs",
    mobileMessage: "New Geometric Fusion collection",
    cta: "View Collection",
    ctaPage: "Collection",
    urgency: false,
  },
];

export function AnnouncementBanner({ onNavigate }: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentAnnouncement = ANNOUNCEMENTS[currentIndex];

  // Auto-rotate announcements every 5 seconds
  useEffect(() => {
    if (!isPaused && isVisible) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#223B57] via-[#2a4561] to-[#223B57]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse opacity-50" />
        
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-2 lg:gap-3 py-3">
            {/* Left Section - Contact Info - Only XL screens */}
            <div className="hidden xl:flex items-center gap-5 text-white/90 text-sm">
              <motion.a 
                href="tel:+919098383833" 
                className="group flex items-center gap-2 hover:text-white transition-all duration-200 px-3 py-1.5 rounded-md hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  <Phone className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <span className="font-medium">+91 9098383833</span>
              </motion.a>
              
              <span className="text-white/20">|</span>
              
              <motion.a 
                href="mailto:info@origintiles.com" 
                className="group flex items-center gap-2 hover:text-white transition-all duration-200 px-3 py-1.5 rounded-md hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-4 h-4" />
                <span className="font-medium">info@origintiles.com</span>
              </motion.a>
            </div>

            {/* Center Section - Rotating Announcement */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentAnnouncement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 lg:gap-3 lg:justify-center min-w-0"
              >
                {/* Animated Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="relative flex-shrink-0"
                >
                  <currentAnnouncement.icon className="w-5 h-5 text-[#F1B24A]" />
                  {currentAnnouncement.urgency && (
                    <motion.div 
                      className="absolute -top-1 -right-1"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Zap className="w-3 h-3 text-orange-400 fill-orange-400" />
                    </motion.div>
                  )}
                </motion.div>

                {/* Badge and Message */}
                <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                  <span className={`${currentAnnouncement.badgeColor} text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg flex-shrink-0`}>
                    {currentAnnouncement.badge}
                  </span>
                  
                  <p className="text-white text-sm truncate">
                    <span className="hidden md:inline">{currentAnnouncement.message}</span>
                    <span className="md:hidden">{currentAnnouncement.mobileMessage}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Section - CTA Buttons */}
            <div className="flex items-center gap-1.5 lg:gap-2 justify-end lg:justify-start">
              {/* Primary CTA Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative bg-gradient-to-r from-white/20 to-white/10 border border-white/30 hover:from-white/30 hover:to-white/20 hover:border-white/50 text-white whitespace-nowrap transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-white/20"
                  onClick={() => {
                    onNavigate?.(currentAnnouncement.ctaPage);
                    setIsVisible(false);
                  }}
                >
                  <span className="relative z-10">{currentAnnouncement.cta}</span>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm" />
                </Button>
              </motion.div>

              {/* Download Brochure - XL Only */}
              <motion.button
                onClick={() => onNavigate?.("Resources")}
                className="hidden xl:flex items-center gap-1.5 text-white/90 text-sm hover:text-white transition-all duration-200 whitespace-nowrap px-3 py-1.5 rounded-md hover:bg-white/10 font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Brochure</span>
              </motion.button>

              {/* Rotation Dots */}
              <div className="hidden sm:flex items-center gap-1.5 px-2">
                {ANNOUNCEMENTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-white w-6' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to announcement ${index + 1}`}
                  />
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setIsVisible(false)}
                className="text-white/70 p-1.5 hover:bg-white/10 hover:text-white rounded-md transition-all duration-200 hover:rotate-90"
                aria-label="Close announcement"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          {!isPaused && (
            <motion.div 
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#F1B24A] to-[#e89f2f]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              key={currentIndex}
            />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}