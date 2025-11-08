const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "https://ses-project-frontend.onrender.com";

console.log("[v1] Environment variables loaded:");
console.log("[v1] PORT:", process.env.PORT);
console.log("[v1] MONGO_URL:", process.env.MONGO_URL ? "Set (hidden for security)" : "NOT SET");
console.log("[v1] CLIENT_URL:", CLIENT_URL);

app.use(express.json({ limit: "10mb" }));

// ✅ Allow frontend to access backend
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Health check for Render
app.get("/", (req, res) => {
  res.status(200).send("✅ Backend is running successfully!");
});

// ✅ API routes
app.use("/api", Routes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.log("MongoDB connection failed:", err.message);
    console.log("[v1] Check your MONGO_URL in Render environment variables");
  });

// ✅ Export app for testing
module.exports = app;

// ✅ Start server (Render handles port)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
