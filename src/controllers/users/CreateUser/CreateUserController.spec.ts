import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Create new user", () => {
  it("should be able to create a new user", async () => {
    const response = await request(app).post("/users/create").send({
      name: "User Name Test",
      email: "user1-test@email.com",
      password: "123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    // await request(app).delete("/users/delete").send({
    //   document_number: "11111",
    // });
  });

  it("should not be able to create a new user with existent document number", async () => {
    await request(app).post("/users/create").send({
      name: "User Name Test",
      email: "user2-test@email.com",
      password: "123",
    });

    const response = await request(app).post("/users/create").send({
      name: "User Name Test",
      email: "user2-test@email.com",
      password: "123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty("error");

    // await request(app).delete("/users/delete").send({
    //   document_number: "11111",
    // });
  });
});
