# 🚀 Infrastructure Quick Reference

**Quick guide to using the new lib/, contexts/, and services/ infrastructure**

---

## 📁 Folder Structure

```
origin-tiles/
├── lib/           # Business logic & utilities
├── contexts/      # React Context providers
└── services/      # External service integrations
```

---

## 💼 Business Logic (`/lib`)

### **constants.ts**
```typescript
import { BUSINESS_CONSTANTS, BRAND_INFO, ANIMATION_DURATIONS } from './lib/constants';

// Business rules
BUSINESS_CONSTANTS.TILE_WASTAGE_PERCENTAGE  // 10
BUSINESS_CONSTANTS.MAX_COMPARE_ITEMS        // 4
BUSINESS_CONSTANTS.PRODUCTS_PER_PAGE        // 12

// Brand information
BRAND_INFO.name          // "Origin Tiles"
BRAND_INFO.phone         // "+91 9098383833"
BRAND_INFO.email         // "info@origintiles.com"
BRAND_INFO.brandColor    // "#223b57"

// Animation timings
ANIMATION_DURATIONS.fast    // 200ms
ANIMATION_DURATIONS.normal  // 300ms
ANIMATION_DURATIONS.slow    // 500ms
```

### **api-client.ts**
```typescript
import { apiClient } from './lib/api-client';

// GET request
const response = await apiClient.get<Product[]>('/products');
if (response.success) {
  console.log(response.data);
}

// POST request
const response = await apiClient.post('/contact', formData);
```

### **analytics.ts**
```typescript
import { analytics } from './lib/analytics';

// Track page views
analytics.pageView('Products');

// Track button clicks
analytics.buttonClick('Request Quote', 'Product Page');

// Track form submissions
analytics.formSubmit('Contact Form', true);

// Track product views
analytics.productView('tile-123', 'Urban Canvas Gray');

// Track sample requests
analytics.sampleRequest('tile-123');
```

---

## 🔄 State Management (`/contexts`)

### **CompareContext.tsx**
```typescript
import { CompareProvider, useCompare } from './contexts/CompareContext';

// 1. Wrap your app
<CompareProvider>
  <App />
</CompareProvider>

// 2. Use in components
function ProductCard({ productId }) {
  const { addToCompare, removeFromCompare, isInCompare, compareItems } = useCompare();
  
  return (
    <button onClick={() => addToCompare(productId)}>
      {isInCompare(productId) ? 'Remove from Compare' : 'Add to Compare'}
    </button>
  );
}
```

### **SavedItemsContext.tsx**
```typescript
import { SavedItemsProvider, useSavedItems } from './contexts/SavedItemsContext';

// 1. Wrap your app
<SavedItemsProvider>
  <App />
</SavedItemsProvider>

// 2. Use in components
function ProductCard({ productId }) {
  const { toggleSaved, isSaved, savedItems } = useSavedItems();
  
  return (
    <button onClick={() => toggleSaved(productId)}>
      {isSaved(productId) ? '❤️ Saved' : '🤍 Save'}
    </button>
  );
}
```

### **RecentlyViewedContext.tsx**
```typescript
import { RecentlyViewedProvider, useRecentlyViewed } from './contexts/RecentlyViewedContext';

// 1. Wrap your app
<RecentlyViewedProvider>
  <App />
</RecentlyViewedProvider>

// 2. Use in components
function ProductPage({ productId }) {
  const { addRecentItem, recentItems } = useRecentlyViewed();
  
  useEffect(() => {
    addRecentItem(productId, 'product');
  }, [productId]);
  
  return <div>Recently Viewed: {recentItems.length}</div>;
}
```

---

## 🌐 External Services (`/services`)

### **email-service.ts**
```typescript
import { emailService } from './services/email-service';

// Send contact form
const success = await emailService.sendContactForm({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  message: 'I need tiles for my project',
});

// Send sample request
const success = await emailService.sendSampleRequest({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  address: { /* address object */ },
  samples: ['tile-1', 'tile-2'],
});

// Subscribe to newsletter
const success = await emailService.subscribeNewsletter('email@example.com');
```

