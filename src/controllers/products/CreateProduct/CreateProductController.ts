import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const productAlreadyExists = await prismaClient.product.count({
      where: {
        name,
      },
    });

    if (productAlreadyExists != 0) {
      return response.status(500).json({ error: "Product already exists!" });
    }

    const product = await prismaClient.product.create({
      data: {
        name,
      },
    });

    return response.json(product);
  }
}

export { CreateProductController };
