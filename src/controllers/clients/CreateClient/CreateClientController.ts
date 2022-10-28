import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, document_number } = request.body;

    const clientAlreadyExists = await prismaClient.client.count({
      where: {
        document_number,
      },
    });

    if (clientAlreadyExists != 0) {
      return response.status(500).json({ error: "Client already exists!" });
    }

    const client = await prismaClient.client.create({
      data: {
        name,
        document_number,
      },
    });

    return response.json(client);
  }
}

export { CreateClientController };
