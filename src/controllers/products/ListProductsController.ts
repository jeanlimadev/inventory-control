import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const products = await prismaClient.product.findMany();

    return response.json(products);
  }
}

export { ListProductsController };
