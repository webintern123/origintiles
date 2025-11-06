import { useState, useEffect, Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { PageTransition } from "./components/PageTransition";
import { QuickActions } from "./components/QuickActions";
import { AnnouncementBanner } from "./components/AnnouncementBanner";
import { ProgressBar } from "./components/ProgressBar";
import { CompareBar } from "./components/CompareBar";
import { LiveChatRealtime } from "./components/LiveChatRealtime";
import { Toaster } from "./components/ui/sonner";
import { AnimatePresence } from "motion/react";
import { STORAGE_KEYS } from "./constants";
import { LoadingState } from "./components/LoadingState";
import { initializeSecurity } from "./security.config";
import { initializePerformance } from "./utils/performance";

// Lazy load page components for better performance
const HomePage = lazy(() => import("./components/HomePage").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./components/AboutPage").then(m => ({ default: m.AboutPage })));
const CollectionPage = lazy(() => import("./components/CollectionPage").then(m => ({ default: m.CollectionPage })));
const TileCalculator = lazy(() => import("./components/TileCalculator").then(m => ({ default: m.TileCalculator })));
const VisualizationPage = lazy(() => import("./components/VisualizationPage").then(m => ({ default: m.VisualizationPage })));
const ProductsPage = lazy(() => import("./components/ProductsPage").then(m => ({ default: m.ProductsPage })));
const ProductDetailsPage = lazy(() => import("./components/ProductDetailsPage").then(m => ({ default: m.ProductDetailsPage })));
const DealersLocatorPage = lazy(() => import("./components/DealersLocatorPage").then(m => ({ default: m.DealersLocatorPage })));
const ContactPage = lazy(() => import("./components/ContactPage").then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import("./components/FAQPage").then(m => ({ default: m.FAQPage })));
const SampleRequestPage = lazy(() => import("./components/SampleRequestPage").then(m => ({ default: m.SampleRequestPage })));
const BlogPage = lazy(() => import("./components/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogArticlePage = lazy(() => import("./components/BlogArticlePage").then(m => ({ default: m.BlogArticlePage })));
const ResourcesPage = lazy(() => import("./components/ResourcesPage").then(m => ({ default: m.ResourcesPage })));
const WarrantyPage = lazy(() => import("./components/WarrantyPage").then(m => ({ default: m.WarrantyPage })));
const TileQuizPage = lazy(() => import("./components/TileQuizPage").then(m => ({ default: m.TileQuizPage })));
const TilePatternBuilderPage = lazy(() => import("./components/TilePatternBuilderPage").then(m => ({ default: m.TilePatternBuilderPage })));
const ToolsPage = lazy(() => import("./components/ToolsPage").then(m => ({ default: m.ToolsPage })));
const PrivacyPolicyPage = lazy(() => import("./components/PrivacyPolicyPage").then(m => ({ default: m.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import("./components/TermsConditionsPage").then(m => ({ default: m.TermsConditionsPage })));
const SitemapPage = lazy(() => import("./components/SitemapPage").then(m => ({ default: m.SitemapPage })));
const NotFoundPage = lazy(() => import("./components/NotFoundPage").then(m => ({ default: m.NotFoundPage })));
const ComparePage = lazy(() => import("./components/ComparePage").then(m => ({ default: m.ComparePage })));
const DownloadCenterPage = lazy(() => import("./components/DownloadCenterPage").then(m => ({ default: m.DownloadCenterPage })));

export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Initialize security and performance on mount
  useEffect(() => {
    initializeSecurity();
    initializePerformance();
  }, []);

  // Track page views in localStorage
  useEffect(() => {
    if (currentPage !== "Home") {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.recentlyViewed);
        let recentPages = stored ? JSON.parse(stored) : [];
        
        // Remove duplicate and add to front
        recentPages = recentPages.filter((item: any) => item.page !== currentPage);
        recentPages.unshift({ page: currentPage, timestamp: Date.now() });
        
        // Keep only last 5
        recentPages = recentPages.slice(0, 5);
        
        localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(recentPages));
      } catch (e) {
        console.error("Failed to save recently viewed", e);
      }
    }
  }, [currentPage]);

  const handleNavigation = (page: string, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    // Smooth scroll to top on page change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "Home":
        return <HomePage onNavigate={handleNavigation} />;
      case "About":
        return <AboutPage onNavigate={handleNavigation} />;
      case "Collection":
        return <CollectionPage onNavigate={handleNavigation} />;
      case "Tools":
        return <ToolsPage onNavigate={handleNavigation} />;
      case "Tile Calculator":
        return <TileCalculator onNavigate={handleNavigation} />;
      case "Tile Pattern Builder":
        return <TilePatternBuilderPage onNavigate={handleNavigation} />;
      case "Visualization":
  return <VisualizationPage onNavigate={handleNavigation} />; // ✅

      case "Products":
        return <ProductsPage onNavigate={handleNavigation} />;
      case "Product Details":
        return <ProductDetailsPage onNavigate={handleNavigation} productId={selectedProductId} />;
      case "Dealers Locator":
  return <DealersLocatorPage onNavigate={handleNavigation} />;

      case "Contact":
        return <ContactPage onNavigate={handleNavigation} />;
      case "FAQ":
        return <FAQPage />;
      case "Sample Request":
        return <SampleRequestPage onNavigate={handleNavigation} />;
      case "Blog":
        return <BlogPage onNavigate={handleNavigation} />;
      case "Resources":
        return <ResourcesPage onNavigate={handleNavigation} />;
      case "Download Center":
        return <DownloadCenterPage onNavigate={handleNavigation} />;
      case "Warranty":
        return <WarrantyPage />;
      case "Tile Quiz":
        return <TileQuizPage onNavigate={handleNavigation} />;
      case "Privacy Policy":
        return <PrivacyPolicyPage />;
      case "Terms & Conditions":
      case "Terms and Conditions":
        return <TermsConditionsPage />;
      case "Sitemap":
        return <SitemapPage onNavigate={handleNavigation} />;
      case "Compare":
      case "Compare Products":
        return <ComparePage onNavigate={handleNavigation} />;
      case "404":
      case "Not Found":
        return <NotFoundPage onNavigate={handleNavigation} />;
      default:
        // Handle BlogArticle-{id} pages
        if (currentPage.startsWith("BlogArticle-")) {
          const articleId = parseInt(currentPage.replace("BlogArticle-", ""));
          return <BlogArticlePage articleId={articleId} onNavigate={handleNavigation} />;
        }
        return <NotFoundPage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressBar key={currentPage} />
      <AnnouncementBanner onNavigate={handleNavigation} />
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={currentPage}>
            <Suspense fallback={<LoadingState />}>
              {renderPage()}
            </Suspense>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigation} />
      <ScrollToTop />
      <QuickActions onNavigate={handleNavigation} />
      <CompareBar onNavigate={handleNavigation} />
      <LiveChatRealtime 
        agentName="Sarah Miller"
        agentTitle="Senior Tile Specialist"
        responseTime="Usually replies instantly"
      />
      <Toaster position="top-right" richColors />
    </div>
  );
}