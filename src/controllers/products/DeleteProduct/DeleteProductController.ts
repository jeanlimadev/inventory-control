import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productExists = await prismaClient.product.count({
      where: {
        id,
      },
    });

    if (productExists === 0) {
      return response.status(404).json({ error: "Product not found!" });
    }

    await prismaClient.product.delete({
      where: {
        id,
      },
    });

    return response.send();
  }
}

export { DeleteProductController };
