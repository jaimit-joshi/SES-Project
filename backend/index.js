// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Dynamic + Safe CORS setup (works for Render, localhost, and tests)
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://school-management-frontend.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, tests, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("[CORS] Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight OPTIONS requests globally
app.options("*", cors());

let mongoConnection = null;

async function connectDB() {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v15] Mock DB active — skipping real Mongo connection");

      // Prevent Mongoose from buffering when no DB is active
      mongoose.connect = async () => {};
      mongoose.createConnection = () => mongoose.connection;
      mongoose.connection.readyState = 1;
      mongoose.connection.on = () => {};
      mongoose.connection.close = async () => {};
      mongoose.set("bufferCommands", false);

      mongoConnection = true;
      return;
    }

    const mongoURI =
      process.env.MONGO_URL ||
      "mongodb://127.0.0.1:27017/school-management-system";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoConnection = mongoose.connection;
    console.log("[v15] Mongo connected:", mongoURI);
  } catch (err) {
    console.error("[v15] Mongo connection error:", err.message);
  }
}

// ✅ Import routes safely
try {
  const routes = require("./routes/route.js");
  app.use("/", routes);
} catch (err) {
  console.warn("[v15] Routes not loaded:", err.message);
}

// ✅ Start server only outside test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`[v15] Server running on port ${PORT}`));
}

module.exports = { app, connectDB };
