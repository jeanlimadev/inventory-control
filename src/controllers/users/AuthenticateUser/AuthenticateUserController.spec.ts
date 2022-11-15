import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Authenticate User", () => {
  it("should be able to authenticate a existent user", async () => {
    const authenticateResponse = await request(app)
      .post("/users/sessions")
      .send({
        email: "admin@admin.com",
        password: "admin",
      });

    expect(authenticateResponse.body).toHaveProperty("user");
    expect(authenticateResponse.body).toHaveProperty("token");
    expect(authenticateResponse.status).toBe(200);
  });

  it("should not be able to authenticate a inexistent user", async () => {
    const authenticateResponse = await request(app)
      .post("/users/sessions")
      .send({
        email: "test@test.com",
        password: "1234",
      });

    expect(authenticateResponse.body).toHaveProperty("error");
    expect(authenticateResponse.status).toBe(500);
  });
});
