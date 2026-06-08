const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const products = [
  {
    name: 'Basin Bead Catchall Tray',
    category: 'Decor',
    price: 44,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    ],
    description:
      'A shallow styling tray for beads, candles, small planters, keys, or daily objects with a composed finish.',
    details: {
      material: 'Stone resin, wood, and soft felt base',
      dimensions: '11 in wide x 7 in deep',
      care: 'Dust with a dry microfiber cloth',
    },
    tags: ['tray', 'decor', 'entryway'],
    stock: 15,
    rating: 4.8,
    featured: true,
  },
  {
    name: 'Northlight Walnut Plant Stand',
    category: 'Furniture',
    price: 118,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1444666360394-6ea0a085ef66?w=800&auto=format&fit=crop',
    ],
    description:
      'A sturdy walnut-toned stand that gives medium plants height while keeping rooms open and calm.',
    details: {
      material: 'Solid birch with walnut stain',
      dimensions: '12 in wide x 28 in tall',
      care: 'Wipe with a lightly damp cloth',
    },
    tags: ['stand', 'furniture', 'plant'],
    stock: 7,
    rating: 4.9,
    featured: true,
  },
  {
    name: 'Oakline Propagation Station',
    category: 'Decor',
    price: 72,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&auto=format&fit=crop',
    ],
    description:
      'A slim oak base and three glass tubes for growing cuttings in a clean, gallery-like arrangement.',
    details: {
      material: 'Oak base and borosilicate glass tubes',
      dimensions: '14 in wide x 8 in tall',
      care: 'Rinse glass tubes weekly',
    },
    tags: ['propagation', 'glass', 'oak'],
    stock: 12,
    rating: 4.8,
    featured: true,
  },
  {
    name: 'Rustik Olive Ceramic Planter',
    category: 'Planters',
    price: 54,
    oldPrice: 68,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
    ],
    description:
      'A calm ceramic planter with a hand-finished matte glaze, sized for desks, sideboards, and bright apartment corners.',
    details: {
      material: 'Matte ceramic with a sealed saucer',
      dimensions: '6.5 in wide x 6 in tall',
      care: 'Wipe ceramic clean and avoid standing water',
    },
    tags: ['ceramic', 'planter', 'olive'],
    stock: 18,
    rating: 4.9,
    featured: true,
  },
  {
    name: 'Linen Wrap Hanging Basket',
    category: 'Hanging',
    price: 64,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
    ],
    description:
      'A soft hanging basket wrapped in natural fiber for trailing plants and warm, elevated vertical styling.',
    details: {
      material: 'Natural jute and linen fiber',
      dimensions: '8 in diameter x 12 in drop',
      care: 'Keep dry; spot clean only',
    },
    tags: ['hanging', 'basket', 'fiber'],
    stock: 11,
    rating: 4.7,
    featured: false,
  },
  {
    name: 'Quiet Ceramic Shelf Set',
    category: 'Decor',
    price: 38,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop',
    ],
    description:
      'A quiet shelf-ready set for styling small objects, plant tools, and daily rituals without visual clutter.',
    details: {
      material: 'Unglazed stoneware',
      dimensions: 'Varies per piece',
      care: 'Dust with dry cloth',
    },
    tags: ['ceramic', 'shelf', 'set'],
    stock: 20,
    rating: 4.8,
    featured: false,
  },
  {
    name: 'Forma Tali Fiber Pot',
    category: 'Planters',
    price: 86,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=800&auto=format&fit=crop',
    ],
    description:
      'A light, sculptural planter for tall greenery with a quiet texture that keeps large plants feeling refined.',
    details: {
      material: 'Tali fiber composite with drainage hole',
      dimensions: '10 in wide x 12 in tall',
      care: 'Avoid prolonged water exposure',
    },
    tags: ['fiber', 'planter', 'tall'],
    stock: 9,
    rating: 4.7,
    featured: false,
  },
  {
    name: 'Stillwater Ritual Tray',
    category: 'Decor',
    price: 32,
    oldPrice: 46,
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&auto=format&fit=crop',
    ],
    description:
      'A soft morning tray for tea, jewelry, plant notes, and small care objects with a refined lived-in texture.',
    details: {
      material: 'Reclaimed wood with linen liner',
      dimensions: '13 in wide x 9 in deep',
      care: 'Spot clean the liner; wipe wood dry',
    },
    tags: ['tray', 'morning', 'ritual'],
    stock: 24,
    rating: 4.6,
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://localhost:27017/lab12_dynamic_ecommerce'
    );
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products into lab12_dynamic_ecommerce.products`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected. Seed complete!');
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
