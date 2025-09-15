/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import express from "express";
import { Product, User, Order } from "../db/schema.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  const { userId, cart } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { cart });
    const updatedUser = await User.findById(userId).populate("cart.product");
    req.session.user.cart = updatedUser.cart;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// create order from user cart
router.post("/order", async (req, res) => {
  const { userId, cart, totalPrice } = req.body;
  console.log("BODY:", req.body);

  if (
    !userId ||
    !Array.isArray(cart) ||
    cart.length === 0 ||
    totalPrice == null
  ) {
    return res.status(400).json({ success: false, error: "Missing data" });
  }

  try {
    // Get user
    const user = await User.findById(userId).populate("cart.product");
    // check stock quantity
    for (const item of cart) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, error: "Product not found" });
      }
      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          error: `Not enough stock for "${product.productName}". Only ${product.stockQuantity} left.`,
        });
      }
    }

    // Check walletBalance
    if (user.walletBalance < totalPrice) {
      return res
        .status(400)
        .json({ success: false, error: "Insufficient balance in wallet" });
    }

    // Deduct money from walletBalance.
    user.walletBalance -= totalPrice;

    const orderItems = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    const hubs = ["Ho Chi Minh", "Da Nang", "Ha Noi"];
    const randomHub = hubs[Math.floor(Math.random() * hubs.length)];
    const newOrder = new Order({
      customer: userId,
      cart: orderItems,
      totalPrice,
      distributionHub: randomHub,
    });
    await newOrder.save();

    for (const item of orderItems) {
      const product = await Product.findById(item.product).populate('postedBy');
      if (!product || !product.postedBy) continue;

      product.stockQuantity -= item.quantity;
      await product.save();

      const vendor = await User.findById(product.postedBy._id);
      if (vendor) {
        const amount = item.quantity * product.productPrice;
        vendor.walletBalance += amount;
        await vendor.save();
      }
    }

    
    const orderedProductIds = cart.map((item) => item.product.toString());
    const remainingCart = user.cart.filter((item) => {
      return !orderedProductIds.includes(item.product._id.toString());
    });

    user.cart = remainingCart;
    await user.save();

    req.session.user.cart = user.cart;
    req.session.user.walletBalance = user.walletBalance;

    const updatedUser = await User.findById(userId)
      .populate("cart.product")
      .populate("purchased.product");

    req.session.user = updatedUser;

    res.json({ success: true, order: newOrder, updatedUser });
  } catch (error) {
    console.error("❌ Order error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
