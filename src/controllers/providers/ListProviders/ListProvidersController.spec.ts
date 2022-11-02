import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List providers", async () => {
  const responseToken = await request(app).post("/users/sessions").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to list all providers", async () => {
    await request(app)
      .post("/providers/create")
      .send({
        name: "Test Name",
        document_number: "121212",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .get("/providers")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
  });
});
