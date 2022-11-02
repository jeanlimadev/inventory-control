import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const clients = await prismaClient.client.findMany();

    return response.json(clients);
  }
}

export { ListClientsController };
