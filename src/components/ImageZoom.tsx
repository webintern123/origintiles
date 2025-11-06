import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { motion, AnimatePresence } from "motion/react";

interface ImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageZoom({ src, alt, className }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative group cursor-zoom-in" onClick={() => setIsOpen(true)}>
        <img src={src} alt={alt} className={className} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full">
            <ZoomIn className="w-6 h-6 text-[var(--color-primary)]" />
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 overflow-hidden bg-black/95 border-none">
          {/* Visually hidden for accessibility */}
          <DialogTitle className="sr-only">{alt || "Image zoom view"}</DialogTitle>
          <DialogDescription className="sr-only">
            Enlarged view of the image. Press Escape or click the close button to exit.
          </DialogDescription>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full flex items-center justify-center p-8"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                <img
                  src={src}
                  alt={alt}
                  className="max-w-full max-h-full object-contain"
                  style={{ maxHeight: "85vh" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}