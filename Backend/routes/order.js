const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");
const Order = require("../models/order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// 🛒 Place an Order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // User ID from headers
        const { order } = req.body; // List of books in order

        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({ message: "Invalid order data" });
        }

        const orderIds = [];

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const savedOrder = await newOrder.save();
            orderIds.push(savedOrder._id);
        }

        // Update user model with new orders and clear the cart
        await User.findByIdAndUpdate(id, {
            $push: { orders: { $each: orderIds } },
            $set: { cart: [] }, // Clear the cart after placing order
        });

        return res.json({ status: "success", message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 📜 Get Order History
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
            options: { sort: { createdAt: -1 } } // Sort orders by latest
        });

        return res.json({ status: "success", data: userData.orders });
    } catch (error) {
        console.error("Error fetching order history:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 📋 Get All Orders (Admin)
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("book")
            .populate("user")
            .sort({ createdAt: -1 });

        return res.json({ status: "success", data: orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 🔄 Update Order Status (Admin)
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({ status: "success", message: "Order status updated successfully" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 💳 Create Stripe Checkout Session
router.post("/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        console.log("🚀 Received products from frontend:", products);

        const lineItems = products.map((product) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.title,
                        images: [product.image],
                    },
                    unit_amount: Math.round(product.price * 100),
                },
                quantity: product.quantity || 1, // Important: add fallback to 1 if missing
            };
        });

        console.log("✅ Stripe lineItems:", lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        });

        console.log("✅ Stripe session created:", session.id);

        res.json({ id: session.id });
    } catch (error) {
        console.error("❌ Stripe checkout session error:", error);
        res.status(500).json({ message: "Stripe error", error: error.message });
    }
});

module.exports = router;
