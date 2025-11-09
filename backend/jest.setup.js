// ✅ jest.setup.js — stable mock environment for backend tests
const mongoose = require("mongoose");
const { app, connectDB } = require("../index");

beforeAll(async () => {
  console.log("[v10] Setting up mock test environment...");
  await connectDB(); // This will skip DB in test mode
});

afterAll(async () => {
  console.log("[v10] Cleaning up test environment...");
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase().catch(() => {});
    await mongoose.connection.close().catch(() => {});
  }
  console.log("[v10] MongoDB connection closed (if any).");
});

module.exports = app;
