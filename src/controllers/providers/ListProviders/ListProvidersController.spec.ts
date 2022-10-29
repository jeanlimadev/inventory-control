import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("List Providers", () => {
  it("should be able to list all providers", async () => {
    await request(app).post("/providers/create").send({
      name: "Test Name",
      document_number: "3333",
    });

    const response = await request(app).get("/providers");

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
  });
});
