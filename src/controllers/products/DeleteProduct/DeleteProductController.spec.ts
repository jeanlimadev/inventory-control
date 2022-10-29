import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a product", () => {
  it("should be able to delete a product", async () => {
    await request(app).post("/products/create").send({
      name: "Product Test 1",
    });

    const response = await request(app).delete("/products/delete").send({
      name: "Product Test 1",
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent product", async () => {
    const response = await request(app).delete("/products/delete").send({
      name: "Product Test 1",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
