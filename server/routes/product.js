/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa
// # ID: 4033604,  */
import express from 'express';
import { Product } from '../db/schema.js';

const router = express.Router();


// Get products, optionally filter by category (GET /api/product?category=...)
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        let filter = {};
        if (category) {
            filter.category = category;
        }
        const products = await Product.find(filter);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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
        const products = await Product.find({ postedBy: userId }).sort({ createdAt: -1 });
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

router.post('/add', async (req, res) => {
    const { product } = req.body;

    try {
        const newProduct = new Product(product);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding new product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/filterByCategory', async (req, res) => {
    const { category, searchName, minPrice, maxPrice } = req.body;
    
    try {
        let query = {};
        
        if (category) {
            query.category = new RegExp(category.trim(), 'i');
        }
        
        if (searchName && searchName.trim()) {
            query.productName = new RegExp(searchName.trim(), 'i');
        }
        
        if (minPrice || maxPrice) {
            query.productPrice = {};
            if (minPrice && !isNaN(minPrice)) {
                query.productPrice.$gte = parseInt(minPrice);
            }
            if (maxPrice && !isNaN(maxPrice)) {
                query.productPrice.$lte = parseInt(maxPrice);
            }
        }
        
        console.log('Filter Query:', query); 
        
        const products = await Product.find(query).lean();
        
        console.log(`Found ${products.length} products`); 
        res.json(products);
        
    } catch (error) {
        console.error('Error filtering products by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router