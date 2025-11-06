import { createContext, useContext, useState, ReactNode } from 'react';

// --- STORAGE KEYS ---
const STORAGE_KEYS = {
  compareItems: 'compare_items', // key used in localStorage
};

// --- CONTEXT TYPES ---
interface CompareContextType {
  compareItems: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

// --- CONTEXT ---
const CompareContext = createContext<CompareContextType | undefined>(undefined);

// --- PROVIDER ---
export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.compareItems);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addToCompare = (productId: string) => {
    setCompareItems((prev) => {
      if (prev.includes(productId) || prev.length >= 4) return prev;
      const updated = [...prev, productId];
      localStorage.setItem(STORAGE_KEYS.compareItems, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => {
      const updated = prev.filter((id) => id !== productId);
      localStorage.setItem(STORAGE_KEYS.compareItems, JSON.stringify(updated));
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareItems([]);
    localStorage.removeItem(STORAGE_KEYS.compareItems);
  };

  const isInCompare = (productId: string) => compareItems.includes(productId);

  return (
    <CompareContext.Provider
      value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}

// --- CUSTOM HOOK ---
export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
}
