import { Home, Search, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  const quickLinks = [
    { name: "Home", page: "Home", icon: Home },
    { name: "Products", page: "Products", icon: Search },
    { name: "Collection", page: "Collection", icon: Search },
    { name: "Contact", page: "Contact", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div 
              className="leading-none select-none text-[var(--color-primary)]/10"
              style={{ fontSize: '180px', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}
            >
              404
            </div>
          </motion.div>

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="mb-4">
              Page Not Found
            </h1>
            <p className="text-neutral-600 mb-2">
              Oops! The page you're looking for doesn't exist.
            </p>
            <p className="text-neutral-600">
              It might have been moved or deleted, or the URL might be incorrect.
            </p>
          </motion.div>

          {/* Tile Pattern Decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <div className="grid grid-cols-3 gap-2 w-32">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  className="w-10 h-10 rounded"
                  style={{
                    background: i % 2 === 0 ? '#223B57' : 'var(--color-accent-clay)',
                    opacity: i % 3 === 0 ? 0.2 : 0.1
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button
              onClick={() => onNavigate("Home")}
              className="bg-[#223B57] hover:bg-[#1B3048] text-white h-12 px-8"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 h-12 px-8"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
              <CardContent className="p-6">
                <h3 className="mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => onNavigate(link.page)}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-[#223B57]/5 transition-colors group"
                    >
                      <link.icon className="w-6 h-6 text-neutral-500 group-hover:text-[#223B57] transition-colors" />
                      <span className="text-sm text-[#223B57] group-hover:text-[#223B57] transition-colors">
                        {link.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8"
          >
            <p className="text-sm text-neutral-600">
              Need help? <button onClick={() => onNavigate("Contact")} className="text-[#223B57] hover:underline font-semibold">Contact our support team</button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}