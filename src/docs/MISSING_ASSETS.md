# Missing Assets for Production Deployment

## 📁 Required Static Assets

### **Logo & Branding**
These files should be added to `/public/` directory:

```
/public/
├── logo.svg                    # Main logo (SVG format)
├── logo.png                    # PNG version (1200x1200px)
├── logo-white.svg              # White version for dark backgrounds
├── logo-icon.svg               # Icon only (no text)
├── favicon.ico                 # Browser favicon (32x32, 16x16)
├── favicon-16x16.png           # Small favicon
├── favicon-32x32.png           # Standard favicon
├── apple-touch-icon.png        # iOS home screen (180x180px)
├── android-chrome-192x192.png  # Android icon (192x192px)
├── android-chrome-512x512.png  # Android icon (512x512px)
└── og-image.jpg                # Social media share image (1200x630px)
```

### **Logo Specifications:**

#### **Main Logo (logo.svg)**
- Format: SVG vector
- Colors: Navy Blue (#223B57) with text
- Dimensions: Scalable (recommended base: 300x80px)
- Usage: Header, footer, emails

#### **Logo Icon (logo-icon.svg)**
- Format: SVG vector
- Content: Letter "O" or brand symbol only
- Colors: Navy Blue (#223B57)
- Dimensions: Square (recommended: 100x100px)
- Usage: Favicon base, mobile icon

#### **Favicon (favicon.ico)**
- Format: ICO (multi-resolution)
- Sizes included: 16x16, 32x32, 48x48
- Background: Transparent or white
- Generated from logo-icon.svg

#### **Apple Touch Icon (apple-touch-icon.png)**
- Format: PNG
- Dimensions: 180x180px
- Background: Navy Blue (#223B57) or white
- Content: Logo icon centered
- Usage: iOS home screen bookmark

#### **Android Chrome Icons**
- Format: PNG
- Dimensions: 192x192px and 512x512px
- Background: Navy Blue (#223B57) or white
- Content: Logo icon centered
- Usage: Android home screen, PWA

#### **Open Graph Image (og-image.jpg)**
- Format: JPG (optimized)
- Dimensions: 1200x630px (Facebook/LinkedIn ratio)
- Content: Logo + tagline "Premium Ceramic Tiles"
- Background: Cream (#F5F3F0) or branded background
- Usage: Social media shares (Facebook, LinkedIn, Twitter)

---

## 🎨 Brand Assets Needed

### **1. Product Images** (if not using Unsplash)
```
/public/images/products/
├── urban-canvas/
├── natura-stone/
├── marble-luxe/
├── metro-chic/
├── terracotta-heritage/
└── geometric-fusion/
```

### **2. Collection Hero Images**
```
/public/images/collections/
├── urban-canvas-hero.jpg       # 1920x1080px
├── natura-stone-hero.jpg       # 1920x1080px
├── marble-luxe-hero.jpg        # 1920x1080px
├── metro-chic-hero.jpg         # 1920x1080px
├── terracotta-heritage-hero.jpg # 1920x1080px
└── geometric-fusion-hero.jpg   # 1920x1080px
```

### **3. Team/About Images**
```
/public/images/about/
├── team-photo.jpg              # Company team
├── factory-exterior.jpg        # Factory/showroom
├── quality-control.jpg         # Manufacturing process
└── sustainability.jpg          # Environmental initiatives
```

### **4. Certification Badges**
```
/public/images/certifications/
├── iso-9001.png                # ISO certification
├── green-building.png          # Environmental certification
├── made-in-india.png           # Made in India badge
└── quality-assured.png         # Quality certification
```

---

## 📝 How to Generate Missing Assets

### **Option 1: Using Figma/Design Tools**
1. Create logo in Figma with exact brand colors
2. Export as SVG for web
3. Export multiple PNG sizes for icons
4. Use favicon generator tools

### **Option 2: Online Tools**
- **Favicon Generator:** https://realfavicongenerator.net/
- **OG Image Generator:** https://www.opengraph.xyz/
- **Icon Resizer:** https://www.iloveimg.com/resize-image

### **Option 3: Temporary Placeholders**
```tsx
// Use text-based logo temporarily
<div className="font-bold text-2xl text-[#223B57]">
  Origin Tiles
</div>

// Use initials for favicon
<div className="w-8 h-8 bg-[#223B57] text-white rounded flex items-center justify-center font-bold">
  OT
</div>
```

---

## 🔧 Implementation Checklist

### **Update manifest.json**
```json
{
  "name": "Origin Tiles",
  "short_name": "Origin Tiles",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#223B57",
  "background_color": "#F5F3F0",
  "display": "standalone"
}
```

### **Update HTML Head** (in index.html or App component)
```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android Chrome Icons -->
<link rel="manifest" href="/manifest.json">

<!-- Open Graph -->
<meta property="og:image" content="https://origintiles.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

---

## 🎯 Priority Levels

### **CRITICAL (Deploy Blockers)**
- ✅ favicon.ico - Browser tab icon
- ✅ logo.svg or logo.png - Header logo
- ✅ apple-touch-icon.png - iOS icon
- ✅ og-image.jpg - Social sharing

### **HIGH PRIORITY**
- ⚠️ Android chrome icons (192x192, 512x512)
- ⚠️ Logo variations (white, icon-only)
- ⚠️ Collection hero images

### **MEDIUM PRIORITY**
- 📋 Product images (if replacing Unsplash)
- 📋 About page images
- 📋 Certification badges

### **LOW PRIORITY**
- 🔵 Promotional banners
- 🔵 Newsletter graphics
- 🔵 Video content

---

## 🚀 Quick Start Guide

### **Minimum Viable Assets (MVP)**
To launch immediately, you need:

1. **Logo** (can use text temporarily)
2. **Favicon** (generate from text/initials)
3. **OG Image** (create simple branded image)

### **Temporary Solutions**
```tsx
// Text-based logo component
export function TemporaryLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-[#223B57] rounded flex items-center justify-center text-white font-bold text-xl">
        OT
      </div>
      <span className="font-bold text-2xl text-[#223B57]">Origin Tiles</span>
    </div>
  );
}
```

---

## 📞 Next Steps

1. **Immediate:** Use text-based logo for launch
2. **Week 1:** Get professional logo designed
3. **Week 2:** Generate all icon variations
4. **Week 3:** Create social media assets
5. **Month 1:** Build complete brand asset library

---

**Note:** The website is 100% functional without these assets. They are only needed for:
- Professional branding appearance
- Better SEO and social sharing
- App-like experience on mobile devices
- Brand recognition and trust

You can launch with temporary text-based logos and add these assets progressively.