### **maps-service.ts**
```typescript
import { mapsService } from './services/maps-service';

// Geocode address
const coords = await mapsService.geocodeAddress('Mumbai, India');
// Returns: { lat: 19.0760, lng: 72.8777 }

// Reverse geocode
const address = await mapsService.reverseGeocode({ lat: 19.0760, lng: 72.8777 });
// Returns: "Mumbai, Maharashtra, India"

// Calculate distance
const distance = mapsService.calculateDistance(
  { lat: 19.0760, lng: 72.8777 },  // Mumbai
  { lat: 28.7041, lng: 77.1025 }   // Delhi
);
// Returns: distance in kilometers

// Get user's location
const location = await mapsService.getCurrentLocation();
// Returns: { lat: ..., lng: ... }
```

---

## 🔗 Complete Integration Example

### **App.tsx with All Providers**
```typescript
import { CompareProvider } from './contexts/CompareContext';
import { SavedItemsProvider } from './contexts/SavedItemsContext';
import { RecentlyViewedProvider } from './contexts/RecentlyViewedContext';

export default function App() {
  return (
    <CompareProvider>
      <SavedItemsProvider>
        <RecentlyViewedProvider>
          <AppContent />
        </RecentlyViewedProvider>
      </SavedItemsProvider>
    </CompareProvider>
  );
}
```

### **Contact Form Example**
```typescript
import { emailService } from './services/email-service';
import { analytics } from './lib/analytics';
import { toast } from 'sonner';

async function handleSubmit(data: ContactFormData) {
  try {
    const success = await emailService.sendContactForm(data);
    
    if (success) {
      analytics.formSubmit('Contact Form', true);
      toast.success('Message sent successfully!');
    } else {
      analytics.formSubmit('Contact Form', false);
      toast.error('Failed to send message');
    }
  } catch (error) {
    analytics.formSubmit('Contact Form', false);
    toast.error('An error occurred');
  }
}
```

### **Product Page Example**
```typescript
import { useCompare } from './contexts/CompareContext';
import { useSavedItems } from './contexts/SavedItemsContext';
import { useRecentlyViewed } from './contexts/RecentlyViewedContext';
import { analytics } from './lib/analytics';

function ProductPage({ product }) {
  const { addToCompare, isInCompare } = useCompare();
  const { toggleSaved, isSaved } = useSavedItems();
  const { addRecentItem } = useRecentlyViewed();
  
  useEffect(() => {
    addRecentItem(product.id, 'product');
    analytics.productView(product.id, product.name);
  }, [product.id]);
  
  return (
    <div>
      <h1>{product.name}</h1>
      
      <button onClick={() => {
        toggleSaved(product.id);
        analytics.buttonClick('Save Product', 'Product Page');
      }}>
        {isSaved(product.id) ? '❤️ Saved' : '🤍 Save'}
      </button>
      
      <button onClick={() => {
        addToCompare(product.id);
        analytics.buttonClick('Add to Compare', 'Product Page');
      }}>
        {isInCompare(product.id) ? '✓ In Compare' : 'Add to Compare'}
      </button>
    </div>
  );
}
```

---

## 📚 Related Documentation

- **[REORGANIZATION_COMPLETE_SUMMARY.md](./project/REORGANIZATION_COMPLETE_SUMMARY.md)** - Full reorganization details
- **[FOLDER_STRUCTURE_REORGANIZATION.md](./project/FOLDER_STRUCTURE_REORGANIZATION.md)** - Folder structure guide
- **[COMPONENT_MOVE_GUIDE.md](./project/COMPONENT_MOVE_GUIDE.md)** - Component organization

---

## ✅ Quick Checklist

When using the new infrastructure:

```
□ Import from correct paths (./lib, ./contexts, ./services)
□ Wrap App with Context Providers
□ Use analytics for tracking user actions
□ Use emailService for form submissions
□ Use mapsService for location features
□ Access constants from lib/constants.ts
□ Use apiClient for future backend calls
```

---

**Last Updated:** November 1, 2025  
**Status:** Production Ready ✅
