import { Request, Response } from "express";
import { prismaClient } from "../../../database/prismaClient";

class ListSuppliersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const suppliers = await prismaClient.suppliers.findMany();

      return response.json(suppliers);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data." });
    }
  }
}

export { ListSuppliersController };
