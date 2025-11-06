export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  authorBio?: string;
  authorImage?: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
  views?: number;
  tags?: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '10 Modern Tile Design Trends for 2025',
    excerpt: 'Discover the latest ceramic tile trends that are transforming homes and commercial spaces this year.',
    content: `The world of ceramic tile design is evolving rapidly, bringing fresh perspectives and innovative solutions to both residential and commercial spaces. As we move through 2025, several key trends are emerging that are reshaping how we think about tile design.

## 1. Large Format Tiles

Large format tiles continue to dominate the design landscape. These expansive tiles, often measuring 24"x48" or larger, create seamless looks with fewer grout lines. They're perfect for creating a sense of spaciousness in smaller rooms and add a contemporary, minimalist aesthetic to any space.

**Benefits:**
- Fewer grout lines mean easier cleaning
- Creates visual continuity
- Modern, sophisticated appearance
- Ideal for open-concept spaces

## 2. Terrazzo Renaissance

Terrazzo is making a spectacular comeback, but with a modern twist. Today's terrazzo tiles feature bold colors, larger aggregate pieces, and contemporary patterns that pay homage to the classic material while feeling fresh and current.

## 3. Wood-Look Porcelain

The technology behind wood-look porcelain tiles has reached new heights. Modern manufacturing techniques create tiles that are nearly indistinguishable from real wood, offering the warmth and beauty of hardwood with the durability and water resistance of porcelain.

## 4. Geometric Patterns

Geometric patterns are everywhere in 2025. From hexagons and chevrons to intricate Moroccan-inspired designs, geometric tiles add visual interest and personality to any space. They're particularly popular for feature walls and backsplashes.

## 5. Natural Stone Effects

Tiles that mimic natural stone materials like marble, travertine, and slate are more realistic than ever. Advanced printing and texturing technologies create tiles with the authentic look and feel of natural stone without the maintenance concerns.

## 6. Bold Grout Lines

Instead of matching grout to tile color, designers are embracing contrasting grout lines as a design element. Dark grout with white tiles or colored grout with neutral tiles creates striking visual patterns.

## 7. Textured Tiles

Three-dimensional and textured tiles add depth and tactile interest to walls and floors. From subtle ripples to dramatic relief patterns, textured tiles create dynamic surfaces that play with light and shadow.

## 8. Sustainable Materials

Eco-conscious design is driving demand for tiles made from recycled materials and produced using sustainable manufacturing processes. These tiles don't compromise on beauty while supporting environmental responsibility.

## 9. Metallic Finishes

Metallic tiles in bronze, copper, gold, and silver tones add glamour and sophistication. Whether used as accents or covering entire surfaces, metallic tiles create stunning focal points.

## 10. Mixed Materials

Combining different tile materials, sizes, and finishes in a single space creates unique, personalized designs. This trend encourages creativity and allows for truly one-of-a-kind installations.

## Conclusion

These trends represent the cutting edge of tile design, but the best choice always depends on your specific space, style preferences, and functional needs. At Origin Tiles, our design experts can help you navigate these trends and find the perfect tiles for your project.`,
    category: 'Design Trends',
    author: 'Priya Sharma',
    authorBio: 'Senior Interior Design Consultant with 12+ years of experience in ceramic tile design and space planning.',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    date: '2024-10-25',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=500&fit=crop',
    featured: true,
    views: 15420,
    tags: ['Design Trends', 'Modern Design', 'Tile Patterns', 'Interior Design']
  },
  {
    id: 2,
    title: 'Complete Guide to Tile Installation: Step by Step',
    excerpt: 'Learn professional tile installation techniques for perfect results every time.',
    content: `Installing ceramic tiles can seem daunting, but with the right preparation, tools, and techniques, you can achieve professional-quality results. This comprehensive guide walks you through every step of the tile installation process.

## Pre-Installation Planning

Before you begin, proper planning is essential. Measure your space carefully, order 10-15% extra tiles to account for cuts and breakage, and gather all necessary tools and materials.

### Essential Tools:
- Tile cutter or wet saw
- Trowel (appropriate notch size for your tiles)
- Tile spacers
- Level
- Rubber mallet
- Grout float
- Sponges and buckets

## Step 1: Surface Preparation

The foundation of a successful tile installation is a properly prepared surface. Your substrate must be clean, level, dry, and structurally sound.

**Key Actions:**
- Remove all debris, dust, and old adhesive
- Repair any cracks or damage
- Ensure the surface is level (use self-leveling compound if needed)
- Apply primer if required

## Step 2: Layout Planning

Never start tiling without a proper layout plan. This step prevents awkward cuts and ensures a balanced, professional appearance.

**Layout Tips:**
- Find the center of the room
- Do a dry layout before applying adhesive
- Plan to avoid narrow tile pieces at edges
- Consider the pattern direction

## Step 3: Mixing and Applying Adhesive

Use the correct adhesive for your tile type and substrate. Mix according to manufacturer instructions and work in small sections.

**Application Process:**
- Apply adhesive with the flat side of the trowel
- Create ridges using the notched side
- Work in 3-4 square foot sections
- Maintain consistent ridge height

## Step 4: Setting Tiles

Place tiles carefully, using spacers to maintain consistent grout lines. Press firmly but don't slide tiles into position.

**Installation Guidelines:**
- Use a slight twisting motion when setting
- Check level frequently
- Use a rubber mallet for large format tiles
- Clean excess adhesive immediately

## Step 5: Grouting

Wait 24-48 hours before grouting to allow adhesive to cure fully. Choose grout color carefully as it significantly impacts the final appearance.

**Grouting Process:**
- Remove spacers
- Mix grout to peanut butter consistency
- Apply at 45-degree angle
- Remove excess at 45-degree angle
- Clean with damp sponge

## Step 6: Sealing and Finishing

After grout has cured (48-72 hours), apply sealer to protect against stains and moisture. Clean tiles with appropriate cleaner.

## Common Mistakes to Avoid

- Skipping surface preparation
- Using incorrect adhesive
- Not using spacers
- Grouting too soon
- Ignoring manufacturer instructions

## Conclusion

With patience, proper preparation, and attention to detail, you can achieve beautiful, long-lasting tile installations. Remember, taking your time during each step will result in a superior finished product.`,
    category: 'Installation',
    author: 'Rajesh Kumar',
    authorBio: 'Master tile installer and technical trainer with 18 years of hands-on experience in residential and commercial installations.',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    date: '2024-10-20',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f1a4b1b?w=800&h=500&fit=crop',
    featured: false,
    views: 12850,
    tags: ['Installation', 'DIY', 'How-To', 'Professional Tips']
  },
  {
    id: 3,
    title: 'Choosing the Right Tile Size for Your Space',
    excerpt: 'Size matters! Understand how different tile dimensions impact your room aesthetics.',
    content: `Selecting the perfect tile size is crucial for achieving your desired aesthetic and making the most of your space. The right tile dimensions can make a room feel larger, create visual interest, or establish a specific design style. Here's everything you need to know about choosing tile sizes.

## Understanding Standard Tile Sizes

Tiles come in various standard sizes, each suited to different applications and design goals:

- **Small Format**: 4"x4" to 12"x12"
- **Medium Format**: 12"x12" to 18"x18"
- **Large Format**: 18"x18" to 24"x48"
- **Extra Large Format**: 48"x48" and larger

## Impact on Room Perception

### Large Tiles for Small Spaces
Contrary to intuition, large tiles can make small rooms appear more spacious. Fewer grout lines create visual continuity, making the space feel less choppy and more open.

### Small Tiles for Character
Smaller tiles, such as mosaics or subway tiles, add texture and visual interest. They're perfect for creating feature walls or adding personality to compact spaces like powder rooms.

## Room-by-Room Recommendations

### Living Rooms & Open Spaces
- **Recommended**: 24"x24" to 48"x48"
- Large format tiles create seamless looks
- Minimize grout lines for contemporary feel
- Consider wood-look planks for warmth

### Kitchens
- **Floor**: 12"x12" to 18"x18"
- **Backsplash**: 3"x6" subway or mosaic
- Balance practicality with style
- Easy-to-clean surfaces essential

### Bathrooms
- **Floor**: 12"x12" to 18"x18"
- **Walls**: Varies by design
- **Shower**: Smaller tiles for better drainage
- Non-slip finishes for safety

### Entryways
- **Recommended**: 12"x12" to 18"x18"
- Durable tiles for high traffic
- Consider decorative borders
- Weather-resistant materials

## Design Considerations

### Ceiling Height
Tall ceilings pair well with large format vertical tiles, while standard height rooms benefit from horizontal installations or medium-sized tiles.

### Natural Light
Rooms with abundant natural light can handle larger tiles and bolder patterns. Limited light spaces may benefit from lighter colors in medium formats.

### Architectural Features
Consider existing architecture. Modern spaces suit large, minimalist tiles, while traditional homes may call for smaller, classic formats.

## Installation Patterns

The way you install tiles affects how size is perceived:

- **Straight Lay**: Classic and clean
- **Diagonal**: Makes spaces feel larger
- **Herringbone**: Adds movement and interest
- **Brick Bond**: Traditional and warm

## Grout Line Considerations

Grout line width varies with tile size:
- Small tiles: 1/16" to 1/8"
- Medium tiles: 1/8" to 3/16"
- Large tiles: 3/16" to 1/4"

## Budget Implications

Larger tiles often cost more per square foot but require less installation time. Factor in both material and labor costs when budgeting.

## Conclusion

The right tile size depends on your space, style preferences, and practical needs. Visit our showroom to see different sizes in person and consult with our design experts for personalized recommendations.`,
    category: 'Tips & Guides',
    author: 'Anjali Desai',
    authorBio: 'Certified Interior Designer specializing in spatial planning and material selection for residential projects.',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    date: '2024-10-18',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=800&h=500&fit=crop',
    featured: false,
    views: 9640,
    tags: ['Tile Sizes', 'Design Tips', 'Space Planning', 'Interior Design']
  },
  {
    id: 4,
    title: 'Bathroom Tile Maintenance: Expert Tips',
    excerpt: 'Keep your bathroom tiles looking new with these professional cleaning and maintenance tips.',
    category: 'Maintenance',
    author: 'Vikram Patel',
    date: '2024-10-15',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 5,
    title: 'Porcelain vs Ceramic: Which is Right for You?',
    excerpt: 'A comprehensive comparison to help you make the best choice for your project.',
    category: 'Tips & Guides',
    author: 'Meera Reddy',
    date: '2024-10-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1503127431568-0f4b2f4e56e1?w=800&h=500&fit=crop',
    featured: false
  },
  {
    id: 6,
    title: 'Creating Statement Walls with Feature Tiles',
    excerpt: 'Transform any room with dramatic feature walls using designer ceramic tiles.',
    category: 'Design Trends',
    author: 'Amit Singh',
    date: '2024-10-08',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=500&fit=crop',
    featured: false
  }
];

export const blogCategories = ['All', 'Design Trends', 'Installation', 'Tips & Guides', 'Maintenance'];
