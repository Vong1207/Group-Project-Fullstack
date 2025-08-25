import express from 'express';
import { Product } from '../db/schema.js'; // import model Product

const router = express.Router();

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

export default router;