import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListCustomerByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    try {
      const customer = await prismaClient.customers.findFirst({
        where: {
          id,
        },
      });

      if (!customer) {
        return response.status(404).json({ error: "Customer not found!" });
      }

      return response.json(customer);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListCustomerByIdController };
