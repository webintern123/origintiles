# Scrolling Features - Quick Reference Guide

## 🚀 Quick Start

### Add Custom Scrollbar to Any Element
```tsx
// Simple - just add these classes
<div className="overflow-y-auto scroll-smooth scrollbar-thin">
  {content}
</div>
```

### Add Fade Indicators (Using Component)
```tsx
import { ScrollableSection } from "./components/ScrollableSection";

<ScrollableSection maxHeight="600px">
  {content}
</ScrollableSection>
```

## 📋 Available CSS Classes

| Class | Purpose | Use Case |
|-------|---------|----------|
| `scroll-smooth` | Smooth scrolling | All scrollable areas (vertical & horizontal) |
| `scrollbar-thin` | 6px thin scrollbar | Sidebars, filters, compact areas, horizontal scroll |
| `scrollbar-none` | Hide scrollbar | Special cases only |
| `overflow-x-auto` | Horizontal scroll | Testimonials, carousels, horizontal galleries |
| `overflow-y-auto` | Vertical scroll | Filters, lists, dropdowns |

**Note:** Global custom scrollbar is auto-applied to all elements (both horizontal and vertical)!

## 🎨 ScrollableSection Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to scroll |
| `maxHeight` | string | "600px" | Maximum height |
| `className` | string | "" | Additional classes |
| `fadeColor` | string | "#F5F3F0" | Fade gradient color |
| `showTopFade` | boolean | true | Show top fade |
| `showBottomFade` | boolean | true | Show bottom fade |
| `fadeHeight` | string | "24px" | Fade gradient height |
| `id` | string | auto | Unique identifier |

## 📝 Common Patterns

### Pattern 0: Auto-Play Carousel with Arrow Navigation ⭐⭐ PREMIUM
**NEW:** Includes auto-play! See `/docs/enhancements/TESTIMONIALS_AUTO_PLAY.md`

```tsx
// Add these states for auto-play
const [isAutoPlaying, setIsAutoPlaying] = useState(true);
const [isPaused, setIsPaused] = useState(false);
const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);

// Auto-play effect
useEffect(() => {
  if (!isAutoPlaying || isPaused) return;
  
  autoPlayIntervalRef.current = setInterval(() => {
    if (scrollRef.current) {
      const isAtEnd = scrollRef.current.scrollLeft >= 
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10;
      
      if (isAtEnd) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ left: 470, behavior: 'smooth' });
      }
    }
  }, 5000);
  
  return () => clearInterval(autoPlayIntervalRef.current!);
}, [isAutoPlaying, isPaused]);
```

### Pattern 0b: Horizontal Scroll with Arrow Navigation (No Auto-Play)
```tsx
const scrollRef = useRef<HTMLDivElement>(null);
const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);

<div className="relative">
  {/* Left Arrow */}
  <button
    onClick={() => scrollRef.current?.scrollBy({ left: -470, behavior: 'smooth' })}
    disabled={!canScrollLeft}
    className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl flex items-center justify-center transition-all ${!canScrollLeft ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
  >
    <ChevronLeft className="w-6 h-6" />
  </button>

  {/* Right Arrow */}
  <button
    onClick={() => scrollRef.current?.scrollBy({ left: 470, behavior: 'smooth' })}
    disabled={!canScrollRight}
    className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-xl flex items-center justify-center transition-all ${!canScrollRight ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:scale-110'}`}
  >
    <ChevronRight className="w-6 h-6" />
  </button>

  {/* Fade Gradients */}
  <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
  <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
  
  {/* Scrollable Container */}
  <div 
    ref={scrollRef}
    onScroll={(e) => {
      const target = e.currentTarget;
      setCanScrollLeft(target.scrollLeft > 10);
      setCanScrollRight(target.scrollLeft < target.scrollWidth - target.clientWidth - 10);
    }}
    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none pb-6 px-16"
  >
    {items.map(item => (
      <div key={item.id} className="flex-shrink-0 w-[450px]">
        <Card>{item.content}</Card>
      </div>
    ))}
  </div>
</div>
```

### Pattern 1: Filter Panel (Like ProductsPage)
```tsx
<CardContent className="p-6 flex flex-col h-full">
  {/* Fixed Header */}
  <div className="mb-6 flex-shrink-0">
    <h2>Filters</h2>
  </div>

  {/* Scrollable Content */}
  <ScrollableSection maxHeight="calc(100vh - 280px)" className="flex-1">
    {filterCategories}
  </ScrollableSection>

  {/* Fixed Footer */}
  <div className="mt-4 pt-4 border-t flex-shrink-0">
    <Button>Clear All</Button>
  </div>
</CardContent>
```

### Pattern 2: List with Fades
```tsx
<ScrollableSection 
  maxHeight="700px"
  fadeColor="#F5F3F0"
  className="space-y-4 pr-2"
>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</ScrollableSection>
```

### Pattern 3: Dropdown/Modal Content
```tsx
<SheetContent className="overflow-y-auto scroll-smooth scrollbar-thin">
  <SheetHeader>
    <SheetTitle>Title</SheetTitle>
  </SheetHeader>
  <div className="mt-6">
    {content}
  </div>
