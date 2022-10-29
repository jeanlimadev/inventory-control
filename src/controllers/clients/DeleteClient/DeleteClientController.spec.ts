import { describe, it, expect } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Delete a client", () => {
  it("should be able to delete a client", async () => {
    await request(app).post("/clients/create").send({
      name: "Test Name",
      document_number: "1234",
    });

    const response = await request(app).delete("/clients/delete").send({
      document_number: "1234",
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to delete a non existent client", async () => {
    const response = await request(app).delete("/clients/delete").send({
      document_number: "1234",
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
  });
});
