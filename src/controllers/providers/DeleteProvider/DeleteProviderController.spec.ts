import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a provider", async () => {
  const responseToken = await request(app).post("/users/sessions").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to delete a provider", async () => {
    const providerResponse = await request(app)
      .post("/providers/create")
      .send({
        name: "Test Name",
        document_number: "9999",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .delete(`/providers/delete/${providerResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent provider", async () => {
    const response = await request(app)
      .delete(`/providers/delete/abc1234`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