</SheetContent>
```

## 🎯 When to Use What

### Use Global Scrollbar (Automatic):
- ✅ Main page content
- ✅ Card grids
- ✅ General scrollable areas

### Use `.scrollbar-thin`:
- ✅ Sidebars
- ✅ Filter panels
- ✅ Navigation menus
- ✅ Compact lists

### Use `ScrollableSection`:
- ✅ Filter implementations
- ✅ Resource listings
- ✅ Blog article lists
- ✅ FAQ sections
- ✅ Dealer cards
- ✅ Search results

### Use Horizontal Scroll Pattern:
- ✅ Testimonials sections
- ✅ Image carousels/galleries
- ✅ Product showcases
- ✅ Feature highlights
- ✅ Timeline displays
- ✅ Card collections

### Use `.scrollbar-none`:
- ⚠️ Only when scroll must be hidden
- ⚠️ Rare cases (e.g., carousel internals)

## 🎨 Brand Colors

```css
--scrollbar-thumb: #223B57      /* Navy Blue */
--scrollbar-thumb-hover: #1a2d43 /* Navy Dark */
--scrollbar-thumb-active: #152338 /* Navy Darker */
--scrollbar-track: #F5F3F0       /* Cream */
```

## ✅ Implementation Checklist

When adding scrolling to a new area:

- [ ] Add `scroll-smooth` class
- [ ] Add `scrollbar-thin` for compact areas
- [ ] Consider fade indicators if list > 5 items
- [ ] Test on mobile devices
- [ ] Ensure fade color matches background
- [ ] Check accessibility (keyboard scrolling)
- [ ] Verify smooth performance

## 🔍 Troubleshooting

### Scrollbar not showing?
- ✅ Ensure element has `overflow-y-auto` or `overflow-auto`
- ✅ Check that content exceeds max-height
- ✅ Verify global CSS is loaded

### Fades not appearing?
- ✅ Check fade IDs are unique
- ✅ Ensure fade color matches container background
- ✅ Verify z-index is high enough (z-10)
- ✅ Test scroll behavior manually

### Performance issues?
- ✅ Use `scroll-smooth` sparingly on very long lists
- ✅ Consider virtual scrolling for 1000+ items
- ✅ Check for other scroll listeners
- ✅ Profile with browser DevTools

## 📚 Pages with Custom Scrolling

| Page | Location | Features |
|------|----------|----------|
| **Home** | `/components/HomePage.tsx` | **Horizontal testimonials** |
| Products | `/components/ProductsPage.tsx` | Desktop filters, mobile sheet |
| Dealers Locator | `/components/DealersLocatorPage.tsx` | Dealer cards list |
| Header | `/components/Header.tsx` | Search dropdown |

## 🎓 Examples from Codebase

### ProductsPage Desktop Filters:
```tsx
// Line 265-390 in ProductsPage.tsx
<CardContent className="p-6 relative z-10 flex flex-col h-full">
  <div className="flex items-center justify-between mb-6 flex-shrink-0">
    {/* Fixed header */}
  </div>
  
  <div className="relative flex-1 min-h-0">
    <div id="scroll-top-fade" className="absolute top-0 ...fade-gradient..." />
    
    <div className="h-full overflow-y-auto scroll-smooth scrollbar-thin" onScroll={handleScroll}>
      {/* Scrollable content */}
    </div>
    
    <div id="scroll-bottom-fade" className="absolute bottom-0 ...fade-gradient..." />
  </div>
  
  <div className="mt-4 pt-4 border-t flex-shrink-0">
    {/* Fixed footer */}
  </div>
</CardContent>
```

### HomePage Horizontal Testimonials:
```tsx
// Line ~1058 in HomePage.tsx
<div className="relative">
  {/* Left/Right Fade Gradients */}
  <div className="absolute left-0 ... bg-gradient-to-r from-white to-transparent" />
  <div className="absolute right-0 ... bg-gradient-to-l from-white to-transparent" />
  
  {/* Horizontal Scroll Container */}
  <div className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-thin pb-6">
    {testimonials.map((testimonial) => (
      <div key={testimonial.name} className="flex-shrink-0 w-[400px] md:w-[450px]">
        <Card>{/* Testimonial Content */}</Card>
      </div>
    ))}
  </div>
</div>
```

### DealersLocatorPage List:
```tsx
// Line 568-677 in DealersLocatorPage.tsx
<div className="sticky top-24 space-y-4">
  <div className="relative">
    <div id="dealers-scroll-top-fade" className="...fade..." />
    
    <div 
      className="max-h-[700px] overflow-y-auto scroll-smooth scrollbar-thin"
      onScroll={handleScroll}
    >
      {dealers.map(dealer => <DealerCard key={dealer.id} {...dealer} />)}
    </div>
    
    <div id="dealers-scroll-bottom-fade" className="...fade..." />
  </div>
</div>
```

## 💡 Pro Tips

1. **Match fade colors** to container background for seamless blend
2. **Use sticky headers** in long categorized lists
3. **Add padding-right** to scrollable content to prevent content clipping
4. **Test on mobile** - native scrollbars behave differently
5. **Unique IDs** - Always use unique IDs for fade elements
6. **Z-index** - Ensure fades are above content (z-10+)
7. **Performance** - Use `will-change: transform` for smooth animations
8. **Accessibility** - Test keyboard navigation (arrows, page up/down)

## 🎯 Design System Alignment

✅ **Brand Colors** - Navy blue scrollbar (#223B57)  
✅ **Backgrounds** - Warm cream (#F5F3F0)  
✅ **Typography** - Inter font family maintained  
✅ **Transitions** - 300ms cubic-bezier ease  
✅ **Spacing** - 8px grid system preserved  
✅ **Shadows** - Glassmorphism effect compatible  

## 📞 Need Help?

Refer to full documentation:
- `/docs/enhancements/CUSTOM_SCROLLBAR_IMPLEMENTATION.md`

For component usage:
- `/components/ScrollableSection.tsx`

---

**Last Updated:** October 31, 2025  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
