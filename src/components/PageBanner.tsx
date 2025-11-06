import { motion } from "motion/react";
import { LucideIcon, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  variant?: "default" | "gradient" | "image";
  backgroundImage?: string;
  className?: string;
  badge?: string;
  actionLabel?: string;
  onAction?: () => void;
  breadcrumbs?: Array<{ label: string; onClick?: () => void }>;
}

export function PageBanner({
  title,
  subtitle,
  description,
  icon: Icon,
  variant = "default",
  backgroundImage,
  className = "",
  badge,
  actionLabel,
  onAction,
  breadcrumbs
}: PageBannerProps) {
  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{
        minHeight: "500px",
        display: "flex",
        alignItems: "center"
      }}
    >
      {/* === BACKGROUND LAYER === */}
      {variant === "image" && backgroundImage ? (
        <>
          {/* Background Image with Parallax Effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Multi-Layer Gradient Overlay for Depth */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/96 via-[#1a2d43]/94 to-[#223B57]/96" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/98 via-transparent to-transparent" />
          </div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </>
      ) : variant === "gradient" ? (
        <>
          {/* Enhanced Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#223B57] via-[#2d4a6a] to-[#223B57]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#223B57] via-transparent to-transparent opacity-60" />
          
          {/* Animated Gradient Mesh */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `
                radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)
              `
            }}
            animate={{
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </>
      ) : (
        <>
          {/* Solid Background with Depth */}
          <div className="absolute inset-0 bg-[#223B57]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#223B57] via-[#2d4a6a]/50 to-[#223B57]" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </>
      )}

      {/* === DECORATIVE ELEMENTS === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Animated Radial Gradients */}
        <motion.div 
          className="absolute -right-40 -top-40 w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)'
          }}
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, 90, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -left-40 -bottom-40 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 40%, transparent 70%)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Sparkle Elements - Premium Feel */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${15 + ((i * 7) % 60)}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.5, 0.15],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3 text-white" strokeWidth={2} />
          </motion.div>
        ))}
        
        {/* Diagonal Light Streaks */}
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)'
          }}
          animate={{
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* === CONTENT === */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-4xl"
          >
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 mb-6 text-sm text-white/70"
              >
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {index > 0 && <span>/</span>}
                    <button
                      onClick={crumb.onClick}
                      className={`hover:text-white transition-colors ${
                        index === breadcrumbs.length - 1 ? 'text-white font-medium' : ''
                      }`}
                    >
                      {crumb.label}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Badge with Enhanced Styling */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 200 }}
                className="mb-7"
              >
                <Badge className="bg-white/20 backdrop-blur-xl text-white border-white/40 px-6 py-3 text-sm hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  {badge}
                </Badge>
              </motion.div>
            )}

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="text-sm uppercase tracking-[0.3em] mb-6 text-white/95 font-semibold flex items-center gap-3"
              >
                <span className="w-12 h-px bg-white/40"></span>
                {subtitle}
              </motion.p>
            )}

            {/* Icon + Title with Better Layout */}
            <div className="flex items-start gap-7 mb-9">
              {Icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 150 }}
                  className="flex-shrink-0"
                >
                  {/* Enhanced Glassmorphism Icon Container */}
                  <div className="relative group">
                    {/* Multi-Layer Glow Effect */}
                    <div className="absolute -inset-4 bg-white/15 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/40 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-2xl">
                      <Icon className="w-11 h-11 md:w-14 md:h-14 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="text-white text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)'
                }}
              >
                {title}
              </motion.h1>
            </div>

            {/* Description with Better Spacing */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-white/95 text-lg md:text-xl leading-relaxed max-w-3xl mb-10"
                style={{
                  textShadow: '0 1px 10px rgba(0,0,0,0.2)'
                }}
              >
                {description}
              </motion.p>
            )}

            {/* Call-to-Action Button */}
            {actionLabel && onAction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.65 }}
              >
                <Button
                  onClick={onAction}
                  size="lg"
                  className="bg-white !text-[#223B57] hover:bg-white/95 hover:scale-105 active:scale-95 h-14 px-8 shadow-2xl hover:shadow-white/20 transition-all duration-300 group"
                >
                  {actionLabel}
                  <ArrowRight className="ml-2 w-5 h-5 text-[#223B57] group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* === ENHANCED BOTTOM WAVE DECORATION === */}
      <div className="absolute bottom-0 left-0 right-0">
        {/* Dual-Layer Wave for Depth */}
        <div className="relative">
          {/* Background Wave - Slightly Transparent */}
          <svg
            className="absolute bottom-0 w-full h-20 md:h-24 opacity-50"
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 100h1440V20S1140 100 720 100 0 20 0 20v80z"
              fill="#F5F3F0"
            />
          </svg>
          
          {/* Foreground Wave - Solid */}
          <svg
            className="relative w-full h-20 md:h-24"
            preserveAspectRatio="none"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 100h1440V30S1140 100 720 100 0 30 0 30v70z"
              fill="#F5F3F0"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}