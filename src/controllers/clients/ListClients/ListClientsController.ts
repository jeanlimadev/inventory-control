import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const clients = await prismaClient.client.findMany();

      return response.json(clients);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListClientsController };
