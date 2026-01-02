import { useState } from "react";
import { Upload, RotateCcw, Eye, HelpCircle,Target,ArrowRight, Sparkles,Package, Image as ImageIcon, Layers, Download, Share2, Save, Printer, CheckCircle2, Box, Glasses } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { PageBanner } from "./PageBanner";
import { ThreeDRoomViewer } from "./ThreeDRoomViewer";
import { motion } from "motion/react";
import { toast } from "sonner";

interface VisualizationPageProps {
  onNavigate: (page: string) => void;
}

export function VisualizationPage({ onNavigate }: VisualizationPageProps) {
  const [selectedTile, setSelectedTile] = useState("marble-white");
  const [opacity, setOpacity] = useState([80]);
  const [selectedRoom, setSelectedRoom] = useState("living");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  const tiles = [
    {
      id: "marble-white",
      name: "Glazed Vitrified Tile Premium",
      collection: "Origin Luxe",
      image: "https://images.unsplash.com/photo-1700751636848-b54ca9ee99c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHRpbGUlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MTkwMzY2OXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "grey-stone",
      name: "PGVT Trendy Collection",
      collection: "Origin Modern",
      image: "https://images.unsplash.com/photo-1543098052-46a1387df8f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmV5JTIwc3RvbmUlMjB0aWxlJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjE5MDM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "wood-oak",
      name: "Wooden Planks Series",
      collection: "Origin Natural",
      image: "https://images.unsplash.com/photo-1743321422085-4aa12f0c7d53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwcGxhbmslMjB0aWxlJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjE5MDM2Njl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "marble-gold",
      name: "Full Body Vitrified Tile",
      collection: "Origin Elite",
      image: "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbWFyYmxlJTIwdGlsZSUyMGx1eHVyeXxlbnwxfHx8fDE3NjE5MDM2NzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const rooms = [
    {
      id: "living",
      name: "Modern Living Room",
      image: "https://images.unsplash.com/photo-1667584523543-d1d9cc828a15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxODI5Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "kitchen",
      name: "Contemporary Kitchen",
      image: "https://images.unsplash.com/photo-1641823911769-c55f23c25143?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYxODIxOTAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: "bathroom",
      name: "Luxury Bathroom",
      image: "https://images.unsplash.com/photo-1638799869566-b17fa794c4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTgzNzM3MXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const selectedTileData = tiles.find(t => t.id === selectedTile);
  const selectedRoomData = rooms.find(r => r.id === selectedRoom);

  const features = [
    { icon: Eye, title: "Instant Preview ", description: "See tile changes immediately" },
    { icon: Box, title: "Optional VR Mode", description: "Step inside your room virtually" },
    { icon: Glasses, title: "Interactive 3D View ", description: "Explore the room from every angle " },
    { icon: Layers, title: "Opacity Control", description: "Adjust tile visibility for better clarity" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Visualize Your Space in 2D & 3D"
        subtitle="See Your Space Before You Decide"
        description="See how our tiles look in your real spaces & rooms before you buy - using our 2D and interactive 3D visualizer. Test designs, finishes, and layouts in real time help you make confident design decisions."
       showWave={false}
        variant="gradient"
        badge="Live Preview | Free 3D Experience | Easy to Use | VR Ready"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Tools", onClick: () => onNavigate("Tools") },
          { label: "Room Visualizer" }
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

      {/* Visualization Tool Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                  <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] border-[#223B57]/20">
                      <Package className="w-3 h-3 mr-1" />
                         Tile Visualizer Tool
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#223B57] mb-4">
                       Plan with Clarity, Choose with Confidence
                    </h2>
                   
                  </motion.div>
                  </div>
        
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Controls Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Tile Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#223B57] mb-4">Choose Tile Design</h3>
                    <Select value={selectedTile} onValueChange={setSelectedTile}>
                      <SelectTrigger className="rounded-xl border-neutral-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiles.map((tile) => (
                          <SelectItem key={tile.id} value={tile.id}>
                            {tile.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {selectedTileData && (
                      <div className="mt-4">
                        <p className="text-xs text-neutral-500 mb-2">{selectedTileData.collection}</p>
                        <div className="relative h-32 rounded-xl overflow-hidden shadow-md">
                          <ImageWithFallback
                            src={selectedTileData.image}
                            alt={selectedTileData.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Room Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#223B57] mb-4">Select Room Type</h3>
                    <div className="space-y-2">
                      {rooms.map((room) => (
                        <button
                          key={room.id}
                          onClick={() => {
                            setSelectedRoom(room.id);
                            toast.success(`Switched to ${room.name}`);
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                            selectedRoom === room.id
                              ? 'bg-[#223B57] text-white shadow-lg'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          <div className="font-medium">{room.name}</div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Opacity Control */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#223B57] mb-4">Tile Opacity</h3>
                    <Slider
                      value={opacity}
                      onValueChange={setOpacity}
                      max={100}
                      step={1}
                      className="mb-3"
                    />
                    <div className="text-center">
                      <Badge className="bg-[#223B57]/10 text-[#223B57]">
                        {opacity[0]}%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button
                        onClick={() => {
                          toast.success("Design saved successfully!", {
                            description: "Your visualization has been saved to your account"
                          });
                        }}
                        className="w-full bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save This Design
                      </Button>
                      <Button
                        onClick={() => {
                          toast.info("Upload feature coming soon!", {
                            description: "Upload your own room photo to visualize tiles"
                          });
                        }}
                        variant="outline"
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Your Photo
                      </Button>
                      <Button
                        onClick={() => {
                          setOpacity([80]);
                          setSelectedTile("marble-white");
                          setSelectedRoom("living");
                          toast.success("Reset to default settings");
                        }}
                        variant="outline"
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Settings
                      </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-4 pt-4 border-t border-neutral-200">
                      <p className="text-xs text-neutral-500 mb-3">Quick Actions</p>
                      <div className="grid grid-cols-3 gap-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="group border-[#223B57]/20 hover:bg-[#223B57] hover:border-[#223B57] rounded-xl transition-all duration-300"
                          onClick={() => {
                            window.print();
                            toast.success("Print dialog opened");
                          }}
                          aria-label="Print"
                        >
                          <Printer className="w-4 h-4 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={2} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="group border-[#223B57]/20 hover:bg-[#223B57] hover:border-[#223B57] rounded-xl transition-all duration-300"
                          onClick={() => {
                            toast.success("Image downloaded");
                          }}
                          aria-label="Download"
                        >
                          <Download className="w-4 h-4 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={2} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="group border-[#223B57]/20 hover:bg-[#223B57] hover:border-[#223B57] rounded-xl transition-all duration-300"
                          onClick={() => {
                            toast.success("Link copied!");
                          }}
                          aria-label="Share"
                        >
                          <Share2 className="w-4 h-4 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={2} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Visualization Canvas */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="relative border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none z-10"></div>
                  
                  <CardContent className="p-6">
                    {/* View Mode Tabs */}
                    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "2d" | "3d")} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#223B57]/10 p-1 rounded-xl">
                        <TabsTrigger 
                          value="2d" 
                          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#223B57] data-[state=active]:shadow-md transition-all"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          2D Preview
                        </TabsTrigger>
                        <TabsTrigger 
                          value="3d"
                          className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#223B57] data-[state=active]:shadow-md transition-all"
                        >
                          <Box className="w-4 h-4 mr-2" />
                          3D Interactive
                          <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs">
                            VR
                          </Badge>
                        </TabsTrigger>
                      </TabsList>

                      {/* 2D View */}
                      <TabsContent value="2d" className="m-0">
                        <div className="relative min-h-[600px] bg-neutral-100 rounded-2xl overflow-hidden">
                          {/* Base Room Image */}
                          {selectedRoomData && (
                            <ImageWithFallback
                              src={selectedRoomData.image}
                              alt={selectedRoomData.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          
                          {/* Tile Overlay */}
                          {selectedTileData && (
                            <div 
                              className="absolute bottom-0 left-0 right-0 h-2/5"
                              style={{
                                backgroundImage: `url(${selectedTileData.image})`,
                                backgroundSize: '180px 180px',
                                backgroundRepeat: 'repeat',
                                opacity: opacity[0] / 100,
                                transition: 'opacity 0.3s ease'
                              }}
                            />
                          )}
                          
                          {/* Info Badge */}
                          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border border-white/40">
                            <p className="text-sm font-medium text-[#223B57]">
                              {selectedTileData?.name}
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {selectedTileData?.collection}
                            </p>
                          </div>

                          {/* Instructions Badge */}
                          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/40">
                            <p className="text-xs text-neutral-600">
                              <Sparkles className="w-3 h-3 inline mr-1" />
                              Adjust opacity to see different intensities
                            </p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* 3D View */}
                      <TabsContent value="3d" className="m-0">
                        {selectedTileData && (
                          <ThreeDRoomViewer
                            tileTexture={selectedTileData.image}
                            roomType={selectedRoom as "living" | "kitchen" | "bathroom"}
                            tileOpacity={opacity[0]}
                            onVRModeToggle={() => {
                              toast.info("VR Mode", {
                                description: "VR mode requires a VR headset. Press VR button in your browser."
                              });
                            }}
                          />
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              Simple 4-Step Process
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
             Why Use the Origin Tiles Visualizer?
            </h2>
            <p className="text-neutral-600 text-lg">
                The Origin Tiles Visualizer helps you see how tiles will look in real spaces before making a decision. It allows you to explore designs, finishes, and layouts virtually, so you can choose with clarity and confidence.
            </p>
          </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {[
              {
               
                icon: ImageIcon,
                title: "See How Tiles Look in Real Spaces Before Buying ",
                
              },
              {
                
                icon: Layers,
                title: "Compare designs without visiting multiple showrooms ",
                
              },
              {
                
                icon: Box,
                title: "Reduce Wrong Selection and Reduce Material Wastage ",
                
              },
              {
               
                icon: Layers,
                title: "Make faster, & More Confident Design Decisions. ",
                
              },
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
                    
                    <div className="relative inline-block mb-6">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <step.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#223B57] mb-3">
                      {step.title}
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
                  
                  <h2 className="text-4xl font-bold text-[#223B57] mb-4">
                    How It Works
                  </h2>
                  <p className="text-neutral-600 text-lg">
                    Visualise your space in 3 simple steps.
                  </p>
                </motion.div>
      
                <div className="grid md:grid-cols-3 gap-8">

      
                  {[
                    {
                      step: "01",
                      icon: HelpCircle,
                      title: "Choose Your Room",
                      description: " Choose a sample room or prepare to upload your own space."
                    },
                    {
                      step: "02",
                      icon: Target,
                      title: "Pick Your Tile",
                      description: " Select tiles from our collections based on style, finish, and application."
                    },
                    {
                      step: "03",
                      icon: CheckCircle2,
                      title: "Preview in 2D or 3D",
                      description: "View tiles instantly in 2D or explore them in an interactive 3D environment."
                    },
                     {
                      step: "04",
                      icon: CheckCircle2,
                      title: "Compare & Save Designs ",
                      description: "Save different tile options and compare them side by side before finalising."
                    },
                    {
                      step: "05",
                      icon: CheckCircle2,
                      title: "Save, Download & Share ",
                      description: "Download your design or share it easily with family, architects, or installers."
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
      

      {/* Tips Section */}
      <section className="py-20 bg-[#F5F3F0]">
             <div className="container max-w-6xl">
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-center mb-12"
               >
                 <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
                   Get a More Accurate Preview
                 </Badge>
                 <h2 className="text-4xl font-bold text-[#223B57] mb-4">
                 Expert Visualization Tips
                 </h2>
                 <p className="text-neutral-600 text-lg">
                   Use these tips to see your selected tiles more clearly and make better design decisions.
                 </p>
               </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "	Use the 3D View",
                description: "Switch to 3D mode to understand depth and layout the room from different angles. VR mode gives a more immersive experience on supported devices."
              },
              {
                title: "Check Lighting Conditions",
                description: " Images taken in natural daylight provide the most accurate colour and finish appearance."
              },
              {
                title: "View from Multiple Angles",
                description: " Rotate the room in 3D to understand how light and shadows affect the tile surface."
              },
              {
                title: "Compare Before Finalising",
                description: " Save and compare different tile options side by side in both 2D and 3D views."
              }
            ].map((tip, index) => (
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
                    <h4 className="font-semibold text-[#223B57] mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {tip.description}
                    </p>
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
                   From Visualization To Selection
                 </Badge>
                 <h2 className="text-4xl font-bold text-[#223B57] mb-4">
                     Turn Your Design into Reality
                 </h2>
                 <p className="text-neutral-600 text-lg">
                   Once you finalise your look:
                 </p>
               </motion.div>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


      
                  {[
                    {
                     
                      icon: HelpCircle,
                      title: "View Tiles used in Your Design",
                      
                    },
                    {
                     
                      icon: Target,
                      title: "Request Free Samples",
                      
                    },
                    {
                     
                      icon: CheckCircle2,
                      title: "Get Quantity Estimation",
                     
                    },
                     {
                     
                      icon: CheckCircle2,
                      title: "Move Directly from Visualisation to Purchase.",
                      
                    },
                    
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
                         
                          <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                            <div className="relative w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center border border-neutral-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                              <step.icon className="w-8 h-8 text-[#223B57]" strokeWidth={1.5} />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-[#223B57] mb-3">
                            {step.title}
                          </h3>
                          
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
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
                        Answers to Common Questions about the Tile Visualizer
                      </p>
                    </motion.div>
          
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                      {[
                        {
                          icon: CheckCircle2,
                          question: "What is the difference between 2D and 3D view?",
                          answer: "2D view shows tiles placed on a flat image, while 3D view lets you explore the room interactively by rotating and viewing tiles from different angles. VR mode adds a more immersive experience on supported devices."
                        },
                        {
                          icon:  CheckCircle2,
                          question: "How do I use the 3D view?",
                          answer: "Select the 3D option and use simple controls to move around the room. You can rotate, zoom, and pan using your mouse or touch gestures. VR mode can be activated if your device supports it."
                        },
                        {
                          icon: CheckCircle2,
                          question: "Can I upload a photo of my own room?",
                          answer: "This feature will be available soon. For now, you can preview tiles using our ready-made room layouts for living rooms, kitchens, and bathrooms."
                        },
                        {
                          icon: CheckCircle2,
                          question: "How can I save or share my design?",
                          answer: "You can save your selected design and download or share it using the available action buttons."
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
                        View All FAQs
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
                  Like What You See?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                   Ready to Take the Next Step?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                   Order free samples, request a quote, or explore more tools to finalise your tile choice.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Sample Request")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Request Free Sample
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Tools")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md
    text-white border-white/30
    hover:bg-white/20 hover:border-white/50
    hover:text-white
    rounded-xl h-12 px-8
    [&_svg]:text-white hover:[&_svg]:text-white
  "
                  >
                    Explore More Tools
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
