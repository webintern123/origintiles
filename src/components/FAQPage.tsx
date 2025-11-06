import { useState } from 'react';
import { Search, Phone, Mail, HelpCircle } from 'lucide-react';
import { SITE_CONFIG } from '../constants';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { PageBanner } from './PageBanner';
import { ScrollReveal } from './ScrollReveal';
import { faqData } from '../data/faq';

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

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Hero Banner - FAQ */}
      <PageBanner
        title="Frequently Asked Questions"
        subtitle="HELP CENTER"
        description="Find answers to common questions about our tiles, ordering process, installation, and maintenance."
        icon={HelpCircle}
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
        badge="24/7 Support Available"
        breadcrumbs={[
          { label: 'FAQ' }
        ]}
      />

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#223B57] w-5 h-5 z-10" />
              <Input
                type="text"
                placeholder="Search for answers..."
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

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">

          <ScrollReveal delay={0.3}>
            <Card className="relative bg-gradient-to-br from-[#223B57] to-[#1a2d43] text-white border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              <CardContent className="relative p-12 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-white mb-4 text-3xl">Still Have Questions?</h3>
                <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                  Can't find the answer you're looking for? Our customer support team is here to help.
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