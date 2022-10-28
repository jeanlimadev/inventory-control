import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteProviderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { document_number } = request.body;

    const providerExists = await prismaClient.provider.count({
      where: {
        document_number,
      },
    });

    if (providerExists === 0) {
      return response.status(404).json({ error: "Provider not found!" });
    }

    await prismaClient.provider.delete({
      where: {
        document_number,
      },
    });

    return response.send();
  }
}

export { DeleteProviderController };
