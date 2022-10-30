import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new product", () => {
  it("should be able to create a new product", async () => {
    const response = await request(app).post("/products/create").send({
      name: "Product Test",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    await request(app).delete("/products/delete").send({
      name: "Product Test",
    });
  });

  it("should not be able to create a new product with existent document number", async () => {
    await request(app).post("/products/create").send({
      name: "Product Test",
      document_number: "12345678",
    });

    const response = await request(app).post("/products/create").send({
      name: "Product Test",
      document_number: "12345678",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    await request(app).delete("/products/delete").send({
      name: "Product Test",
    });
  });
});