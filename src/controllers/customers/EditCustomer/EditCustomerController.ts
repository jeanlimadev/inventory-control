import { Request, Response } from "express";

import { prismaClient } from "../../../database/prismaClient";

class EditCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, document_number } = request.body;

      const customer = await prismaClient.customers.findFirst({
        where: {
          id,
        },
      });

      if (!customer) {
        return response.status(404).json({ error: "Customer not found" });
      }

      const customerEdited = await prismaClient.customers.update({
        where: {
          id,
        },
        data: {
          name,
          document_number,
        },
      });

      return response.json(customerEdited);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { EditCustomerController };
