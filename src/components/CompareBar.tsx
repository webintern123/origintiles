import { useState, useEffect } from "react";
import { X, ArrowRightLeft } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { STORAGE_KEYS } from "../constants";
import { secureStorage } from "../security.config";

interface CompareBarProps {
  onNavigate?: (page: string) => void;
}

export function CompareBar({ onNavigate }: CompareBarProps) {
  const [compareItems, setCompareItems] = useState<string[]>([]);

  useEffect(() => {
    // Load compare items using secure storage
    const items = secureStorage.getItem<string[]>(STORAGE_KEYS.compare, []);
    setCompareItems(items);
  }, []);

  const removeItem = (index: number) => {
    const newItems = compareItems.filter((_, i) => i !== index);
    setCompareItems(newItems);
    secureStorage.setItem(STORAGE_KEYS.compare, newItems);
    toast.info("Item removed from comparison");
  };

  const clearAll = () => {
    setCompareItems([]);
    secureStorage.removeItem(STORAGE_KEYS.compare);
    toast.info("Comparison cleared");
  };

  const handleCompare = () => {
    if (onNavigate) {
      onNavigate("Compare Products");
    }
  };

  if (compareItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-2xl"
      >
        <div className="max-w-[1440px] mx-auto py-4" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="w-5 h-5 text-[var(--color-primary)]" />
              <span className="font-semibold">Compare Products ({compareItems.length}/4)</span>
            </div>
            
            <div className="flex items-center gap-4 flex-1 justify-center overflow-x-auto">
              {compareItems.slice(0, 4).map((item, index) => (
  <div key={index} className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg">
    <span className="text-sm whitespace-nowrap">{item}</span> {/* <-- use item */}
    <button
      onClick={() => removeItem(index)}
      className="text-neutral-500 hover:text-red-600 transition-colors"
    >
      <X className="w-4 h-4" />
    </button>
  </div>
))}

            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
              >
                Clear All
              </Button>
              <Button
                size="sm"
                variant="filled"
                onClick={handleCompare}
                disabled={compareItems.length < 2}
              >
                Compare Now
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}