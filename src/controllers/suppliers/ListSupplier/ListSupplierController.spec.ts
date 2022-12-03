import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List suppliers", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to list all suppliers", async () => {
    const supplier = await request(app)
      .post("/suppliers")
      .send({
        name: "Test Name",
        document_number: "999999",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/suppliers")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");

    await request(app)
      .delete(`/suppliers/${supplier.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
});
