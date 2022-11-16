import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const products = await prismaClient.product.findMany();

      for (let i = 0; i < products.length; i++) {
        const purchases = await prismaClient.buy_products.aggregate({
          where: {
            product_id: products[i].id,
          },
          _sum: {
            amount: true,
          },
        });

        const sales = await prismaClient.sell_products.aggregate({
          where: {
            product_id: products[i].id,
          },
          _sum: {
            amount: true,
          },
        });

        const calculateInventory = {
          inventory: Number(purchases._sum.amount) - Number(sales._sum.amount),
        };

        Object.assign(products[i], calculateInventory);
      }

      return response.json(products);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListProductsController };
