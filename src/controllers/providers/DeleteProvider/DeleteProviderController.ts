import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteProviderController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const providerExists = await prismaClient.provider.findFirst({
        where: {
          id,
        },
      });

      if (!providerExists) {
        return response.status(404).json({ error: "Provider not found!" });
      }

      await prismaClient.provider.delete({
        where: {
          id,
        },
      });

      return response.send();
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { DeleteProviderController };
