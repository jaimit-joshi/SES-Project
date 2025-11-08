const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";

console.log(`[v5] Environment variables loaded:`);
console.log(`[v5] PORT: ${PORT}`);
console.log(`[v5] NODE_ENV: ${NODE_ENV}`);
console.log(`[v5] CLIENT_URL: ${process.env.CLIENT_URL || "Not set"}`);

app.use(express.json({ limit: "10mb" }));
app.use(cors());

/**
 * 🔹 connectDB()
 * Automatically chooses DB based on NODE_ENV:
 * - test → mongodb-memory-server (in-memory)
 * - other → process.env.MONGO_URL
 */
const connectDB = async () => {
  try {
    if (NODE_ENV === "test") {
      console.log("[v5] Starting in-memory MongoDB for tests...");
      const { MongoMemoryServer } = require("mongodb-memory-server");
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("[v5] Connected to temporary in-memory MongoDB ✅");
      return mongod;
    } else {
      const mongoURI = process.env.MONGO_URL;
      if (!mongoURI) throw new Error("Missing MONGO_URL in environment");
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`[v5] Connected to MongoDB (${NODE_ENV}) ✅`);
      return null;
    }
  } catch (err) {
    console.error("[v5] MongoDB connection failed:", err.message);
    return null;
  }
};

// Immediately connect when not testing
if (NODE_ENV !== "test") {
  connectDB();
}

app.use("/", Routes);

// ✅ Export both app and connectDB for Jest tests
module.exports = { app, connectDB };

// ✅ Start server only outside of test env
if (NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
}
