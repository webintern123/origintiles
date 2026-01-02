import { useState } from 'react';
import { ChevronRight, ChevronLeft, RotateCcw, CheckCircle2, HelpCircle, ArrowRight, Phone, Mail, Sparkles, Target, Lightbulb, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PageBanner } from './PageBanner';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface TileQuizPageProps {
  onNavigate: (page: string, productId?: string) => void;
}

interface Question {
  id: number;
  question: string;
  options: { value: string; label: string; image?: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What type of space are you tiling?',
    options: [
      { value: 'bathroom', label: 'Bathroom', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=200&fit=crop' },
      { value: 'kitchen', label: 'Kitchen', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=300&h=200&fit=crop' },
      { value: 'living', label: 'Living Room', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop' },
      { value: 'outdoor', label: 'Outdoor/Patio', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=300&h=200&fit=crop' },
      { value: 'commercial', label: 'Commercial Space', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop' }
    ]
  },
  {
    id: 2,
    question: 'What is the expected foot traffic?',
    options: [
      { value: 'low', label: 'Low - Bedrooms, guest bathrooms' },
      { value: 'medium', label: 'Medium - Living rooms, family bathrooms' },
      { value: 'high', label: 'High - Kitchens, hallways, entryways' },
      { value: 'commercial', label: 'Very High - Commercial spaces, retail' }
    ]
  },
  {
    id: 3,
    question: 'What is your preferred tile size?',
    options: [
      { value: 'small', label: 'Small (300x300mm or smaller)' },
      { value: 'medium', label: 'Medium (600x600mm)' },
      { value: 'large', label: 'Large (800x800mm or larger)' },
      { value: 'plank', label: 'Wood Plank Style (200x1200mm)' },
      { value: 'any', label: 'No Preference' }
    ]
  },
  {
    id: 4,
    question: 'What style appeals to you most?',
    options: [
      { value: 'modern', label: 'Modern & Minimalist', image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=300&h=200&fit=crop' },
      { value: 'classic', label: 'Classic & Elegant', image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=300&h=200&fit=crop' },
      { value: 'rustic', label: 'Rustic & Natural', image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4b1b?w=300&h=200&fit=crop' },
      { value: 'industrial', label: 'Industrial & Contemporary', image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=300&h=200&fit=crop' }
    ]
  },
  {
    id: 5,
    question: 'What finish do you prefer?',
    options: [
      { value: 'glossy', label: 'Glossy - High shine, reflective surface' },
      { value: 'matte', label: 'Matte - Soft, non-reflective finish' },
      { value: 'satin', label: 'Satin - Subtle sheen, semi-gloss' },
      { value: 'any', label: 'No Preference' }
    ]
  }
];

export function TileQuizPage({ onNavigate }: TileQuizPageProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      toast.error('Please select an answer', {
        description: 'Choose an option to continue'
      });
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      toast.success('Answer saved!');
    } else {
      setShowResults(true);
      toast.success('Quiz complete!', {
        description: 'Generating your personalized recommendations...'
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    toast.info('Quiz restarted');
  };

  const getRecommendations = () => {
    // Generate recommendations based on answers
    const recommendations = [
      {
        id: 'prod-1',
        name: 'Glazed Vitrified Tile Premium',
        collection: 'Origin Luxe',
        size: '24"×48" (600×1200mm)',
        finish: 'High Gloss',
        match: 95,
        image: 'https://images.unsplash.com/photo-1542481762663-641d56d23e0f?w=400&h=400&fit=crop',
        features: ['Water resistant', 'Easy to clean', 'Durable finish']
      },
      {
        id: 'prod-2',
        name: 'Wooden Planks Series',
        collection: 'Origin Natural',
        size: '8"×48" (200×1200mm)',
        finish: 'Matte',
        match: 88,
        image: 'https://images.unsplash.com/photo-1684783777567-1866b5221857?w=400&h=400&fit=crop',
        features: ['Wood-look texture', 'Slip resistant', 'Natural appeal']
      },
      {
        id: 'prod-3',
        name: 'Full Body Vitrified Tile',
        collection: 'Origin Elite',
        size: '24"×48" (600×1200mm)',
        finish: 'Satin',
        match: 82,
        image: 'https://images.unsplash.com/photo-1679216617293-6bfd7f797e19?w=400&h=400&fit=crop',
        features: ['Consistent pattern', 'High durability', 'Low maintenance']
      }
    ];

    return recommendations;
  };

  const features = [
    { icon: Target, title: "Smart Recommendations", description: " Suggestions matched to your needs" },
    { icon: Zap, title: "Quick to Complete", description: "Takes just 2 minutes " },
    { icon: CheckCircle2, title: "Expert-Led Logic", description: "Selections based on professional criteria" },
    { icon: Sparkles, title: "Personalised Results", description: "Tiles chosen for your preferences" }
  ];

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="min-h-screen bg-[#F5F3F0]">
        {/* Results Banner */}
        <PageBanner
          title="Your Perfect Tile Matches"
          subtitle="Quiz Results"
          description="Based on your preferences, we've curated the perfect tile recommendations just for you. Each match is carefully selected to fit your space, style, and requirements."
          icon={CheckCircle2}
          variant="gradient"
          badge="Personalized Recommendations • Expert Matched"
         showWave={false}
          breadcrumbs={[
            { label: "Home", onClick: () => onNavigate("Home") },
            { label: "Tools", onClick: () => onNavigate("Tools") },
            { label: "Tile Quiz", onClick: handleRestart },
            { label: "Results" }
          ]}
        />

        <section className="py-20 bg-white">
          <div className="container max-w-6xl">
            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-12 border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 border border-green-100 rounded-2xl pointer-events-none"></div>
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#223B57] mb-2">Quiz Complete!</h3>
                    <p className="text-neutral-600">
                      We found {recommendations.length} perfect tiles that match your requirements. Each recommendation is tailored to your specific needs.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    onNavigate("Product Details", rec.id);
                    toast.success('Opening product details...');
                  }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-3xl">
                      <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
                      
                      {/* Match Badge */}
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg z-10 px-3 py-1.5 border-0">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {rec.match}% Match
                      </Badge>

                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
                        <ImageWithFallback
                          src={rec.image}
                          alt={rec.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>

                      <CardContent className="p-6">
                        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">{rec.collection}</p>
                        <h3 className="font-bold text-[#223B57] text-lg mb-2 leading-tight">
                          {rec.name}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            <span>Size: {rec.size}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            <span>Finish: {rec.finish}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4 pt-3 border-t border-neutral-100">
                          <p className="text-xs font-semibold text-neutral-500 mb-2">Key Features:</p>
                          <div className="space-y-1">
                            {rec.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                                <CheckCircle2 className="w-3 h-3 text-green-500" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="space-y-2">
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("Product Details", rec.id);
                            }}
                            className="w-full bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigate("Contact");
                              toast.success('Navigating to contact page...');
                            }}
                            variant="outline"
                            className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                          >
                            <Phone className="w-3.5 h-3.5 mr-2" />
                            Request Quote
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button
                onClick={handleRestart}
                variant="outline"
                className="border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] rounded-xl h-12 px-8"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Quiz
              </Button>
              <Button
                onClick={() => onNavigate("Sample Request")}
                className="bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl h-12 px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Request Free Samples
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => onNavigate("Contact")}
                variant="outline"
                className="border-[#223B57]/30 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] rounded-xl h-12 px-8"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Expert
              </Button>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
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
                    Still Unsure?
                  </Badge>
                  <h2 className="text-white text-4xl font-bold mb-4">
                    Let Our Experts Help You Decide
                  </h2>
                  <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                    Schedule a free consultation with our tile specialists for personalized guidance.
                  </p>
                  <Button 
                    onClick={() => onNavigate("Contact")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Book Consultation
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Quiz Questions View
  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Find Tiles That Suit Your Space"
        subtitle="Tile Selection Quiz"
        description="Answer a few quick questions to get tile suggestions based on your space, style, and usage. This quiz helps you narrow down the right options without spending hours browsing through options."
       
        variant="gradient"
        badge="5 Simple Questions | Takes 2 Minutes | Customized Results"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Tools", onClick: () => onNavigate("Tools") },
          { label: "Tile Quiz" }
        ]}
      />

      {/* Features Bar */}
      <section className="relative -mt-20 z-10 mb-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
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
                        <feature.icon className="w-6 h-6 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div className="font-semibold text-[#223B57] mb-1">{feature.title}</div>
                    <div className="text-xs text-neutral-600">{feature.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-[#223B57]">
                Question {currentStep + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[#223B57]">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="relative border-0 shadow-2xl bg-white rounded-3xl overflow-hidden mb-8">
              <div className="absolute inset-0 border border-white/40 rounded-3xl pointer-events-none"></div>
              
              <CardContent className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-[#223B57] mb-8">
                  {currentQuestion.question}
                </h2>

                <RadioGroup
                  value={answers[currentQuestion.id] || ''}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Label
                        htmlFor={option.value}
                        className="flex items-center p-4 rounded-2xl border-2 border-neutral-200 hover:border-[#223B57] cursor-pointer transition-all duration-300 has-[:checked]:border-[#223B57] has-[:checked]:bg-[#223B57]/5 has-[:checked]:shadow-lg"
                      >
                        <RadioGroupItem value={option.value} id={option.value} className="mr-4" />
                        
                        {option.image && (
                          <div className="w-20 h-14 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                            <ImageWithFallback
                              src={option.image}
                              alt={option.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <span className="font-medium text-neutral-700">
                          {option.label}
                        </span>
                      </Label>
                    </motion.div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl h-12 px-6"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-[#223B57] hover:bg-[#1a2d43] text-white shadow-lg hover:shadow-xl transition-all rounded-xl h-12 px-6"
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next Question'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
       {/* WHY TILE QUIZ IS REQUIRED - CARDS */}
<section className="py-20 bg-[#F5F3F0]">
  <div className="container max-w-6xl">
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
        Why Tile Quiz Is Required
      </Badge>

      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        A Smarter Way to Choose Tiles
      </h2>

      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
        The Origin Tiles Quiz is a simple tool that helps you find suitable tiles based on how and where you plan to use them. Choosing tiles can be confusing. This quiz simplifies the process by guiding you toward tiles that fit your needs.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          icon: Target,
          title: "Personalised tile recommendations",
         
        },
        {
          icon: Zap,
          title: "Match scores for each suggestion",
          
        },
        {
          icon: CheckCircle2,
          title: "Key features and usage suitability",
         
        },
        {
          icon: Sparkles,
          title: "Direct links to explore the tiles.",
          
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-md rounded-3xl h-full group">
            <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>

            <CardContent className="p-8 text-center">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#223B57]/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-[#223B57]" />
              </div>

              <h3 className="text-lg font-semibold text-[#223B57] mb-3">
                {item.title}
              </h3>

             
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              Quick & Personalised Tile Quiz 
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg">
              Find the Right Tiles in Just 4 Simple Steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {[
              {
                step: "01",
                icon: HelpCircle,
                title: "Answer Questions About Your Space",
                description: "Tell us where the tiles will be used — bathroom, kitchen, living area, or other spaces."
              },
              {
                step: "02",
                icon: Target,
                title: "Share Style, Finish & Usage Preferences",
                description: "Choose your preferred look, finish, and how much daily use the space will have."
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "	Smart Matching & AI Analysis",
                description: "Your answers are matched with tiles based on practical selection rules used by professionals."
              },
               {
                step: "04",
                icon: CheckCircle2,
                title: "Get Personalised Recommendations",
                description: "Receive tile suggestions that best suit your space and preferences."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl group h-full">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl font-bold text-[#223B57]/10 mb-4">
                      {step.step}
                    </div>
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <step.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
                      </div>
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

      {/* Benefits Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#223B57]/10 mb-6">
              <Sparkles className="w-8 h-8 text-[#223B57]" />
            </div>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Why Take the Quiz?
            </h2>
            <p className="text-neutral-600 text-lg">
              A quicker and smarter way to choose tiles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: "Personalised Suggestions",
                description: "Get tile options matched to your space, style, and everyday use."
              },
              {
                icon: Zap,
                title: "Saves Time & Effort",
                description: "Avoid browsing endless designs. Find the right options in just a few minutes."
              },
              {
                icon: CheckCircle2,
                title: "Practical Selection Logic",
                description: " Recommendations are based on real usage, performance, and design suitability."
              },
              {
                icon: Lightbulb,
                title: "Discover Better Fits",
                description: "See tile options you may not have considered but work perfectly for your needs."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden h-full border-l-4 border-l-[#223B57]">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center">
                          <benefit.icon className="w-6 h-6 text-[#223B57]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#223B57] mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
{/* WHY TILE QUIZ IS REQUIRED - CARDS */}
<section className="py-20 bg-white">
  <div className="container max-w-6xl">
    
    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-10"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
        Match Score & Feature Highlights
      </Badge>

      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        How Your Tile Matches Are Shown
      </h2>
    </motion.div>

    {/* LEFT-ALIGNED SUBHEADING */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <p className="text-[#223B57] font-semibold text-lg">
        Each recommended tile includes:
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[
        {
          icon: Target,
          title: "Match Percentage",
        },
        {
          icon: Zap,
          title: "Best-use application (Wall/Floor)",
        },
        {
          icon: CheckCircle2,
          title: "Finish Type",
        },
        {
          icon: Sparkles,
          title: "Why it suits your space",
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-md rounded-3xl h-full group">
            <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>

            <CardContent className="p-8 text-center">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#223B57]/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-[#223B57]" />
              </div>

              <h3 className="text-base font-semibold text-[#223B57]">
                {item.title}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
<br></br>
    <motion.p
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="mt-10 text-neutral-600 text-base text-center italic"
>
  “This makes comparison easy and transparent.”
</motion.p>

  </div>
</section>

{/* RETAKE QUIZ OR EXPLORE MORE */}
<section className="py-16 bg-[#F5F3F0]">
  <div className="container max-w-4xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h3 className="text-2xl font-bold text-[#223B57] mb-3">
        Retake Quiz or Explore More Options
      </h3>

      <p className="text-neutral-600 mb-8">
        You can retake the quiz anytime with different answers or browse the full
        tile collection if you want to explore further.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
           onClick={() => onNavigate("Tile Quiz")}
          variant="outline"
          className="border-[#223B57] text-[#223B57] hover:bg-[#223B57]/5 rounded-xl h-12 px-8"
        >
          Retake Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Divider */}
        <span className="hidden sm:block text-neutral-400 font-medium">|</span>

        <Button
          onClick={() => onNavigate("Products")}
          className="bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl h-12 px-8 shadow-lg"
        >
          Browse All Tiles
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  </div>
</section>


{/* FROM QUIZ RESULTS TO TILE SELECTION */}
<section className="py-20 bg-white">
  <div className="container max-w-6xl">

    {/* Section Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
        From Quiz Results to Tile Selection
      </Badge>

      <h2 className="text-4xl font-bold text-[#223B57] mb-4">
        Quiz → Tools → Final Choice
      </h2>

      <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
       Once you get your results, you can:
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
      {[
        {
          icon: CheckCircle2,
          title: "View Matched Tile Details from Tile Selection Quiz",
          
        },
        {
          icon: Sparkles,
          title: "Try tiles in the Tile Visualizer",
         
        },
        {
          icon: Target,
          title: "Calculate Quantity using the Tile Calculator",
          
        },
        {
          icon: Zap,
          title: "Request Free Samples",
          
        },
        {
          icon: Phone,
          title: "Contact Experts for Guidance.",
          
        }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-md rounded-3xl h-full group">
            <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none"></div>

            <CardContent className="p-8 text-center">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#223B57]/10 mb-6 group-hover:scale-110 transition-transform duration-500">
                <item.icon className="w-7 h-7 text-[#223B57]" />
              </div>

              <h3 className="text-lg font-semibold text-[#223B57] mb-2">
                {item.title}
              </h3>

             
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Closing Line */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center text-neutral-600 text-base italic"
    >
      “This makes your journey smooth from selection to purchase.”
    </motion.p>

  </div>
</section>


     
      {/* === FAQ QUICK SECTION - Top Questions === */}
                <section className="section-padding bg-[#F5F3F0]">
                  <div className="container">
                    <motion.div
                      className="text-center mb-12"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                        Frequently Asked Questions
                      </h2>
                      <p className="text-lg text-neutral-600">
                        Common questions about tile calculations
                      </p>
                    </motion.div>
          
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {[
                        {
                          icon: CheckCircle2,
                          question: "How accurate are the quiz results?",
                          answer: " The quiz uses practical tile selection criteria based on space, usage, and finish suitability."
                        },
                        {
                          icon:  CheckCircle2,
                          question: "Can I retake the quiz?",
                          answer: "Yes, you can take the quiz as many times as you like with different preferences."
                        },
                        {
                          icon: CheckCircle2,
                          question: "Do I need to sign up to use the quiz?",
                          answer: " No. The quiz is free and does not require an account."
                        },
                        {
                          icon: CheckCircle2,
                          question: "What if I need more help after the quiz?",
                          answer: " You can explore tools, request samples, or contact our experts for personal assistance."
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
                        onClick={() => onNavigate("FAQ")}
                        variant="outline"
                        size="lg"
                        className="border-2 border-[#223B57] text-[#223B57] hover:bg-[#223B57] hover:text-white"
                      >
                        Ready to Begin? Start with Confidence
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:text-white" />
                      </Button>
                    </motion.div>
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
                  Ready to Get Started?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Find Tiles That Fit Your Space Now
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                 Start the quiz and get tile suggestions made for your needs that suit your space, style, and usage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Start the Quiz 
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Products")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md
    text-white border-white/30
    hover:bg-white/20 hover:border-white/50
    hover:text-white
    rounded-xl h-12 px-8
    [&_svg]:text-white hover:[&_svg]:text-white
  "
                  >
                    Browse All Tiles
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
