import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "./ui/card";

import { STORAGE_KEYS } from "../constants";
import { secureStorage } from "../security.config";

interface RecentlyViewedProps {
  onNavigate: (page: string) => void;
}

interface ViewedItem {
  page: string;
  timestamp: number;
}

export function RecentlyViewed({ onNavigate }: RecentlyViewedProps) {
  const [recentPages, setRecentPages] = useState<ViewedItem[]>([]);

  useEffect(() => {
    // Use secure storage with proper error handling
    const parsed = secureStorage.getItem<ViewedItem[]>(STORAGE_KEYS.recentlyViewed, []);
    setRecentPages(parsed.slice(0, 3));
  }, []);

  if (recentPages.length === 0) return null;

  const pageLabels: Record<string, string> = {
    "Products": "Browse Products",
    "Tile Calculator": "Calculate Tiles",
    "Visualization": "Visualize Room",
    "Collection": "View Collections",
    "Dealers Locator": "Find Dealers",
  };

  return (
    <Card className="border-l-4 border-l-[var(--color-accent-teal)]">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-[var(--color-accent-teal)]" />
          <h3 className="font-semibold">Recently Viewed</h3>
        </div>
        <div className="space-y-2">
          {recentPages.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigate(item.page)}
              className="w-full text-left p-3 rounded-lg hover:bg-[var(--color-bg-soft)] transition-colors flex items-center justify-between group"
            >
              <span className="text-sm text-neutral-700 group-hover:text-[var(--color-primary)]">
                {pageLabels[item.page] || item.page}
              </span>
              <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}