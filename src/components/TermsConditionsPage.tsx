import { FileText, AlertCircle, Scale,Lightbulb,Package,CheckCircle2, User,ArrowRight, CreditCard,Globe, Shield,RefreshCw,Truck, Mail,} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { PageBanner } from "./PageBanner";
import { ScrollReveal } from "./ScrollReveal";
import { Button } from "./ui/button";
import { motion } from "motion/react";


interface TermsConditionsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsConditionsPage({ onNavigate }: TermsConditionsPageProps) {
  const terms = [
    {
  icon: Scale,
  title: "Your Acceptance of These Terms",
  content: (
    <>
      <p className="mb-4 font-semibold text-neutral-800">
        By accessing our website or contacting us online, you confirm that:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-inside text-neutral-600">
        <li>You understand these terms</li>
        <li>You agree to follow them</li>
        <li>You are authorised to accept them if acting for a business</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        We may update these terms when required. Continued use after updates
        means you accept the revised version.
      </p>
    </>
  )
},
{
  icon: AlertCircle,
  title: "Who Can Use Our Website",
  content: (
    <>
      <p className="mb-4 font-semibold text-neutral-800">
        Our website is intended for users who are:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-inside text-neutral-600">
        <li>18 years or older, or</li>
        <li>Of legal age in their region</li>
      </ul>

      <p className="mb-4 text-neutral-600 leading-relaxed">
        If you are under this age, a parent or guardian must supervise your use
        and accept these terms on your behalf.
      </p>

      <p className="text-neutral-600 leading-relaxed">
        You should only use our services if you are legally allowed to enter
        into agreements.
      </p>
    </>
  )
},
{
  icon: Scale,
  title: "How You May Use Our Website",
  content: (
    <>
      {/* Permitted Use */}
      <p className="mb-3 font-semibold text-neutral-800">
        Permitted Use – What You Can Do
      </p>

      <p className="mb-3 text-neutral-600">
        You may use our website to:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
  <li>Explore tile collections</li>
  <li>Request samples or quotations</li>
  <li>Submit enquiries or dealer applications</li>
  <li>Read blogs, guides, and resources</li>
</ul>


      <p className="mb-6 text-neutral-600 leading-relaxed">
        This access is meant for personal or business use related to Origin Tiles.
      </p>

      {/* Restricted Use */}
      <p className="mb-3 font-semibold text-neutral-800">
        Restricted Use – What Is Not Allowed
      </p>

      <p className="mb-3 text-neutral-600">
        To keep the website safe and fair, you must not:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Break any laws while using the site</li>
        <li>Upload harmful files or software</li>
        <li>Copy, reuse, or publish our content without permission</li>
        <li>Share false or misleading information</li>
        <li>Attempt to access restricted areas</li>
        <li>Use bots, scripts, or automation tools</li>
        <li>Disrupt website security or performance</li>
      </ul>
    </>
  )
},


   {
  icon: Package,
  title: "Product Information & Display",
  content: (
    <>
      <p className="mb-4 font-text-neutral-800">
        We make every effort to show accurate product details, images, and specifications.
      </p>

      <p className="mb-3 font-semibold text-neutral-600">
        Please note:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-inside text-neutral-600">
        <li>Tile colours and textures may vary slightly due to screen settings</li>
        <li>Actual product appearance may differ slightly from images</li>
        <li>Product availability depends on stock and location</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        For project-specific confirmation, please consult our team or an authorised dealer.
      </p>
    </>
  )
}
,
    {
  icon: CreditCard,
  title: "Pricing, Quotes & Availability",
  content: (
    <>
      <ul className="space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Prices may change without prior notice</li>
        <li>Quotations are usually valid for a limited period</li>
        <li>Bulk or project pricing may differ</li>
        <li>Taxes and charges are applied as per final invoice</li>
        <li>Availability depends on stock and logistics</li>
      </ul>
    </>
  )
},
{
  icon: CreditCard,
  title: "Orders & Payments",
  content: (
    <>
      {/* Placing an Order */}
      <p className="mb-2 font-semibold text-neutral-800">Placing an Order</p>
      <p className="mb-2 text-neutral-600">
        Orders can be placed through:
      </p>
      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Our website</li>
        <li>Email or phone</li>
        <li>Authorised Origin Tiles dealers</li>
      </ul>
      <p className="mb-4 text-neutral-600 leading-relaxed">
        Once you confirm a quotation and payment terms, the order is processed.
      </p>

      {/* Order Confirmation */}
      <p className="mb-2 font-semibold text-neutral-800">Order Confirmation</p>
      <p className="mb-2 text-neutral-600">
        Orders are confirmed only after verification. We may cancel an order if:
      </p>
      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Stock is unavailable</li>
        <li>Pricing errors occur</li>
        <li>Payment conditions are not met</li>
        <li>Any paid amount will be refunded if an order is cancelled by us</li>
      </ul>

      {/* Payment Terms */}
      <p className="mb-2 font-semibold text-neutral-800">Payment Terms</p>
      <p className="text-neutral-600 leading-relaxed">
        Payment terms are clearly mentioned in quotations or invoices and may vary based on customer type or order size.
      </p>
    </>
  )
},
{
  icon: Truck, // You can import Truck from lucide-react if not already
  title: "Delivery & Transportation",
  content: (
    <>
      <p className="mb-3 font-semibold text-neutral-800">
        Delivery timelines depend on:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Product availability</li>
        <li>Order size/Quantity</li>
        <li>Location</li>
        <li>Custom requirements</li>
      </ul>

      <p className="mb-3 text-neutral-600 leading-relaxed">
        Estimated timelines will be shared during order confirmation.
      </p>

      <p className="mb-3 text-neutral-600 leading-relaxed">
        Please check products at the time of delivery and report visible issues within 24 hours.
      </p>

      <p className="text-neutral-600 leading-relaxed">
        Delays may occur due to factors beyond our control, such as weather, transport issues, or government restrictions.
      </p>
    </>
  )
},
{
  icon: RefreshCw,
  title: "Returns & Order Changes / Cancellations",
  content: (
    <>
      {/* Returns */}
      <p className="mb-2 font-semibold text-neutral-800">Returns</p>
      <p className="mb-2 text-neutral-600">
        Returns are accepted only in specific cases:
      </p>
      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Within a limited time after delivery</li>
        <li>Products must be unused and in original condition</li>
        <li>Custom or cut-to-size tiles cannot be returned</li>
      </ul>

      {/* Cancellations */}
      <p className="mb-2 font-semibold text-neutral-800">Cancellations</p>
      <ul className="space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Orders can be cancelled before processing begins</li>
        <li>Once production or dispatch starts, cancellation may not be possible</li>
        <li>Approved refunds or cancellations are processed within a reasonable time after review</li>
      </ul>
    </>
  )
},
{
  icon: Shield, // import Shield from lucide-react
  title: "Product Warranty Information",
  content: (
    <>
      <p className="mb-3 text-neutral-800">
        Our tiles come with manufacturer warranties covering manufacturing defects when installed and used correctly.
      </p>

      <p className="mb-2 font-semibold text-neutral-600">Warranty does not apply to:</p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Incorrect installation</li>
        <li>Misuse, handling or storage</li>
        <li>Natural wear and tear</li>
        <li>Damage due to external conditions</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        Complete details are available on our Warranty Policy page.
      </p>
    </>
  )
},
{
  icon: FileText,
  title: "Website Content & Ownership",
  content: (
    <ul className="space-y-2 list-disc list-outside pl-10 text-neutral-600">
      <li>
        All content on this website including the text, images, designs, logos, and product information belong to Origin Tiles.
      </li>
      <li>
        You may view the content for personal use only. Modifying, copying, or using it for commercial purposes without permission is not allowed.
      </li>
    </ul>
  )
},
{
  icon: Globe, // import Globe from lucide-react
  title: "External Website Links",
  content: (
    <ul className="space-y-2 list-disc list-outside pl-10 text-neutral-600">
      <li>
        Our website may include links to third-party websites for convenience or reference.
      </li>
      <li>
        We do not control these websites and are not responsible for their content, policies, or services. Visiting such sites is at your own risk.
      </li>
    </ul>
  )
},
{
  icon: Mail, // import Mail from lucide-react
  title: "Communication from Us",
  content: (
    <>
      <p className="mb-3 text-neutral-600 font-semibold">
        By contacting us or using our website, you agree that we may communicate with you via:
      </p>
      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Email</li>
        <li>Phone</li>
        <li>WhatsApp or similar channels</li>
      </ul>
      <p className="text-neutral-600 leading-relaxed">
        You may opt out of promotional communication at any time. Please ensure your contact details are accurate.
      </p>
    </>
  )
},
{
  icon: Lightbulb, // import Lightbulb from lucide-react
  title: "General Guidance",
  content: (
    <>
      <p className="mb-3 text-neutral-800">
        The information on our website is provided for general understanding only. It should not replace professional advice related to construction, design, or installation.
      </p>

      <p className="mb-3 font-semibold text-neutral-600">For best results, we recommend consulting qualified professionals for:</p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Project planning</li>
        <li>Tile installation</li>
        <li>Structural or safety decisions</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        Origin Tiles is not responsible for issues caused by incorrect selection or installation.
      </p>
    </>
  )
},
{
  icon: AlertCircle, // import AlertCircle from lucide-react
  title: "Responsibility & Limitations",
  content: (
    <>
      <p className="mb-3 font-semibold text-neutral-800">
        We aim to provide reliable products and accurate information. However, we are not responsible for:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Indirect or unexpected losses</li>
        <li>Installation errors</li>
        <li>Third-party services or websites</li>
        <li>Delays beyond our control</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        Any responsibility, where applicable, is limited to the value of the product or service involved.
      </p>
    </>
  )
},
{
  icon: User, // import User from lucide-react
  title: "Account Access & Termination",
  content: (
    <>
      <p className="mb-3 font-semibold text-neutral-800">
        We may suspend or restrict access to the website if:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Terms are violated</li>
        <li>False information is provided</li>
        <li>The website is misused</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        This does not affect legal rights or obligations already in place.
      </p>
    </>
  )
},
{
  icon: AlertCircle, // import AlertCircle from lucide-react
  title: "Unforeseen Situations",
  content: (
    <>
      <p className="mb-3 font-semibold text-neutral-800">
        Events beyond control such as:
      </p>

      <ul className="mb-4 space-y-2 list-disc list-outside pl-10 text-neutral-600">
        <li>Natural disasters</li>
        <li>Strikes or Government Actions</li>
      </ul>

      <p className="text-neutral-600 leading-relaxed">
        may cause delays. In such cases, neither party will be held responsible.
      </p>
    </>
  )
},
{
  icon: ArrowRight, // import ArrowRight from lucide-react
  title: "Transfer of Rights",
  content: (
    <p className="text-neutral-600 leading-relaxed">
      You may not transfer your rights under these terms without written permission. Origin Tiles may transfer its rights as part of business operations.
    </p>
  )
},
{
  icon: CheckCircle2, // import CheckCircle2 from lucide-react
  title: "Final Note",
  content: (
    <div className="text-neutral-600 leading-relaxed space-y-2">
      <p>
        These Terms & Conditions, along with our Privacy Policy and Warranty Policy, form the complete understanding between you and Origin Tiles.
      </p>
      <p>
        If any part of these terms is found invalid, the rest will still apply.
      </p>
    </div>
  )
},
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <PageBanner
  title="Terms & Conditions"
  subtitle="Website Terms of Usage "
  description={
    <>
      <p className="font-semibold text-white">
        Fair Use, Clear Expectations, Trusted Service
      </p>

      <p className="text-sm text-white/80">
        Last Updated: December 2025
      </p>

      <p>
        Welcome to the Origin Tiles website. These Terms & Conditions explain how
        you can use our website, products, and services. By visiting or using our
        website, you agree to follow the terms outlined below.
      </p>

      <p>
        If you do not agree with any part of these terms, we request that you do
        not use our website or services.
      </p>
    </>
  }
/><ScrollReveal>
  <div className="max-w-4xl mx-auto px-4 mt-12 text-center">
    
   <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
              Before You Continue
            </h2>
            <br></br>
    <Card className="relative border-0 shadow-lg bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden text-left">
      <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>

      <CardContent className="p-8">
        <p className="text-neutral-700 font-medium mb-3">
           Please read these terms carefully.
        </p>

        <p className="text-neutral-600 mb-5 leading-relaxed">
            If you do not agree with any part of them, we request that you stop using our website and services.
        </p>

        <p className="font-semibold text-neutral-800 mb-3">
          Using our website means you accept:
        </p>

        <ul className="space-y-2 text-neutral-600 list-disc list-inside">
          <li>How our website can be used</li>
          <li>Our Privacy Policy</li>
          <li>Any updates we publish in the future</li>
        </ul>
      </CardContent>
    </Card>

  </div>
</ScrollReveal>



      <div className="max-w-4xl mx-auto px-4 py-16">
      
       
    
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
                      <h3 className="mb-3 font-bold text-[#223B57]">
  {term.title}
</h3>

                      <div className="text-neutral-600 leading-relaxed">
  {term.content}
</div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

       

        {/* Contact Section */}
        <ScrollReveal delay={0.7}>
          <Card className="relative mt-8 bg-[#223b57] text-white border-0 shadow-xl rounded-3xl overflow-hidden">
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
            <CardContent className="p-8">
              <h2 className="mb-6 text-white">Contact & Legal Notices</h2>
              <p className="text-white/80 mb-6">
              For official communication, please contact:
              </p>
              <div className="space-y-2 text-white/90">
                <p>Email: legal@origintiles.com</p>
                <p>Phone: +91 9093833833</p>
                <p>Address: Madhapur, Hyderabad – 500018</p>
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-neutral-500">
          <p>These Terms & Conditions were last updated on October 29, 2025</p>
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
                      
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Need Help or Clarification?
                      </h2>
                      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                      If anything here is unclear, feel free to reach out.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          onClick={() => onNavigate("Contact")}
                          className="bg-white !text-[#223B57] hover:bg-white/90 rounded-xl h-12 px-8 shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                        >
                          
                          Contact Us 
                        </Button>
                       <Button
        onClick={() => onNavigate("Privacy Policy")}
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
       View Privacy Policy        
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