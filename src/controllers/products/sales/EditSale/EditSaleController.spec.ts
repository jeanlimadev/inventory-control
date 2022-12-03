import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Edit Sale", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered sale", async () => {
    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "supplier Test",
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
        amount: 100,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale = await request(app)
      .post("/products/sell")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const saleEdited = await request(app)
      .patch(`/products/sell/${sale.body.id}`)
      .send({
        amount: 100,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(saleEdited.status).toBe(200);
    expect(saleEdited.body.amount).toBe(100);
    expect(saleEdited.body.cost).toBe(20);

    await request(app)
      .delete(`/products/sell/${saleEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

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
      .delete(`/customers/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a registered sale with less than allowed quantity", async () => {
    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "supplier Test",
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
        amount: 100,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale = await request(app)
      .post("/products/sell")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const saleEdited = await request(app)
      .patch(`/products/sell/${sale.body.id}`)
      .send({
        amount: -1,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(saleEdited.status).toBe(400);
    expect(saleEdited.body).toHaveProperty("error");

    await request(app)
      .delete(`/products/sell/${sale.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

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
      .delete(`/customers/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a registered sale if the quantity is greater than available in stock", async () => {
    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "supplier Test",
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
        amount: 100,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale = await request(app)
      .post("/products/sell")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const saleEdited = await request(app)
      .patch(`/products/sell/${sale.body.id}`)
      .send({
        amount: 110,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(saleEdited.status).toBe(400);
    expect(saleEdited.body).toHaveProperty("error");

    await request(app)
      .delete(`/products/sell/${sale.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

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
      .delete(`/customers/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered sale", async () => {
    const saleEdited = await request(app)
      .patch(`/products/sell/a1b2c3d4e5f6`)
      .send({
        amount: 100,
        cost: 20,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(saleEdited.status).toBe(404);
    expect(saleEdited.body).toHaveProperty("error");
  });
});
