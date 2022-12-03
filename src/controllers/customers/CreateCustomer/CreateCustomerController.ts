import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, document_number } = request.body;

      const customerAlreadyExists = await prismaClient.customers.findFirst({
        where: {
          document_number,
        },
      });

      if (customerAlreadyExists) {
        return response.status(500).json({ error: "Customer already exists!" });
      }

      const customer = await prismaClient.customers.create({
        data: {
          name,
          document_number,
        },
      });

      return response.status(201).json(customer);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { CreateCustomerController };
