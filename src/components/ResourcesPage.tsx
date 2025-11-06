import { Download, Video, FileText, BookOpen, Play, ArrowRight, CheckCircle2, Lightbulb, TrendingUp, Users, Search, Sparkles, Clock, Shield } from 'lucide-react';
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
    { icon: FileText, title: "10+ Resources", description: "Guides & catalogs" },
    { icon: Video, title: "Video Tutorials", description: "Step-by-step guides" },
    { icon: TrendingUp, title: "75K+ Downloads", description: "Trusted by professionals" },
    { icon: Users, title: "Expert Support", description: "Professional assistance" }
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
        title="Installation Guides & Resources"
        subtitle="Expert Knowledge Base"
        description="Everything you need to know about tile installation, maintenance, and care. Free guides, videos, and expert tips from industry professionals."
        icon={BookOpen}
        variant="gradient"
        badge="10+ Resources • Video Tutorials • Expert Support"
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
              Most Popular
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Featured Resources
            </h2>
            <p className="text-neutral-600 text-lg">
              Our most downloaded guides and tutorials
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Browse All Resources
            </h2>
            <p className="text-neutral-600 text-lg">
              Filter by category to find exactly what you need
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
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg">
              Access professional resources in three easy steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Search,
                title: "Browse Resources",
                description: "Explore our comprehensive library of guides, catalogs, videos, and technical documents by category or search."
              },
              {
                step: "02",
                icon: FileText,
                title: "Select & Preview",
                description: "View resource details, file sizes, and download counts to find exactly what you need for your project."
              },
              {
                step: "03",
                icon: Download,
                title: "Download & Use",
                description: "Instantly download resources for free and use them for your tile installation, maintenance, or design projects."
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
              Professional-grade knowledge at your fingertips
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: "Expert Curated Content",
                description: "All guides and videos are created by industry professionals with decades of tile installation experience."
              },
              {
                icon: Download,
                title: "100% Free Access",
                description: "No registration, no fees, no hidden costs. Download unlimited resources whenever you need them."
              },
              {
                icon: Clock,
                title: "Always Up-to-Date",
                description: "We regularly update our resource library with the latest installation techniques and industry best practices."
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "Every resource is thoroughly reviewed for accuracy and follows international tile installation standards."
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
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Quick Installation Tips
            </h2>
            <p className="text-neutral-600 text-lg">
              Essential tips for perfect tile installation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Surface Preparation',
                tips: [
                  'Ensure surface is clean, dry, and level',
                  'Remove any loose debris or old adhesive',
                  'Apply primer if needed for better adhesion',
                  'Check for moisture issues before tiling'
                ]
              },
              {
                title: 'Layout Planning',
                tips: [
                  'Start from the center of the room',
                  'Do a dry layout before applying adhesive',
                  'Use spacers for consistent grout lines',
                  'Plan cuts to avoid narrow edge pieces'
                ]
              },
              {
                title: 'Grouting Tips',
                tips: [
                  'Wait 24 hours after tile installation',
                  'Remove excess grout at 45° angle',
                  'Clean tiles with damp sponge frequently',
                  'Apply sealer after grout fully cures'
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#223B57]/10 mb-6">
              <Lightbulb className="w-8 h-8 text-[#223B57]" />
            </div>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-lg">
              Common questions about tile installation and resources
            </p>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                question: "Are these resources free to download?",
                answer: "Yes! All our guides, catalogs, and video tutorials are completely free to download and use. We believe in empowering our customers with knowledge."
              },
              {
                question: "Do I need special software to view the PDFs?",
                answer: "No special software required. All PDFs can be viewed with any standard PDF reader like Adobe Acrobat Reader, which is free to download."
              },
              {
                question: "Can I share these resources with my contractor?",
                answer: "Absolutely! Feel free to share our resources with your contractor, installer, or anyone helping with your tile project."
              },
              {
                question: "How often are new resources added?",
                answer: "We regularly update our resource library with new guides, videos, and technical documents. Check back monthly for new content."
              },
              {
                question: "Can I request specific topics for new guides?",
                answer: "Yes! We welcome suggestions. Contact our support team with your topic requests and we'll consider them for future resources."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-md">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-[#223B57]/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-[#223B57]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#223B57] mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
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
                  Need Professional Help?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Expert Installation Support
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Our expert team is available to provide personalized installation guidance and professional support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Contact Support
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Dealers Locator")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl"
                  >
                    Find an Installer
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
