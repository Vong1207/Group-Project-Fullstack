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
  console.log("✅ BODY:", req.body);
  // check data from client
  if (
    !userId ||
    !Array.isArray(cart) ||
    cart.length === 0 ||
    totalPrice == null
  ) {
    return res.status(400).json({ success: false, error: "Missing data" });
  }

  try {
    // create a new array to store products
    const orderItems = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
    // choose a hub randomly
    const hubs = ["Ho Chi Minh", "Da Nang", "Ha Noi"];
    const randomHub = hubs[Math.floor(Math.random() * hubs.length)];
    // create a new order
    const newOrder = new Order({
      customer: userId,
      cart: orderItems,
      totalPrice,
      distributionHub: randomHub,
    });

    await newOrder.save();
    // currently user
    const user = await User.findById(userId).populate("cart.product");

    // get the id list of products that were ordered
    const orderedProductIds = cart.map(item => item.product.toString());

    // keep products were not order
    const remainingCart = user.cart.filter(item => {
      return !orderedProductIds.includes(item.product._id.toString());
    });

    // update user cart
    user.cart = remainingCart;
    await user.save();

    // update cart 
    req.session.user.cart = user.cart;

    res.json({ success: true, order: newOrder, updatedUser: user });
  } catch (error) {
    console.error("❌ Order error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
