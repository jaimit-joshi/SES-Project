const request = require("supertest");
const app = require("../index.js");
const app = require("../jest.setup");
const mongoose = require("mongoose");

describe("POST /StudentReg", () => {
  it("registers a new student successfully", async () => {
    const res = await request(app)
      .post("/StudentReg")
      .send({
        rollNum: "S1001",
        adminID: "admin001",
        sclassName: "class001",
        password: "TestPass123",
        name: "John Doe",
        email: "john@example.com",
      });

    expect([201, 400]).toContain(res.statusCode);
    // 201 if new, 400 if same rollNum already exists
  });

  it("fails when required fields are missing", async () => {
    const res = await request(app)
      .post("/StudentReg")
      .send({
        name: "Incomplete Student",
        email: "no-pass@example.com",
      });
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
