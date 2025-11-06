import { Shield, Lock, Eye, UserCheck, Database, Bell } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { PageBanner } from "./PageBanner";
import { ScrollReveal } from "./ScrollReveal";

export function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, place an order, request samples, or contact us. This may include your name, email address, postal address, phone number, and payment information."
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: "We use the information we collect to process your orders, communicate with you, provide customer service, improve our services, personalize your experience, and send you marketing communications (with your consent)."
    },
    {
      icon: Lock,
      title: "Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption and security protocols."
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You can also opt-out of marketing communications at any time. Contact us to exercise these rights or if you have any privacy concerns."
    },
    {
      icon: Bell,
      title: "Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences."
    },
    {
      icon: Shield,
      title: "Third-Party Services",
      content: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you. These parties are obligated to keep your information confidential."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <PageBanner
        title="Privacy Policy"
        subtitle="Your Privacy Matters to Us"
        description="Learn how we collect, use, and protect your personal information. Last updated: October 29, 2025"
        icon={Shield}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Introduction */}
        <ScrollReveal>
          <Card className="relative mb-8 border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6">Introduction</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                At Origin Tiles, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                By using our website, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#223B57]/10 flex items-center justify-center flex-shrink-0">
                      <section.icon className="w-6 h-6 text-[#223B57]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-3">{section.title}</h3>
                      <p className="text-neutral-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* GDPR Compliance */}
        <ScrollReveal delay={0.6}>
          <Card className="relative mt-8 border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6">GDPR Compliance</h2>
              <p className="text-neutral-600 leading-relaxed mb-4">
                For users in the European Union, we comply with the General Data Protection Regulation (GDPR). 
                You have additional rights including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600 mb-4">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Contact Information */}
        <ScrollReveal delay={0.7}>
          <Card className="relative mt-8 bg-[#223b57] text-white border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6 text-white">Questions About Privacy?</h2>
              <p className="text-white/80 mb-6">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact our Privacy Officer:
              </p>
              <div className="space-y-2 text-white/90">
                <p>Email: privacy@origintiles.com</p>
                <p>Phone: +91 9093833833</p>
                <p>Address: Madhapur, Hyderabad, Telangana, India</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          <p>This Privacy Policy was last updated on October 29, 2025</p>
        </div>
      </div>
    </div>
  );
}