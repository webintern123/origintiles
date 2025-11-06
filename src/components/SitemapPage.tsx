import { Map, Home, Info, Package, Calculator, Eye, Lightbulb, MapPin, FileText, HelpCircle, Building2, Shield, Briefcase, Mail  } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { PageBanner } from "./PageBanner";
import { ScrollReveal, StaggerChildren } from "./ScrollReveal";
import { Button } from "./ui/button";

interface SitemapPageProps {
  onNavigate: (page: string) => void;
}

export function SitemapPage({ onNavigate }: SitemapPageProps) {
  const siteStructure = [
    {
      category: "Main",
      icon: Home,
      color: "#223B57",
      pages: [
  { name: "Home", url: "/", page: "Home", icon: Home },
  { name: "About Us", url: "/about", page: "About Us", icon: Info },
  { name: "Contact Us", url: "/contact", page: "Contact", icon: Mail },
  { name: "FAQs", url: "/faq", page: "FAQ", icon: HelpCircle }
]

    },
    {
      category: "Tools & Calculators",
      icon: Calculator,
      color: "#223B57",
      pages: [
        { name: "Tile Calculator", icon: Calculator, page: "Tile Calculator" },
        { name: "Room Visualization", icon: Eye, page: "Visualization" },
        { name: "Tile Recommendation Quiz", icon: Lightbulb, page: "Tile Quiz" },
      ]
    },
    {
      category: "Resources & Learning",
      icon: FileText,
      color: "#7B8B78",
      pages: [
        { name: "Download Center", icon: FileText, page: "Download Center" },
        { name: "Resources & Guides", icon: FileText, page: "Resources" },
        { name: "Blog", icon: FileText, page: "Blog" },
        { name: "FAQ", icon: HelpCircle, page: "FAQ" },
      ]
    },
    {
      category: "Services",
      icon: Briefcase,
      color: "#223B57",
      pages: [
        { name: "Sample Request", icon: Package, page: "Sample Request" },
        { name: "Dealers Locator", icon: MapPin, page: "Dealers Locator" },
        { name: "Warranty Registration", icon: Shield, page: "Warranty" },
      ]
    },
    {
      category: "Company",
      icon: Building2,
      color: "#7B8B78",
      pages: [
        { name: "Privacy Policy", icon: Shield, page: "Privacy Policy" },
        { name: "Terms & Conditions", icon: FileText, page: "Terms & Conditions" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <PageBanner
        title="Sitemap"
        subtitle="Navigate Our Website"
        description="Explore all pages and find exactly what you're looking for"
        icon={Map}
        variant="gradient"
      />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Welcome to the Origin Tiles sitemap. Browse through all our pages organized by category 
              to quickly find the information or tools you need.
            </p>
          </div>
        </ScrollReveal>

        {/* Sitemap Grid */}
        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteStructure.map((section, idx) => (
            <Card key={idx} className="border-[#223b57]/10 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#223b57]/10">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${section.color}15` }}
                  >
                    <section.icon className="w-5 h-5" style={{ color: section.color }} />
                  </div>
                  <h3 className="font-bold text-[#223b57]">{section.category}</h3>
                </div>

                {/* Page Links */}
                <div className="space-y-2">
                  {section.pages.map((page, pageIdx) => (
                    <button
                      key={pageIdx}
                      onClick={() => onNavigate(page.page)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#223b57]/5 transition-colors text-left group"
                    >
                      <page.icon className="w-4 h-4 text-neutral-500 group-hover:text-[#223B57] transition-colors" />
                      <span className="text-[#223b57] group-hover:text-[#223B57] transition-colors">
                        {page.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </StaggerChildren>

        {/* Quick Stats */}
        <ScrollReveal delay={0.3}>
          <Card className="mt-12 border-[#223b57]/10">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#223B57] mb-2">24+</div>
                  <div className="text-sm text-neutral-600">Total Pages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#223B57] mb-2">6</div>
                  <div className="text-sm text-neutral-600">Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#223B57] mb-2">3</div>
                  <div className="text-sm text-neutral-600">Interactive Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#223B57] mb-2">4</div>
                  <div className="text-sm text-neutral-600">Brand Collections</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Help Section */}
        <ScrollReveal delay={0.4}>
          <Card className="mt-8 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="mb-6 text-white">Can't Find What You're Looking For?</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                Use our search feature or contact our customer support team for assistance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  className="bg-[#223B57] hover:bg-[#1B3048] text-white"
                  onClick={() => onNavigate("Contact")}
                >
                  Contact Support
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => onNavigate("FAQ")}
                >
                  View FAQ
                </Button>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  );
}