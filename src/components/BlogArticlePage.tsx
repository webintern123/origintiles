import { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight, Eye, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { blogPosts } from '../data/blog';
import { toast } from 'sonner';

interface BlogArticlePageProps {
  articleId: number;
  onNavigate: (page: string) => void;
}

export function BlogArticlePage({ articleId, onNavigate }: BlogArticlePageProps) {
  const article = blogPosts.find(post => post.id === articleId);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
          
          <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden max-w-md">
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
            
            <CardContent className="p-12 text-center">
              <h2 className="text-[#223B57] mb-4">Article Not Found</h2>
              <p className="text-neutral-600 mb-6">The article you're looking for doesn't exist.</p>
              <Button onClick={() => onNavigate('Blog')} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const relatedArticles = blogPosts
    .filter(post => post.id !== articleId && (post.category === article.category || post.tags?.some(tag => article.tags?.includes(tag))))
    .slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = article.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Article removed from saved' : 'Article saved for later!');
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === HEADER WITH BACK BUTTON === */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => onNavigate('Blog')}
              className="hover:bg-[#223B57]/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={isSaved ? 'text-[#223B57]' : ''}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('copy')}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* === HERO IMAGE WITH OVERLAY === */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[#223B57]">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#223B57] via-[#223B57]/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12 md:pb-16">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Category Badge */}
                <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2">
                  {article.category}
                </Badge>

                {/* Title */}
                <h1 className="text-white mb-6 leading-tight">
                  {article.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{article.readTime}</span>
                  </div>
                  {article.views && (
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{article.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* === MAIN CONTENT === */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Article Content */}
            <motion.div
              className="col-span-12 lg:col-span-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Author Info Card */}
              <div className="relative group mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      {article.authorImage && (
                        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#223B57]/20 flex-shrink-0">
                          <ImageWithFallback
                            src={article.authorImage}
                            alt={article.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-4 h-4 text-[#223B57]" />
                          <span className="text-[#223B57]">Written by</span>
                        </div>
                        <div className="text-[#223B57]">{article.author}</div>
                        {article.authorBio && (
                          <p className="text-sm text-neutral-600 mt-1">{article.authorBio}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Excerpt */}
              <div className="relative group mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-8">
                    <p className="text-lg text-neutral-700 leading-relaxed italic">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Article Content */}
              <div className="relative group mb-8">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-8 md:p-12">
                    <div 
                      className="prose prose-lg max-w-none
                        prose-headings:text-[#223B57] prose-headings:font-bold
                        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[#223B57]/20
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                        prose-p:text-neutral-700 prose-p:leading-relaxed prose-p:mb-6
                        prose-strong:text-[#223B57] prose-strong:font-semibold
                        prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-disc prose-ul:pl-6
                        prose-ol:my-6 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                        prose-li:text-neutral-700 prose-li:leading-relaxed
                        prose-a:text-[#223B57] prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                        prose-blockquote:border-l-4 prose-blockquote:border-[#223B57] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-neutral-600
                        prose-code:text-[#223B57] prose-code:bg-[#223B57]/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm"
                      dangerouslySetInnerHTML={{ 
                        __html: article.content?.replace(/\n\n/g, '</p><p>')
                          .replace(/## (.*?)(?=\n|$)/g, '<h2>$1</h2>')
                          .replace(/### (.*?)(?=\n|$)/g, '<h3>$1</h3>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n- /g, '</p><ul><li>')
                          .replace(/\n/g, '<br />')
                          || `<p>${article.excerpt}</p>`
                      }}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex items-center gap-2 text-[#223B57]">
                            <Tag className="w-5 h-5" />
                            <span className="text-sm">Tags:</span>
                          </div>
                          {article.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-[#223B57]/30 text-[#223B57] px-4 py-2 rounded-xl hover:bg-[#223B57] hover:text-white hover:border-[#223B57] cursor-pointer transition-all duration-300"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <Share2 className="w-5 h-5 text-[#223B57]" />
                          <span className="text-[#223B57]">Share this article:</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare('facebook')}
                            className="hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300"
                          >
                            <Facebook className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare('twitter')}
                            className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-all duration-300"
                          >
                            <Twitter className="w-4 h-4 mr-2" />
                            Twitter
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare('linkedin')}
                            className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300"
                          >
                            <Linkedin className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare('copy')}
                            className="hover:bg-[#223B57] hover:text-white hover:border-[#223B57] transition-all duration-300"
                          >
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Copy Link
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Table of Contents */}
              <div className="sticky top-24 space-y-6">
                {/* Quick Actions */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-[#223B57] mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Quick Actions
                      </h3>
                      
                      <div className="space-y-3">
                        <Button
                          variant={isSaved ? "default" : "outline"}
                          className={`w-full justify-start ${isSaved ? 'bg-[#223B57] hover:bg-[#1a2d43] text-white' : ''}`}
                          onClick={handleSave}
                        >
                          <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                          {isSaved ? 'Saved for Later' : 'Save Article'}
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => onNavigate('Blog')}
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back to Blog
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Newsletter Signup */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                  
                  <Card className="relative border-0 shadow-lg bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl overflow-hidden text-white">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Badge className="mb-4 bg-white/20 backdrop-blur-md text-white border-white/30">
                          Newsletter
                        </Badge>
                        <h3 className="text-white mb-3">Never Miss an Update</h3>
                        <p className="text-white/90 text-sm mb-4">
                          Get the latest tile trends and design tips delivered weekly.
                        </p>
                        <Button 
                          variant="secondary"
                          className="w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          onClick={() => toast.info('Newsletter signup coming soon!')}
                        >
                          Subscribe Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === RELATED ARTICLES === */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-0 px-4 py-2">
                More to Read
              </Badge>
              <h2 className="text-[#223B57] mb-4">
                Related Articles
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Continue exploring tile design and installation insights
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative group h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                    
                    <Card 
                      className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl cursor-pointer h-full flex flex-col"
                      onClick={() => onNavigate(`BlogArticle-${relatedPost.id}`)}
                    >
                      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                      
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                        <ImageWithFallback
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <CardContent className="p-6 flex-1 flex flex-col">
                        <Badge className="w-fit mb-3 bg-[#223B57]/10 text-[#223B57] border-0">
                          {relatedPost.category}
                        </Badge>

                        <h3 className="text-[#223B57] mb-3 line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h3>

                        <p className="text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed flex-1">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#223B57] group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === CALL TO ACTION === */}
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
                  Explore More
                </Badge>
                <h2 className="text-white mb-4">
                  Discover More Design Inspiration
                </h2>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                  Browse our complete collection of articles covering tile trends, installation guides, and design inspiration.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg"
                    variant="secondary"
                    className="h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => onNavigate('Blog')}
                  >
                    View All Articles
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  
                  <Button 
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 !bg-transparent border-white/30 !text-white hover:!bg-white/10 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => onNavigate('Products')}
                  >
                    Browse Products
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
