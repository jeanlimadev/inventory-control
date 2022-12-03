import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, document_number } = request.body;

      const supplierAlreadyExists = await prismaClient.suppliers.count({
        where: {
          document_number,
        },
      });

      if (supplierAlreadyExists != 0) {
        return response.status(500).json({ error: "Supplier already exists!" });
      }

      const supplier = await prismaClient.suppliers.create({
        data: {
          name,
          document_number,
        },
      });

      return response.status(201).json(supplier);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { CreateSupplierController };
