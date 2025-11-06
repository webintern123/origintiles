import { FileText, AlertCircle, Scale, Package, CreditCard, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { PageBanner } from "./PageBanner";
import { ScrollReveal } from "./ScrollReveal";
import { Alert, AlertDescription } from "./ui/alert";

export function TermsConditionsPage() {
  const terms = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content: "By accessing and using the Origin Tiles website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
    },
    {
      icon: Package,
      title: "Products and Services",
      content: "We strive to display our products as accurately as possible. However, we do not guarantee that product descriptions, colors, or other content is accurate, complete, or error-free. All orders are subject to availability and confirmation of the order price."
    },
    {
      icon: CreditCard,
      title: "Pricing and Payment",
      content: "All pricing is available upon request and subject to change without notice. Payment must be received in full before delivery. We accept major credit cards, debit cards, and bank transfers. Additional shipping charges may apply based on location and order size."
    },
    {
      icon: RefreshCw,
      title: "Returns and Refunds",
      content: "Products may be returned within 30 days of delivery in their original condition and packaging. Custom orders and cut tiles are non-returnable. Refunds will be processed within 7-10 business days after we receive the returned items."
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Origin Tiles and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission."
    },
    {
      icon: AlertCircle,
      title: "Limitation of Liability",
      content: "Origin Tiles shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products or services. Our total liability shall not exceed the amount paid for the products in question."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <PageBanner
        title="Terms & Conditions"
        subtitle="Website Terms of Use"
        description="Please read these terms carefully before using our website and services. Last updated: October 29, 2025"
        icon={FileText}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Important Notice */}
        <ScrollReveal>
          <Alert className="mb-8 border-[#223B57] bg-[#223B57]/5">
            <AlertCircle className="h-4 w-4 text-[#223B57]" />
            <AlertDescription className="text-[#223b57]">
              Please read these terms and conditions carefully before using our services.
            </AlertDescription>
          </Alert>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal>
          <Card className="relative mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6">Welcome to Origin Tiles</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                These Terms and Conditions govern your use of the Origin Tiles website and the purchase of our products. 
                By using our website, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                We reserve the right to update these terms at any time. Continued use of our website after changes 
                constitutes acceptance of the revised terms.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Terms Sections */}
        <div className="space-y-6">
          {terms.map((term, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
                      <term.icon className="w-6 h-6 text-[#223B57]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3">{term.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{term.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Additional Terms */}
        <ScrollReveal delay={0.6}>
          <Card className="relative mt-8 border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6">Additional Terms</h2>
              
              <div className="space-y-4 text-neutral-600">
                <div>
                  <h4 className="mb-2">User Accounts</h4>
                  <p className="leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials 
                    and for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2">Shipping and Delivery</h4>
                  <p className="leading-relaxed">
                    Delivery times are estimates and may vary. We are not responsible for delays caused 
                    by circumstances beyond our control. Risk of loss passes to you upon delivery.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2">Warranty</h4>
                  <p className="leading-relaxed">
                    Our products come with a 10-year manufacturer's warranty against defects in materials 
                    and workmanship. This warranty does not cover damage from improper installation, misuse, or normal wear.
                  </p>
                </div>

                <div>
                  <h4 className="mb-2">Governing Law</h4>
                  <p className="leading-relaxed">
                    These Terms and Conditions are governed by the laws of India. Any disputes shall be 
                    subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Contact Section */}
        <ScrollReveal delay={0.7}>
          <Card className="relative mt-8 bg-[#223b57] text-white border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6 text-white">Questions About Our Terms?</h2>
              <p className="text-white/80 mb-6">
                If you have any questions about these Terms and Conditions, please contact our legal team:
              </p>
              <div className="space-y-2 text-white/90">
                <p>Email: legal@origintiles.com</p>
                <p>Phone: +91 9093833833</p>
                <p>Address: Madhapur, Hyderabad, Telangana, India</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          <p>These Terms & Conditions were last updated on October 29, 2025</p>
        </div>
      </div>
    </div>
  );
}