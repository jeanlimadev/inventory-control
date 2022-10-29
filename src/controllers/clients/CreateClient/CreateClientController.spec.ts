import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new client", () => {
  it("should be able to create a new client", async () => {
    const response = await request(app).post("/clients/create").send({
      name: "Test Name",
      document_number: "12345678",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    await request(app).delete("/clients/delete").send({
      document_number: "12345678",
    });
  });

  it("should not be able to create a new client with existent document number", async () => {
    await request(app).post("/clients/create").send({
      name: "Test Name",
      document_number: "12345678",
    });

    const response = await request(app).post("/clients/create").send({
      name: "Test Name",
      document_number: "12345678",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    await request(app).delete("/clients/delete").send({
      document_number: "12345678",
    });
  });
});
