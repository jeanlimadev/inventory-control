import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { document_number } = request.body;

    const clientExists = await prismaClient.client.count({
      where: {
        document_number,
      },
    });

    if (clientExists === 0) {
      return response.status(404).json({ error: "Client not found!" });
    }

    await prismaClient.client.delete({
      where: {
        document_number,
      },
    });

    return response.send();
  }
}

export { DeleteClientController };
