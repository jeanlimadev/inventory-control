import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Edit Product", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered product", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Product Test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const productEdited = await request(app)
      .patch(`/products/${product.body.id}`)
      .send({
        name: "Product Test Edited",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(productEdited.status).toBe(200);
    expect(productEdited.body.name).toBe("Product Test Edited");

    await request(app)
      .delete(`/products/${productEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered product", async () => {
    const productEdited = await request(app)
      .patch("/products/a1b2c3d4e5f6")
      .send({
        name: "Product Test Edited",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(productEdited.status).toBe(404);
    expect(productEdited.body).toHaveProperty("error");
  });
});
