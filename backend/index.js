const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`[v4] Environment variables loaded:`);
console.log(`[v4] PORT: ${PORT}`);
console.log(`[v4] NODE_ENV: ${NODE_ENV}`);
console.log(`[v4] CLIENT_URL: ${process.env.CLIENT_URL || "Not set"}`);

app.use(express.json({ limit: "10mb" }));
app.use(cors());

/**
 * 🔹 Dynamic Mongo Connection
 * - Local: connects to .env MONGO_URL
 * - Test: uses in-memory MongoDB (no external DB)
 * - Production: connects to Render MONGO_URL
 */
const connectDB = async () => {
  try {
    if (NODE_ENV === "test") {
      console.log("[v4] Starting in-memory MongoDB for tests...");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log("[v4] Connected to temporary in-memory MongoDB ✅");
    } else {
      const mongoURI = process.env.MONGO_URL;
      if (!mongoURI) throw new Error("Missing MONGO_URL in environment");
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`[v4] Connected to MongoDB (${NODE_ENV}) ✅`);
    }
  } catch (err) {
    console.error("[v4] MongoDB connection failed:", err.message);
  }
};

connectDB();

app.use("/", Routes);

// ✅ Export app for tests
module.exports = app;

// ✅ Only start server in non-test environments
if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
}
