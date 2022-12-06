import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Buy Product", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to buy a registered product from a registered supplier", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Buy product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "Buy supplier test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 100,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchase.status).toBe(201);
    expect(purchase.body).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/${product.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to buy a registered product from a non registered supplier", async () => {
    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "Buy supplier test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/purchases")
      .send({
        product_id: "a1b2c3d4e5",
        amount: 100,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchase.status).toBe(404);
    expect(purchase.body).toHaveProperty("error");

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to buy a non registered product from a registered supplier", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Buy product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 100,
        cost: 30,
        supplier_id: "a1b2c3d4e5",
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
