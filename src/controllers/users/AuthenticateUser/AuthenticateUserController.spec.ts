import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";
import { prismaClient } from "../../../database/prismaClient";

describe("Authenticate User", () => {
  it("should be able to authenticate a existent user", async () => {
    const authenticateResponse = await request(app).post("/users/auth").send({
      email: "admin@admin.com",
      password: "admin",
    });

    expect(authenticateResponse.body).toHaveProperty("user");
    expect(authenticateResponse.body).toHaveProperty("token");
    expect(authenticateResponse.status).toBe(200);
  });

  it("should not be able to authenticate a unverified user", async () => {
    const user = await request(app).post("/users").send({
      name: "User Name",
      email: "user@email.com",
      password: "1234"
    });

    const authenticateResponse = await request(app).post("/users/auth").send({
      email: "user@email.com",
      password: "1234",
    });

    expect(authenticateResponse.body).toHaveProperty("error");
    expect(authenticateResponse.status).toBe(500);

    await prismaClient.$queryRaw`DELETE FROM "users" WHERE email = ${"user@email.com"}`;
  });

  it("should not be able to authenticate a inexistent user", async () => {
    const authenticateResponse = await request(app).post("/users/auth").send({
      email: "test@test.com",
      password: "1234",
    });

    expect(authenticateResponse.body).toHaveProperty("error");
    expect(authenticateResponse.status).toBe(401);
  });
});
