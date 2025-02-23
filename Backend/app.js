import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./conn/conn.js";  // Ensure the MongoDB connection file is properly imported
import user from "./routes/user.js";
import book from "./routes/book.js";
import favourites from "./routes/favourites.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// Export the app
export default app;
