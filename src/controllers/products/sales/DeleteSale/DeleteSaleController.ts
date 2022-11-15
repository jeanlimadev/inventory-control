import { Request, Response } from "express";

import { prismaClient } from "../../../../database/prismaClient";

class DeleteSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const saleExists = await prismaClient.sell_products.findFirst({
        where: {
          id,
        },
      });

      if (!saleExists) {
        return response.status(404).json({ error: "Sale not found!" });
      }

      await prismaClient.sell_products.delete({
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

export { DeleteSaleController };
