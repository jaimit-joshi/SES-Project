const path = require("path");
const mongoose = require("mongoose");
const { app, connectDB } = require(path.join(__dirname, "index.js"));

beforeAll(async () => {
  console.log("[v12] Setting up test environment...");
  await connectDB(); // mock or real depending on NODE_ENV
});

afterAll(async () => {
  console.log("[v12] Cleaning up...");
  if (mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.close();
      console.log("[v12] Mongo connection closed");
    } catch (err) {
      console.warn("[v12] Error closing mock connection:", err.message);
    }
  }
});

module.exports = app;
