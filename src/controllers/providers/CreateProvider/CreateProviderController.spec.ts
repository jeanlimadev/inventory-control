import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new provider", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to create a new provider", async () => {
    const response = await request(app)
      .post("/providers")
      .send({
        name: "Test Name",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    await request(app)
      .delete(`/providers/${response.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to create a new provider with existent document number", async () => {
    const providerResponse = await request(app)
      .post("/providers")
      .send({
        name: "Test Name",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/providers")
      .send({
        name: "Test Name",
        document_number: "12345678",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    await request(app)
      .delete(`/providers/${providerResponse.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });
});
