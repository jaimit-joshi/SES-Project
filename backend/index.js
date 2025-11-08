const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "https://ses-project-frontend.onrender.com";

console.log("[v3] Environment variables loaded:");
console.log("[v3] PORT:", process.env.PORT);
console.log("[v3] MONGO_URL:", process.env.MONGO_URL ? "Set (hidden)" : "NOT SET");
console.log("[v3] CLIENT_URL:", CLIENT_URL);

app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running successfully!");
});

app.use("/api", Routes);

async function connectDB() {
  if (process.env.NODE_ENV === "test") {
    console.log("[v3] Starting in-memory MongoDB for tests...");
    const { MongoMemoryServer } = require("mongodb-memory-server");
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log("[v3] In-memory MongoDB connected");
    return mongod; // return reference for cleanup
  } else {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
    return null;
  }
}

// ✅ Only connect and start server when not in test mode
if (process.env.NODE_ENV !== "test") {
  connectDB().catch((err) => {
    console.log("MongoDB connection failed:", err.message);
  });

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = { app, connectDB };
