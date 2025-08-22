import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Enable dotenv to load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.json({ limit: '20mb' }));

// Session
const sessionSecret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
        ttl: 3 * 60 * 60 // 3 hours
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3 * 60 * 60 * 1000 // 3 hours
    }
}));

// Middleware

// APIs
app.get('/api/session', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
})

const port = process.env.PORT || 5173;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});