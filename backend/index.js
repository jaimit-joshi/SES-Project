// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🧩 Load routes dynamically
try {
  const routes = require("./routes/route");
  app.use("/", routes);
} catch (err) {
  console.warn("[v13] Routes not loaded:", err.message);
}

// ---------------------
// Mongo Connection Logic
// ---------------------
let server;

async function connectDB() {
  const env = process.env.NODE_ENV || "development";
  let mongoURL;

  if (env === "test") {
    // ✅ Use in-memory / mock DB for CircleCI
    mongoURL = "mongodb://127.0.0.1:27017/test-db";
    console.log("[v13] Using temporary test DB connection:", mongoURL);
  } else if (env === "production") {
    mongoURL = process.env.MONGO_URL;
    console.log("[v13] Using production DB connection");
  } else {
    mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/school-management-system";
    console.log("[v13] Using local dev DB connection");
  }

  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("[v13] MongoDB connected successfully");
  } catch (err) {
    console.error("[v13] Mongo connection error:", err);
  }
}

// Only start the server when not in test mode
if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    const PORT = process.env.PORT || 5001;
    server = app.listen(PORT, () => console.log(`[v13] Server running on port ${PORT}`));
  });
}

module.exports = { app, connectDB };
