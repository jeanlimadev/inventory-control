import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const product = await prismaClient.product.findFirst({
        where: {
          id,
        },
      });

      if (!product) {
        return response.status(404).json({ error: "Product not found" });
      }

      const productEdited = await prismaClient.product.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return response.json(productEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditProductController };
