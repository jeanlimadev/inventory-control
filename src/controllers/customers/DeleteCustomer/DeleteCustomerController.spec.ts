import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a customer", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a customer", async () => {
    const customerResponse = await request(app)
      .post("/customers")
      .send({
        name: "Test Name",
        document_number: "9999",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/customers/${customerResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent customer", async () => {
    const response = await request(app)
      .delete(`/customers/abc1234`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
