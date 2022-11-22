import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new product", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to create a new product", async () => {
    const response = await request(app)
      .post("/products")
      .send({
        name: "Test Product Name",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    await request(app)
      .delete(`/products/${response.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to create a new product with existent document number", async () => {
    const productResponse = await request(app)
      .post("/products")
      .send({
        name: "Test Product Name",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/products")
      .send({
        name: "Test Product Name",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    await request(app)
      .delete(`/products/${productResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
});
