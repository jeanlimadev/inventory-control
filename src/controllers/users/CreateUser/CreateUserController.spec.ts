import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";
import { prismaClient } from "../../../database/prismaClient";

describe("Create new user", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user-test@email.com",
        password: "123",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);

    await prismaClient.$queryRaw`DELETE FROM "user" WHERE email = ${"user-test@email.com"}`;
  });

  it("should not be able to create a new user with existent document number", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user2-test@email.com",
        password: "123",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user2-test@email.com",
        password: "123",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(500);

    await prismaClient.$queryRaw`DELETE FROM "user" WHERE email = ${"user2-test@email.com"}`;
  });
});
