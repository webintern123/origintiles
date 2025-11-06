# Google Maps API - Quick Setup Guide

**For:** Origin Tiles Dealers Locator Interactive Map  
**Time Required:** 10-15 minutes  
**Cost:** FREE (up to 28,000 map loads/month)

---

## 🎯 Quick Start (5 Steps)

### **Step 1: Get API Key** (3 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click "Create Project" or select existing project
4. Project name: "Origin Tiles Website"
5. Click "Create"

---

### **Step 2: Enable Maps API** (2 minutes)

1. In the sidebar, click "APIs & Services" → "Library"
2. Search for "Maps JavaScript API"
3. Click on it
4. Click "Enable"
5. Wait for confirmation

---

### **Step 3: Create API Key** (2 minutes)

1. Go to "APIs & Services" → "Credentials"
2. Click "+ Create Credentials" → "API Key"
3. Copy your API key (looks like: `AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`)
4. Click "Restrict Key" for security

---

### **Step 4: Enable Billing** (3 minutes)

1. Go to "Billing" in the sidebar
2. Click "Link a Billing Account"
3. Add credit card (required, but **FREE tier is generous!**)
4. Confirm

**Don't worry about cost:**
- ✅ 28,000 map loads/month = **FREE**
- ✅ $200 monthly credit included
- ✅ Only pay if you exceed limits
- ✅ Set budget alerts to monitor

---

### **Step 5: Add to Project** (2 minutes)

#### **For Development:**

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local`:
   ```bash
   VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```
   (Replace with your actual API key)

3. Restart dev server:
   ```bash
   npm run dev
   ```

4. Open Dealers Locator page - Map should work! 🎉

---

#### **For Production (Vercel/Netlify):**

1. Go to your hosting dashboard
2. Project Settings → Environment Variables
3. Add new variable:
   - **Name:** `VITE_GOOGLE_MAPS_API_KEY`
   - **Value:** Your API key
4. Redeploy

---

## 🔒 Security (Important!)

### **Restrict Your API Key:**

1. In Google Cloud Console → Credentials
2. Click on your API key
3. Under "Application restrictions":
   - Choose "HTTP referrers (websites)"
   - Add your domains:
     ```
     https://origintiles.com/*
     https://www.origintiles.com/*
     http://localhost:5173/*
     ```
4. Under "API restrictions":
   - Choose "Restrict key"
   - Select only "Maps JavaScript API"
5. Click "Save"

**Why restrict?**
- ✅ Prevents unauthorized use
- ✅ Protects your billing
- ✅ Security best practice

---

## 💰 Cost Breakdown

### **Free Tier (Very Generous!):**

```
28,000 map loads per month = FREE
+ $200 monthly Google Cloud credit
```

### **What counts as a "map load"?**
- 1 map load = 1 page view of Dealers Locator page
- User can zoom/pan/click without additional charges

### **Realistic Usage Examples:**

**Small Site (1,000 visitors/month):**
```
1,000 visitors × 2 page views = 2,000 map loads
Cost: $0/month (FREE tier)
```

**Medium Site (5,000 visitors/month):**
```
5,000 visitors × 2 page views = 10,000 map loads
Cost: $0/month (FREE tier)
```

**Large Site (10,000 visitors/month):**
```
10,000 visitors × 2 page views = 20,000 map loads
Cost: $0/month (still FREE!)
```

**Very Large Site (50,000 visitors/month):**
```
50,000 visitors × 2 page views = 100,000 map loads
Cost after free tier: (100,000 - 28,000) × $0.007 = $504/month
```

### **Set Budget Alerts:**

1. Google Cloud Console → Billing → Budgets & alerts
2. Create budget (e.g., $50/month)
3. Get email alerts at:
   - 50% of budget
   - 90% of budget
   - 100% of budget

---

## 🧪 Testing

### **Verify Setup:**

1. Open Dealers Locator page
2. Switch to "Map View" tab
3. Check for:
   - ✅ Map loads (not error message)
   - ✅ Navy blue markers appear
   - ✅ Click marker → info window opens
   - ✅ "Get Directions" works
   - ✅ No console errors

### **Check Console (F12):**

Should see **ZERO** errors:
- ✅ No "loading=async" warning
- ✅ No "Marker deprecated" warning
- ✅ No "BillingNotEnabledMapError"

---

## ❌ Troubleshooting

### **Problem: Map shows error message**

**Solution:**
1. Check `.env.local` exists
2. Verify API key is correct
3. Make sure billing is enabled
4. Restart dev server

---

### **Problem: "BillingNotEnabledMapError"**

**Solution:**
1. Go to Google Cloud Console
2. Enable billing (add credit card)
3. Wait 5 minutes for activation
4. Refresh page

---

### **Problem: Map loads but no markers**

**Solution:**
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify dealers data has coordinates
4. Check network tab for API errors

---

### **Problem: Console shows "Marker deprecated"**

**Solution:**
- This fix already handles it!
- Make sure you're using the updated `GoogleMap.tsx` component
- Clear browser cache

---

## 📊 Monitoring Usage

### **View API Usage:**

1. Google Cloud Console → APIs & Services → Dashboard
2. Click "Maps JavaScript API"
3. View traffic, errors, latency
4. Monitor your quota usage

### **Set Up Alerts:**

1. Go to Monitoring → Alerting
2. Create alert policy
3. Set threshold (e.g., 25,000 requests/month)
4. Get email notification

---

## 🎨 Customization

### **Change Marker Color:**

Edit `/components/GoogleMap.tsx`:

```typescript
markerElement.innerHTML = `
  <div style="background: #223B57;"> // Change this color
    <!-- marker SVG -->
  </div>
`;
```

---

### **Change Map Style:**

Edit map initialization in `GoogleMap.tsx`:

```typescript
styles: [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5f3f0' }] // Change background color
  },
  // ... more styles
]
```

---

## 📚 Additional Resources

### **Google Documentation:**
- [Get Started](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
- [AdvancedMarkerElement](https://developers.google.com/maps/documentation/javascript/advanced-markers)

### **Support:**
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps)
- [Google Maps Support](https://developers.google.com/maps/support)

---

## ✅ Checklist

Before going live:

- [ ] API key created
- [ ] Billing enabled
- [ ] API key restricted to your domain
- [ ] Environment variable added
- [ ] Map loads successfully
- [ ] Markers appear correctly
- [ ] Info windows work
- [ ] No console errors
- [ ] Budget alerts set up
- [ ] Usage monitoring enabled

---

## 🎉 You're Done!

Your Dealers Locator now has a professional, interactive Google Map with:

✅ Custom navy blue branded markers  
✅ Detailed dealer information  
✅ Click-to-call and directions  
✅ Mobile responsive  
✅ Zero console errors  
✅ Production-ready  

**Total Setup Time:** ~10-15 minutes  
**Monthly Cost:** $0 (for typical website traffic)  
**Professional Value:** Priceless! 🚀

---

**Need Help?** Check `/docs/bug-fixes/GOOGLE_MAPS_API_ERRORS_FIXED.md` for detailed troubleshooting.
