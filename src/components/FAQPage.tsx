import { useState } from 'react';
import { Search, Phone, Mail,Users,FileText,Clock, Shield,Package,Zap,Award,LifeBuoy,} from 'lucide-react';
import { SITE_CONFIG } from '../constants';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { PageBanner } from './PageBanner';
import { ScrollReveal } from './ScrollReveal';
import { faqData } from '../data/faq';
import { motion } from 'framer-motion';


export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('general');

  const filterFAQs = (faqs: typeof faqData.general) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  const stats = [
  { icon: Users, title: "35+  ", description: "Common Questions Answered" },
  { icon: FileText, title: "Within 2 Hours ", description: "Quick Responses" },
  { icon: Clock, title: "99% ", description: "Customer Satisfaction" },
  
];


  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Hero Banner - FAQ */}
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="Customer Help Center"
        description="Find clear answers to common questions about our tiles, ordering, installation, and care."
       
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
        badge="24/7 Support When You Need It"
        breadcrumbs={[
          { label: 'FAQ' }
        ]}
      />
{/* Stats Section */}
<section className="relative -mt-20 z-10 mb-16">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/60 backdrop-blur-md group"
        >
          <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-3">
              <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 transition-all duration-500">
                <stat.icon className="w-6 h-6 text-[#223B57]" strokeWidth={1.5} />
              </div>
            </div>
            <div className="font-semibold text-[#223B57] mb-1">{stat.title}</div>
            <div className="text-xs text-neutral-600">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>

