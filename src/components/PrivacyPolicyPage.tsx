import { Shield, Lock, Eye, UserCheck,AlertCircle, Database,ArrowRight , Bell,Clock, Globe,RefreshCw,Scale, } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { PageBanner } from "./PageBanner";
import { ScrollReveal } from "./ScrollReveal";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface PrivacyPolicyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {

  const sections = [
   {
  icon: Database,
  title: "What Information We Collect",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We collect only the information that is necessary to support your requests and improve your experience.
      </p>

      <strong className="block mb-2">Information You Share With Us</strong>
      <p className="mb-2">
        When you fill out forms, request samples, contact us, or enquire about products, we may collect:
      </p>
      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-1">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>City or location</li>
        <li>Company or business name (if applicable)</li>
      </ul>

      <strong className="block mb-2">Website Usage Information</strong>
      <p className="mb-2">To improve our website, we may collect basic data such as:</p>
      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-1">
        <li>IP address</li>
        <li>Browser type</li>
        <li>Pages visited</li>
        <li>Time spent on the website</li>
      </ul>

      <strong className="block mb-2">Communication Records</strong>
      <p className="mb-4">
        When you email us or fill out a form, we keep those messages so we can reply properly and assist you better in the future.
      </p>

      <strong className="block mb-2">Technical Information</strong>
      <p className="mb-4">
        We collect basic information like cookies, device type, and website usage data. This helps the website run smoothly and improve your browsing experience.
      </p>

      <strong className="block mb-2">Your Choice</strong>
      <p className="mb-4">
        You always choose what information to share. Not providing certain details may limit some features or services.
      </p>
    </>
  )
},

    {
  icon: Eye,
  title: "How We Use Your Information",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We use your information only to serve you better and for necessary business reasons, such as:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-3">
        <li>
          <strong>Replying to your requests</strong><br />
          To answer your questions, share product details, provide quotations, or assist with support needs.
        </li>

        <li>
          <strong>Improving our website</strong><br />
          To understand how people use our website and make it easier and better to use.
        </li>

        <li>
          <strong>Sending updates (only if you choose)</strong><br />
          To share product information, news, or offers when you have opted to receive them.
        </li>

        <li>
          <strong>Keeping our systems safe</strong><br />
          To protect our website, prevent misuse, and identify technical issues.
        </li>

        <li>
          <strong>Meeting legal requirements</strong><br />
          To follow applicable laws and protect our business rights when required.
        </li>

        <li>
          <strong>Enhancing your experience</strong><br />
          To show content that is more relevant to your interests and needs.
        </li>
      </ul>
    </>
  )
},

   {
  icon:  Lock,
  title: "How We Share Information",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We do not sell, rent, or trade your personal information.
      </p>

      <p className="mb-4 text-neutral-800">
        We share information only when necessary:
      </p>

      <strong className="block mb-2">Trusted Service Providers</strong>
      <p className="mb-2">
        We work with reliable partners for:
      </p>
      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-1">
        <li>Website hosting</li>
        <li>Email communication</li>
        <li>Analytics</li>
        <li>Customer support tools</li>
      </ul>
      <p className="mb-4">
        These partners are allowed to use your information only to perform their services and must keep it confidential.
      </p>

      <strong className="block mb-2">Legal Requirements</strong>
      <p className="mb-4">
        Information may be shared if required by law or to protect safety and rights.
      </p>

      <strong className="block mb-2">Business Changes</strong>
      <p className="mb-4">
        If Origin Tiles undergoes a merger or business transfer, your information may be transferred securely to the new entity.
      </p>
    </>
  )
},

    {
  icon: Database,
  title: "Third-Party Services We Use",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        To operate efficiently, we use trusted tools such as:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li>
          <strong>Analytics services</strong> (to understand website usage)
        </li>
        <li>
          <strong>Email services</strong> (to respond to enquiries and send updates)
        </li>
        <li>
          <strong>Secure cloud hosting</strong>
        </li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        All partners follow strict data protection standards.
      </p>
    </>
  )
},
{
  icon: Lock,
  title: "Data Security",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We use multiple safeguards to protect your information, including:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li>Secure encrypted connections (SSL)</li>
        <li>Regular security checks</li>
        <li>Restricted internal access</li>
        <li>Secure storage and backups</li>
        <li>Continuous monitoring</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        While no system can guarantee 100% security, we are fully committed to protecting your data responsibly.
      </p>
    </>
  )
},
{
  icon: AlertCircle,
  title: "If There Is a Security Issue",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        In the unlikely event of a data breach:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li>We will act immediately to contain the issue</li>
        <li>Inform affected users promptly</li>
        <li>Follow legal reporting requirements</li>
        <li>Strengthen systems to prevent recurrence</li>
        <li>Communicate clearly about next steps</li>
      </ul>
    </>
  )
},
{
  icon: Clock,
  title: "How Long We Keep Your Information",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We keep information only as long as necessary:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li><strong>Customer &amp; Enquiry Data:</strong> Up to 2–3 years</li>
        <li><strong>Marketing Preferences:</strong> Until you unsubscribe</li>
        <li><strong>Legal or Financial Records:</strong> As required by law</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        Once no longer needed, data is securely deleted or anonymised.
      </p>
    </>
  )
},
{
  icon: UserCheck,
  title: "Your Rights & Choices",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        You are always in control of your data. You can request to:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li>View the information we hold about you</li>
        <li>Correct inaccurate details</li>
        <li>Delete your data (where legally allowed)</li>
        <li>Understand how your data is used</li>
        <li>Restrict or withdraw consent</li>
        <li>Request data transfer (where applicable)</li>
      </ul>

      <strong className="block mb-2">How to Make a Request</strong>
      <p className="mb-4">
        Email us at <span className="underline">privacy@origintiles.com</span> or use our contact form.
      </p>

      <p className="text-neutral-600 leading-relaxed">
        We usually respond within 48 hours, and most requests are completed within 30 days.
      </p>
    </>
  )
},
{
  icon: Bell,
  title: "Cookies & Tracking",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        We use cookies to improve website functionality and user experience.
      </p>

      <strong className="block mb-2">Types of Cookies</strong>
      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li><strong>Essential cookies:</strong> Required for basic site functions</li>
        <li><strong>Analytics cookies:</strong> Help us improve the site</li>
        <li><strong>Marketing cookies:</strong> Show relevant content (optional)</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        You can manage or disable cookies through your browser settings. Some features may not work properly if cookies are disabled.
      </p>
    </>
  )
},
{
  icon: Globe,
  title: "Visitors from Outside India",
  content: (
    <>
      <p className="text-neutral-600 leading-relaxed">
        If you access our website from outside India, your information may be stored and processed in India. By using our site, you agree to this transfer. We ensure data is handled responsibly.
      </p>
    </>
  )
},
{
  icon: Shield,
  title: "Children’s & Data Safety",
  content: (
    <>
      <p className="text-neutral-600 leading-relaxed">
        Our website is intended for adults. We do not knowingly collect information from anyone under 18. If such data is identified, it will be deleted promptly.
      </p>
    </>
  )
},
{
  icon: RefreshCw,
  title: "Updates to This Policy",
  content: (
    <>
      <p className="text-neutral-600 leading-relaxed">
        We may update this Privacy Policy when needed. Any changes will be posted on this page with an updated date. Continued use of our website means you accept the revised policy.
      </p>
    </>
  )
},
{
  icon: Scale,
  title: "GDPR & Data Rights Protection",
  content: (
    <>
      <p className="mb-4 text-neutral-800">
        If you are visiting our website from the European Union, your personal information is handled in line with GDPR (General Data Protection Regulation).
      </p>

      <p className="mb-2 font-semibold text-neutral-800">
        You have the right to:
      </p>

      <ul className="mb-4 list-disc list-inside text-neutral-600 space-y-2">
        <li>View the personal information we have about you</li>
        <li>Request corrections if any details are incorrect</li>
        <li>Ask for your data to be deleted when it is no longer needed</li>
        <li>Limit how your data is used in certain situations</li>
        <li>Receive a copy of your data in a usable format</li>
        <li>Object to how your data is processed</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        If you wish to use any of these rights, you can contact our team and we’ll assist you.
      </p>
    </>
  )
},
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
    <PageBanner
  title="Your Privacy & Data Protection, Our Responsibility"
  subtitle="Your Privacy Matters to Us"
  description={
    <>
     
      <p className="mb-2 font-semibold">We Protect and Respect your Personal Information</p>
      <p className="mb-2 leading-relaxed">
        At Origin Tiles, your privacy is important to us. We collect only the information needed to serve you better and keep it safe at all times. This page explains what information we collect, how we use it, and how we protect it when you visit our website or contact us.
      </p>
      <p className="leading-relaxed">
        If you have any questions, our team is always here to help.
      </p>
    </>
  }
  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1662749061774-8da69c898e00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
  badge="Last Updated: December 2025"
