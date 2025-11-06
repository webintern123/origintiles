import { useState, useEffect } from 'react';
import { X, ArrowLeft, Heart, Check, AlertCircle, Scale, Eye, ShoppingCart, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { PageBanner } from './PageBanner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';
import { products } from '../data/products';
import { SITE_CONFIG } from '../constants';
import { STORAGE_KEYS } from '../constants';
import { secureStorage } from '../security.config';
import { motion } from 'motion/react';


interface ComparePageProps {
  onNavigate: (page: string) => void;
}

export function ComparePage({ onNavigate }: ComparePageProps) {
  const [compareItems, setCompareItems] = useState<string[]>([]);
  const [compareProducts, setCompareProducts] = useState<typeof products>([]);

  useEffect(() => {
  const items = secureStorage.getItem<string[]>(STORAGE_KEYS.compare, []);
  setCompareItems(items);

  const productData = items
    .map((id: string) => products.find(p => p.id.toString() === id))
    .filter((p): p is typeof products[number] => p !== undefined); // Type guard

  setCompareProducts(productData);
}, []);


  const removeItem = (productId: string) => {
    const newItems = compareItems.filter(id => id !== productId);
    setCompareItems(newItems);
    setCompareProducts(compareProducts.filter(p => p.id.toString() !== productId));
    secureStorage.setItem(STORAGE_KEYS.compare, newItems);
    toast.info('Product removed from comparison');
  };

  const clearAll = () => {
    setCompareItems([]);
    setCompareProducts([]);
    secureStorage.removeItem(STORAGE_KEYS.compare);
    toast.info('Comparison cleared');
  };

  const addToFavorites = (productId: number) => {
    const favorites = secureStorage.getItem<number[]>(STORAGE_KEYS.favorites, []);
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      secureStorage.setItem(STORAGE_KEYS.favorites, favorites);
      toast.success('Added to favorites');
    } else {
      toast.info('Already in favorites');
    }
  };

  const comparisonAttributes = [
    { key: 'brand', label: 'Brand' },
    { key: 'category', label: 'Category' },
    { key: 'size', label: 'Size' },
    { key: 'finishing', label: 'Finish' },
    { key: 'price', label: 'Price' },
    { key: 'color', label: 'Color' },
    { key: 'thickness', label: 'Thickness' },
    { key: 'waterAbsorption', label: 'Water Absorption' },
    { key: 'slipResistance', label: 'Slip Resistance' },
    { key: 'usage', label: 'Recommended Use' }
  ];

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F3F0]">
        {/* === PAGE BANNER === */}
       <PageBanner
  title="Compare Products"
  subtitle="Product Comparison Tool"
  description="Compare specifications and features side-by-side to make the best choice."
  icon={Scale}
  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  badge="Compare up to 4 Products"
  breadcrumbs={[{ label: 'Compare Products' }]} // <-- fixed
