// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());

// ✅ Move connectDB definition before calling it
async function connectDB() {
  try {
    if (process.env.NODE_ENV === "test") {
      console.log("[v15] Mock DB active — skipping real Mongo connection");
      mongoose.set("bufferCommands", false);
      return;
    }

    const mongoURI =
      process.env.MONGO_URL ||
      "mongodb://127.0.0.1:27017/school-management-system";

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("[v15] Mongo connected:", mongoURI);
  } catch (err) {
    console.error("[v15] Mongo connection error:", err.message);
  }
}

// ✅ connect DB only when not testing
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// ✅ Safe CORS config
const allowedOrigins = [
  "https://ses-project-1.onrender.com",
  "https://school-management-frontend.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn("[CORS] Blocked origin:", origin);
        callback(null, false); // ✅ Return false instead of throwing error
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight
app.options("*", cors());

// ✅ Routes
try {
  const routes = require("./routes/route.js");
  app.use("/", routes);
} catch (err) {
  console.warn("[v15] Routes not loaded:", err.message);
}

// ✅ Start server when not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`[v15] Server running on port ${PORT}`));
}

module.exports = { app, connectDB };
