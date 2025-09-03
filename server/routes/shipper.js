import express from "express";
import { Order } from "../db/schema.js";

const router = express.Router();

// get order bash on distributionHub (http://localhost:3000/api/shipper/orders)
router.get("/orders", async (req, res) => {
  try {
    if (!req.session.user || req.session.user.role !== "Shipper") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const hub = req.session.user.distributionHub;

    const orders = await Order.find({ distributionHub: hub, status: "Active" })
      .populate("customer", "displayName customerAddress")
      .populate("cart.product");

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
