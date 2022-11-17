import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, document_number } = request.body;

      const client = await prismaClient.client.findFirst({
        where: {
          id,
        },
      });

      if (!client) {
        return response.status(404).json({ error: "Client not found" });
      }

      const clientEdited = await prismaClient.client.update({
        where: {
          id,
        },
        data: {
          name,
          document_number,
        },
      });

      return response.json(clientEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditClientController };
