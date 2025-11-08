// ✅ jest.setup.js
const mongoose = require("mongoose");
const { app, connectDB } = require("../index");

// Before running any tests, connect to mock DB or whatever test mode specifies
beforeAll(async () => {
  console.log("[v9] Setting up test environment...");

  try {
    // Connect to DB (mocked in index.js when NODE_ENV=test)
    global.__MONGOD__ = await connectDB();
    console.log("[v9] Test DB connection established (mock or real)");
  } catch (err) {
    console.error("[v9] Failed to initialize test DB:", err.message);
  }
});

// After all tests, safely close the DB connection
afterAll(async () => {
  console.log("[v9] Cleaning up test environment...");

  try {
    if (mongoose.connection && mongoose.connection.readyState !== 0) {
      if (mongoose.connection.db) {
        await mongoose.connection.dropDatabase().catch(() => {});
      }
      await mongoose.connection.close();
      console.log("[v9] MongoDB connection closed.");
    } else {
      console.log("[v9] No active MongoDB connection to close.");
    }
  } catch (err) {
    console.warn("[v9] Cleanup skipped or failed:", err.message);
  }

  if (global.__MONGOD__ && typeof global.__MONGOD__.stop === "function") {
    await global.__MONGOD__.stop();
    console.log("[v9] In-memory MongoDB stopped.");
  }
});

module.exports = app;
