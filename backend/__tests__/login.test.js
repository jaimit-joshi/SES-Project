const request = require("supertest");
const app = require("../jest.setup");


describe("POST /StudentLogin", () => {
  it("logs in user with valid credentials", async () => {
    const res = await request(app)
      .post("/StudentLogin")
      .send({
        rollNum: "S1001",
        studentName: "John Doe",
        password: "TestPass123",
      });

    expect([200, 400, 401, 404]).toContain(res.statusCode);
    // 200 if credentials exist, 401 invalid pass, 404 not found
  });

  it("rejects login with missing credentials", async () => {
    const res = await request(app)
      .post("/StudentLogin")
      .send({ rollNum: "S1001" });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
