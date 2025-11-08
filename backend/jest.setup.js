const { connectDB } = require("./index");

beforeAll(async () => {
  global.__MONGOD__ = await connectDB();
});

afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();

  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
});
