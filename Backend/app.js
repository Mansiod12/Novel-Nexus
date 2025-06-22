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

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://novel-nexus-gpq8.vercel.app",
  "http://localhost:5173", // for local dev
];

app.use(express.json());

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy does not allow access from this origin: ' + origin;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", favourites);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// Export the app
export default app;
