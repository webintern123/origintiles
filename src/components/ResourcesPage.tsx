import { Download, Video, FileText, Play, ArrowRight, CheckCircle2, TrendingUp, Users, Search, Sparkles, Clock, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageBanner } from './PageBanner';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { resources, getFeaturedResources, getResourcesByCategory } from '../data/resources';

interface ResourcesPageProps {
  onNavigate: (page: string) => void;
}

export function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const featuredResources = getFeaturedResources();
  const installationResources = getResourcesByCategory('Installation');
  const maintenanceResources = getResourcesByCategory('Maintenance');
  const catalogResources = getResourcesByCategory('Catalog');

  const handleDownload = (title: string) => {
    toast.success('Download started!', {
      description: `Downloading ${title}`
    });
  };

  const stats = [
    { icon: FileText, title: "10+ Resources Available ", description: " Guides, manuals, and reference materials " },
    { icon: Video, title: "Video Tutorials", description: "Easy step-by-step instructions" },
    { icon: TrendingUp, title: "75K+ Downloads", description: "Trusted by professionals across projects" },
    { icon: Users, title: "Expert Support", description: "Help from experienced specialists" }
  ];

  const categories = [
    { id: 'all', label: 'All Resources', count: resources.length },
    { id: 'installation', label: 'Installation', count: installationResources.length },
    { id: 'maintenance', label: 'Maintenance', count: maintenanceResources.length },
    { id: 'catalog', label: 'Catalogs', count: catalogResources.length },
    { id: 'technical', label: 'Technical', count: getResourcesByCategory('Technical').length }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Installation Guides & Knowledge Center"
        subtitle="Resources Hub"
        description="Find clear and practical information on tile installation, care, and maintenance. Access free guides, videos, and expert tips designed to support your project from start to finish."
       
        variant="gradient"
        badge="10+ Helpful Resources | Video Guides | Expert Assistance"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Resources" }
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

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2 border-0">
              Most Viewed Resources
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Popular Guides & Tutorials
            </h2>
            <p className="text-neutral-600 text-lg">
              Explore our most accessed guides and videos, trusted by professionals and homeowners alike.
            </p>
          </motion.div>

         <div className="grid grid-cols-4 gap-8">

            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl group h-full">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Thumbnail */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                    <ImageWithFallback
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {resource.fileType === 'Video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-[#223B57] ml-1" />
                        </div>
                      </div>
                    )}
                    <Badge className="absolute top-3 right-3 bg-[#223B57] text-white border-0">
                      {resource.fileType}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <Badge className="mb-3 bg-[#223B57]/10 text-[#223B57] border-0">
                      {resource.category}
                    </Badge>
                    <h3 className="font-bold text-[#223B57] text-lg mb-2 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    {resource.fileSize && (
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-4">
                        <span>{resource.fileSize}</span>
                        <span>•</span>
                        <span>{resource.downloads.toLocaleString()} downloads</span>
                      </div>
                    )}

                    <Button
                      onClick={() => handleDownload(resource.title)}
                      className="w-full bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {resource.fileType}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources by Category */}
     <section className="py-20 bg-[#F5F3F0]">
  <div className="container max-w-6xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      {/* Main Heading */}
      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        Explore All Resources
      </h2>

      {/* Sub Heading */}
      <p className="text-xl font-semibold text-[#223B57] mb-4">
        Use Filters To Quickly Find What You’re Looking For
      </p>

      {/* Description */}
      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
        Browse our complete library of guides, catalogues, technical documents, and videos.
        Use category filters to narrow down resources based on your needs.
      </p>
    </motion.div>
  

          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white"
                >
                  {category.label}
                  <Badge className="ml-2 bg-white/20 text-inherit border-0">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden group">
                      <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-neutral-50 to-neutral-100">
                            <ImageWithFallback
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {resource.fileType === 'Video' && (
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <Badge className="bg-[#223B57]/10 text-[#223B57] border-0 shrink-0">
                                {resource.category}
                              </Badge>
                              <Badge variant="outline" className="border-neutral-300 text-neutral-600 shrink-0">
                                {resource.fileType}
                              </Badge>
                            </div>
                            
                            <h4 className="font-semibold text-[#223B57] mb-2 leading-tight">
                              {resource.title}
                            </h4>
                            
                            <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                              {resource.description}
                            </p>

                            {resource.fileSize && (
                              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                                <span>{resource.fileSize}</span>
                                <span>•</span>
                                <span>{resource.downloads.toLocaleString()} downloads</span>
                              </div>
                            )}

                            <Button
                              onClick={() => handleDownload(resource.title)}
                              size="sm"
                              variant="outline"
                              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white rounded-xl"
                            >
                              <Download className="w-3.5 h-3.5 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="installation">
              <div className="grid md:grid-cols-2 gap-6">
                {installationResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#223B57] mb-2">{resource.title}</h4>
                            <p className="text-sm text-neutral-600 mb-3">{resource.description}</p>
                            <Button
                              onClick={() => handleDownload(resource.title)}
                              size="sm"
                              variant="outline"
                              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white rounded-xl"
                            >
                              <Download className="w-3.5 h-3.5 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maintenance">
              <div className="grid md:grid-cols-2 gap-6">
                {maintenanceResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#223B57] mb-2">{resource.title}</h4>
                            <p className="text-sm text-neutral-600 mb-3">{resource.description}</p>
                            <Button
                              onClick={() => handleDownload(resource.title)}
                              size="sm"
                              variant="outline"
                              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white rounded-xl"
                            >
                              <Download className="w-3.5 h-3.5 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="catalog">
              <div className="grid md:grid-cols-2 gap-6">
                {catalogResources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#223B57] mb-2">{resource.title}</h4>
                            <p className="text-sm text-neutral-600 mb-3">{resource.description}</p>
                            <Button
                              onClick={() => handleDownload(resource.title)}
                              size="sm"
                              variant="outline"
                              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white rounded-xl"
                            >
                              <Download className="w-3.5 h-3.5 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="technical">
              <div className="grid md:grid-cols-2 gap-6">
                {getResourcesByCategory('Technical').map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={resource.thumbnail}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#223B57] mb-2">{resource.title}</h4>
                            <p className="text-sm text-neutral-600 mb-3">{resource.description}</p>
                            <Button
                              onClick={() => handleDownload(resource.title)}
                              size="sm"
                              variant="outline"
                              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57] hover:text-white rounded-xl"
                            >
                              <Download className="w-3.5 h-3.5 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2 border-0">
              Easy Access
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg">
              Get the information you need in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Search,
                title: "Find the Right Resource",
                description: "Browse through guides, catalogues, videos, and technical documents using categories or search."
              },
              {
                step: "02",
                icon: FileText,
                title: "Check the Details",
                description: "Review file information such as size, format, and popularity before downloading."
              },
              {
                step: "03",
                icon: Download,
                title: "Download and Use",
                description: "Download resources instantly at no cost and use them for planning, installation, or maintenance."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl group h-full">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-[#223B57]/10 mb-4">
                      {step.step}
                    </div>
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <step.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#223B57] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Our Resources Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#223B57]/10 mb-6">
              <Sparkles className="w-8 h-8 text-[#223B57]" />
            </div>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Why Use Our Resources?
            </h2>
            <p className="text-neutral-600 text-lg">
              Reliable knowledge you can count on
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Professionally Prepared",
                description: "All guides and videos are developed with input from experienced tile professionals."
              },
              {
                icon: Download,
                title: "Free to Access",
                description: "No sign-ups or charges. Download as many resources as you need, anytime."
              },
              {
                icon: Clock,
                title: "Regularly Updated",
                description: "Content is refreshed to reflect current installation methods and best practices."
              },
              {
                icon: Shield,
                title: "Accuracy You Can Trust",
                description: "Each resource is checked for correctness and aligned with recognised installation standards."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden h-full border-l-4 border-l-[#223B57]">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center">
                          <benefit.icon className="w-6 h-6 text-[#223B57]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#223B57] mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Installation Made Easy
            </h2>
            <p className="text-neutral-600 text-lg">
              Practical tips for better results 
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Preparing the Surface',
                tips: [
                  'Make sure the surface is clean, dry, and even',
'Remove dust, loose particles, or old adhesive',
'	Apply a primer if required for better bonding',
'	Check & fix any moisture issues before tiling.',

                ]
              },
              {
                title: 'Planning the Tile Layout',
                tips: [
                  'Begin layout from the centre of the room',
'	Do a trial layout before fixing tiles permanently',
'Use spacers to maintain even grout gaps',
'	Plan tile cuts to avoid very thin edge pieces.',

                ]
              },
              {
                title: 'Finishing & Grouting',
                tips: [
                  'Wait at least 24 hours after laying tiles',
'Remove extra grout using a diagonal motion',
'	Clean tile surfaces with a damp sponge regularly',
'	Seal the grout after it has fully cured.',
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden h-full border-l-4 border-l-[#223B57]">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-[#223B57] mb-4">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#223B57] mt-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* From Learning to Application Section */}
<section className="py-20 bg-[#F5F3F0]">
  <div className="container max-w-5xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2 border-0">
       Turn knowledge into Confident Execution
      </Badge>
      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        From Learning to Application
      </h2>
      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
        Our resources are designed to help you move from understanding to action. Whether you’re planning, installing, or maintaining tiles, our guides and tools support every step of your project.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Learn best practices through clear guides and videos",
        "Apply techniques correctly on-site",
        "Avoid common installation mistakes",
        "Achieve better, long-lasting results"
      ].map((point, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden h-full border-l-4 border-l-[#223B57]">
  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
  <CardContent className="p-6 flex items-center gap-4">
    {/* Tick Circle */}
    <div className="flex-shrink-0">
      <div className="w-10 h-10 rounded-full bg-[#223B57]/10 flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-[#223B57]" />
      </div>
    </div>

    {/* Text */}
    <p className="text-neutral-700 text-sm leading-relaxed">
      {point}
    </p>
  </CardContent>
</Card>

        </motion.div>
      ))}
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
                         Frequently Asked Questions
                       </h2>
                       <p className="text-lg text-neutral-600">
                         Quick answers about installation guides and resources
                       </p>
                     </motion.div>
           
                     <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                       {[
                         {
                           icon: CheckCircle2,
                           question: "Are the resources available for free?",
                           answer: "Yes, all guides, catalogues, and video tutorials can be downloaded and used at no cost."
                         },
                         {
                           icon:  CheckCircle2,
                           question: "Do I need any special software to open the files?",
                           answer: "No, PDF files can be opened using any standard PDF reader available for free."
                         },
                         {
                           icon: CheckCircle2,
                           question: "Can I share these guides with my installer or contractor?",
                           answer: "Yes, you are welcome to share the resources with anyone involved in your project."
                         },
                         {
                           icon: CheckCircle2,
                           question: "How often are new resources added?",
                           answer: "Our resource library is updated regularly with new guides, videos, and technical information. Check back often for updates."
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

            {/* Professional Installation Support Section */}
<section className="py-20 bg-white">
  <div className="container max-w-5xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2 border-0">
        Professional Installation Support
      </Badge>
      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
       Expert Help When You Need It
      </h2>
      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
      For situations that need extra guidance, our experienced team is ready to assist you with practical advice and technical support.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-6">
      {[
        "Personalised installation guidance",
"Help with product selection and application",
"	Support for complex layouts or large projects",
"Connect with verified installers when required.",
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden h-full border-l-4 border-l-[#223B57]">
  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
  <CardContent className="p-6 flex items-center gap-4">
    {/* Icon Circle */}
    <div className="w-10 h-10 rounded-full bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
      <Users className="w-5 h-5 text-[#223B57]" />
    </div>

    {/* Text */}
    <p className="text-neutral-700 text-sm leading-relaxed">
      {item}
    </p>
  </CardContent>
</Card>

        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <Badge className="mb-6 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                  Looking for Expert Guidance?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                 Installation Help You Can Rely On
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                 Get personalised support and practical advice from our specialists to ensure smooth and accurate tile installation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                     Get Support 
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Dealers Locator")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md
    text-white border-white/30
    hover:bg-white/20 hover:border-white/50
    hover:text-white
    rounded-xl h-12 px-8
    [&_svg]:text-white hover:[&_svg]:text-white
  "
                  >
                    Locate an Installer 
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
