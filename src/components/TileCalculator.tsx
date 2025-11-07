import { useState } from "react";
import { Calculator, Info, Ruler, Zap, ArrowRight, CheckCircle2, Layers, Grid3x3, Lightbulb, TrendingUp, Package } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PageBanner } from "./PageBanner";
import { motion } from "motion/react";
import { toast } from "sonner";

interface TileCalculatorProps {
  onNavigate: (page: string) => void;
}

export function TileCalculator({ onNavigate }: TileCalculatorProps) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileSize, setTileSize] = useState("");
  const [gap, setGap] = useState("2");
  const [result, setResult] = useState<number | null>(null);
  const [unit, setUnit] = useState<"feet" | "meters">("feet");
  const [patternType, setPatternType] = useState<"standard" | "diagonal" | "herringbone">("standard");

  const tileSizes = [
    { label: '12" x 12" (300mm x 300mm)', value: '300', popular: false },
    { label: '16" x 16" (400mm x 400mm)', value: '400', popular: false },
    { label: '18" x 18" (450mm x 450mm)', value: '450', popular: false },
    { label: '24" x 24" (600mm x 600mm)', value: '600', popular: true },
    { label: '24" x 48" (600mm x 1200mm)', value: '600x1200', popular: true },
    { label: '32" x 32" (800mm x 800mm)', value: '800', popular: true },
    { label: '32" x 64" (800mm x 1600mm)', value: '800x1600', popular: false }
  ];

  const features = [
    { icon: Calculator, title: "Instant Results", description: "Get accurate calculations instantly" },
    { icon: Layers, title: "10% Wastage", description: "Includes allowance for cuts" },
    { icon: Grid3x3, title: "All Tile Sizes", description: "Supports all standard sizes" },
    { icon: CheckCircle2, title: "Professional", description: "Industry-standard formulas" }
  ];

  const calculateTiles = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const g = parseFloat(gap);
    
    if (!l || !w || !tileSize) {
      toast.error("Missing information", {
        description: "Please fill in all required fields to calculate."
      });
      return;
    }

    // Convert to mm based on unit
    const conversionFactor = unit === "feet" ? 304.8 : 1000;
    const lengthMm = l * conversionFactor;
    const widthMm = w * conversionFactor;
    const areaMm2 = lengthMm * widthMm;

    let tileSizeMm: number;
    let tileAreaMm2: number;

    if (tileSize.includes('x')) {
      const [ts1, ts2] = tileSize.split('x').map(Number);
      tileAreaMm2 = (ts1 + g) * (ts2 + g);
    } else {
      tileSizeMm = parseFloat(tileSize);
      tileAreaMm2 = (tileSizeMm + g) * (tileSizeMm + g);
    }

    const tilesNeeded = Math.ceil(areaMm2 / tileAreaMm2);
    
    // Adjust wastage based on pattern type
    let wastageMultiplier = 1.1; // 10% default
    if (patternType === "diagonal") wastageMultiplier = 1.15; // 15%
    if (patternType === "herringbone") wastageMultiplier = 1.2; // 20%
    
    const tilesWithWastage = Math.ceil(tilesNeeded * wastageMultiplier);
    
    setResult(tilesWithWastage);
    
    const unitLabel = unit === "feet" ? "ft" : "m";
    toast.success("Calculation complete!", {
      description: `You need ${tilesWithWastage} tiles for your ${l}${unitLabel} x ${w}${unitLabel} room.`
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      <PageBanner
        title="Calculate Your Tile Needs"
        subtitle="Tile Calculator"
        description="Professional estimation tool for accurate tile quantity calculation. Includes 10% wastage allowance for cuts and breakage. Get instant results for your project."
        icon={Calculator}
        variant="image"
        backgroundImage="https://images.unsplash.com/photo-1589530006797-d67347f18caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80"
        badge="Free Professional Tool • Instant Results"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Tools", onClick: () => onNavigate("Tools") },
          { label: "Tile Calculator" }
        ]}
      />

      {/* Features Stats */}
      <section className="relative -mt-20 z-10 mb-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md">
                  <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-3">
                      <div className="absolute inset-0 bg-[#223B57]/10 blur-xl rounded-full"></div>
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 backdrop-blur-sm flex items-center justify-center border border-[#223B57]/20 group-hover:scale-110 group-hover:rotate-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] group-hover:border-[#223B57] transition-all duration-500">
                        <feature.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
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

      {/* Calculator Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Input Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              
              <Card className="relative border-0 shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden">
                <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#223B57] flex items-center gap-2">
                      <Ruler className="w-5 h-5" />
                      Enter Your Room Dimensions
                    </CardTitle>
                    <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setUnit("feet")}
                        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                          unit === "feet"
                            ? "bg-[#223B57] text-white shadow-md"
                            : "text-neutral-600 hover:text-[#223B57]"
                        }`}
                      >
                        Feet
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit("meters")}
                        className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                          unit === "meters"
                            ? "bg-[#223B57] text-white shadow-md"
                            : "text-neutral-600 hover:text-[#223B57]"
                        }`}
                      >
                        Meters
                      </button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="length" className="text-[#223B57]">Length ({unit}) *</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="Enter length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="mt-2 rounded-xl border-neutral-200 focus:border-[#223B57]"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="width" className="text-[#223B57]">Width ({unit}) *</Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="Enter width"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="mt-2 rounded-xl border-neutral-200 focus:border-[#223B57]"
                      min="0"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tileSize" className="text-[#223B57]">Tile Size *</Label>
                    <Select value={tileSize} onValueChange={setTileSize}>
                      <SelectTrigger className="mt-2 rounded-xl border-neutral-200">
                        <SelectValue placeholder="Select tile size" />
                      </SelectTrigger>
                      <SelectContent>
                        {tileSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="patternType" className="text-[#223B57]">Installation Pattern</Label>
                    <Select value={patternType} onValueChange={(value: any) => setPatternType(value)}>
                      <SelectTrigger className="mt-2 rounded-xl border-neutral-200">
                        <SelectValue placeholder="Select pattern" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard (10% wastage)</SelectItem>
                        <SelectItem value="diagonal">Diagonal (15% wastage)</SelectItem>
                        <SelectItem value="herringbone">Herringbone (20% wastage)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="gap" className="text-[#223B57]">Grout Gap (mm)</Label>
                    <Input
                      id="gap"
                      type="number"
                      value={gap}
                      onChange={(e) => setGap(e.target.value)}
                      className="mt-2 rounded-xl border-neutral-200 focus:border-[#223B57]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button 
                      onClick={calculateTiles} 
                      className="bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl h-12"
                    >
                      <Calculator className="mr-2 w-5 h-5" />
                      Calculate
                    </Button>
                    <Button 
                      onClick={() => {
                        setLength("");
                        setWidth("");
                        setTileSize("");
                        setGap("2");
                        setPatternType("standard");
                        setResult(null);
                        toast.info("Form cleared");
                      }}
                      variant="outline"
                      className="border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl h-12"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Result & Info */}
            <div className="space-y-6">
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#223B57]/20 to-transparent rounded-2xl blur-xl"></div>
                  
                  <Card className="relative border-0 shadow-2xl bg-white rounded-2xl overflow-hidden border-t-4 border-t-[#223B57]">
                    <CardHeader>
                      <CardTitle className="text-[#223B57]">Calculation Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="text-7xl font-bold text-[#223B57] mb-4">{result}</div>
                        <div className="text-xl text-neutral-600 font-semibold">Tiles Required</div>
                        <Badge className="mt-4 bg-[#223B57]/10 text-[#223B57]">
                          Including {patternType === "standard" ? "10%" : patternType === "diagonal" ? "15%" : "20%"} wastage
                        </Badge>
                      </div>
                      <div className="bg-gradient-to-br from-neutral-50 to-white p-6 rounded-xl mt-6 border border-neutral-100">
                        <h4 className="font-semibold text-[#223B57] mb-3">Calculation Details:</h4>
                        <ul className="text-sm text-neutral-600 space-y-2">
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            Room Area: {length && width ? (parseFloat(length) * parseFloat(width)).toFixed(2) : '0'} sq {unit === "feet" ? "ft" : "m"}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            Tile Size: {tileSizes.find(s => s.value === tileSize)?.label || 'Not selected'}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            Pattern: {patternType.charAt(0).toUpperCase() + patternType.slice(1)}
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            Grout Gap: {gap}mm
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#223B57]"></div>
                            Wastage: {patternType === "standard" ? "10%" : patternType === "diagonal" ? "15%" : "20%"}
                          </li>
                        </ul>
                      </div>
                      
                      {/* Contact for Pricing */}
                      <div className="bg-gradient-to-br from-[#223B57]/5 to-transparent p-6 rounded-xl mt-6 border-2 border-[#223B57]/20">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#223B57] flex items-center justify-center flex-shrink-0">
                            <Info className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#223B57] mb-2">Ready to Order?</h4>
                            <p className="text-sm text-neutral-600 mb-4">
                              Get personalized pricing and expert advice for your {result} tile project.
                            </p>
                            <Button 
                              onClick={() => {
                                onNavigate("Contact");
                                toast.success("Contact form opened with your calculation details");
                              }}
                              className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              Request Quote for {result} Tiles
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 rounded-2xl shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="text-[#223B57] font-semibold mb-4 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Additional Calculations
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
                          <div>
                            <div className="text-sm text-neutral-600">Boxes Needed</div>
                            <div className="font-bold text-[#223B57]">≈ {Math.ceil(result / 10)} boxes</div>
                            <div className="text-xs text-neutral-500">@ 10 tiles per box (varies by manufacturer)</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
                          <div>
                            <div className="text-sm text-neutral-600">Estimated Grout</div>
                            <div className="font-bold text-[#223B57]">Contact for exact amount</div>
                            <div className="text-xs text-neutral-500">Depends on tile size and joint width</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <Info className="w-5 h-5 text-[#223B57] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[#223B57] font-semibold mb-3">Tips for Accurate Calculation</h4>
                        <ul className="text-sm text-neutral-600 space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#223B57] flex-shrink-0 mt-0.5" />
                            Measure your room carefully
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#223B57] flex-shrink-0 mt-0.5" />
                            Round up measurements to the nearest {unit}
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#223B57] flex-shrink-0 mt-0.5" />
                            Consider ordering extra tiles for future repairs
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#223B57] flex-shrink-0 mt-0.5" />
                            Select correct pattern type for accurate wastage
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-[#223B57] mb-4">Need Expert Assistance?</h4>
                    <p className="text-sm text-neutral-600 mb-4">
                      Our team of experts can help you with tile selection and installation planning.
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => onNavigate("Contact")}
                        className="w-full bg-[#223B57] hover:bg-[#1a2d43] active:bg-[#223B57] text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                      >
                        Contact Our Experts
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button 
                        onClick={() => onNavigate("Products")}
                        variant="outline" 
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        Browse Tiles
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Measurement Guide */}
      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              Measurement Guide
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How to Measure Your Room
            </h2>
            <p className="text-neutral-600 text-lg">
              Follow these simple steps for accurate measurements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Visual Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden h-full">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-[#223B57]/5 to-[#223B57]/10 rounded-xl relative border-2 border-dashed border-[#223B57]/30">
                    {/* Room visualization */}
                    <div className="absolute inset-6 border-4 border-[#223B57] rounded-lg flex items-center justify-center">
                      <div className="text-[#223B57] font-bold text-lg">ROOM</div>
                    </div>
                    
                    {/* Length arrow */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-[#223B57]"></div>
                      <div className="bg-[#223B57] text-white text-xs px-2 py-1 rounded font-semibold">Length</div>
                      <div className="w-0.5 h-4 bg-[#223B57]"></div>
                    </div>
                    
                    {/* Width arrow */}
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center">
                      <div className="h-0.5 w-4 bg-[#223B57]"></div>
                      <div className="bg-[#223B57] text-white text-xs px-2 py-1 rounded font-semibold -rotate-90">Width</div>
                      <div className="h-0.5 w-4 bg-[#223B57]"></div>
                    </div>

                    {/* Measurement points */}
                    {[
                      { top: "6px", left: "6px" },
                      { top: "6px", right: "6px" },
                      { bottom: "6px", left: "6px" },
                      { bottom: "6px", right: "6px" }
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-3 h-3 bg-[#223B57] rounded-full"
                        style={pos}
                      ></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                {
                  step: 1,
                  title: "Measure Wall to Wall",
                  description: "Measure the longest wall for length. Include the full distance from wall to wall."
                },
                {
                  step: 2,
                  title: "Measure Perpendicular Wall",
                  description: "Measure the width at a right angle to your length measurement."
                },
                {
                  step: 3,
                  title: "Account for Obstacles",
                  description: "For large fixed items (built-in cabinets), measure around them separately."
                },
                {
                  step: 4,
                  title: "Record in {unit}",
                  description: unit === "feet" 
                    ? "Write measurements in feet with decimals (e.g., 12.5 ft)."
                    : "Write measurements in meters with decimals (e.g., 3.8 m)."
                }
              ].map((instruction, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-neutral-50">
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-[#223B57] text-white flex items-center justify-center font-bold text-sm">
                          {instruction.step}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#223B57] mb-1">
                          {instruction.title}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {instruction.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              Understanding the Calculator
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
              Our professional tile calculator uses industry-standard formulas to ensure accuracy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: Ruler,
                title: "Measure Your Space",
                description: "Enter the length and width of your room in feet. For irregular shapes, break them into rectangles and calculate separately."
              },
              {
                step: "02",
                icon: Grid3x3,
                title: "Select Tile Size",
                description: "Choose your desired tile size from our comprehensive list. Popular sizes are marked for quick selection."
              },
              {
                step: "03",
                icon: TrendingUp,
                title: "Get Results + 10%",
                description: "Receive instant results including 10% wastage allowance for cuts, breakage, and future repairs."
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

      {/* Why 10% Wastage Section */}
      <section className="py-20 bg-white">
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
              Why 10% Wastage?
            </h2>
            <p className="text-neutral-600 text-lg">
              Professional insight into our calculation methodology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Package,
                title: "Cutting Requirements",
                description: "Edge tiles need to be cut to fit perfectly, resulting in unusable pieces that must be accounted for."
              },
              {
                icon: CheckCircle2,
                title: "Manufacturing Variance",
                description: "Small variations in tile size and occasional defects mean you need extra tiles to ensure quality."
              },
              {
                icon: Layers,
                title: "Pattern Matching",
                description: "Certain patterns and layouts require specific tile orientations, increasing material needs."
              },
              {
                icon: Zap,
                title: "Future Repairs",
                description: "Having extra tiles from the same batch ensures perfect color matching for future repairs."
              }
            ].map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-neutral-50 to-white rounded-2xl h-full group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-[#223B57]/10 flex items-center justify-center group-hover:bg-[#223B57] group-hover:scale-110 transition-all duration-300">
                          <reason.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-[#223B57] mb-2">
                          {reason.title}
                        </h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          {reason.description}
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

      {/* Popular Room Sizes Quick Reference */}
      <section className="py-20 bg-[#F5F3F0]">
        <div className="container max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-[#223B57]/10 text-[#223B57] px-4 py-2">
              Quick Reference
            </Badge>
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Popular Room Sizes
            </h2>
            <p className="text-neutral-600 text-lg">
              Common room dimensions for quick calculations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Small Bathroom", size: "5ft × 8ft", area: "40 sq ft" },
              { name: "Standard Bathroom", size: "8ft × 10ft", area: "80 sq ft" },
              { name: "Master Bathroom", size: "10ft × 12ft", area: "120 sq ft" },
              { name: "Small Kitchen", size: "10ft × 10ft", area: "100 sq ft" },
              { name: "Standard Kitchen", size: "12ft × 15ft", area: "180 sq ft" },
              { name: "Large Kitchen", size: "15ft × 20ft", area: "300 sq ft" }
            ].map((room, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => {
                    const [l, w] = room.size.replace(/ft/g, '').split('×').map(s => s.trim());
                    setLength(l);
                    setWidth(w);
                    toast.success(`${room.name} dimensions loaded`);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                >
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/0 to-[#223B57]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 text-center relative">
                    <div className="font-bold text-[#223B57] mb-2 group-hover:scale-105 transition-transform">
                      {room.name}
                    </div>
                    <div className="text-2xl font-bold text-[#223B57] mb-1">
                      {room.size}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {room.area}
                    </div>
                    <div className="mt-3 text-xs text-[#223B57] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                      Click to use <ArrowRight className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[#223B57] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 text-lg">
              Everything you need to know about tile calculations
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Should I round up or down when measuring?",
                a: "Always round up to the nearest foot. It's better to have slightly more tiles than to run short during installation."
              },
              {
                q: "Is 10% wastage always enough?",
                a: "For standard installations, 10% is sufficient. However, for diagonal patterns, herringbone, or complex layouts, consider 15-20% wastage."
              },
              {
                q: "Can I calculate for multiple rooms at once?",
                a: "Calculate each room separately, then add the total tiles needed. This gives you more accurate results for each space."
              },
              {
                q: "What if my room has irregular shapes?",
                a: "Break irregular rooms into rectangles, calculate each section separately, and add the results together."
              },
              {
                q: "Do I need to account for obstacles like cabinets?",
                a: "For large fixed obstacles (cabinets, islands), subtract their area. For small fixtures, the 10% wastage will cover it."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl bg-gradient-to-br from-white to-neutral-50">
                  <CardContent className="p-6">
                    <h4 className="font-bold text-[#223B57] mb-2 flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      {faq.q}
                    </h4>
                    <p className="text-neutral-600 text-sm leading-relaxed pl-7">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
                  Free Tools & Resources
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Explore More Design Tools
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Visualize tiles in your room, build custom patterns, and get expert recommendations for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Visualization")}
                    className="bg-white text-[#223B57] hover:bg-white/90 hover:scale-105 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    Room Visualizer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Tile Pattern Builder")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl"
                  >
                    Pattern Builder
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
