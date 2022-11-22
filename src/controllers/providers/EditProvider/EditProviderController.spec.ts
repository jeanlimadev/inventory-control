import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Edit Provider", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered provider", async () => {
    const provider = await request(app)
      .post("/providers")
      .send({
        name: "Provider Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const providerEdited = await request(app)
      .patch(`/providers/edit/${provider.body.id}`)
      .send({
        name: "Provider Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(providerEdited.status).toBe(200);
    expect(providerEdited.body.name).toBe("Provider Test Edited");
    expect(providerEdited.body.document_number).toBe("987654321");

    await request(app)
      .delete(`/providers/${providerEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered provider", async () => {
    const providerEdited = await request(app)
      .patch("/providers/edit/a1b2c3d4e5f6")
      .send({
        name: "Provider Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(providerEdited.status).toBe(404);
    expect(providerEdited.body).toHaveProperty("error");
  });
});
