import "reflect-metadata";
import { describe, expect, it } from "vitest";
import request from "supertest";
import { container } from "tsyringe";

import { app } from "../../../app";
import { DayJsDateProvider } from "../../../utils/DateProvider/DayJsDateProvider";

describe("Filter purchases by supplier and period", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  const dateProvider = container.resolve(DayJsDateProvider);

  it("should be able to filter all purchases of a supplier", async () => {
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

    const purchase1 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase2 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases = await request(app)
      .get(`/purchases/filter?supplier_id=${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterPurchases.status).toBe(200);
    expect(filterPurchases.body.length).toBe(2);
    expect(filterPurchases.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/purchases/${purchase2.body["id"]}`)
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

  it("should be able to filter all purchases of a product", async () => {
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

    const purchase1 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase2 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases = await request(app)
      .get(`/purchases/filter?product_id=${product.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterPurchases.status).toBe(200);
    expect(filterPurchases.body.length).toBe(2);
    expect(filterPurchases.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/purchases/${purchase2.body["id"]}`)
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

  it("should be able to filter all purchases of a supplier by a period", async () => {
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

    const purchase1 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase2 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases1 = await request(app)
      .get(
        `/purchases/filter?supplier_id=${
          supplier.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays()}&end_date=${dateProvider.dateTodayFormatAndAddDays()}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases2 = await request(app)
      .get(
        `/purchases/filter?supplier_id=${
          supplier.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays(
          1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(1)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases3 = await request(app)
      .get(
        `/purchases/filter?supplier_id=${
          supplier.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays(
          -1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(2)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterPurchases1.status).toBe(200);
    expect(filterPurchases1.body.length).toBe(2);
    expect(filterPurchases1.body[0]).toHaveProperty("id");

    expect(filterPurchases2.status).toBe(200);
    expect(filterPurchases2.body.length).toBe(0);

    expect(filterPurchases3.status).toBe(200);
    expect(filterPurchases3.body.length).toBe(2);
    expect(filterPurchases3.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/purchases/${purchase2.body["id"]}`)
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

  it("should be able to filter all purchases of a product by a period", async () => {
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

    const purchase1 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase2 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases1 = await request(app)
      .get(
        `/purchases/filter?product_id=${
          product.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays()}&end_date=${dateProvider.dateTodayFormatAndAddDays()}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases2 = await request(app)
      .get(
        `/purchases/filter?product_id=${
          product.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays(
          1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(1)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases3 = await request(app)
      .get(
        `/purchases/filter?product_id=${
          product.body["id"]
        }&initial_date=${dateProvider.dateTodayFormatAndAddDays(
          -1
        )}&end_date=${dateProvider.dateTodayFormatAndAddDays(2)}`
      )
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterPurchases1.status).toBe(200);
    expect(filterPurchases1.body.length).toBe(2);
    expect(filterPurchases1.body[0]).toHaveProperty("id");

    expect(filterPurchases2.status).toBe(200);
    expect(filterPurchases2.body.length).toBe(0);

    expect(filterPurchases3.status).toBe(200);
    expect(filterPurchases3.body.length).toBe(2);
    expect(filterPurchases3.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/purchases/${purchase2.body["id"]}`)
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

  it("should be able to filter all purchases", async () => {
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

    const purchase1 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const purchase2 = await request(app)
      .post("/purchases")
      .send({
        product_id: product.body.id,
        amount: 50,
        cost: 30,
        supplier_id: supplier.body.id,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const filterPurchases = await request(app)
      .get(`/purchases/filter`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(filterPurchases.status).toBe(200);
    expect(filterPurchases.body.length).toBeGreaterThanOrEqual(1);
    expect(filterPurchases.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/purchases/${purchase1.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    await request(app)
      .delete(`/purchases/${purchase2.body["id"]}`)
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
});
