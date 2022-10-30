import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const clientExists = await prismaClient.client.count({
      where: {
        id,
      },
    });

    if (clientExists === 0) {
      return response.status(404).json({ error: "Client not found!" });
    }

    await prismaClient.client.delete({
      where: {
        id,
      },
    });

    return response.send();
  }
}

export { DeleteClientController };
