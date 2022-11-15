import { Request, Response } from "express";

import { prismaClient } from "../../../../database/prismaClient";

class DeletePurchaseController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const purchaseExists = await prismaClient.buy_products.findFirst({
        where: {
          id,
        },
      });

      if (!purchaseExists) {
        return response.status(404).json({ error: "Purchase not found!" });
      }

      await prismaClient.buy_products.delete({
        where: {
          id,
        },
      });

      return response.send();
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { DeletePurchaseController };
