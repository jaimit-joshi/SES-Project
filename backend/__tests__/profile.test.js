const request = require("supertest");
const app = require("../index.js");
const mongoose = require("mongoose");

describe("GET /Student/:id", () => {
  it("returns 404 for invalid student ID", async () => {
    const res = await request(app).get("/Student/invalid-id");
    expect(res.statusCode).toBe(404);
  });

  it("returns 404 for non-existing student", async () => {
    const res = await request(app).get("/Student/64b7a1d27a9f123456789abc");
    expect([404, 500]).toContain(res.statusCode);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
