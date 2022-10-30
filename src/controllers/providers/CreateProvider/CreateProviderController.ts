import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateProviderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, document_number } = request.body;

    const providerAlreadyExists = await prismaClient.provider.count({
      where: {
        document_number,
      },
    });

    if (providerAlreadyExists != 0) {
      return response.status(500).json({ error: "Provider already exists!" });
    }

    const provider = await prismaClient.provider.create({
      data: {
        name,
        document_number,
      },
    });

    return response.json(provider);
  }
}

export { CreateProviderController };