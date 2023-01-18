import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";
import { prismaClient } from "../../../database/prismaClient";

describe("Create new user", async () => {

  it("should be able to create a new user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user-test@email.com",
        password: "123",
      })

    expect(response.status).toBe(201);

    await prismaClient.$queryRaw`DELETE FROM "users" WHERE email = ${"user-test@email.com"}`;
  });

  it("should not be able to create a new user with existent email", async () => {
    await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user2-test@email.com",
        password: "123",
      });

    const response = await request(app)
      .post("/users")
      .send({
        name: "User Name Test",
        email: "user2-test@email.com",
        password: "123",
      });

    expect(response.status).toBe(500);

    await prismaClient.$queryRaw`DELETE FROM "users" WHERE email = ${"user2-test@email.com"}`;
  });
});
