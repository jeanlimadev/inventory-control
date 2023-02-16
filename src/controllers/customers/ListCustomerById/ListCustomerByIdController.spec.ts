import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List customer by id", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to list a customer by id", async () => {
    const customer = await request(app)
      .post("/customers")
      .send({
        name: "Test Name",
        document_number: "121212",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get(`/customers/${customer.body.id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");

    await request(app)
      .delete(`/customers/${customer.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to list a inexistent customer by id", async () => {
    const response = await request(app)
      .get(`/customers/a1b2c3d4`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
