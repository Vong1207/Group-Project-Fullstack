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
