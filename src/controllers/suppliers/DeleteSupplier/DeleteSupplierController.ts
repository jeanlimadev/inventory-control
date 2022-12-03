import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const supplierExists = await prismaClient.suppliers.findFirst({
        where: {
          id,
        },
      });

      if (!supplierExists) {
        return response.status(404).json({ error: "Supplier not found!" });
      }

      await prismaClient.suppliers.delete({
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

export { DeleteSupplierController };
