import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditPurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { product_id, amount, cost, supplier_id } = request.body;

      const purchase = await prismaClient.purchases.findFirst({
        where: {
          id,
        },
      });

      if (!purchase) {
        return response.status(404).json({ error: "Purchase not found!" });
      }

      if (amount <= 0) {
        return response.status(400).json({ error: "invalid amount value!" });
      }

      const purchaseEdited = await prismaClient.purchases.update({
        where: {
          id,
        },
        data: {
          product_id,
          amount,
          cost,
          supplier_id,
        },
      });

      return response.json(purchaseEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditPurchaseController };
