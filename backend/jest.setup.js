// backend/jest.setup.js
const mongoose = require("mongoose");
const { app, connectDB } = require("./index");

beforeAll(async () => {
  console.log("[v13] Setting up backend test environment...");
  process.env.NODE_ENV = "test";
  await connectDB();
});

afterAll(async () => {
  console.log("[v13] Cleaning up test environment...");
  await mongoose.connection.close();
});

module.exports = app;
