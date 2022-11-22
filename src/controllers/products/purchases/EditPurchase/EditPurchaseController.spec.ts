import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Edit Purchase", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered purchase", async () => {
    const provider = await request(app)
      .post("/providers")
      .send({
        name: "Provider Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = await request(app)
      .post("/products")
      .send({
        name: "Product Test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/products/purchase")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        provider_id: provider.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchaseEdited = await request(app)
      .patch(`/products/purchase/edit/${purchase.body.id}`)
      .send({
        amount: 100,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchaseEdited.status).toBe(200);
    expect(purchaseEdited.body.amount).toBe(100);
    expect(purchaseEdited.body.cost).toBe(20);

    await request(app)
      .delete(`/products/purchase/${purchaseEdited.body["id"]}`)
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

  it("should not be able to edit a registered purchase with less than allowed quantity", async () => {
    const provider = await request(app)
      .post("/providers")
      .send({
        name: "Provider Test",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const product = await request(app)
      .post("/products")
      .send({
        name: "Product Test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase = await request(app)
      .post("/products/purchase")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        provider_id: provider.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchaseEdited = await request(app)
      .patch(`/products/purchase/edit/${purchase.body.id}`)
      .send({
        amount: -1,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchaseEdited.status).toBe(400);
    expect(purchaseEdited.body).toHaveProperty("error");

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

  it("should not be able to edit a non registered purchase", async () => {
    const purchaseEdited = await request(app)
      .patch(`/products/purchase/edit/a1b2c3d4e5f6`)
      .send({
        amount: 100,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(purchaseEdited.status).toBe(404);
    expect(purchaseEdited.body).toHaveProperty("error");
  });
});
