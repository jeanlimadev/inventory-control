import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Delete product purchases", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a existent purchase", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Buy product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const provider = await request(app)
      .post("/providers")
      .send({
        name: "Buy provider test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/products/purchase")
      .send({
        product_id: product.body.id,
        amount: 100,
        cost: 30,
        provider_id: provider.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const deletePurchaseResponse = await request(app)
      .delete(`/products/purchase/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(deletePurchaseResponse.status).toBe(200);

    await request(app)
      .delete(`/products/${product.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/providers/${provider.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to delete a non existent purchase", async () => {
    const deletePurchaseResponse = await request(app)
      .delete(`/products/purchase/a1b2c3d4e5f6g7`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(deletePurchaseResponse.status).toBe(404);
  });
});
