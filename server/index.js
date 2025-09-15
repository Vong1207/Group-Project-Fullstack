/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import { User } from './db/schema.js';

// Import routes
import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import walletRoutes from './routes/wallet.js';
import productRoutes from './routes/product.js';
import categoryProductRoutes from  './routes/categoryProducts.js';
import shipperRoutes from './routes/shipper.js';
import userRoutes from './routes/user.js';

// Enable dotenv to load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 3 * 60 * 60 // 3 hours
    }),
    cookie: {
        secure: false,
        maxAge: 3 * 60 * 60 * 1000, // 3 hours
        sameSite: 'lax'
    }
}));


// Middleware
app.use((req, res, next) => {
    next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/product', productRoutes);
app.use('/products', categoryProductRoutes);
app.use('/api/shipper', shipperRoutes);
app.use('/api/user', userRoutes);

// APIs
app.get('/api/session', async (req, res) => {
    if (req.session && req.session.user) {
        const currentUser = await User.findById(req.session.user._id)
            .populate("cart.product")
            .populate("purchased.product")    
        ;
        req.session.user = currentUser;
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
}); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});