/>


        {/* === FLOATING BENEFIT CARDS === */}
        <section className="relative -mt-20 z-10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: Scale,
                  title: 'Side by Side',
                  description: 'Compare products in detail',
                  value: 'Up to 4'
                },
                {
                  icon: Eye,
                  title: 'Detailed View',
                  description: 'See all specifications clearly',
                  value: '10+ Specs'
                },
                {
                  icon: Check,
                  title: 'Best Choice',
                  description: 'Find the perfect fit for your needs',
                  value: '100%'
                },
                {
                  icon: Award,
                  title: 'Quality Tiles',
                  description: 'All products ISO certified',
                  value: 'Premium'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/60 backdrop-blur-md group">
                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
                    
                    {/* Hover Gradient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#223B57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <CardContent className="relative p-6 text-center">
                      {/* Icon Circle */}
                      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 mb-4 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                        <benefit.icon className="w-6 h-6 text-[#223B57] group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      
                      {/* Value */}
                      <div className="text-3xl font-bold text-[#223B57] mb-2">
                        {benefit.value}
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-[#223B57] mb-2">{benefit.title}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-neutral-600 group-hover:text-[#223B57] transition-colors duration-300">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === EMPTY STATE === */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
                
                <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                  
                  <CardContent className="p-16 text-center">
                    <AlertCircle className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h2 className="text-[#223b57] mb-4">No Products to Compare</h2>
                    <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                      You haven't added any products to compare yet. Browse our collection and add products to see a detailed comparison.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button 
                        onClick={() => onNavigate('Products')}
                        className="bg-gradient-to-r from-[#223B57] to-[#2d4a6a] hover:from-[#1a2d43] hover:to-[#223B57] text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Browse Products
                      </Button>
                      <Button variant="outline" onClick={() => onNavigate('Home')}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Go Home
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3F0]">
      {/* === PAGE BANNER === */}
    <PageBanner
  title={`Compare Products (${compareProducts.length})`}
  subtitle="Side-by-Side Comparison"
  description="Side-by-side comparison of specifications and features."
  icon={Scale}
  variant="image"
  backgroundImage="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
  badge={`${compareProducts.length} Products Selected`}
  breadcrumbs={[{ label: 'Compare Products'}]}
  actionLabel="Clear All"
  onAction={clearAll}
/>



      {/* === MAIN CONTENT === */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative group mb-8">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              
              <div className="relative overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden border-0 rounded-3xl bg-white/60 backdrop-blur-md shadow-lg">
                    <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                    
                    <table className="min-w-full divide-y divide-[#223b57]/10">
                      <thead className="bg-[#223B57]/5">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold text-[#223b57] w-48">
                            Specification
                          </th>
                          {compareProducts.map((product) => (
                            <th key={product.id} className="px-6 py-4 text-center relative">
                              <button
                                onClick={() => removeItem(product.id.toString())}
                                className="absolute top-2 right-2 p-1 hover:bg-red-50 rounded-full transition-colors z-10"
                                title="Remove"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                              
                              <div className="mb-4">
                                <ImageWithFallback
                                  src={product.image}
                                  alt={product.name}
                                  className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
                                />
                                <h3 className="text-[#223b57] mb-1">{product.name}</h3>
                                <Badge className="bg-[#223B57] text-white">{product.brand}</Badge>
                              </div>
                              
                              <div className="flex gap-2 justify-center mt-3">
                                <Button
  size="sm"
  variant="outline"
  onClick={() => addToFavorites(Number(product.id))}
>
  <Heart className="w-4 h-4" />
</Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    onNavigate('Product Details');
                                    toast.info('Viewing product details');
                                  }}
                                >
                                  View Details
                                </Button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      
                      <tbody className="bg-white/40 backdrop-blur-sm divide-y divide-[#223b57]/10">
                        {comparisonAttributes.map((attr, index) => (
                          <tr key={attr.key} className={index % 2 === 0 ? 'bg-white/20' : 'bg-white/5'}>
                            <td className="px-6 py-4 text-sm font-medium text-[#223b57]">
                              {attr.label}
                            </td>
                            {compareProducts.map((product) => {
  const value = product[attr.key as keyof typeof product];

  let displayValue: string;

  if (value === null || value === undefined) {
    displayValue = '—';
  } else if (typeof value === 'number' || typeof value === 'string') {
    displayValue = value.toString();
  } else {
    // fallback for unexpected types (e.g., arrays or objects)
    displayValue = JSON.stringify(value);
  }

  return (
    <td key={product.id} className="px-6 py-4 text-center text-sm text-neutral-600">
      {displayValue}
    </td>
  );
})}


                          </tr>
                        ))}
                        
                        {/* Price Row - Highlighted */}
                        <tr className="bg-[#223B57]/5">
                          <td className="px-6 py-4 text-sm font-semibold text-[#223b57]">
                            Pricing
                          </td>
                          {compareProducts.map((product) => (
                            <td key={product.id} className="px-6 py-4 text-center">
                              <Button
  variant="outline"
  size="sm"
  onClick={() =>
    (window.location.href = `mailto:${SITE_CONFIG.email}?subject=Price Inquiry - ${product.name}`)
  }
>
  Contact for Pricing
</Button>

                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 justify-center mb-12"
          >
            <Button variant="outline" onClick={() => onNavigate('Products')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#223B57] to-[#2d4a6a] hover:from-[#1a2d43] hover:to-[#223B57] text-white shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
              onClick={() => {
                toast.success('Request sent!', {
                  description: 'Our team will contact you shortly with a quote.'
                });
              }}
            >
              Request Quote for Selected
            </Button>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-[#223B57]/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500"></div>
              
              <Card className="relative border-0 shadow-lg bg-white/60 backdrop-blur-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none"></div>
                
                <CardContent className="p-8">
                  <h3 className="text-[#223b57] mb-6 text-center">Why Compare with Origin Tiles?</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-[#223B57] group-hover:to-[#2d4a6a] transition-all duration-500">
                        <Check className="w-6 h-6 text-[#223B57]" />
                      </div>
                      <h4 className="text-[#223b57] mb-2">Detailed Specifications</h4>
                      <p className="text-sm text-neutral-600">
                        Compare every technical detail to make an informed decision
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-[#223B57]" />
                      </div>
                      <h4 className="text-[#223b57] mb-2">Side-by-Side View</h4>
                      <p className="text-sm text-neutral-600">
                        Easily spot differences and similarities at a glance
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#223B57]/10 to-[#223B57]/5 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-[#223B57]" />
                      </div>
                      <h4 className="text-[#223b57] mb-2">Best Value</h4>
                      <p className="text-sm text-neutral-600">
                        Find the perfect balance of quality, features, and price
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
