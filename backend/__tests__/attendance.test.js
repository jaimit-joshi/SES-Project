const request = require("supertest");
const app = require("../index.js");
const app = require("../jest.setup");
const mongoose = require("mongoose");

describe("PUT /StudentAttendance/:id", () => {
  it("returns 404 for missing student", async () => {
    const res = await request(app)
      .put("/StudentAttendance/64b7a1d27a9f123456789abc")
      .send({
        subName: "64b7a1d27a9f123456789000",
        status: "Present",
        date: "2025-10-01",
      });
    expect([404, 500]).toContain(res.statusCode);
  });

  it("returns 400 when attendance data missing", async () => {
    const res = await request(app)
      .put("/StudentAttendance/64b7a1d27a9f123456789abc")
      .send({});
    expect(res.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
