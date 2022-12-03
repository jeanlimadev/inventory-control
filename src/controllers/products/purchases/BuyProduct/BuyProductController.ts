import { Request, Response } from "express";
import { prismaClient } from "../../../../database/prismaClient";

class BuyProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { product_id, amount, cost, supplier_id } = request.body;

      const productExists = await prismaClient.products.findFirst({
        where: {
          id: product_id,
        },
      });

      if (!productExists) {
        return response.status(404).json({ error: "Product not found!" });
      }

      const supplierExists = await prismaClient.suppliers.findFirst({
        where: {
          id: supplier_id,
        },
      });

      if (!supplierExists) {
        return response.status(404).json({ error: "Supplier not found!" });
      }

      if (amount <= 0) {
        return response.status(400).json({ error: "Invalid amount value!" });
      }

      if (cost <= 0) {
        return response.status(400).json({ error: "Invalid cost value!" });
      }

      const purchase = await prismaClient.purchases.create({
        data: {
          product_id,
          amount,
          cost,
          supplier_id,
        },
      });

      return response.status(201).json(purchase);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { BuyProductController };
