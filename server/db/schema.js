import { mongoose } from "./mongoose.js";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 8, maxlength: 15, match: /^[a-zA-Z0-9]+$/ },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Customer', 'Vendor', 'Shipper'],
        required: true
    },
    number: {
        type: String
    },
    avatar: {
        type: String,
        required: true,
        default: '/customerProfile/defaultProfile.png'
    },

    // Customer fields ( displayName used for Shipper as well )
    displayName: {
        type: String,
        minlength: 5,
        required: function() { return this.role !== 'Vendor' }
    },
    customerAddress: { 
        type: String 
    },
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, min: 1 }
        }
    ],
    purchased: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, min: 1 }
        }
    ],
    walletBalance: {
        type: Number,
        default: 0,
        min: 0,
        required: function() { return this.role === 'Customer' }
    },

    // Vendor fields
    businessName: {
        type: String,
        minlength: 5,
        required: function() { return this.role === 'Vendor' },
        unique: true
    },
    businessAddress: {
        type: String,
        required: function() { return this.role === 'Vendor' },
        unique: true
    },

    // Shipper fields 
    distributionHub: {
        type: String,
        enum: [
            'Ho Chi Minh',
            'Da Nang',
            'Ha Noi'
        ],
        required: function() { return this.role === 'Shipper' }
    }
});

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        minlength: 5
    },
    productImage: {
        type: String,
        required: true 
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: [
            'Jewelery', 
            'Playing Cards & Toys', 
            'Sports', 
            'Furniture', 
            'Watches', 
            'Books', 
            'Home Appliances', 
            'Beauty Products', 
            "Men's Wear", 
            "Women's Wear", 
            'Electronics', 
            'Phones & Accessories'
        ],
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    }
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

export { User, Product };