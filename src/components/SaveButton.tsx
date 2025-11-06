import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";
import { STORAGE_KEYS } from "../constants";
import { secureStorage } from "../security.config";

interface SaveButtonProps {
  itemId: string;
  itemType: "product" | "article";
  itemTitle: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showLabel?: boolean;
}

export function SaveButton({ 
  itemId, 
  itemType, 
  itemTitle, 
  variant = "outline",
  size = "default",
  showLabel = true 
}: SaveButtonProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if item is saved using proper storage key structure
    const storageKey = `${STORAGE_KEYS.favorites}_${itemType}_${itemId}`;
    const saved = secureStorage.getItem<boolean>(storageKey, false);
    setIsSaved(saved);
  }, [itemId, itemType]);

  const handleToggle = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    const storageKey = `${STORAGE_KEYS.favorites}_${itemType}_${itemId}`;

    if (newSavedState) {
      secureStorage.setItem(storageKey, true);
      toast.success("Saved!", {
        description: `${itemTitle} has been saved to your favorites.`
      });
    } else {
      secureStorage.removeItem(storageKey);
      toast.info("Removed", {
        description: `${itemTitle} has been removed from favorites.`
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className="group relative focus-ring-accent"
      style={{ transition: 'all var(--transition-base)' }}
    >
      <motion.div
        animate={{ scale: isSaved ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-200 ${
            isSaved 
              ? 'fill-[#223B57] text-[#223B57]' 
              : 'text-neutral-600 group-hover:text-[#223B57]'
          }`}
          style={{ transition: 'all var(--transition-base)' }}
        />
      </motion.div>
      {showLabel && <span>{isSaved ? 'Saved' : 'Save'}</span>}
    </Button>
  );
}