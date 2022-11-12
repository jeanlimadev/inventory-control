import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const productExists = await prismaClient.product.findFirst({
        where: {
          id,
        },
      });

      if (!productExists) {
        return response.status(404).json({ error: "Product not found!" });
      }

      await prismaClient.product.delete({
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

export { DeleteProductController };
