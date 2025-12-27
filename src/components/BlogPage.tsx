import { useState } from 'react';
import { ArrowRight, User, Calendar, Clock, Search,Lightbulb,BadgeCheck, Tag, Rss,Award,TrendingUp, FileText,CheckCircle2 } from 'lucide-react';
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
  

  const stats = [
    { icon: FileText, title: "60+ Articles ", description: "Helpful tips and insights" },
    { icon: TrendingUp, title: "37K+ Readers", description: "Trusted by tile users and professionals" },
    { icon: User, title: "Written by Experts", description: "Industry knowledge you can rely on " },
    { icon: Rss, title: "Updated Weekly", description: "Fresh ideas and new content regularly" }
  ];

  

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Tile Inspiration and Practical Guidance"
        subtitle="Design Insights & Tile Tips"
        description="Explore the latest tile trends, helpful installation advice, and design ideas for your next project. Everything you need to make confident tile choices, all in one place."
       
        variant="gradient"
        badge="Weekly Updates | Expert Tips | Design Ideas"
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
<section className="relative py-24 bg-white ">
  {/* Subtle Background Pattern */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3F0] to-white"></div>

  <div className="container relative z-10">
    {/* Header */}
    <motion.div
      className="text-center max-w-3xl mx-auto mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57]">
        Helpful Knowledge Made Easy
      </Badge>

      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
       Why Read Our Blog
        
      </h2>

      <p className="text-lg text-neutral-600 mb-4">
        Our blog shares useful insights, practical advice, and real-world experience to help you make better choices.
      </p>
    </motion.div>

    {/* Technical Points Grid */}
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          icon: Lightbulb,
          title: "Expert Advice",
          description:
            " Learn from professionals with years of hands-on industry experience.",
        },
        {
          icon: TrendingUp,
          title: "Latest Trends",
          description:
            "Stay updated on new designs, innovations, and market changes.",
        },
        {
          icon:  BadgeCheck,
          title: "	Practical Guidance",
          description:
            "Get easy tips on product selection, installation, and maintenance.",
        },
        {
          icon: Award,
          title: "Trusted Content",
          description:
            "Articles written with care, based on technical know-how and real use cases.",
        },
       
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card className="relative h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
            {/* Glass Border */}
            <div className="absolute inset-0 border border-white/30 rounded-2xl pointer-events-none"></div>

            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardContent className="relative p-8">
              {/* Icon */}
              <div className="mb-6 flex items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                  <item.icon
                    className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-[#223B57] mb-3 text-center">
                {item.title}
              </h3>
              <p className="text-neutral-600 text-center leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
<br></br>
    
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
                Featured Read
              </Badge>
              <h2 className="text-4xl font-bold text-[#223B57] mb-4">
                Editor’s Choice
              </h2>
              <p className="text-neutral-600 text-lg">
                This Month’s Most Read Article
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
                      Featured Article
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
                      Read the Full Article 
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
            {/* Section Heading */}
<div className="text-center mb-10">
  <h2 className="text-3xl md:text-4xl font-bold text-[#223B57] mb-3">
    Browse Articles by Topic
  </h2>
  <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
    A mix of popular reads across design, installation, and tile care.
    Filter according to your need.
  </p>
</div>

            
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

      {/* === FAQ QUICK SECTION - Top Questions === */}
                       <section className="section-padding bg-white">
                         <div className="container">
                           <motion.div
                             className="text-center mb-12"
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                           >
                             <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                               Blog FAQs
                             </h2>
                             <p className="text-lg text-neutral-600">
                               Quick answers about our articles, updates, and content.
                             </p>
                           </motion.div>
                 
                           <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                             {[
                               {
                                 icon: CheckCircle2,
                                 question: "How often do you publish new blog posts?",
                                 answer: "We add new articles regularly, focusing on tile trends, selection tips, installation guidance, and maintenance advice."
                               },
                               {
                                 icon:  CheckCircle2,
                                 question: "Can I suggest a topic for the blog?",
                                 answer: "Yes, absolutely. If there’s a tile-related topic you would like us to write on it for more info, feel free to share it with our team."
                               },
                               {
                                 icon: CheckCircle2,
                                 question: "Who writes the blog content?",
                                 answer: "Our articles are written by our Subject Matter Expert Content team and industry professionals with practical experience in tiles and interiors."
                               },
                               {
                                 icon: CheckCircle2,
                                 question: "What will I receive if I subscribe to the newsletter?",
                                 answer: "You will get updates on new blog posts, design trends, helpful guides, and product insights from Origin Tiles."
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
                  Stay Updated
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Get the Latest from Origin Tiles
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Subscribe to receive tile trends, design ideas, helpful tips, and special updates straight to your inbox.
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
                  Join 10,000+ readers | Unsubscribe anytime
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
