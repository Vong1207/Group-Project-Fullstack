
import express from 'express';
import { Product } from '../db/schema.js';

const router = express.Router();

// Get all products (GET /api/product/all)
router.get('/all', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search products by name (case-insensitive, partial match)
router.post('/searchByName', async (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid name' });
    }
    try {
        // Case-insensitive, partial match
        const products = await Product.find({ productName: { $regex: name, $options: 'i' } });
        res.json(products);
    } catch (error) {
        console.error('Error searching products by name:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/findPostedBy', async (req, res) => {
    const { userId } = req.body;

    try {
        const products = await Product.find({ postedBy: userId });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/delete', async (req, res) => {
    const { productId } = req.body;

    try {
        await Product.findByIdAndDelete(productId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/edit', async (req, res) => {
    const { product } = req.body;

    try {
        await Product.findByIdAndUpdate(product._id, product, { new: true });
        res.status(204).send();
    } catch (error) {
        console.error('Error editing product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router