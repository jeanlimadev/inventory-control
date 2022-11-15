import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Delete product sales", async () => {
  const responseToken = await request(app).post("/users/sessions").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a existent sale", async () => {
    const product = await request(app)
      .post("/products/create")
      .send({
        name: "Sale product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const provider = await request(app)
      .post("/providers/create")
      .send({
        name: "Sale provider test",
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

    const client = await request(app)
      .post("/clients/create")
      .send({
        name: "Sale client test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale = await request(app)
      .post("/products/sell")
      .send({
        product_id: product.body.id,
        amount: 100,
        cost: 30,
        client_id: client.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const deleteSaleResponse = await request(app)
      .delete(`/products/sell/${sale.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(deleteSaleResponse.status).toBe(200);

    await request(app)
      .delete(`/products/purchase/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/delete/${product.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/clients/delete/${client.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/providers/delete/${provider.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to delete a non existent sale", async () => {
    const deleteSaleResponse = await request(app)
      .delete(`/products/sell/a1b2c3d4e5f6g7`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(deleteSaleResponse.status).toBe(404);
  });
});
