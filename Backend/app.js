import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import "./conn/conn.js";  // MongoDB connection
import user from "./routes/user.js";
import book from "./routes/book.js";
import favourites from "./routes/favourites.js";
import cart from "./routes/cart.js";
import order from "./routes/order.js";
import compression from "compression";
app.use(compression());

dotenv.config();

const app = express();

// 🛡️ Use Helmet for security headers
app.use(helmet());

// 🛡️ Optional: Customize Helmet (disable contentSecurityPolicy if using external scripts)
// app.use(helmet({ contentSecurityPolicy: false }));

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "https://novel-nexus-gpq8.vercel.app",  // Frontend URL
    credentials: true,
}));

// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

export default app;
