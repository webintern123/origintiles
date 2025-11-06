import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: string[];
  onNavigate?: (page: string) => void;
}

export function Breadcrumbs({ items, onNavigate }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
      <button
        onClick={() => onNavigate?.("Home")}
        className="flex items-center gap-1 hover:text-[#223B57] transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </button>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-white/40" />
          {index === items.length - 1 ? (
            <span className="text-[#223B57] font-medium">{item}</span>
          ) : (
            <button
              onClick={() => onNavigate?.(item)}
              className="hover:text-[#223B57] transition-colors"
            >
              {item}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
}