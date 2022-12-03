import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Edit supplier", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered supplier", async () => {
    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "supplier Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const supplierEdited = await request(app)
      .patch(`/suppliers/${supplier.body.id}`)
      .send({
        name: "supplier Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(supplierEdited.status).toBe(200);
    expect(supplierEdited.body.name).toBe("supplier Test Edited");
    expect(supplierEdited.body.document_number).toBe("987654321");

    await request(app)
      .delete(`/suppliers/${supplierEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered supplier", async () => {
    const supplierEdited = await request(app)
      .patch("/suppliers/a1b2c3d4e5f6")
      .send({
        name: "supplier Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(supplierEdited.status).toBe(404);
    expect(supplierEdited.body).toHaveProperty("error");
  });
});
