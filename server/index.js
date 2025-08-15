const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myks-sports';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Product Schema
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: String,
  sizes: [String],
  colors: [String],
  description: String,
  detailedDescription: String,
  isNew: Boolean,
  onSale: Boolean,
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String,
  }],
  total: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'pending'
  },
  customerInfo: {
    name: String,
    email: String,
    address: String,
    phone: String,
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

// Routes

// GET /api/products - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    
    // Si aucun produit en base, on renvoie les données de test
    if (products.length === 0) {
      const testProducts = [
        {
          id: '1',
          name: 'T-Shirt Performance Pro',
          price: 45,
          originalPrice: 60,
          image: 'https://images.pexels.com/photos/6551415/pexels-photo-6551415.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'T-Shirts',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Noir', 'Blanc', 'Gris', 'Bleu'],
          description: 'T-shirt technique haute performance',
          detailedDescription: 'Notre T-shirt Performance Pro est conçu avec des matériaux techniques de dernière génération. Tissu respirant et évacuation optimale de l\'humidité pour vos entraînements les plus intenses. Coupe ajustée et confortable.',
          isNew: true,
          onSale: true,
        },
        {
          id: '2',
          name: 'Legging Ultra Flex',
          price: 65,
          image: 'https://images.pexels.com/photos/6551307/pexels-photo-6551307.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'Leggings',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: ['Noir', 'Violet', 'Gris foncé'],
          description: 'Legging ultra-stretch pour un confort maximal',
          detailedDescription: 'Le Legging Ultra Flex offre une liberté de mouvement incomparable grâce à son tissu 4-way stretch. Taille haute avec support compressif, poches latérales et finitions sans coutures pour éviter les irritations.',
          isNew: false,
          onSale: false,
        },
        {
          id: '3',
          name: 'Veste Training Elite',
          price: 85,
          image: 'https://images.pexels.com/photos/6551224/pexels-photo-6551224.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'Vestes',
          sizes: ['S', 'M', 'L', 'XL', 'XXL'],
          colors: ['Noir', 'Gris', 'Bleu marine'],
          description: 'Veste technique pour l\'entraînement',
          detailedDescription: 'Veste polyvalente avec zip intégral, poches zippées et capuche ajustable. Matière déperlante et coupe-vent, parfaite pour l\'extérieur. Design moderne avec détails réfléchissants.',
          isNew: true,
          onSale: false,
        },
        {
          id: '4',
          name: 'Short Running Pro',
          price: 35,
          originalPrice: 45,
          image: 'https://images.pexels.com/photos/6551342/pexels-photo-6551342.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'Shorts',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Noir', 'Bleu', 'Gris'],
          description: 'Short de course technique et léger',
          detailedDescription: 'Short de running avec caleçon intégré, poches latérales et cordon de serrage. Matière ultra-légère et séchage rapide. Bandes réfléchissantes pour la visibilité nocturne.',
          isNew: false,
          onSale: true,
        },
        {
          id: '5',
          name: 'Brassière Sport Intense',
          price: 40,
          image: 'https://images.pexels.com/photos/6551376/pexels-photo-6551376.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'Brassières',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: ['Noir', 'Blanc', 'Violet', 'Rose'],
          description: 'Brassière de sport haute performance',
          detailedDescription: 'Brassière avec support renforcé pour les activités haute intensité. Matière compressive et respirante, dos nageur pour une liberté de mouvement optimale. Bonnets amovibles.',
          isNew: true,
          onSale: false,
        },
        {
          id: '6',
          name: 'Sweatshirt Urban Style',
          price: 55,
          image: 'https://images.pexels.com/photos/6551294/pexels-photo-6551294.jpeg?auto=compress&cs=tinysrgb&w=600',
          category: 'Sweatshirts',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Gris', 'Noir', 'Beige'],
          description: 'Sweatshirt streetwear premium',
          detailedDescription: 'Sweatshirt à capuche avec coupe moderne oversize. Matière coton bio mélangé, poche kangourou et finitions de qualité premium. Perfect pour le sport et la ville.',
          isNew: false,
          onSale: false,
        },
      ];
      
      return res.json(testProducts);
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/orders - Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { items, total, customerInfo } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items are required' });
    }
    
    if (!total || total <= 0) {
      return res.status(400).json({ error: 'Valid total amount is required' });
    }
    
    const order = new Order({
      items,
      total,
      customerInfo: customerInfo || {},
      status: 'pending'
    });
    
    const savedOrder = await order.save();
    
    console.log('📦 New order created:', savedOrder._id);
    
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/orders - Get all orders (for admin)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 MYKS Sports API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;