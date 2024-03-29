import { Request, Response } from "express";
import { container } from "tsyringe";

import { DayJsDateProvider } from "../../../utils/DateProvider/DayJsDateProvider";
import { prismaClient } from "../../../database/prismaClient";

class FilterSales {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const dateProvider = container.resolve(DayJsDateProvider);

      const customer_id = request.query.customer_id?.toString();
      const product_id = request.query.product_id?.toString();

      const initial_date =
        request.query.initial_date?.toString() || "1900-01-01";
      const end_date = request.query.end_date?.toString() || "2100-12-31";

      const initialDateParsed = dateProvider.convertToUTC(initial_date);
      const endDateParsed = dateProvider.changeHourAndConvertToUTC(end_date);

      const sales = await prismaClient.sales.findMany({
        where: {
          customer_id,
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

      const salesAddingNames = await Promise.all(sales.map(async sale => {
        const customer = await prismaClient.customers.findFirst({ 
          where: {
            id: sale.customer_id,
          }, 
        });

        const product = await prismaClient.products.findFirst({ 
          where: {
            id: sale.product_id,
          }, 
        });

        Object.assign(sale, {
          customer_name: customer?.name,
          product_name: product?.name,
        })

        return sale;
      }));

      return response.json(salesAddingNames);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data" });
    }
  }
}

export { FilterSales };
