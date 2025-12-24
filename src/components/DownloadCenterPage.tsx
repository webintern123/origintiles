import { useState } from 'react';
import { Download, FileText, Award, Box,CheckCircle2,ArrowRight, BookOpen,Target,ShieldCheck,RefreshCcw, Shield, Wrench, Layers, FileCheck, Search, Star, Clock, TrendingUp, Users, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

import { Input } from './ui/input';
import { PageBanner } from './PageBanner';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  downloads, 
  getFeaturedDownloads, 
  getDownloadsByCategory, 

  getDownloadCategories,
  formatDownloads,
  type DownloadCategory,
  type Download as DownloadType
} from '../data/downloads';

interface DownloadCenterPageProps {
  onNavigate: (page: string) => void;
}

export function DownloadCenterPage({ onNavigate }: DownloadCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DownloadCategory | 'all'>('all');
  

  const featuredDownloads = getFeaturedDownloads();

  const categories = getDownloadCategories();

  const handleDownload = (download: DownloadType) => {
    toast.success('Download started!', {
      description: `Downloading ${download.title}`
    });
    // In production, this would trigger actual file download
    // window.open(download.fileUrl, '_blank');
  };

  const handleRequestQuote = () => {
    onNavigate('Contact');
  };

  // Filter downloads based on search and category
  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = searchQuery === '' || 
      download.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      download.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      download.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || download.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { icon: FileText, title: "50+ All Resources", description: "A wide range of useful documents" },
    { icon: TrendingUp, title: "125K+ Total Downloads", description: "Trusted by users across projects" },
    { icon: Users, title: "15K+ Professionals", description: "Used by architects, builders, and designers" },
    { icon: Shield, title: "Up-to-Date Regularly Updates", description: "Access the latest versions anytime" }
  ];

  const getCategoryIcon = (category: DownloadCategory) => {
    const icons: Record<DownloadCategory, typeof FileText> = {
      "Product Catalog": BookOpen,
      "Technical Specifications": FileText,
      "Installation Guide": Wrench,
      "Maintenance Guide": Shield,
      "Brochure": Layers,
      "Certificate": Award,
      "CAD/BIM Files": Box,
      "Warranty Document": FileCheck
    };
    return icons[category] || FileText;
  };

  const getFormatColor = (format: string) => {
    const colors: Record<string, string> = {
      "PDF": "bg-red-100 text-red-700 border-red-200",
      "ZIP": "bg-purple-100 text-purple-700 border-purple-200",
      "DWG": "bg-blue-100 text-blue-700 border-blue-200",
      "RVT": "bg-green-100 text-green-700 border-green-200",
      "SKP": "bg-orange-100 text-orange-700 border-orange-200",
      "3DS": "bg-pink-100 text-pink-700 border-pink-200"
    };
    return colors[format] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Download Center"
        subtitle="Resources & Documentation Library"
        description="Explore our complete collection of product catalogues, technical details, installation guides, certificates, and reference files - all in one place to support your project needs."
       
        variant="gradient"
        badge="50+ Resources | Free to Download | Regularly Updated"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Download Center" }
        ]}
      />

      {/* Stats Bar */}
      <section className="relative -mt-20 z-10 mb-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-3">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <stat.icon className="w-6 h-6 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="font-semibold text-[#223B57] mb-1">{stat.title}</div>
                    <div className="text-xs text-neutral-600">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE US === */}
          <section className="py-20 bg-white">
                  <div className="container">
                    <motion.div
                      className="text-center mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
                        <Target className="w-3 h-3 mr-1" />
                            Everything You Need at Your Fingertips
                      </Badge>
                      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                        Why Download? 
                      </h2>
                      <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                        Access essential product information, technical details, and support documents anytime to plan your project with confidence.
                      </p>
                    </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {[
  {
    icon: Download, // Instant access
    title: "Instant Access",
    description: "Download catalogues, technical sheets, and guides anytime — no waiting required."
  },
  {
    icon: ShieldCheck, // Official & verified
    title: "Official & Verified Documents",
    description: "Authentic certifications and accurate technical information you can trust."
  },
  {
    icon: RefreshCcw, // Latest versions
    title: "Latest Versions Available",
    description: "Always access the most current specifications and updates."
  },
  {
    icon: FileText, // Professional-grade files
    title: "Professional-Grade Files",
    description: "Clear, high-quality PDFs suitable for sharing, presentations, and proposals."
  }
]
.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
                  {/* Glassmorphism Border */}
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
      
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
                  <CardContent className="relative p-8 text-center">
                    <div className="relative inline-block mb-6">
                      {/* Icon Background with Glass Effect */}
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <item.icon className="w-10 h-10 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[#223B57]">{item.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{item.description}</p>
                  </CardContent>
      
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#223B57]/20 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === ALL IN ONE PLACE – RESOURCE OVERVIEW === */}
<section className="py-20 bg-[#F5F3F0]">
  <div className="container max-w-6xl">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
        All in One Place
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
        Access Resources & Documentation
      </h2>
      <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
        Find all Origin Tiles resources neatly organised to help you quickly access
        the information you need for planning, specification, and execution.
      </p>
    </motion.div>

    {/* Browse by Resource Type */}
    <div className="mb-20">
      <h3 className="text-2xl font-bold text-[#223B57] mb-8 text-center">
        Browse by Resource Type
      </h3>
       <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-4">
       Explore documents by category for faster access:
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Product Catalogues",
            desc: "Complete tile collections with sizes, finishes, and application details.",
            count: "2 Resources"
          },
          {
            title: "Product Brochures",
            desc: "Quick overviews highlighting key designs, collections, and features.",
            count: "2 Resources"
          },
          {
            title: "Technical Specifications & Datasheets",
            desc: "Detailed product information, performance standards, and usage guidelines.",
            count: "2 Resources"
          },
          {
            title: "Certifications & Compliance Documents",
            desc: "Official quality certifications and compliance-related documents.",
            count: "2 Resources"
          },
          {
            title: "Installation Guides",
            desc: "Step-by-step instructions and best practices for proper installation.",
            count: "3 Resources"
          },
          {
            title: "CAD, BIM & 3D Model Files",
            desc: "Technical drawings and models for architectural planning.",
            count: "3 Resources"
          },
          {
            title: "Video Resources",
            desc: "Helpful videos covering installation tips and product usage.",
            count: "2 Resources"
          },
          {
            title: "Maintenance Guides",
            desc: "Easy-to-follow care and cleaning guides to help maintain tile appearance and performance over time.",
            count: "2 Resources"
          },
          {
            title: "Warranty Documents",
            desc: "Official warranty coverage, terms, and product assurance details.",
            count: "2 Resources"
          },
          
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="font-semibold text-[#223B57] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-neutral-600 mb-4">
                  {item.desc}
                </p>
                <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
                  {item.count}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

    {/* === SEARCH, POPULAR & FEATURED CARDS === */}
    
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* Search & Filter Downloads */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  ><br></br>
    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h4 className="font-semibold text-[#223B57] mb-3">
          Search & Filter Downloads
        </h4>
        <p className="text-sm text-neutral-600 mb-4">
          Use search and filters to quickly find documents by: Resource type,	Collection,Application

        </p>
        
      </CardContent>
    </Card>
  </motion.div>

  {/* Most Popular Downloads */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.05 }}
  >
    <br></br>
    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h4 className="font-semibold text-[#223B57] mb-3">
          Most Popular Downloads
        </h4>
        <p className="text-sm text-neutral-600 mb-4">
          Quick access to frequently downloaded catalogues and technical documents.
        </p>
        <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
          8 Resources
        </Badge>
      </CardContent>
    </Card>
  </motion.div>

  {/* Featured Catalogues & Brochures */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
  >
    <br></br>
    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <h4 className="font-semibold text-[#223B57] mb-3">
          Featured Catalogues & Brochures
        </h4>
        <p className="text-sm text-neutral-600 mb-4">
          Highlighted resources to help you explore our latest collections and updates.
        </p>
        <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
          8 Resources
        </Badge>
      </CardContent>
    </Card>
  </motion.div>

</div>


  </div>
</section>


      {/* Search & Filter Section */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
            
          >
            {/* Search Section Heading */}
<div className="text-center mb-8">

  <Badge className="mb-3 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
    Find What You Need
  </Badge>

  <h2 className="text-3xl md:text-3xl font-bold text-[#223B57] mb-2">
    Search & Filter Downloads
  </h2>

  <p className="text-base text-neutral-600 max-w-2xl mx-auto">
    Easily locate the right documents using quick search and simple filters
  </p>

</div>

            
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search catalogs, guides, specifications, CAD files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-12 h-14 text-base border-2 border-neutral-200 focus:border-[#223B57] rounded-2xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className="rounded-full"
              >
                All Resources
                <Badge className="ml-2 bg-white/20 text-white border-0">
                  {downloads.length}
                </Badge>
              </Button>
              {categories.map((category) => {
                const count = getDownloadsByCategory(category).length;
                const Icon = getCategoryIcon(category);
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category}
                    <Badge className={selectedCategory === category ? "ml-2 bg-white/20 text-white border-0" : "ml-2 bg-[#223B57]/10 text-[#223B57] border-0"}>
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>

            {/* Active Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-neutral-600">Active filters:</span>
                {searchQuery && (
                  <Badge variant="outline" className="gap-2">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-[#223B57]">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'all' && (
                  <Badge variant="outline" className="gap-2">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-[#223B57]">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="h-7 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Downloads */}
      {selectedCategory === 'all' && !searchQuery && (
        <section className="py-20 bg-gradient-to-br from-[#223B57] to-[#1a2d43]">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-amber-400 text-[#223B57] border-0">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Downloads
              </Badge>
              <h2 className="text-white mb-4">Featured Resources</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Explore our most downloaded documents, widely used by architects, designers, and industry professionals for planning and execution.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredDownloads.slice(0, 4).map((download, index) => {
                const Icon = getCategoryIcon(download.category);
                return (
                  <motion.div
                    key={download.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="relative border-0 shadow-xl overflow-hidden bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          {/* Thumbnail */}
                          <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                            <img 
                              src={download.thumbnailUrl} 
                              alt={download.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/80 to-transparent flex items-end justify-center pb-2">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-[#223B57] mb-1 line-clamp-2">{download.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge className={`border ${getFormatColor(download.format)} text-xs`}>
                                    {download.format}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {download.fileSize}
                                  </Badge>
                                  {download.pages && (
                                    <Badge variant="outline" className="text-xs">
                                      {download.pages} pages
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Badge className="bg-amber-100 text-amber-700 border-amber-200 flex-shrink-0">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Featured
                              </Badge>
                            </div>

                            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                              {download.description}
                            </p>

                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-4 text-xs text-neutral-500">
                                <span className="flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  {formatDownloads(download.downloads)}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(download.lastUpdated).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => handleDownload(download)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Downloads Grid */}
      <section className="py-20">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            {/* Search Section Heading */}
<div className="text-center mb-8">

  <Badge className="mb-3 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
    All Downloads
  </Badge>

  <h2 className="text-3xl md:text-3xl font-bold text-[#223B57] mb-2">
    Complete Resource Library (17 Resources)
  </h2>

  <p className="text-base text-neutral-600 max-w-2xl mx-auto">
    Browse the full collection of Origin Tiles documents, guides, and technical files to support planning, specification, installation, and maintenance.
  </p>

</div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#223B57]">
                {searchQuery || selectedCategory !== 'all' ? 'Search Results' : 'All Downloads'}
              </h2>
              <span className="text-sm text-neutral-600">
                {filteredDownloads.length} {filteredDownloads.length === 1 ? 'resource' : 'resources'}
              </span>
            </div>
            <p className="text-neutral-600">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Showing filtered results based on your criteria'
                : 'Product Catalogues & Lookbooks'}
            </p>
          </motion.div>

          {filteredDownloads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-neutral-400" />
              </div>
              <h3 className="text-[#223B57] mb-3">No downloads found</h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                We couldn't find any downloads matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {filteredDownloads.map((download, index) => {
                const Icon = getCategoryIcon(download.category);
                return (
                  <motion.div
                    key={download.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm group">
                      <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Thumbnail */}
                          <div className="relative md:w-48 flex-shrink-0">
                            <div className="relative h-40 md:h-full rounded-2xl overflow-hidden">
                              <img 
                                src={download.thumbnailUrl} 
                                alt={download.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#223B57]/90 via-[#223B57]/40 to-transparent flex items-end justify-center pb-4">
                                <div className="text-center">
                                  <Icon className="w-8 h-8 text-white mx-auto mb-2" />
                                  <Badge className={`border ${getFormatColor(download.format)}`}>
                                    {download.format}
                                  </Badge>
                                </div>
                              </div>
                              {download.featured && (
                                <Badge className="absolute top-3 right-3 bg-amber-400 text-[#223B57] border-0 shadow-lg">
                                  <Star className="w-3 h-3 mr-1 fill-current" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                              <div className="flex-1">
                                <h3 className="text-[#223B57] mb-2">{download.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                  <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 text-xs">
                                    {download.category}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {download.fileSize}
                                  </Badge>
                                  {download.pages && (
                                    <Badge variant="outline" className="text-xs">
                                      {download.pages} pages
                                    </Badge>
                                  )}
                                  {download.lastUpdated && (
                                    <Badge variant="outline" className="text-xs">
                                      Updated {download.lastUpdated}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                              {download.description}
                            </p>

                            {download.collections && download.collections.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs text-neutral-500 mb-2">Includes:</p>
                                <div className="flex flex-wrap gap-2">
                                  {download.collections.slice(0, 3).map((collection) => (
                                    <Badge key={collection} variant="outline" className="text-xs">
                                      {collection}
                                    </Badge>
                                  ))}
                                  {download.collections.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{download.collections.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}

                            {download.tags && download.tags.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                  {download.tags.slice(0, 4).map((tag) => (
                                    <Badge key={tag} variant="outline" className="bg-neutral-50 text-neutral-600 border-neutral-200 text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                              <div className="flex items-center gap-4 text-xs text-neutral-500">
                                <span className="flex items-center gap-1">
                                  <Download className="w-3 h-3" />
                                  {formatDownloads(download.downloads)} downloads
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Updated {new Date(download.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              </div>
                              <Button
                                onClick={() => handleDownload(download)}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download Free
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#223B57] to-[#1a2d43]">
        <div className="container max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white mb-4">Looking for Something Specific?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              If you’re unable to find the document you need, our team is here to help. We can provide customised technical details, project-specific documentation, or any additional information required for your work.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={handleRequestQuote}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm [&_svg]:text-white"
              >
                Request Custom Documents
              </Button>
              <Button
                size="lg"
                onClick={() => onNavigate('Contact')}
                className="bg-white text-[#223B57] hover:bg-white/90 [&_svg]:text-[#223B57]"
              >
                Get Support
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#223B57] mb-4">Download Support & FAQs</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Helpful answers for using our resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-[#223B57]" />
                  </div>
                  <h3 className="text-[#223B57] mb-3">File Types & Formats</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Our catalogues and guides are provided as PDFs. Technical drawings are available in DWG and RVT formats, while 3D files are shared in standard modelling formats.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('FAQ')}>
                    Know More 
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-[#223B57]" />
                  </div>
                  <h3 className="text-[#223B57] mb-3">Usage & Permissions</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    All documents are free to download and can be used for both personal and professional projects. Mentioning Origin Tiles is appreciated, but not required.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('Terms & Conditions')}>
                    View Details 
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-[#223B57]" />
                  </div>
                  <h3 className="text-[#223B57] mb-3">Update Information</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Documents are reviewed and updated every quarter to reflect new products and revised specifications. Check back often to stay up to date.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('Contact')}>
                    Get Update Notifications 
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

       {/* === FAQ QUICK SECTION - Top Questions === */}
                 <section className="section-padding bg-[#F5F3F0]">
                   <div className="container">
                     <motion.div
                       className="text-center mb-12"
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                     >
                       <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                         Download Center FAQs
                       </h2>
                       <p className="text-lg text-neutral-600">
                         Quick answers to help you access and use our resource library with ease.
                       </p>
                     </motion.div>
           
                     <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                       {[
                         {
                           icon: CheckCircle2,
                           question: "Are all downloads free to access?",
                           answer: "Yes, All documents in our Download Center are available at no cost for both personal and professional use."
                         },
                         {
                           icon:  CheckCircle2,
                           question: "How frequently are resources updated?",
                           answer: "Resources are reviewed and updated regularly to reflect new products, technical updates, and improvements."
                         },
                         {
                           icon: CheckCircle2,
                           question: "What file formats can I download?",
                           answer: "Most catalogues and guides are provided as PDFs. Technical drawings are available in DWG and RVT formats, and 3D files are offered in standard modelling formats."
                         },
                         {
                           icon: CheckCircle2,
                           question: "Can I share downloaded files with others?",
                           answer: "Yes, You may share the resources within your project team or with clients. Commercial resale is not permitted."
                         },
                         {
                           icon: CheckCircle2,
                           question: "Can I request custom documents?",
                           answer: "Yes, If you need project-specific or customised documentation, our team can assist you."
                         },
                          {
                           icon: CheckCircle2,
                           question: "Need help finding the right resource?",
                           answer: "Our support team is happy to help you locate the documents you need."
                         },
                         
                        
                       ].map((faq, index) => (
                         <motion.div
                           key={index}
                           className="group"
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                         >
                           {/* Glassmorphism FAQ Card */}
                           <div className="relative h-full">
                             {/* Glow Effect */}
                             <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                             
                             <Card className="relative border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden h-full">
                               {/* Glassmorphism Border */}
                               <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
                               
                               <CardContent className="relative p-6">
                                 <div className="flex items-start gap-4">
                                   <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-300 border border-[#223B57]/10 shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1">
                                     <faq.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-300 group-hover:scale-110" />
                                   </div>
                                   <div>
                                     <h3 className="font-bold text-[#223B57] mb-2 group-hover:text-[#2d4a6a] transition-colors">{faq.question}</h3>
                                     <p className="text-neutral-600 text-sm leading-relaxed">{faq.answer}</p>
                                   </div>
                                 </div>
                               </CardContent>
                               
                               {/* Shine Effect */}
                               <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
                             </Card>
                           </div>
                         </motion.div>
                       ))}
                     </div>
           
                     <motion.div
                       className="text-center"
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                     >
                       <Button
                         onClick={() => onNavigate("Contact")}
                         variant="outline"
                         size="lg"
                         className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white"
                       >
                        Contact Support Team 
                         <ArrowRight className="ml-2 w-5 h-5 group-hover:text-white" />
                       </Button>
                     </motion.div>
                   </div>
                 </section>

            {/* === STAY UPDATED CTA SECTION === */}
<section className="py-20 bg-[#F5F3F0]">
  <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>

      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
        
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative">
          {/* Badge */}
          <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
            Stay Updated
          </Badge>

          {/* Heading */}
          <h2 className="text-white text-4xl font-bold mb-4">
            Get Notified About New Resources
          </h2>

          {/* Description */}
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
            Receive updates whenever new catalogues, technical sheets,
            certifications, or installation guides are added to our library.
          </p>

        
          {/* Email Input */}
<div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-6">
  
  <Input
    type="email"
    placeholder="Enter your email address"
    className="
      h-14
      px-6
      rounded-xl
      border-0
      bg-white/95
      text-[#223B57]
      text-base
      placeholder:text-neutral-400
      placeholder:text-sm
      focus-visible:ring-2
      focus-visible:ring-white
      flex-1
    "
  />

  <Button
    variant="outline"
    className="
      h-12
      sm:h-14
      px-8
      rounded-xl
      bg-white/10
      backdrop-blur-md
      text-white
      border-white/30
      hover:bg-white/20
      font-semibold
      transition-all
      duration-300
      whitespace-nowrap
    "
  >
    Notify Me →
  </Button>

</div>


          {/* Trust Line */}
          <p className="text-sm text-white/80">
            Join <span className="font-semibold text-white">5,000+</span> professionals
            &nbsp;|&nbsp; Quick updates &nbsp;|&nbsp; Unsubscribe anytime
          </p>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      
    </div>
  );
}
