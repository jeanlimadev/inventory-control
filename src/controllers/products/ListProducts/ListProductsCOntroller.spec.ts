import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List Products", () => {
  it("should be able to list all products", async () => {
    await request(app).post("/products/create").send({
      name: "Test Name",
      document_number: "1234567",
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
  });
});
