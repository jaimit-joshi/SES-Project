// ✅ index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// (Your routes)
const studentRoutes = require("./routes/studentRoutes");
app.use("/", studentRoutes);

// -------------------------
// 🔹 Connection logic
// -------------------------
const connectDB = async () => {
  console.log("[v8] Environment variables loaded:");
  console.log("[v8] PORT:", process.env.PORT);
  console.log("[v8] NODE_ENV:", process.env.NODE_ENV);
  console.log("[v8] CLIENT_URL:", process.env.CLIENT_URL || "Not set");

  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v8] Mocking MongoDB connection in test mode...");
      // Skip actual DB
      return null;
    }

    const mongoURL = process.env.MONGO_URL;
    if (!mongoURL) throw new Error("Missing MONGO_URL");

    await mongoose.connect(mongoURL);
    console.log("[v8] MongoDB connected successfully!");
    return mongoose.connection;
  } catch (err) {
    console.error("[v8] MongoDB connection failed:", err.message);
  }
};

// -------------------------
// 🔹 Start server only if not in test
// -------------------------
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  connectDB().then(() => {
    app.listen(PORT, () => console.log(`[v8] Server running on port ${PORT}`));
  });
}

// ✅ Export app for testing
module.exports = { app, connectDB };
