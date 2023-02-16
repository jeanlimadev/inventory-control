import { Request, Response } from "express";
import { container } from "tsyringe";

import { DayJsDateProvider } from "../../../utils/DateProvider/DayJsDateProvider";
import { prismaClient } from "../../../database/prismaClient";

class FilterPurchases {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const dateProvider = container.resolve(DayJsDateProvider);

      const supplier_id = request.query.supplier_id?.toString();
      const product_id = request.query.product_id?.toString();

      const initial_date =
        request.query.initial_date?.toString() || "1900-01-01";
      const end_date = request.query.end_date?.toString() || "2100-12-31";

      const initialDateParsed = dateProvider.convertToUTC(initial_date);
      const endDateParsed = dateProvider.changeHourAndConvertToUTC(end_date);

      const purchases = await prismaClient.purchases.findMany({
        where: {
          supplier_id,
          product_id,
          created_at: {
            gte: initialDateParsed,
            lte: endDateParsed,
          },
        },
        orderBy: {
          created_at: "asc",
        },
      });

      const purchasesAddingNames = await Promise.all(purchases.map(async purchase => {
        const supplier = await prismaClient.suppliers.findFirst({ 
          where: {
            id: purchase.supplier_id,
          }, 
        });

        const product = await prismaClient.products.findFirst({ 
          where: {
            id: purchase.product_id,
          }, 
        });

        Object.assign(purchase, {
          supplier_name: supplier?.name,
          product_name: product?.name,
        })

        return purchase;
      }));

      return response.json(purchasesAddingNames);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data" });
    }
  }
}

export { FilterPurchases };
