import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditProviderController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, document_number } = request.body;

      const provider = await prismaClient.provider.findFirst({
        where: {
          id,
        },
      });

      if (!provider) {
        return response.status(404).json({ error: "Provider not found" });
      }

      const providerEdited = await prismaClient.provider.update({
        where: {
          id,
        },
        data: {
          name,
          document_number,
        },
      });

      return response.json(providerEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditProviderController };
