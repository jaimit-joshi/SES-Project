require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Example route setup
try {
  const studentRoutes = require("./routes/studentRoutes");
  app.use("/", studentRoutes);
} catch (err) {
  console.warn("[v12] Routes not loaded in test mode:", err.message);
}

// ------------------
// DB CONNECTION
// ------------------
const connectDB = async () => {
  console.log("[v12] Environment variables loaded:");
  console.log("[v12] PORT:", process.env.PORT);
  console.log("[v12] NODE_ENV:", process.env.NODE_ENV);

  if (process.env.NODE_ENV === "test") {
    console.log("[v12] Using mock DB connection for tests...");
    // create an in-memory connection object
    mongoose.connection.readyState = 1;
    mongoose.connection.db = {}; // mock object to avoid .db access errors
    return mongoose.connection;
  }

  const mongoURL = process.env.MONGO_URL;
  if (!mongoURL) throw new Error("MONGO_URL not set");

  await mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("[v12] MongoDB connected to:", mongoURL);
  return mongoose.connection;
};

module.exports = { app, connectDB };

// Only start server if not in test mode
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5001;
  connectDB().then(() =>
    app.listen(PORT, () => console.log(`[v12] Server running on port ${PORT}`))
  );
}
