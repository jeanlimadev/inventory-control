import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";
import { CheckInventoryAvailability } from "../../../utils/CheckInventoryAvailability";

class SellProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { product_id, amount, cost, client_id } = request.body;

      const productExists = await prismaClient.product.findFirst({
        where: {
          id: product_id,
        },
      });

      if (!productExists) {
        return response.status(404).json({ error: "Product not found!" });
      }

      const clientExists = await prismaClient.client.findFirst({
        where: {
          id: client_id,
        },
      });

      if (!clientExists) {
        return response.status(404).json({ error: "Client not found!" });
      }

      if (amount <= 0) {
        return response.status(400).json({ error: "Invalid amount value!" });
      }

      if (cost <= 0) {
        return response.status(400).json({ error: "Invalid cost value!" });
      }

      const availableInInventory = await CheckInventoryAvailability(
        product_id,
        amount
      );

      if (!availableInInventory) {
        return response
          .status(400)
          .json({ error: "Amount greater than available in stock!" });
      }

      const purchase = await prismaClient.sell_products.create({
        data: {
          product_id,
          amount,
          cost,
          client_id,
        },
      });

      return response.status(201).json(purchase);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { SellProductController };
