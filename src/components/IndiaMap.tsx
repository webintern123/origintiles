import { motion } from "motion/react";

export function IndiaMap() {
  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl overflow-hidden shadow-2xl">
      
      {/* Google Map Embed */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=17.4488098,78.3799294&hl=en&z=17&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>

      {/* Title Top Left */}
      <motion.div 
        className="absolute top-6 left-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-white/90 backdrop-blur-md rounded-xl px-5 py-3 shadow-lg border border-white/60">
          <h3 className="text-lg font-bold text-[#223B57]">Hyderabad Location</h3>
          <p className="text-xs text-neutral-600 mt-0.5">Plot 3-538, Sri Krishna Heights, 100 feet road, Ayyappa society, Madhapur</p>
        </div>
      </motion.div>
    </div>
  );
}
