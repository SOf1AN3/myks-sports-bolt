'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCard } from '@/components/products/product-card';
import { products, categories, sizes, colors } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function CataloguePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Recherche par nom
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par catégorie
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Filtre par taille
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Filtre par couleur
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedColors.includes(color))
      );
    }

    // Filtre par prix
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= parseFloat(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= parseFloat(priceRange.max));
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return a.isNew ? -1 : 1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy, selectedCategories, selectedSizes, selectedColors, priceRange]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange({ min: '', max: '' });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catalogue <span className="bg-gradient-primary bg-clip-text text-transparent">MYKS</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez notre collection complète de vêtements de sport premium
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <motion.aside
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtres
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Effacer
                  </Button>
                </div>

                <div className="space-y-6">
                  
                  {/* Recherche */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rechercher</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Nom du produit..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Prix */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Prix (€)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Min"
                        type="number"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      />
                      <Input
                        placeholder="Max"
                        type="number"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Catégories */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Catégories</label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                          />
                          <label htmlFor={category} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tailles */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Tailles</label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                          <Checkbox
                            id={size}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeToggle(size)}
                          />
                          <label htmlFor={size} className="text-sm">
                            {size}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Couleurs */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Couleurs</label>
                    <div className="space-y-2">
                      {colors.map((color) => (
                        <div key={color} className="flex items-center space-x-2">
                          <Checkbox
                            id={color}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => handleColorToggle(color)}
                          />
                          <label htmlFor={color} className="text-sm">
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Toolbar */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8"
            >
              <p className="text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </p>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nom A-Z</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="newest">Nouveautés</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex rounded-lg border">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">
                    Aucun produit ne correspond à vos critères
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}