import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a client", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a client", async () => {
    const clientResponse = await request(app)
      .post("/clients")
      .send({
        name: "Test Name",
        document_number: "9999",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/clients/${clientResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent client", async () => {
    const response = await request(app)
      .delete(`/clients/abc1234`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