<section className="relative py-24 bg-[#F5F3F0] overflow-hidden">
  <div className="container relative z-10">

    {/* Header */}
    <motion.div
      className="text-center max-w-3xl mx-auto mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
       How to Find Answers Easily
      </h2>
      <p className="text-lg text-neutral-600 mb-4">
       Follow these simple steps to get the information you need quickly.
      </p>
      
    </motion.div>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          icon: Search, // import Search from lucide-react
          title: "1. Search or Explore",
          description: "Use the search box to look for specific topics or browse questions by category."
        },
        {
          icon: FileText, // import FileText from lucide-react
          title: "2. View Clear Answers",
          description: "Click on any question to open detailed and easy-to-understand answers."
        },
        {
          icon: LifeBuoy, // import LifeBuoy from lucide-react
          title: "3. Need More Help?",
          description: "Reach out to our support team if you need further assistance."
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="group h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-8 text-center">
             <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center 
  group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all"
>
  <item.icon className="w-8 h-8 text-[#223B57] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
</div>

              <h3 className="text-xl font-bold text-[#223B57] mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>


{/* === TILE DURABILITY & TRUST SECTION === */}
<section className="relative py-24 bg-white overflow-hidden">
  <div className="container relative z-10">

    {/* Header */}
    <motion.div
      className="text-center max-w-3xl mx-auto mb-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      
      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
       Find Answers Without Delay
      </h2>
      <p className="text-lg text-neutral-600 mb-4">
        Get clear solutions to common questions anytime, without waiting for customer support.
      </p>
    </motion.div>

    {/* Durability Points */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: Package,
          title: "Quick Solutions",
          description: "Find answers instantly whenever you need them."
        },
        {
          icon: Zap,
          title: "Trusted Information",
          description: "Responses prepared with guidance from our technical and support teams."
        },
        {
          icon: Award,
          title: "Kept Up to Date",
          description: "Content is refreshed regularly with the latest product and service updates."
        },
        {
          icon: Shield,
          title: "Available Anytime",
          description: " Access helpful information 24/7, from anywhere."
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 flex items-center justify-center group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all">
                <item.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#223B57] mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>
 {/* Support You Can Rely On Section */}
<section className="py-20 bg-white">
  <div className="container max-w-6xl">
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        Support You Can Rely On
      </h2>
      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
        We are dedicated to offering timely help and clear answers whenever you need assistance.
      </p>
    </motion.div>

    

    {/* Optional: add a visual stats section */}
    <div className="grid md:grid-cols-2 gap-8 text-center">
      {[
        { title: "Fast Replies", value: "Most queries are answered within 2 hours" },
        { title: "15,000+ Queries Resolved", value: "Helping customers with their questions every day" },
        { title: "Top-Rated Support", value: "Rated 4.9 out of 5 by our customers" },
        { title: "High Resolution Rate", value: "99% of queries resolved on first contact" }
      ].map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-[#F5F3F0] rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-bold text-[#223B57] mb-2">{stat.title}</h3>
          <p className="text-neutral-600 text-sm">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>




      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#223B57] w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search for Answers Here ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 border-0 bg-white/60 backdrop-blur-md shadow-lg rounded-2xl text-[#223B57] placeholder:text-neutral-400 focus:ring-2 focus:ring-[#223B57]/20"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-[#F5F3F0]">
        <div className="max-w-4xl mx-auto px-4">

          <ScrollReveal delay={0.2}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto bg-white/60 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/20">
                <TabsTrigger value="general" className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  General
                </TabsTrigger>
                <TabsTrigger value="installation" className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  Installation
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  Maintenance
                </TabsTrigger>
                <TabsTrigger value="ordering" className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  Ordering
                </TabsTrigger>
                <TabsTrigger value="technical" className="py-3 px-4 rounded-xl data-[state=active]:bg-[#223B57] data-[state=active]:text-white">
                  Technical
                </TabsTrigger>
              </TabsList>

              {Object.entries(faqData).map(([category, faqs]) => (
                <TabsContent key={category} value={category}>
                  <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <CardContent className="p-8">
                      {filterFAQs(faqs).length > 0 ? (
                        <Accordion type="single" collapsible className="space-y-3">
                          {filterFAQs(faqs).map((faq, index) => (
                            <AccordionItem
                              key={index}
                              value={`item-${index}`}
                              className="border-[#223B57]/10 px-4 py-2 rounded-xl hover:bg-[#223B57]/5 transition-colors"
                            >
                              <AccordionTrigger className="text-left text-[#223B57] hover:text-[#223B57] font-semibold py-4">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-neutral-600 leading-relaxed pt-2 pb-4">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="text-center py-16">
                          <div className="w-16 h-16 bg-[#223B57]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-[#223B57]" />
                          </div>
                          <p className="text-[#223B57] font-semibold mb-2">No results found for "{searchQuery}"</p>
                          <p className="text-sm text-neutral-500">Try different keywords or browse categories</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Us Section */}
<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    {/* Header */}
    <motion.div
      className="text-center max-w-3xl mx-auto mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold text-[#223B57] mb-4">Easy Ways to Reach Our Team</h2>
      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
        Choose the support option that suits you best. We’re always here to assist.
      </p>
    </motion.div>

    {/* Contact Options */}
    <div className="grid md:grid-cols-3 gap-8 text-center">
      {/* Phone Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <Card className="h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#223B57]/10 flex items-center justify-center">
              <Phone className="w-8 h-8 text-[#223B57]" />
            </div>
            <h3 className="text-xl font-bold text-[#223B57] mb-2">Phone Support</h3>
            <p className="text-neutral-600 mb-4">Talk directly with our support team</p>
            <p className="text-[#223B57] font-semibold mb-4">+91 9091744744</p>
            <a href="tel:+919091744744">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-6 py-2 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Call Now &rarr;
              </Button>
            </a>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <Card className="h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#223B57]/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#223B57]" />
            </div>
            <h3 className="text-xl font-bold text-[#223B57] mb-2">Email Support</h3>
            <p className="text-neutral-600 mb-4">For detailed questions or document-related support</p>
            <p className="text-[#223B57] font-semibold mb-4">support@thetreesplywood.com</p>
            <a href="mailto:support@thetreesplywood.com">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-xl px-6 py-2 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Send Email &rarr;
              </Button>
            </a>
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <Card className="h-full border-0 rounded-2xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500">
          <CardContent className="p-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#223B57]/10 flex items-center justify-center">
              <LifeBuoy className="w-8 h-8 text-[#223B57]" />
            </div>
            <h3 className="text-xl font-bold text-[#223B57] mb-2">Live Chat</h3>
            <p className="text-neutral-600 mb-2">Get quick help for general questions</p>
            <p className="text-neutral-600 mb-4">Available 24/7</p>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-xl px-6 py-2 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Chat &rarr;
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </div>
</section>


      {/* Contact CTA */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="max-w-4xl mx-auto px-4">

          <ScrollReveal delay={0.3}>
            <Card className="relative bg-gradient-to-br from-[#223B57] to-[#1a2d43] text-white border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              <CardContent className="relative p-12 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-white mb-4 text-3xl">Need More Help?</h3>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Didn’t find the information you were looking for? Our support team is happy to assist you.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}>
                    <Button 
                      size="lg" 
                      variant="secondary"
                      className="h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Us: {SITE_CONFIG.phone}
                    </Button>
                  </a>
                 <Button 
                      size="lg" 
                      variant="secondary"
                      className="h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us: {SITE_CONFIG.email}
                    </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}