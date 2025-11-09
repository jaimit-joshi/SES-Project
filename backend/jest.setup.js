// backend/jest.setup.js
const mongoose = require("mongoose");
const { app, connectDB } = require("./index");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  console.log("[v14] Setting up backend test environment...");
  await connectDB(); // This now just mocks connection
});

afterAll(async () => {
  console.log("[v14] Cleaning up after backend tests...");
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

module.exports = app;
