import { useState } from 'react';
import { BookOpen, ArrowRight, User, Calendar, Clock, Search, Tag, Rss, TrendingUp, FileText } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageBanner } from './PageBanner';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { StaggerChildren } from './ScrollReveal';
import { motion } from 'motion/react';
import { blogPosts, blogCategories } from '../data/blog';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((p) => p.featured);
  const totalPosts = blogPosts.length;
  const totalReads = blogPosts.reduce((acc, post) => acc + (post.views || 0), 0);

  const stats = [
    { icon: FileText, title: `${totalPosts}+ Articles`, description: "Expert insights" },
    { icon: TrendingUp, title: `${Math.floor(totalReads / 1000)}K+ Reads`, description: "Trusted content" },
    { icon: User, title: "Expert Authors", description: "Industry professionals" },
    { icon: Rss, title: "Weekly Updates", description: "Fresh content" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Tile Inspiration & Expertise"
        subtitle="Design Insights & Expert Tips"
        description="Discover the latest trends, expert installation advice, and design inspiration for your next tile project. Your complete resource for ceramic tile excellence."
        icon={BookOpen}
        variant="gradient"
        badge="Weekly Updates • Expert Articles • Design Trends"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Blog" }
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

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="container max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2 border-0">
                Featured Article
              </Badge>
              <h2 className="text-4xl font-bold text-[#223B57] mb-4">
                Editor's Pick
              </h2>
              <p className="text-neutral-600 text-lg">
                Our most popular article this month
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="relative border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden bg-white rounded-3xl group">
                <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
                
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                    <ImageWithFallback
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <Badge className="w-fit mb-4 bg-[#223B57] text-white border-0">
                      Featured
                    </Badge>
                    <h3 className="text-3xl font-bold text-[#223B57] mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-6 mb-6 text-sm text-neutral-500">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-IN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <Button 
                      size="lg" 
                      className="w-fit bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl"
                      onClick={() => onNavigate(`BlogArticle-${featuredPost.id}`)}
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Search & Filter Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 border-0 bg-white/60 backdrop-blur-md shadow-lg rounded-2xl text-[#223B57] placeholder:text-neutral-400 focus:ring-2 focus:ring-[#223B57]/20"
              />
            </div>

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full h-auto bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20">
                {blogCategories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category} 
                    className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Blog Grid */}
          {filteredPosts.length > 0 ? (
            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-2xl group cursor-pointer h-full flex flex-col">
                    <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                    
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      <Badge className="w-fit mb-3 bg-[#223B57]/10 text-[#223B57] border-0">
                        <Tag className="w-3 h-3 mr-1" />
                        {post.category}
                      </Badge>

                      {/* Title */}
                      <h3 className="font-bold text-[#223B57] text-lg mb-3 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-3 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4 pb-4 border-b border-neutral-200">
                        <div className="flex items-center gap-2">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Read Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full text-[#223B57] hover:text-white hover:bg-[#223B57] rounded-xl transition-all duration-300"
                        onClick={() => onNavigate(`BlogArticle-${post.id}`)}
                      >
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </StaggerChildren>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl">
                <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#223B57]/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#223B57]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#223B57] mb-2">
                    No Articles Found
                  </h3>
                  <p className="text-neutral-600">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
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
                  Stay Informed
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Never Miss an Update
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter for the latest tile trends, design tips, and exclusive offers delivered to your inbox.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/60 h-12 rounded-xl focus:ring-2 focus:ring-white/30"
                  />
                  <Button 
                    size="lg"
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shrink-0"
                  >
                    Subscribe
                    <Rss className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <p className="text-white/60 text-sm mt-4">
                  Join 10,000+ subscribers. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
