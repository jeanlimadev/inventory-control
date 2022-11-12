import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const products = await prismaClient.product.findMany();

      return response.json(products);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListProductsController };
