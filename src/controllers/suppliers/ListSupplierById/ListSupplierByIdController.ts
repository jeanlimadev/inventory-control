import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListSupplierByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const supplier = await prismaClient.suppliers.findFirst({
        where: {
          id,
        },
      });

      if (!supplier) {
        return response.status(404).json({ error: "Supplier not found!" });
      }

      return response.json(supplier);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListSupplierByIdController };
