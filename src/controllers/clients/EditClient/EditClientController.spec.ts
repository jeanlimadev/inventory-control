import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "../../../app";

describe("Edit Client", async () => {
  const responseToken = await request(app).post("/users/auth").send({
    email: "admin@admin.com",
    password: "admin",
  });

  const { token } = responseToken.body;

  it("should be able to edit a registered client", async () => {
    const client = await request(app)
      .post("/clients")
      .send({
        name: "Client Test",
        document_number: "123456789",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const clientEdited = await request(app)
      .patch(`/clients/${client.body.id}`)
      .send({
        name: "Client Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(clientEdited.status).toBe(200);
    expect(clientEdited.body.name).toBe("Client Test Edited");
    expect(clientEdited.body.document_number).toBe("987654321");

    await request(app)
      .delete(`/clients/${clientEdited.body["id"]}`)
      .set({
        Authorization: `Bearer ${token}`,
      });
  });

  it("should not be able to edit a non registered client", async () => {
    const clientEdited = await request(app)
      .patch("/clients/a1b2c3d4e5f6")
      .send({
        name: "Client Test Edited",
        document_number: "987654321",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(clientEdited.status).toBe(404);
    expect(clientEdited.body).toHaveProperty("error");
  });
});
