import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a provider", () => {
  it("should be able to delete a provider", async () => {
    await request(app).post("/providers/create").send({
      name: "Test Name",
      document_number: "2222",
    });

    const response = await request(app).delete("/providers/delete").send({
      document_number: "2222",
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent provider", async () => {
    const response = await request(app).delete("/providers/delete").send({
      document_number: "2222",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
