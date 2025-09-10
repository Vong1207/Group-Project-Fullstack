import express from "express";
import { Order, User } from "../db/schema.js";

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


// update status product: Delivered or canceled
router.put("/orders/:orderId", async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (!sessionUser || sessionUser.role !== "Shipper") {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { orderId } = req.params;
    const { status } = req.body;

    const allowed = ["Delivered", "Canceled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findById(orderId).populate("customer").populate("cart.product");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.distributionHub !== sessionUser.distributionHub) {
      return res.status(403).json({ success: false, message: "Forbidden (wrong hub)" });
    }

    if (order.status !== "Active") {
      return res.status(400).json({ success: false, message: "Order is not Active" });
    }

    if (status === "Delivered" || status === "Canceled") {
      const customer = await User.findById(order.customer._id).populate("purchased.product");
      if (!customer) {
        return res.status(404).json({ success: false, message: "Customer not found" });
      }
    
    if (status === "Canceled") {
      customer.walletBalance += order.totalPrice;
    }

      order.cart.forEach((ci) => {
        customer.purchased.push({
          product: ci.product._id,
          quantity: ci.quantity,
          status: status,
        });
      });

      await customer.save();
    }

    order.status = status;
    await order.save();

    const updated = await Order.findById(order._id)
      .populate("customer", "displayName customerAddress")
      .populate("cart.product");

    return res.json({ success: true, order: updated });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
