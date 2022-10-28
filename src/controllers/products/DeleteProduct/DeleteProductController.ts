import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const productExists = await prismaClient.product.count({
      where: {
        name,
      },
    });

    if (productExists === 0) {
      return response.status(404).json({ error: "Product not found!" });
    }

    await prismaClient.product.delete({
      where: {
        name,
      },
    });

    return response.send();
  }
}

export { DeleteProductController };
