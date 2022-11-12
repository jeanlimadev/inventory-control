import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListProvidersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const providers = await prismaClient.provider.findMany();

      return response.json(providers);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListProvidersController };
