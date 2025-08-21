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

    // Customer fields ( displayName used for Shipper as well )
    displayName: {
        type: String,
        minlength: 5,
        required: function() { return this.role !== 'Vendor' }
    },
    customerAddress: { type: String },

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
        // String type to test DB
        type: String,

        // Comment this out to test out DB first
        // type: Buffer
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
    }
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

export { User, Product };