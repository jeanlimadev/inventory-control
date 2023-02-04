import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListProductByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const product = await prismaClient.products.findFirst({
        where: {
          id,
        },
      });

      if (!product) {
        return response.status(404).json({ error: "Product not found!" });
      }

      const purchases = await prismaClient.purchases.aggregate({
          where: {
            product_id: product.id,
          },
          _sum: {
            amount: true,
          },
        });

        const sales = await prismaClient.sales.aggregate({
          where: {
            product_id: product.id,
          },
          _sum: {
            amount: true,
          },
        });

        const calculateInventory = {
          inventory: Number(purchases._sum.amount) - Number(sales._sum.amount),
        };

        Object.assign(product, calculateInventory);

      return response.json(product);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListProductByIdController };
