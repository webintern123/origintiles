import { useEffect, useRef, ReactNode } from "react";

interface ScrollableSectionProps {
  children: ReactNode;
  maxHeight?: string;
  className?: string;
  fadeColor?: string;
  showTopFade?: boolean;
  showBottomFade?: boolean;
  fadeHeight?: string;
  id?: string;
}

/**
 * ScrollableSection Component
 * 
 * A reusable scrollable container with:
 * - Custom branded scrollbar (navy blue)
 * - Fade gradient indicators (top/bottom)
 * - Smooth scrolling behavior
 * - Auto-hiding fade indicators based on scroll position
 * 
 * @example
 * <ScrollableSection maxHeight="600px">
 *   <div>Your scrollable content here</div>
 * </ScrollableSection>
 */
export function ScrollableSection({
  children,
  maxHeight = "600px",
  className = "",
  fadeColor = "#F5F3F0",
  showTopFade = true,
  showBottomFade = true,
  fadeHeight = "24px",
  id = `scrollable-${Math.random().toString(36).substr(2, 9)}`
}: ScrollableSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topFadeId = `${id}-top-fade`;
  const bottomFadeId = `${id}-bottom-fade`;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check for scroll position
    const checkScroll = () => {
      const topFade = document.getElementById(topFadeId);
      const bottomFade = document.getElementById(bottomFadeId);

      if (!topFade || !bottomFade) return;

      // Show/hide top fade
      if (container.scrollTop > 10) {
        topFade.style.opacity = '1';
      } else {
        topFade.style.opacity = '0';
      }

      // Show/hide bottom fade
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 10;
      if (isAtBottom) {
        bottomFade.style.opacity = '0';
      } else {
        bottomFade.style.opacity = '1';
      }
    };

    // Initial check
    checkScroll();

    // Add scroll listener
    container.addEventListener('scroll', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
    };
  }, [topFadeId, bottomFadeId]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const topFade = document.getElementById(topFadeId);
    const bottomFade = document.getElementById(bottomFadeId);

    if (!topFade || !bottomFade) return;

    // Show/hide top fade
    if (target.scrollTop > 10) {
      topFade.style.opacity = '1';
    } else {
      topFade.style.opacity = '0';
    }

    // Show/hide bottom fade
    const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 10;
    if (isAtBottom) {
      bottomFade.style.opacity = '0';
    } else {
      bottomFade.style.opacity = '1';
    }
  };

  return (
    <div className="relative">
      {/* Top Fade Gradient Indicator */}
      {showTopFade && (
        <div
          id={topFadeId}
          className="absolute top-0 left-0 right-0 pointer-events-none z-10 opacity-0 transition-opacity duration-300"
          style={{
            height: fadeHeight,
            background: `linear-gradient(to bottom, ${fadeColor}, transparent)`
          }}
        />
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={`overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-thin ${className}`}
        style={{ maxHeight }}
        onScroll={handleScroll}
      >
        {children}
      </div>

      {/* Bottom Fade Gradient Indicator */}
      {showBottomFade && (
        <div
          id={bottomFadeId}
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 opacity-100 transition-opacity duration-300"
          style={{
            height: fadeHeight,
            background: `linear-gradient(to top, ${fadeColor}, transparent)`
          }}
        />
      )}
    </div>
  );
}
