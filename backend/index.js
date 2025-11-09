// ✅ index.js — fully compatible with test + deploy modes
require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ✅ Ensure route path works even when Jest runs from subdirs
const studentRoutes = require(path.join(__dirname, "routes", "studentRoutes"));
app.use("/", studentRoutes);

// --------------------------------------
// 🔹 DB Connection Logic
// --------------------------------------
const connectDB = async () => {
  console.log("[v10] Environment variables loaded:");
  console.log("[v10] PORT:", process.env.PORT);
  console.log("[v10] NODE_ENV:", process.env.NODE_ENV);
  console.log("[v10] CLIENT_URL:", process.env.CLIENT_URL || "Not set");

  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v10] Skipping MongoDB connection (mock mode)");
      return null; // ✅ no DB connection in test mode
    }

    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) throw new Error("Missing MONGO_URL");

    await mongoose.connect(mongoURL);
    console.log("[v10] MongoDB connected successfully!");
    return mongoose.connection;
  } catch (err) {
    console.error("[v10] MongoDB connection failed:", err.message);
    return null;
  }
};

// --------------------------------------
// 🔹 Start Server Only Outside Test
// --------------------------------------
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`[v10] Server running on port ${PORT}`));
  });
}

// ✅ Export app & connectDB for tests
module.exports = { app, connectDB };
