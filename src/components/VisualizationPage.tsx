import { useState } from "react";
import { Upload, RotateCcw, Eye, ArrowRight, Sparkles, Image as ImageIcon, Layers, Download, Share2, Save, Printer, CheckCircle2, Lightbulb, Box, Glasses } from "lucide-react";
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
    { icon: Eye, title: "Real-Time Preview", description: "Instant visualization" },
    { icon: Box, title: "3D View", description: "Interactive 3D room" },
    { icon: Glasses, title: "VR Ready", description: "Virtual reality mode" },
    { icon: Layers, title: "Opacity Control", description: "Adjust tile overlay" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Visualize Your Dream Space"
        subtitle="2D & 3D Room Visualization Tool"
        description="Experience tiles in both 2D and immersive 3D before you buy. Interactive 3D room viewer with VR support lets you walk through your space virtually with real-time preview and adjustable opacity."
        icon={Eye}
        variant="gradient"
        badge="Interactive 3D • VR Ready • Real-time Preview • Free to Use"
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
                    <h3 className="font-semibold text-[#223B57] mb-4">Select Tile Design</h3>
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
              Simple 3-Step Process
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg">
              Visualize your space in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: ImageIcon,
                title: "Select Your Room",
                description: "Choose from our sample rooms or upload your own photo for a personalized visualization experience."
              },
              {
                step: "02",
                icon: Layers,
                title: "Pick Your Tile",
                description: "Browse through our premium tile collections and select the design that matches your vision."
              },
              {
                step: "03",
                icon: Box,
                title: "View in 2D or 3D",
                description: "Toggle between 2D preview or immersive 3D room with interactive controls. VR mode available for compatible devices."
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
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Visualization Tips
            </h2>
            <p className="text-neutral-600 text-lg">
              Get the most accurate preview with these helpful tips
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Try 3D Interactive View",
                description: "Switch to 3D mode to walk around the room and see tiles from any angle. Use VR mode for the most immersive experience with compatible headsets."
              },
              {
                title: "Best Lighting",
                description: "Take photos in natural daylight for most accurate visualization results and true color representation in both 2D and 3D modes."
              },
              {
                title: "Multiple Angles in 3D",
                description: "In 3D mode, rotate the camera 360° to see how light affects tiles from different angles and room perspectives."
              },
              {
                title: "Compare Options",
                description: "Save screenshots of different tile options in both 2D and 3D views to compare side by side before making your final decision."
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

      {/* FAQ Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#223B57]/10 mb-6">
              <Lightbulb className="w-8 h-8 text-[#223B57]" />
            </div>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-lg">
              Common questions about our room visualizer
            </p>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                question: "What's the difference between 2D and 3D view?",
                answer: "2D view shows a flat overlay of tiles on room photos, while 3D view provides an interactive room where you can walk around, rotate the camera, and see tiles from any angle. 3D mode also supports VR headsets for immersive experiences."
              },
              {
                question: "How do I use the 3D interactive view?",
                answer: "Switch to the 3D tab, then use your mouse to rotate (left click + drag), pan (right click + drag), and zoom (scroll wheel). On touchscreens, use pinch gestures to zoom and swipe to rotate. Click the VR button for headset support."
              },
              {
                question: "Can I upload my own room photo?",
                answer: "Photo upload feature is coming soon! Currently, you can use our sample rooms (living room, kitchen, bathroom) to preview tiles in both 2D and 3D modes."
              },
              {
                question: "How do I save my visualizations?",
                answer: "Click the 'Save This Design' button to save your visualization. You can also download or share your design using the quick action buttons available in both 2D and 3D modes."
              },
              {
                question: "Do I need special equipment for VR mode?",
                answer: "VR mode works with WebXR-compatible browsers and VR headsets like Oculus Quest, HTC Vive, or similar devices. You can still enjoy the 3D interactive view on any device without VR equipment."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-md">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-[#223B57]/10 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-[#223B57]" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#223B57] mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {faq.answer}
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
                  Love What You See?
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Ready to Make It Real?
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Request free samples, get a custom quote, or explore more design tools to perfect your tile selection.
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
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl"
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