/>

{/* Commitment Section */}
<ScrollReveal>
  <section className="max-w-4xl mx-auto px-4 py-16 text-center">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#223B57]">
      Our Commitment to You
    </h2>
    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-[#223B57]/80">
      How We Handle Your Information
    </h3>
    <p className="text-neutral-600 leading-relaxed mb-4">
      We value your trust. Any information you share with Origin Tiles is used carefully and only to help serve you better. 
      We follow data protection rules in India and take practical steps to keep your information safe.
    </p>
    <p className="text-neutral-600 leading-relaxed">
      By using our website, you agree to how we handle information as explained here. 
      If you’re not comfortable with this, you’re free to stop using the website at any time.
    </p>
  </section>
</ScrollReveal>



      <div className="max-w-4xl mx-auto px-4 py-16">
       

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
                      <h3 className="mb-3 font-bold text-[#223B57]">
  {section.title}
</h3>
                      <p className="text-neutral-600 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact Information */}
       <ScrollReveal delay={0.7}>
  <Card className="relative mt-8 bg-[#223b57] text-white border-0 shadow-xl rounded-3xl overflow-hidden">
    <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
    <CardContent className="p-8">
      <h2 className="mb-6 text-white">Reach Out to Us</h2>

      <p className="text-white/80 mb-6">
        If you have questions or concerns about your privacy, please contact us:
      </p>

      <div className="space-y-2 text-white/90">
        <p><strong>Email:</strong> privacy@origintiles.com</p>
        <p><strong>Phone:</strong> +91 9093833833</p>
        <p><strong>Address:</strong> Madhapur, Hyderabad – 500018</p>
      </div>
    </CardContent>
  </Card>
</ScrollReveal>


        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          <p>This Privacy Policy was last updated on October 29, 2025</p>
        </div>
      </div>
      {/* === CTA SECTION === */}
                  <section className="py-20 bg-white">
                    <div className="container">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                      >
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/30 to-transparent rounded-3xl blur-2xl"></div>
                        
                        <div className="relative bg-gradient-to-br from-[#223B57] to-[#2d4a6a] rounded-3xl p-12 md:p-16 text-center overflow-hidden">
                          {/* Decorative Pattern */}
                          <div className="absolute inset-0 opacity-10">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                  <circle cx="20" cy="20" r="1.5" fill="white" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
                            </svg>
                          </div>
            
                          <div className="relative z-10">
                            
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                              We Care, Value, and Protect Your Information
                            </h2>
                            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                               Want to know more about our products or need help? We’re always here to support you.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Button
                                onClick={() => onNavigate("Products")}
                                className="bg-white !text-[#223B57] hover:bg-white/90 rounded-xl h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                              >
                                
                                View Products  
                              </Button>
                             <Button
              onClick={() => onNavigate("Contact")}
              variant="outline"
              className="
                bg-white/10 backdrop-blur-md
                text-white border-white/30
                hover:bg-white/20 hover:border-white/50
                hover:text-white
                rounded-xl h-12 px-8
                [&_svg]:text-white hover:[&_svg]:text-white
              "
            >
             Get in Touch     
                  <ArrowRight className="w-4 h-4 ml-2" />
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