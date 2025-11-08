beforeAll(async () => {
  global.__MONGOD__ = await connectDB();
});

afterAll(async () => {
  if (global.__MONGOD__) {
    await mongoose.connection.close();
    await global.__MONGOD__.stop();
  }
});
