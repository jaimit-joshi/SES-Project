// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

let mongoConnection = null;

async function connectDB() {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v14] Mock DB active — skipping real Mongo connection");
      mongoConnection = true;
      return;
    }

    const mongoURI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/school-management-system";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoConnection = mongoose.connection;
    console.log("[v14] Mongo connected:", mongoURI);
  } catch (err) {
    console.error("[v14] Mongo connection error:", err.message);
  }
}

// Import routes
try {
  const routes = require("./routes/route.js");
  app.use("/", routes);
} catch (err) {
  console.warn("[v14] Routes not loaded:", err.message);
}

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`[v14] Server running on port ${PORT}`));
}

module.exports = { app, connectDB };
