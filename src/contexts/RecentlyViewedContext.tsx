/**
 * Recently Viewed Context
 * Manages recently viewed products/pages across the application
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { STORAGE_KEYS } from '../constants';

interface RecentItem {
  id: string;
  type: 'product' | 'page';
  timestamp: number;
}

interface RecentlyViewedContextType {
  recentItems: RecentItem[];
  addRecentItem: (id: string, type: 'product' | 'page') => void;
  clearRecent: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [recentItems, setRecentItems] = useState<RecentItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.recentlyViewed);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const addRecentItem = (id: string, type: 'product' | 'page') => {
    setRecentItems((prev) => {
      // Remove duplicate and add to front
      const filtered = prev.filter((item) => item.id !== id);
      const updated = [{ id, type, timestamp: Date.now() }, ...filtered].slice(0, 10);
      localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentItems([]);
    localStorage.removeItem(STORAGE_KEYS.recentlyViewed);
  };

  // Clean up old items (older than 30 days)
  useEffect(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    setRecentItems((prev) => {
      const filtered = prev.filter((item) => item.timestamp > thirtyDaysAgo);
      if (filtered.length !== prev.length) {
        localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(filtered));
      }
      return filtered;
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentItems, addRecentItem, clearRecent }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }
  return context;
}
