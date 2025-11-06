import { useState } from 'react';
import { motion } from 'motion/react';
import { Grid3x3, Shuffle, Trash2, Download, Share2, Save, ArrowRight, Sparkles, Palette } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { PageBanner } from './PageBanner';
import { toast } from 'sonner';

interface TilePatternBuilderPageProps {
  onNavigate: (page: string) => void;
}

interface TilePattern {
  id: string;
  color: string;
  image?: string;
}

const PRESET_PATTERNS = [
  { name: 'Checkerboard', layout: 'checkerboard', description: 'Classic alternating pattern' },
  { name: 'Brick Bond', layout: 'brick', description: 'Traditional brick layout' },
  { name: 'Diagonal', layout: 'diagonal', description: 'Dynamic diagonal stripes' },
  { name: 'Herringbone', layout: 'herringbone', description: 'Elegant V-pattern' }
];

const PRESET_COLORS = [
  { name: 'Cream', value: '#F5F3F0' },
  { name: 'Navy', value: '#223B57' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Sage', value: '#7B8B78' },
  { name: 'Charcoal', value: '#4A4A4A' },
  { name: 'Beige', value: '#E8E5E0' }
];

export function TilePatternBuilderPage({ onNavigate }: TilePatternBuilderPageProps) {
  const [gridSize] = useState({ rows: 10, cols: 10 });
  const [tiles, setTiles] = useState<TilePattern[]>(
    Array(100).fill(null).map((_, i) => ({
      id: `tile-${i}`,
      color: PRESET_COLORS[0].value
    }))
  );
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleTileClick = (index: number) => {
    const newTiles = [...tiles];
    newTiles[index] = { ...newTiles[index], color: selectedColor };
    setTiles(newTiles);
  };

  const handleTileMouseEnter = (index: number) => {
    if (isDrawing) {
      handleTileClick(index);
    }
  };

  const randomize = () => {
    const newTiles = tiles.map((tile) => ({
      ...tile,
      color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)].value
    }));
    setTiles(newTiles);
    toast.success('Pattern randomized', {
      description: 'Applied random color pattern to all tiles'
    });
  };

  const clear = () => {
    const newTiles = tiles.map((tile) => ({
      ...tile,
      color: PRESET_COLORS[0].value
    }));
    setTiles(newTiles);
    toast.info('Canvas cleared', {
      description: 'All tiles reset to default color'
    });
  };

  const applyPattern = (pattern: string) => {
    const newTiles = [...tiles];
    
    newTiles.forEach((tile, i) => {
      const row = Math.floor(i / gridSize.cols);
      const col = i % gridSize.cols;

      switch (pattern) {
        case 'checkerboard':
          tile.color = (row + col) % 2 === 0 ? PRESET_COLORS[1].value : PRESET_COLORS[0].value;
          break;
        case 'brick':
          tile.color = row % 2 === 0 
            ? col % 2 === 0 ? PRESET_COLORS[1].value : PRESET_COLORS[2].value
            : col % 2 === 0 ? PRESET_COLORS[2].value : PRESET_COLORS[1].value;
          break;
        case 'diagonal':
          tile.color = (row + col) % 3 === 0 ? PRESET_COLORS[1].value : PRESET_COLORS[0].value;
          break;
        case 'herringbone':
          tile.color = (row % 2 === 0 && col % 3 === 0) || (row % 2 === 1 && col % 3 === 1)
            ? PRESET_COLORS[1].value 
            : PRESET_COLORS[0].value;
          break;
        default:
          break;
      }
    });

    setTiles(newTiles);
    const patternName = PRESET_PATTERNS.find(p => p.layout === pattern)?.name || pattern;
    toast.success(`${patternName} pattern applied`, {
      description: 'Pattern applied successfully to canvas'
    });
  };

  const savePattern = () => {
    toast.success('Pattern saved!', {
      description: 'Your design has been saved to your account'
    });
  };

  const downloadPattern = () => {
    toast.success('Downloading pattern...', {
      description: 'Your pattern is being prepared for download'
    });
  };

  const sharePattern = () => {
    toast.success('Share link copied!', {
      description: 'Pattern link copied to clipboard'
    });
  };

  const features = [
    { icon: Grid3x3, title: "10x10 Grid", description: "Large canvas for designs" },
    { icon: Palette, title: "6 Colors", description: "Premium color palette" },
    { icon: Sparkles, title: "4 Presets", description: "Quick pattern templates" },
    { icon: Save, title: "Save & Share", description: "Export your designs" }
  ];

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* Page Banner */}
      <PageBanner
        title="Create Custom Tile Patterns"
        subtitle="Pattern Builder"
        description="Design unique tile layouts with our interactive pattern builder. Choose colors, apply preset patterns, or create your own custom designs. Save and share your creations."
        icon={Grid3x3}
        variant="gradient"
        badge="Interactive Tool • Real-time Preview • Free to Use"
        breadcrumbs={[
          { label: "Home", onClick: () => onNavigate("Home") },
          { label: "Tools", onClick: () => onNavigate("Tools") },
          { label: "Pattern Builder" }
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

      {/* Pattern Builder Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar - Controls */}
            <div className="lg:col-span-4 space-y-6">
              {/* Color Palette */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Palette className="w-5 h-5 text-[#223B57]" />
                      <h3 className="font-semibold text-[#223B57]">Color Palette</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {PRESET_COLORS.map((color) => (
                        <motion.button
                          key={color.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedColor(color.value)}
                          className={`relative h-16 rounded-xl border-2 transition-all duration-200 overflow-hidden group ${
                            selectedColor === color.value
                              ? 'border-[#223B57] ring-2 ring-[#223B57]/20 shadow-lg'
                              : 'border-neutral-200 hover:border-[#223B57]/50'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                          <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-0.5 rounded-full ${
                            color.value === '#F5F3F0' || color.value === '#E8E5E0' 
                              ? 'bg-black/20 text-black' 
                              : 'bg-white/20 text-white'
                          }`}>
                            {color.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Preset Patterns */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-[#223B57]" />
                      <h3 className="font-semibold text-[#223B57]">Quick Patterns</h3>
                    </div>
                    <div className="space-y-2">
                      {PRESET_PATTERNS.map((pattern) => (
                        <Button
                          key={pattern.name}
                          onClick={() => applyPattern(pattern.layout)}
                          variant="outline"
                          className="w-full justify-start border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 hover:border-[#223B57] rounded-xl h-auto py-3"
                        >
                          <div className="text-left">
                            <div className="font-semibold">{pattern.name}</div>
                            <div className="text-xs text-neutral-500">{pattern.description}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-[#223B57] mb-4">Actions</h3>
                    <div className="space-y-2">
                      <Button
                        onClick={randomize}
                        variant="outline"
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        <Shuffle className="w-4 h-4 mr-2" />
                        Randomize
                      </Button>
                      <Button
                        onClick={clear}
                        variant="outline"
                        className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Canvas
                      </Button>
                      <div className="h-px bg-neutral-200 my-3"></div>
                      <Button
                        onClick={savePattern}
                        className="w-full bg-[#223B57] hover:bg-[#1a2d43] text-white rounded-xl"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Pattern
                      </Button>
                      <Button
                        onClick={downloadPattern}
                        variant="outline"
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        onClick={sharePattern}
                        variant="outline"
                        className="w-full border-[#223B57]/20 text-[#223B57] hover:bg-[#223B57]/5 rounded-xl"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Canvas */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="relative border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 border border-white/40 rounded-2xl pointer-events-none"></div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-[#223B57]">Design Canvas</h3>
                      <Badge className="bg-[#223B57]/10 text-[#223B57]">
                        10×10 Grid (100 tiles)
                      </Badge>
                    </div>

                    {/* Tile Grid */}
                    <div className="bg-neutral-50 p-8 rounded-2xl">
                      <div
                        className="grid gap-1.5 mx-auto"
                        style={{
                          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
                          maxWidth: '600px'
                        }}
                        onMouseDown={() => setIsDrawing(true)}
                        onMouseUp={() => setIsDrawing(false)}
                        onMouseLeave={() => setIsDrawing(false)}
                      >
                        {tiles.map((tile, index) => (
                          <motion.div
                            key={tile.id}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            className="aspect-square rounded-md cursor-pointer transition-all duration-200 border-2 border-white shadow-sm hover:shadow-md"
                            style={{ backgroundColor: tile.color }}
                            onClick={() => handleTileClick(index)}
                            onMouseEnter={() => handleTileMouseEnter(index)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                          <Grid3x3 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">How to use</p>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Click individual tiles to paint with selected color</li>
                            <li>• Click and drag to paint multiple tiles at once</li>
                            <li>• Use preset patterns for quick professional designs</li>
                            <li>• Save, download, or share your custom patterns</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
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
                  More Tools Available
                </Badge>
                <h2 className="text-white text-4xl font-bold mb-4">
                  Explore Other Design Tools
                </h2>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Calculate tile quantities, visualize in your room, or take our quiz for personalized recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate("Tools")}
                    className="bg-white !text-[#223B57] hover:bg-white/90 h-12 px-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    View All Tools
                    <ArrowRight className="w-4 h-4 ml-2 text-[#223B57]" />
                  </Button>
                  <Button 
                    onClick={() => onNavigate("Products")}
                    variant="outline"
                    className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 h-12 px-8 rounded-xl"
                  >
                    Browse Tiles
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
