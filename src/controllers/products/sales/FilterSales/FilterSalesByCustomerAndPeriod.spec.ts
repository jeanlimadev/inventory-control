import "reflect-metadata";
import { describe, expect, it } from "vitest";
import request from "supertest";
import { container } from "tsyringe";

import { app } from "../../../../app";
import { DayJsDateProvider } from "../../../../utils/DateProvider/DayJsDateProvider";

describe("Filter sales by customer and period", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  const dateProvider = container.resolve(DayJsDateProvider);

  it("should be able to filter all sales of a customer", async () => {
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
        amount: 500,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale1 = await request(app)
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

    const sale2 = await request(app)
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

    const filterSales = await request(app)
      .get(`/products/sell/filter/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterSales.status).toBe(200);
    expect(filterSales.body.length).toBe(2);
    expect(filterSales.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/products/purchase/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/sell/${sale1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/sell/${sale2.body["id"]}`)
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

  it("should be able to filter all sales of a customer by a period", async () => {
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
        amount: 500,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const sale1 = await request(app)
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

    const sale2 = await request(app)
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

    const filterSales1 = await request(app)
      .get(
        `/products/sell/filter/${
          customer.body["id"]
        }?initial_date=${dateProvider.dateTodayFormatAndAddDays()}&end_date=${dateProvider.dateTodayFormatAndAddDays()}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterSales2 = await request(app)
      .get(
        `/products/sell/filter/${
          customer.body["id"]
        }?initial_date=${dateProvider.dateTodayFormatAndAddDays(
          1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(1)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterSales3 = await request(app)
      .get(
        `/products/sell/filter/${
          customer.body["id"]
        }?initial_date=${dateProvider.dateTodayFormatAndAddDays(
          -1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(2)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterSales1.status).toBe(200);
    expect(filterSales1.body.length).toBe(2);
    expect(filterSales1.body[0]).toHaveProperty("id");

    expect(filterSales2.status).toBe(200);
    expect(filterSales2.body.length).toBe(0);

    expect(filterSales3.status).toBe(200);
    expect(filterSales3.body.length).toBe(2);
    expect(filterSales3.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/products/purchase/${purchase.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/sell/${sale1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/products/sell/${sale2.body["id"]}`)
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

  it("should not be able to filter all sales of a non existent customer", async () => {
    const filterSales = await request(app)
      .get(`/products/sell/filter/a1b2c3d4e5f6`)
      .set({
        Authorization: `Bearer ${token}`,
      });
    expect(filterSales.status).toBe(404);
    expect(filterSales.body).toHaveProperty("error");
  });
});
