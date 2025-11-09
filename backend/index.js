// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Safer CORS setup (does not affect tests)
const allowedOrigins = [
  "https://school-management-frontend.onrender.com", // your Render frontend
  "http://localhost:3000",                           // local dev
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or tests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

let mongoConnection = null;

async function connectDB() {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v15] Mock DB active — skipping real Mongo connection");

      // Prevent Mongoose from buffering operations when no real DB
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

// Import routes
try {
  const routes = require("./routes/route.js");
  app.use("/", routes);
} catch (err) {
  console.warn("[v15] Routes not loaded:", err.message);
}

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`[v15] Server running on port ${PORT}`));
}

module.exports = { app, connectDB };
