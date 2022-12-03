import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const customers = await prismaClient.customers.findMany();

      return response.json(customers);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListCustomersController };
