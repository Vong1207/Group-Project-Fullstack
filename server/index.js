import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import crypto from 'crypto';

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
    console.log('Request:', req.method, req.url);
    next();
});

// Auth routes
import authRoutes from "./routes/auth.js";
app.use("/api/auth", authRoutes);

// APIs
app.get('/api/session', (req, res) => {
    console.log('Session:', req.session);
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});