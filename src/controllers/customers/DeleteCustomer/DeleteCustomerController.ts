import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const customerExists = await prismaClient.customers.findFirst({
        where: {
          id,
        },
      });

      if (!customerExists) {
        return response.status(404).json({ error: "Customer not found!" });
      }

      await prismaClient.customers.delete({
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

export { DeleteCustomerController };
