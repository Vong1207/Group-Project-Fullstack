/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import express from 'express';
import { Product } from '../db/schema.js'; 

const router = express.Router();

// Get product by Category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category }).lean();
    res.json(products);
  } catch (err) {
    console.error('there is an error', err);
    res.status(500).json({ error: 'server error: ' });
  }
});
// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;