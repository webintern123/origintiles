import { useState } from 'react';
import { Download, FileText, Award, Box, BookOpen, Shield, Wrench, Layers, FileCheck, Search, Star, Clock, TrendingUp, Users, X } from 'lucide-react';
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
    { icon: FileText, title: "50+ Resources", description: "Comprehensive library" },
    { icon: TrendingUp, title: "125K+ Downloads", description: "Trusted worldwide" },
    { icon: Users, title: "15K+ Professionals", description: "Active community" },
    { icon: Shield, title: "Always Updated", description: "Latest versions" }
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
        subtitle="Resources & Documentation"
        description="Access our complete library of product catalogs, technical specifications, installation guides, CAD/BIM files, and certificates. Everything you need for your project."
        icon={Download}
        variant="gradient"
        badge="50+ Resources • Free Downloads • Always Updated"
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

      {/* Search & Filter Section */}
      <section className="py-12 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
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
                Most Popular
              </Badge>
              <h2 className="text-white mb-4">Featured Downloads</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Our most downloaded resources trusted by architects, designers, and industry professionals worldwide.
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
                : 'Browse our complete library of resources and documentation'}
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
                                  {download.version && (
                                    <Badge variant="outline" className="text-xs">
                                      v{download.version}
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
                                <p className="text-xs text-neutral-500 mb-2">Includes collections:</p>
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
            <h2 className="text-white mb-4">Need Custom Documentation?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team can create custom technical specifications, project proposals, or specialized documentation for your specific requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={handleRequestQuote}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm [&_svg]:text-white"
              >
                Request Custom Documentation
              </Button>
              <Button
                size="lg"
                onClick={() => onNavigate('Contact')}
                className="bg-white text-[#223B57] hover:bg-white/90 [&_svg]:text-[#223B57]"
              >
                Contact Support
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
            <h2 className="text-[#223B57] mb-4">Download Help & FAQs</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Common questions about downloading and using our resources
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
                  <h3 className="text-[#223B57] mb-3">File Formats Explained</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    PDF for catalogs and guides, DWG/RVT for CAD/BIM files, and specialized formats for 3D modeling software.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('FAQ')}>
                    Learn More
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
                  <h3 className="text-[#223B57] mb-3">License & Usage Rights</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    All resources are free to download for personal and commercial projects. Attribution is appreciated but not required.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('Terms & Conditions')}>
                    View Terms
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
                  <h3 className="text-[#223B57] mb-3">Update Schedule</h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Resources are updated quarterly with new products, specifications, and improvements. Check back regularly for the latest versions.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => onNavigate('Contact')}>
                    Get Notifications
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
