/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import { mongoose } from "./mongoose.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 15,
    match: /^[a-zA-Z0-9]+$/,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Customer", "Vendor", "Shipper"],
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "/customerProfile/defaultProfile.png",
  },

  // Customer fields ( displayName used for Shipper as well )
  displayName: {
    type: String,
    minlength: 5,
    required: function () {
      return this.role !== "Vendor";
    },
  },
  customerAddress: {
    type: String,
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1 },
    },
  ],
  purchased: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1 },
      status: {
        type: String,
        enum: ["Delivered", "Canceled"],
      },
    },
  ],
  walletBalance: {
    type: Number,
    default: 0,
    min: 0,
    required: function () {
      return this.role === "Customer";
    },
  },

  // Vendor fields
  businessName: {
    type: String,
    minlength: 5,
    required: function () {
      return this.role === "Vendor";
    },
    unique: true,
  },
  businessAddress: {
    type: String,
    required: function () {
      return this.role === "Vendor";
    },
    unique: true,
  },

  // Shipper fields
  distributionHub: {
    type: String,
    enum: ["Ho Chi Minh", "Da Nang", "Ha Noi"],
    required: function () {
      return this.role === "Shipper";
    },
  },

  distributionHubAddress: {
    type: String,
    enum: ["702 Nguyen Van Linh, District 7, HCMC", "Ba Na Hills, Da Nang", "Hoan Kiem Lake, Ha Noi"]
  }
});

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20
  },
  productImage: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: [
      "Jewelery",
      "Playing Cards & Toys",
      "Sports",
      "Furniture",
      "Watches",
      "Books",
      "Home Appliances",
      "Beauty Products",
      "Men's Wear",
      "Women's Wear",
      "Electronics",
      "Phones & Accessories",
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stockQuantity: {
    type: Number,
    min: 0,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// order schema
const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, min: 1 },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ["Active", "Delivered", "Canceled"],
    default: "Active",
  },
  distributionHub: {
    type: String,
    enum: ["Ho Chi Minh", "Da Nang", "Ha Noi"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);

export { User, Product, Order };
