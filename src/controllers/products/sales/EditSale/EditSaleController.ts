import { Request, Response } from "express";

import { prismaClient } from "../../../../database/prismaClient";
import { CheckInventoryAvailability } from "../../../../utils/CheckInventoryAvailability";

class EditSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { product_id, amount, cost, client_id } = request.body;

      const sale = await prismaClient.sales.findFirst({
        where: {
          id,
        },
      });

      if (!sale) {
        return response.status(404).json({ error: "Sale not found!" });
      }

      if (amount <= 0) {
        return response.status(400).json({ error: "invalid amount value!" });
      }

      if (amount) {
        const availableInInventory = await CheckInventoryAvailability(
          sale.product_id,
          amount - sale.amount
        );

        if (!availableInInventory) {
          return response
            .status(400)
            .json({ error: "Amount greater than available in stock!" });
        }
      }

      const saleEdited = await prismaClient.sales.update({
        where: {
          id,
        },
        data: {
          product_id,
          amount,
          cost,
          client_id,
        },
      });

      return response.json(saleEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditSaleController };
