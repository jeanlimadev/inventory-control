import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../../app";

describe("Sell Products", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to sell a registered product to a registered customer", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Sell product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = await request(app)
      .post("/customers")
      .send({
        name: "Sell customer test",
        document_number: "123456789",
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
        amount: 100,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(sale.status).toBe(201);
    expect(sale.body).toHaveProperty("id");

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

  it("should not be able to sell a registered product to a registered customer if the quantity is greater than available in stock", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Sell product test",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = await request(app)
      .post("/customers")
      .send({
        name: "Sell customer test",
        document_number: "123456789",
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
      .post("/products/purchase")
      .send({
        product_id: product.body.id,
        amount: 90,
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
        amount: 100,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(sale.status).toBe(400);
    expect(sale.body).toHaveProperty("error");

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

  it("should not be able to sale a registered product to a non registered customer", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Sell product test",
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
        amount: 100,
        cost: 30,
        customer_id: "a1b2c3d4e5f6",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(sale.status).toBe(404);
    expect(sale.body).toHaveProperty("error");

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
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to sale a non registered product to a registered customer", async () => {
    const product = await request(app)
      .post("/products")
      .send({
        name: "Sell product test",
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

    const customer = await request(app)
      .post("/customers")
      .send({
        name: "Sell customer test",
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
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale = await request(app)
      .post("/products/sell")
      .send({
        product_id: "a1b2c3d4e5f6",
        amount: 100,
        cost: 30,
        customer_id: customer.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(sale.status).toBe(404);
    expect(sale.body).toHaveProperty("error");

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
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/customers/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
});
