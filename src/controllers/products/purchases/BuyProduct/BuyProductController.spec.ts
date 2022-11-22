import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Buy Product", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to buy a registered product from a registered provider", async () => {
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

    expect(purchase.status).toBe(201);
    expect(purchase.body).toHaveProperty("id");

    await request(app)
      .delete(`/products/purchase/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

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

  it("should not be able to buy a registered product from a non registered provider", async () => {
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
        product_id: "a1b2c3d4e5",
        amount: 100,
        cost: 30,
        provider_id: provider.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchase.status).toBe(404);
    expect(purchase.body).toHaveProperty("error");

    await request(app)
      .delete(`/providers/${provider.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to buy a non registered product from a registered provider", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Buy product test",
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
        provider_id: "a1b2c3d4e5",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchase.status).toBe(404);
    expect(purchase.body).toHaveProperty("error");

    await request(app)
      .delete(`/products/${product.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
});
