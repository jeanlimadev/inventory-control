import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, document_number } = request.body;

      const clientAlreadyExists = await prismaClient.client.findFirst({
        where: {
          document_number,
        },
      });

      if (clientAlreadyExists) {
        return response.status(500).json({ error: "Client already exists!" });
      }

      const client = await prismaClient.client.create({
        data: {
          name,
          document_number,
        },
      });

      return response.status(201).json(client);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { CreateClientController };
