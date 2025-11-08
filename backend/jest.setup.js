const mongoose = require("mongoose");
const { connectDB } = require("./index"); // ✅ use ./ instead of ../

beforeAll(async () => {
  global.__MONGOD__ = await connectDB(); // connect to mock or real DB depending on env
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (global.__MONGOD__ && global.__MONGOD__.stop) {
    await global.__MONGOD__.stop();
  }
});
