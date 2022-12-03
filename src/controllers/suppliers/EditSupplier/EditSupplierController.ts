import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, document_number } = request.body;

      const supplier = await prismaClient.suppliers.findFirst({
        where: {
          id,
        },
      });

      if (!supplier) {
        return response.status(404).json({ error: "Supplier not found" });
      }

      const supplierEdited = await prismaClient.suppliers.update({
        where: {
          id,
        },
        data: {
          name,
          document_number,
        },
      });

      return response.json(supplierEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditSupplierController };
