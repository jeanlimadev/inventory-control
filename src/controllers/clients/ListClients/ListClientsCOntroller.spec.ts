import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List Clients", () => {
  it("should be able to list all clients", async () => {
    await request(app).post("/clients/create").send({
      name: "Test Name",
      document_number: "12345",
    });

    const response = await request(app).get("/clients");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
  });
});
