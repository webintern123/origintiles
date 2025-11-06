// SavedItemsContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
  savedItems: 'saved_items',
} as const;

// ===== CONTEXT TYPES =====
interface SavedItemsContextType {
  savedItems: string[];
  addToSaved: (productId: string) => void;
  removeFromSaved: (productId: string) => void;
  isSaved: (productId: string) => boolean;
  toggleSaved: (productId: string) => void;
}

// ===== CREATE CONTEXT =====
const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

// ===== LOCALSTORAGE HELPERS =====
const getSavedItemsFromStorage = (): string[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.savedItems);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setSavedItemsToStorage = (items: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.savedItems, JSON.stringify(items));
  } catch {
    console.warn('Could not save to localStorage');
  }
};

// ===== PROVIDER =====
export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const [savedItems, setSavedItems] = useState<string[]>(getSavedItemsFromStorage);

  const addToSaved = (productId: string) => {
    setSavedItems((prev) => {
      if (prev.includes(productId)) return prev;
      const updated = [...prev, productId];
      setSavedItemsToStorage(updated);
      return updated;
    });
  };

  const removeFromSaved = (productId: string) => {
    setSavedItems((prev) => {
      const updated = prev.filter((id) => id !== productId);
      setSavedItemsToStorage(updated);
      return updated;
    });
  };

  const isSaved = (productId: string) => savedItems.includes(productId);

  const toggleSaved = (productId: string) => {
    if (isSaved(productId)) {
      removeFromSaved(productId);
    } else {
      addToSaved(productId);
    }
  };

  return (
    <SavedItemsContext.Provider
      value={{ savedItems, addToSaved, removeFromSaved, isSaved, toggleSaved }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

// ===== CUSTOM HOOK =====
export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
