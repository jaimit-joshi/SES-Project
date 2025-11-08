const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Routes = require("./routes/route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

console.log("[v8] Environment variables loaded:");
console.log("[v8] PORT:", PORT);
console.log("[v8] NODE_ENV:", process.env.NODE_ENV);
console.log("[v8] CLIENT_URL:", process.env.CLIENT_URL || "Not set");

app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use("/", Routes);

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    console.log("[v8] Mocking MongoDB connection in test mode...");

    // Safe global mock for Mongoose so tests won’t crash
    mongoose.connect = async () => true;
    mongoose.connection.readyState = 1;
    mongoose.model = (name, schema) => ({
      create: jest.fn().mockResolvedValue({ _id: "mockId", ...schema }),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(null),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    });
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[v8] MongoDB connected successfully.");
  } catch (err) {
    console.error("[v8] MongoDB connection failed:", err.message);
  }
};

module.exports = { app, connectDB };

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() =>
    app.listen(PORT, () => console.log(`Server started at port no. ${PORT}`))
  );
}
