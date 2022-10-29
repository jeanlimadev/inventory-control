import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new provider", () => {
  it("should be able to create a new provider", async () => {
    const response = await request(app).post("/providers/create").send({
      name: "Test Name",
      document_number: "11111",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    await request(app).delete("/providers/delete").send({
      document_number: "11111",
    });
  });

  it("should not be able to create a new provider with existent document number", async () => {
    await request(app).post("/providers/create").send({
      name: "Test Name",
      document_number: "11111",
    });

    const response = await request(app).post("/providers/create").send({
      name: "Test Name",
      document_number: "11111",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    await request(app).delete("/providers/delete").send({
      document_number: "11111",
    });
  });
});
