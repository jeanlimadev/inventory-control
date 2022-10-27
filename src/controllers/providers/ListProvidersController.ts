import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class ListProvidersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const providers = await prismaClient.provider.findMany();

    return response.json(providers);
  }
}

export { ListProvidersController };
