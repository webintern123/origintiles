import { Menu, Search, Calculator, Eye, Lightbulb, BookOpen, FileText, HelpCircle, Package, MapPin, Shield} from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import logoImage from "../assets/logo.png";



// Adjust path depending on your file location

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";


interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mega Menu Structure
  const megaMenuItems = {
    tools: [
      { name: 'Tile Calculator', icon: Calculator, description: 'Calculate tiles needed for your project' },
      { name: 'Visualization', icon: Eye, description: '2D & 3D VR room visualizer' },
      { name: 'Tile Quiz', icon: Lightbulb, description: 'Find the perfect tile for you' },
    ],
    resources: [
      { name: 'Download Center', icon: FileText, description: 'Catalogs, specs & CAD files' },
      { name: 'Resources', icon: BookOpen, description: 'Installation guides & manuals' },
      { name: 'Blog', icon: FileText, description: 'Design tips & inspiration' },
      { name: 'FAQ', icon: HelpCircle, description: 'Frequently asked questions' },
    ],
    services: [
      { name: 'Sample Request', icon: Package, description: 'Order free tile samples' },
      { name: 'Dealers Locator', icon: MapPin, description: 'Find dealers near you' },
      { name: 'Warranty', icon: Shield, description: 'Register your warranty' },
    ],
  };

  const mobileNavItems = [
    "Home",
    "About",
    "Collection",
    "Tile Calculator",
    "Visualization",
    "Products",
    "Dealers Locator",
    "Contact",
    "FAQ",
    "Sample Request",
    "Download Center",
    "Blog",
    "Resources",
    "Warranty",
    "Tile Quiz"
  ];

  const handleNavClick = (item: string) => {
    onNavigate(item);
    setMobileMenuOpen(false);
  };

  const searchResults = searchQuery.length > 0 ? [
    { title: "BHL Ceramic Collection", type: "Collection", page: "Collection" },
    { title: "Tile Calculator", type: "Tool", page: "Tile Calculator" },
    { title: "Room Visualization", type: "Tool", page: "Visualization" },
    { title: "Product Catalog", type: "Products", page: "Products" },
    { title: "Find a Dealer", type: "Dealers", page: "Dealers Locator" },
    { title: "Contact Us", type: "Support", page: "Contact" },
    { title: "FAQ - Frequently Asked Questions", type: "Support", page: "FAQ" },
    { title: "Request Tile Samples", type: "Service", page: "Sample Request" },
    { title: "Download Center - Catalogs & CAD Files", type: "Resources", page: "Download Center" },
    { title: "Blog & Design Ideas", type: "Blog", page: "Blog" },
    { title: "Installation Resources", type: "Resources", page: "Resources" },
    { title: "Warranty Registration", type: "Support", page: "Warranty" },
    { title: "Tile Recommendation Quiz", type: "Tool", page: "Tile Quiz" },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-neutral-200/50 shadow-[0_4px_24px_rgba(34,59,87,0.08)]">
      {/* Premium Glassmorphism Navigation */}
      <div className="max-w-[1440px] mx-auto py-4" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
        <div className="flex items-center justify-between gap-8">
          <div className="cursor-pointer flex-shrink-0" onClick={() => onNavigate("Home")} role="button">
            <img 
              src={logoImage} 
              alt="Origin Tiles - Your First Step" 
              className="h-16 w-auto"
            />
          </div>

          <NavigationMenu className="hidden lg:flex flex-1 justify-center">
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <button
                  onClick={() => onNavigate("Home")}
                  className={`px-4 py-2 font-semibold whitespace-nowrap relative focus-ring-accent transition-all duration-300 ${
                    currentPage === "Home"
                      ? "text-[#223B57]"
                      : "text-neutral-600 hover:text-[#223B57]"
                  }`}
                >
                  Home
                  {currentPage === "Home" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.4)]"></span>
                  )}
                </button>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <button
                  onClick={() => onNavigate("About")}
                  className={`px-4 py-2 font-semibold whitespace-nowrap relative focus-ring-accent transition-all duration-300 ${
                    currentPage === "About"
                      ? "text-[#223B57]"
                      : "text-neutral-600 hover:text-[#223B57]"
                  }`}
                >
                  About
                  {currentPage === "About" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.4)]"></span>
                  )}
                </button>
              </NavigationMenuItem>

              {/* Collection */}
              <NavigationMenuItem>
                <button
                  onClick={() => onNavigate("Collection")}
                  className={`px-4 py-2 font-semibold whitespace-nowrap relative focus-ring-accent transition-all duration-300 ${
                    currentPage === "Collection"
                      ? "text-[#223B57]"
                      : "text-neutral-600 hover:text-[#223B57]"
                  }`}
                >
                  Collection
                  {currentPage === "Collection" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.4)]"></span>
                  )}
                </button>
              </NavigationMenuItem>

              {/* Products */}
              <NavigationMenuItem>
                <button
                  onClick={() => onNavigate("Products")}
                  className={`px-4 py-2 font-semibold whitespace-nowrap relative focus-ring-accent focus:outline-none !bg-transparent transition-all duration-300 ${
                    currentPage === "Products"
                      ? "text-[#223B57]"
                      : "text-neutral-600 hover:text-[#223B57]"
                  }`}
                >
                  Products
                  {currentPage === "Products" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.4)]"></span>
                  )}
                </button>
              </NavigationMenuItem>

              {/* Tools Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 font-semibold text-neutral-600 hover:text-[#223B57] hover:bg-[#223B57]/5 data-[state=open]:text-white data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#223B57] data-[state=open]:to-[#2d4a6a] data-[state=open]:shadow-lg transition-all duration-300 rounded-lg">
                  Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-8 bg-white/95 backdrop-blur-xl border border-neutral-100 shadow-[0_8px_32px_rgba(34,59,87,0.12)] rounded-2xl">
                    <div className="mb-6 pb-4 border-b border-neutral-200/70">
                      <h3 className="font-bold text-[#223B57] flex items-center gap-2 text-lg">
                        <span className="w-1 h-6 bg-gradient-to-b from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.3)]"></span>
                        Design & Planning Tools
                      </h3>
                    </div>
                    <div className="grid gap-2">
                      {megaMenuItems.tools.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onNavigate(item.name)}
                          className="flex items-start gap-4 w-full p-4 rounded-xl hover:bg-white/80 focus:bg-gradient-to-r focus:from-[#223B57] focus:to-[#2d4a6a] active:bg-gradient-to-r active:from-[#223B57] active:to-[#2d4a6a] border border-transparent hover:border-[#223B57]/20 focus:border-[#223B57] active:border-[#223B57] hover:shadow-lg focus:shadow-xl active:shadow-xl transition-all duration-300 text-left group focus:outline-none backdrop-blur-sm active:scale-[0.98]"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5F5F7] to-neutral-100 group-hover:from-[#223B57]/10 group-hover:to-[#2d4a6a]/10 group-focus:from-white group-focus:to-white group-active:from-white group-active:to-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-md group-hover:shadow-lg">
                            <item.icon className="w-6 h-6 text-[#223B57] group-focus:scale-110 group-active:scale-110 transition-transform" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[#223B57] mb-1 group-hover:text-[#223B57] group-focus:text-white group-active:text-white transition-colors">{item.name}</div>
                            <div className="text-sm text-neutral-600 group-focus:text-white/90 group-active:text-white/90 leading-relaxed">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Resources Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 font-semibold text-neutral-600 hover:text-[#223B57] hover:bg-[#223B57]/5 data-[state=open]:text-white data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#223B57] data-[state=open]:to-[#2d4a6a] data-[state=open]:shadow-lg transition-all duration-300 rounded-lg">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-8 bg-white/95 backdrop-blur-xl border border-neutral-100 shadow-[0_8px_32px_rgba(34,59,87,0.12)] rounded-2xl">
                    <div className="mb-6 pb-4 border-b border-neutral-200/70">
                      <h3 className="font-bold text-[#223B57] flex items-center gap-2 text-lg">
                        <span className="w-1 h-6 bg-gradient-to-b from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.3)]"></span>
                        Learning & Information
                      </h3>
                    </div>
                    <div className="grid gap-2">
                      {megaMenuItems.resources.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onNavigate(item.name)}
                          className="flex items-start gap-4 w-full p-4 rounded-xl hover:bg-white/80 focus:bg-gradient-to-r focus:from-[#223B57] focus:to-[#2d4a6a] active:bg-gradient-to-r active:from-[#223B57] active:to-[#2d4a6a] border border-transparent hover:border-[#223B57]/20 focus:border-[#223B57] active:border-[#223B57] hover:shadow-lg focus:shadow-xl active:shadow-xl transition-all duration-300 text-left group focus:outline-none backdrop-blur-sm active:scale-[0.98]"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5F5F7] to-neutral-100 group-hover:from-[#223B57]/10 group-hover:to-[#2d4a6a]/10 group-focus:from-white group-focus:to-white group-active:from-white group-active:to-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-md group-hover:shadow-lg">
                            <item.icon className="w-6 h-6 text-[#223B57] group-focus:scale-110 group-active:scale-110 transition-transform" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[#223B57] mb-1 group-hover:text-[#223B57] group-focus:text-white group-active:text-white transition-colors">{item.name}</div>
                            <div className="text-sm text-neutral-600 group-focus:text-white/90 group-active:text-white/90 leading-relaxed">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Services Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 font-semibold text-neutral-600 hover:text-[#223B57] hover:bg-[#223B57]/5 data-[state=open]:text-white data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#223B57] data-[state=open]:to-[#2d4a6a] data-[state=open]:shadow-lg transition-all duration-300 rounded-lg">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[480px] p-8 bg-white/95 backdrop-blur-xl border border-neutral-100 shadow-[0_8px_32px_rgba(34,59,87,0.12)] rounded-2xl">
                    <div className="mb-6 pb-4 border-b border-neutral-200/70">
                      <h3 className="font-bold text-[#223B57] flex items-center gap-2 text-lg">
                        <span className="w-1 h-6 bg-gradient-to-b from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.3)]"></span>
                        Customer Services
                      </h3>
                    </div>
                    <div className="grid gap-2">
                      {megaMenuItems.services.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => onNavigate(item.name)}
                          className="flex items-start gap-4 w-full p-4 rounded-xl hover:bg-white/80 focus:bg-gradient-to-r focus:from-[#223B57] focus:to-[#2d4a6a] active:bg-gradient-to-r active:from-[#223B57] active:to-[#2d4a6a] border border-transparent hover:border-[#223B57]/20 focus:border-[#223B57] active:border-[#223B57] hover:shadow-lg focus:shadow-xl active:shadow-xl transition-all duration-300 text-left group focus:outline-none backdrop-blur-sm active:scale-[0.98]"
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F5F5F7] to-neutral-100 group-hover:from-[#223B57]/10 group-hover:to-[#2d4a6a]/10 group-focus:from-white group-focus:to-white group-active:from-white group-active:to-white flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-md group-hover:shadow-lg">
                            <item.icon className="w-6 h-6 text-[#223B57] group-focus:scale-110 group-active:scale-110 transition-transform" strokeWidth={2} />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[#223B57] mb-1 group-hover:text-[#223B57] group-focus:text-white group-active:text-white transition-colors">{item.name}</div>
                            <div className="text-sm text-neutral-600 group-focus:text-white/90 group-active:text-white/90 leading-relaxed">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <button
                  onClick={() => onNavigate("Contact")}
                  className={`px-4 py-2 font-semibold whitespace-nowrap relative focus-ring-accent transition-all duration-300 ${
                    currentPage === "Contact"
                      ? "text-[#223B57]"
                      : "text-neutral-600 hover:text-[#223B57]"
                  }`}
                >
                  Contact
                  {currentPage === "Contact" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#223B57] to-[#2d4a6a] rounded-full shadow-[0_0_8px_rgba(34,59,87,0.4)]"></span>
                  )}
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex hover:bg-[#223B57]/10 hover:text-[#223B57] relative group transition-all duration-300 rounded-lg"
              onClick={() => setSearchOpen(true)}
              title="Search (⌘K)"
            >
              <Search className="icon-md text-neutral-600 group-hover:text-[#223B57] transition-colors" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-[#223B57] text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                ⌘K
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="icon-lg" />
            </Button>
          </div>
        </div>

        {/* Trend Navigation Bar */}

      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-left text-[var(--color-primary)]">Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 mt-8">
            {mobileNavItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`px-4 py-3 text-left rounded-lg transition-all ${
                  currentPage === item
                    ? "bg-[var(--color-bg-soft)] text-[var(--color-primary)]"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
          <div className="mt-8 pt-8 border-t border-neutral-200 space-y-3">
            <Button 
              variant="default" 
              className="w-full bg-[#223B57] text-white hover:bg-[#1a2d43]"
              onClick={() => {
                toast.success("Brochure download started!", {
                  description: "Your Origin Tiles brochure is downloading."
                });
              }}
            >
              Download Brochure
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-[var(--color-primary)]">Search</DialogTitle>
            <DialogDescription className="text-sm text-neutral-500">Search for products, collections, tools, and more.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search for products, collections, tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-lg pr-24"
                autoFocus
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                ESC to close
              </div>
            </div>
            {searchQuery.length > 0 ? (
              <div className="space-y-2 max-h-[400px] overflow-y-auto scroll-smooth scrollbar-thin">
                {searchResults.length > 0 ? (
                  searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onNavigate(result.page);
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="w-full text-left p-4 rounded-lg hover:bg-[var(--color-bg-soft)] transition-colors border border-neutral-200 hover:border-[#223B57]"
                    >
                      <div className="font-semibold text-[var(--color-primary)]">{result.title}</div>
                      <div className="text-sm text-neutral-600">{result.type}</div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-neutral-500">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Tile Calculator", page: "Tile Calculator" },
                    { label: "Visualize Room", page: "Visualization" },
                    { label: "Browse Products", page: "Products" },
                    { label: "Find Dealers", page: "Dealers Locator" },
                  ].map((action) => (
                    <button
                      key={action.page}
                      onClick={() => {
                        onNavigate(action.page);
                        setSearchOpen(false);
                      }}
                      className="p-3 text-left rounded-lg bg-neutral-50 hover:bg-[var(--color-bg-soft)] transition-colors border border-neutral-200 hover:border-[#223B57]"
                    >
                      <div className="text-sm font-medium text-[var(--color-primary)]">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}