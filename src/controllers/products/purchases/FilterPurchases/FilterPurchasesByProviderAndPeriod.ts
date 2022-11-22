import { Request, Response } from "express";
import { container } from "tsyringe";

import { DayJsDateProvider } from "../../../../utils/DateProvider/DayJsDateProvider";
import { prismaClient } from "../../../../database/prismaClient";

class FilterPurchasesByProviderAndPeriod {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const dateProvider = container.resolve(DayJsDateProvider);

      const providerExists = await prismaClient.provider.findFirst({
        where: {
          id,
        },
      });

      if (!providerExists) {
        return response.status(404).json({ error: "Provider not found!" });
      }

      const initial_date =
        request.query.initial_date?.toString() || "1900-01-01";
      const end_date = request.query.end_date?.toString() || "2100-12-31";

      const initialDateParsed = dateProvider.convertToUTC(initial_date);
      const endDateParsed = dateProvider.changeHourAndConvertToUTC(end_date);

      const purchases = await prismaClient.buy_products.findMany({
        where: {
          provider_id: id,
          created_at: {
            gte: initialDateParsed,
            lte: endDateParsed,
          },
        },
        orderBy: {
          created_at: "asc",
        },
      });

      return response.json(purchases);
    } catch (error) {
      return response.status(400).json({ error: "Verify your request data" });
    }
  }
}

export { FilterPurchasesByProviderAndPeriod };
