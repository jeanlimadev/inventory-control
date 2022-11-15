import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

class BuyProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { product_id, amount, cost, provider_id } = request.body;

      const productExists = await prismaClient.product.findFirst({
        where: {
          id: product_id,
        },
      });

      if (!productExists) {
        return response.status(404).json({ error: "Product not found!" });
      }

      const providerExists = await prismaClient.provider.findFirst({
        where: {
          id: provider_id,
        },
      });

      if (!providerExists) {
        return response.status(404).json({ error: "Provider not found!" });
      }

      if (amount <= 0) {
        return response.status(400).json({ error: "Invalid amount value!" });
      }

      if (cost <= 0) {
        return response.status(400).json({ error: "Invalid cost value!" });
      }

      const purchase = await prismaClient.buy_products.create({
        data: {
          product_id,
          amount,
          cost,
          provider_id,
        },
      });

      return response.status(201).json(purchase);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { BuyProductController };
