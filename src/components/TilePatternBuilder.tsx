import { useState } from 'react';
import { motion } from 'motion/react';
import { Grid3x3, Shuffle, Trash2} from 'lucide-react';

interface TilePattern {
  id: string;
  color: string;
  image?: string;
}

const PRESET_PATTERNS = [
  { name: 'Herringbone', layout: 'herringbone' },
  { name: 'Checkerboard', layout: 'checkerboard' },
  { name: 'Brick', layout: 'brick' },
  { name: 'Diagonal', layout: 'diagonal' }
];

const PRESET_COLORS = [
  '#E8E5E0', '#223B57', '#9CA3AF', '#7B8B78', '#4A4A4A', '#F5F3F0'
];

export function TilePatternBuilder() {
  const [gridSize] = useState({ rows: 8, cols: 8 });
  const [tiles, setTiles] = useState<TilePattern[]>(
    Array(64).fill(null).map((_, i) => ({
      id: `tile-${i}`,
      color: PRESET_COLORS[0]
    }))
  );
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
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
      color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]
    }));
    setTiles(newTiles);
  };

  const clear = () => {
    const newTiles = tiles.map((tile) => ({
      ...tile,
      color: PRESET_COLORS[0]
    }));
    setTiles(newTiles);
  };

  const applyPattern = (pattern: string) => {
    const newTiles = [...tiles];
    
    newTiles.forEach((tile, i) => {
      const row = Math.floor(i / gridSize.cols);
      const col = i % gridSize.cols;

      switch (pattern) {
        case 'checkerboard':
          tile.color = (row + col) % 2 === 0 ? PRESET_COLORS[1] : PRESET_COLORS[0];
          break;
        case 'brick':
          tile.color = row % 2 === 0 
            ? col % 2 === 0 ? PRESET_COLORS[1] : PRESET_COLORS[2]
            : col % 2 === 0 ? PRESET_COLORS[2] : PRESET_COLORS[1];
          break;
        case 'diagonal':
          tile.color = (row + col) % 3 === 0 ? PRESET_COLORS[1] : PRESET_COLORS[0];
          break;
        default:
          break;
      }
    });

    setTiles(newTiles);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-[var(--shadow-card)] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#223B57]/10 rounded-lg">
            <Grid3x3 className="w-5 h-5 text-[#223B57]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)]">
            Tile Pattern Builder
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={randomize}
            className="p-2 rounded-lg bg-[var(--color-bg-soft)] hover:bg-[var(--color-accent-sage)]/10 text-[var(--color-text-secondary)] transition-all duration-200"
            title="Randomize"
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={clear}
            className="p-2 rounded-lg bg-[var(--color-bg-soft)] hover:bg-red-50 text-[var(--color-text-secondary)] hover:text-red-600 transition-all duration-200"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Color Palette */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          Select Color
        </label>
        <div className="flex gap-2">
          {PRESET_COLORS.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-lg border-2 transition-all duration-200 ${
                selectedColor === color
                  ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/20'
                  : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Pattern Presets */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          Quick Patterns
        </label>
        <div className="flex gap-2">
          {PRESET_PATTERNS.map((pattern) => (
            <button
              key={pattern.name}
              onClick={() => applyPattern(pattern.layout)}
              className="px-4 py-2 rounded-lg bg-[var(--color-bg-soft)] hover:bg-[#223B57]/10 text-[var(--color-text-secondary)] hover:text-[#223B57] transition-all duration-200 text-sm font-medium"
            >
              {pattern.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tile Grid */}
      <div className="mb-6 bg-[var(--color-bg-soft)] p-6 rounded-xl">
        <div
          className="grid gap-1 mx-auto"
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
              whileHover={{ scale: 1.1 }}
              className="aspect-square rounded-sm cursor-pointer transition-all duration-200 border border-white/50"
              style={{ backgroundColor: tile.color }}
              onClick={() => handleTileClick(index)}
              onMouseEnter={() => handleTileMouseEnter(index)}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-[var(--color-text-secondary)]">
        <p>Click or drag to paint tiles • Use preset patterns for quick designs</p>
      </div>
    </div>
  );
}