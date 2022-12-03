import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Edit Customer", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered customer", async () => {
    const customer = await request(app)
      .post("/customers")
      .send({
        name: "customer Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const customerEdited = await request(app)
      .patch(`/customers/${customer.body.id}`)
      .send({
        name: "customer Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(customerEdited.status).toBe(200);
    expect(customerEdited.body.name).toBe("customer Test Edited");
    expect(customerEdited.body.document_number).toBe("987654321");

    await request(app)
      .delete(`/customers/${customerEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered customer", async () => {
    const customerEdited = await request(app)
      .patch("/customers/a1b2c3d4e5f6")
      .send({
        name: "customer Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(customerEdited.status).toBe(404);
    expect(customerEdited.body).toHaveProperty("error");
  });
});
