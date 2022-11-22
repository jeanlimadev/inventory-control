import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a product", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a product", async () => {
    const productResponse = await request(app)
      .post("/products")
      .send({
        name: "Test Name",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/products/${productResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent product", async () => {
    const response = await request(app)
      .delete(`/products/abc1234`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
