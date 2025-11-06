import { useState } from "react";
import { 
  Calculator, 
  Eye, 
  Grid3x3, 
  HelpCircle, 
  Layers, 
  Ruler, 
  Sparkles,
  ArrowRight,
  Lightbulb,
  Palette,
  Zap,
  CheckCircle2
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { PageBanner } from "./PageBanner";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ToolsPageProps {
  onNavigate: (page: string) => void;
}

export function ToolsPage({ onNavigate }: ToolsPageProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | "planning" | "design" | "learning">("all");

  const tools = [
    {
      id: "calculator",
      title: "Tile Calculator",
      description: "Calculate exact quantity of tiles needed for your project with 10% wastage included",
      icon: Calculator,
      category: "planning",
      features: ["Instant results", "All tile sizes", "Wastage included", "Print results"],
      badge: "Most Popular",
      badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500",
      page: "Tile Calculator",
      color: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-600"
    },
    {
      id: "visualizer",
      title: "Room Visualizer",
      description: "Experience tiles in 2D preview or immersive 3D interactive room with VR support",
      icon: Eye,
      category: "design",
      features: ["3D Interactive", "VR Ready", "2D Preview", "Save designs"],
      badge: "3D/VR",
      badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      page: "Visualization",
      color: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-600"
    },
    {
      id: "pattern-builder",
      title: "Pattern Builder",
      description: "Create custom tile layouts and patterns for unique designs in your space",
      icon: Grid3x3,
      category: "design",
      features: ["Custom patterns", "Color mixing", "Export designs", "Pattern library"],
      badge: "Creative",
      badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      page: "Tile Pattern Builder",
      color: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-600"
    },
    {
      id: "tile-quiz",
      title: "Tile Selection Quiz",
      description: "Answer a few questions and get personalized tile recommendations for your project",
      icon: HelpCircle,
      category: "learning",
      features: ["Personalized", "Expert recommendations", "Save results", "Easy to use"],
      badge: "Smart",
      badgeColor: "bg-gradient-to-r from-indigo-500 to-blue-500",
      page: "Tile Quiz",
      color: "from-indigo-500/10 to-blue-500/10",
      iconColor: "text-indigo-600"
    }
  ];

  const categories = [
    { id: "all", label: "All Tools", icon: Sparkles },
    { id: "planning", label: "Planning", icon: Ruler },
    { id: "design", label: "Design", icon: Palette },
    { id: "learning", label: "Learning", icon: Lightbulb }
  ];

  const filteredTools = activeCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const benefits = [
    {
      icon: Zap,
      title: "Save Time",
      description: "Professional results in minutes"
    },
    {
      icon: CheckCircle2,
      title: "Accurate",
      description: "Industry-standard calculations"
    },
    {
      icon: Sparkles,
      title: "Free Forever",
      description: "No hidden costs or limits"
    },
    {
      icon: Layers,
      title: "Expert Built",
      description: "Designed by tile professionals"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Professional Design Tools"
        subtitle="Free Tools & Resources"
        description="Everything you need to plan, visualize, and perfect your tile project. Professional-grade tools completely free to use, designed by experts for DIY enthusiasts and professionals."
        icon={Layers}
        variant="gradient"
        badge="4 Free Tools • Real-time Results • No Signup Required"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Tools" }
        ]}
      />

      {/* Benefits Bar */}
      <section className="relative -mt-20 z-10 mb-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
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
                        <benefit.icon className="w-6 h-6 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="font-semibold text-[#223B57] mb-1">{benefit.title}</div>
                    <div className="text-xs text-neutral-600">{benefit.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-y border-neutral-200">
        <div className="container">
          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id as any)}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`
                  rounded-full px-6 h-11 transition-all duration-300 whitespace-nowrap
                  ${activeCategory === category.id 
                    ? "bg-[#223B57] text-white hover:bg-[#1a2d43] shadow-lg" 
                    : "border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5"
                  }
                `}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              {filteredTools.length} {filteredTools.length === 1 ? 'Tool' : 'Tools'} Available
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Choose Your Tool
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              All tools are completely free and require no signup. Start planning your perfect tile project today.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => {
                  onNavigate(tool.page);
                  toast.success(`Opening ${tool.title}...`);
                }}
              >
                <div className="relative h-full">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl">
                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <CardContent className="p-8 relative">
                      {/* Badge */}
                      {tool.badge && (
                        <Badge className={`${tool.badgeColor} text-white mb-4 shadow-lg`}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {tool.badge}
                        </Badge>
                      )}

                      {/* Icon */}
                      <div className="relative inline-block mb-6">
                        <div className={`absolute inset-0 ${tool.iconColor.replace('text-', 'bg-')}/20 blur-2xl rounded-full`}></div>
                        <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <tool.icon className={`w-8 h-8 ${tool.iconColor}`} strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-2xl font-bold text-[#223B57] mb-3 group-hover:text-[#1a2d43] transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-neutral-600 mb-6 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(tool.page);
                        }}
                        className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-12 group/btn"
                      >
                        <span>Launch Tool</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How Our Tools Help You
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Three simple steps to perfect your tile project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Select Your Tool",
                description: "Choose from calculator, visualizer, pattern builder, or quiz based on your needs"
              },
              {
                step: "02",
                title: "Input Your Details",
                description: "Enter room dimensions, upload photos, or answer questions to get personalized results"
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive instant calculations, visualizations, or recommendations to make informed decisions"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl group">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-[#223B57]/10 mb-4">
                      {step.step}
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

      {/* CTA Section */}
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
                  Need Professional Help?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Our Experts Are Here to Help
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Get personalized advice, free samples, and professional guidance for your tile project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Contact Design Team
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Products")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl"
                  >
                    Browse Tile Collections
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
