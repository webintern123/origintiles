# Required Libraries - Origin Tiles Website

## Date: October 31, 2025

This document lists all required npm packages for the Origin Tiles website, including the new 3D VR visualization features.

---

## 📦 Core Dependencies

### **React & TypeScript**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.0"
}
```

### **Routing & Navigation**
```json
{
  "@types/react": "^18.2.0",
  "@types/react-dom": "^18.2.0"
}
```

---

## 🎨 Styling & UI

### **Tailwind CSS**
```json
{
  "tailwindcss": "^4.0.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

### **Shadcn UI Components**
```json
{
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-alert-dialog": "^1.0.5",
  "@radix-ui/react-aspect-ratio": "^1.0.3",
  "@radix-ui/react-avatar": "^1.0.4",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-collapsible": "^1.0.3",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-dropdown-menu": "^2.0.6",
  "@radix-ui/react-hover-card": "^1.0.7",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-menubar": "^1.0.4",
  "@radix-ui/react-navigation-menu": "^1.1.4",
  "@radix-ui/react-popover": "^1.0.7",
  "@radix-ui/react-progress": "^1.0.3",
  "@radix-ui/react-radio-group": "^1.1.3",
  "@radix-ui/react-scroll-area": "^1.0.5",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-separator": "^1.0.3",
  "@radix-ui/react-slider": "^1.1.2",
  "@radix-ui/react-slot": "^1.0.2",
  "@radix-ui/react-switch": "^1.0.3",
  "@radix-ui/react-tabs": "^1.0.4",
  "@radix-ui/react-toast": "^1.1.5",
  "@radix-ui/react-toggle": "^1.0.3",
  "@radix-ui/react-toggle-group": "^1.0.4",
  "@radix-ui/react-tooltip": "^1.0.7"
}
```

---

## 🎭 Animation

### **Motion (Framer Motion)**
```json
{
  "motion": "^11.0.0",
  "framer-motion": "^11.0.0"
}
```

**Note:** Motion is the new name for Framer Motion. Import as:
```tsx
import { motion } from 'motion/react'
```

---

## 🥽 3D Visualization (NEW)

### **Three.js & React Integration**
```json
{
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.95.0",
  "three": "^0.160.0"
}
```

**Purpose:**
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (OrbitControls, Environment, Sky, Html)
- `three` - 3D graphics library

**Features Enabled:**
- Interactive 3D room viewer
- Real-time tile texture rendering
- Camera controls (rotate, pan, zoom)
- VR headset support (WebXR)
- Lighting and shadows
- Environment mapping

---

## 🎨 Icons & Graphics

### **Icons**
```json
{
  "lucide-react": "^0.300.0"
}
```

### **Charts**
```json
{
  "recharts": "^2.10.0"
}
```

---

## 🗺️ Maps Integration

### **Google Maps**
```json
{
  "@react-google-maps/api": "^2.19.0"
}
```

**Environment Variable Required:**
```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

---

## 📝 Forms & Validation

### **Form Management**
```json
{
  "react-hook-form": "^7.55.0"
}
```

**Note:** Must import with version:
```tsx
import { useForm } from 'react-hook-form@7.55.0'
```

### **Validation**
```json
{
  "zod": "^3.22.0",
  "@hookform/resolvers": "^3.3.0"
}
```

---

## 🔔 Notifications

### **Toast Notifications**
```json
{
  "sonner": "^2.0.3"
}
```

**Note:** Import toast with version:
```tsx
import { toast } from 'sonner@2.0.3'
```

---

## 🛠️ Utilities

### **Class Name Utilities**
```json
{
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0"
}
```

### **Date Utilities**
```json
{
  "date-fns": "^3.0.0"
}
```

---

## 🔧 Build Tools

### **Vite**
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

### **TypeScript**
```json
{
  "@types/node": "^20.10.0",
  "@types/three": "^0.160.0"
}
```

---

## 📦 Complete package.json Example

```json
{
  "name": "origin-tiles",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.95.0",
    "three": "^0.160.0",
    
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-radio-group": "^1.1.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    
    "motion": "^11.0.0",
    "framer-motion": "^11.0.0",
    
    "lucide-react": "^0.300.0",
    "recharts": "^2.10.0",
    
    "@react-google-maps/api": "^2.19.0",
    
    "react-hook-form": "^7.55.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    
    "sonner": "^2.0.3",
    
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/node": "^20.10.0",
    "@types/three": "^0.160.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🚀 Installation Instructions

### **Install All Dependencies**
```bash
npm install
```

### **Install 3D Visualization Dependencies** (if missing)
```bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```

### **Install Specific Version Dependencies**
```bash
npm install react-hook-form@7.55.0
npm install sonner@2.0.3
```

---

## ⚠️ Important Notes

### **Version-Specific Imports**
Some packages require version-specific imports:

1. **React Hook Form**
```tsx
import { useForm } from 'react-hook-form@7.55.0'
```

2. **Sonner**
```tsx
import { toast } from 'sonner@2.0.3'
```

### **Motion Import**
Use the new import syntax:
```tsx
import { motion } from 'motion/react'
// NOT: import { motion } from 'framer-motion'
```

### **Three.js Types**
Make sure to install Three.js types for TypeScript:
```bash
npm install -D @types/three
```

---

## 🔍 Troubleshooting

### **Missing 3D Dependencies**
If 3D visualization doesn't work:
```bash
npm install @react-three/fiber @react-three/drei three @types/three
```

### **Type Errors**
If you see TypeScript errors related to Three.js:
```bash
npm install -D @types/three @types/node
```

### **Motion Not Found**
If motion import fails:
```bash
npm install motion framer-motion
```

### **Build Errors**
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📚 Documentation Links

### **3D Visualization**
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Drei Components](https://github.com/pmndrs/drei)
- [Three.js](https://threejs.org/docs/)
- [WebXR](https://immersiveweb.dev/)

### **UI Components**
- [Shadcn UI](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Motion](https://motion.dev/)

### **Forms & Validation**
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Development server starts: `npm run dev`
- [ ] No TypeScript errors: `npm run build`
- [ ] 3D visualization loads (check Visualization page)
- [ ] All Shadcn components render correctly
- [ ] Motion animations work smoothly
- [ ] Google Maps loads (with API key)
- [ ] Forms validate correctly
- [ ] Toast notifications appear

---

## 🎉 Success!

If all dependencies install correctly and the site builds without errors, you're ready to deploy!

**Next Steps:**
1. Set up environment variables (`.env`)
2. Test all 24 pages
3. Run production build: `npm run build`
4. Deploy to Vercel/hosting

---

**Status:** ✅ All dependencies documented and ready for installation

**Last Updated:** October 31, 2025
