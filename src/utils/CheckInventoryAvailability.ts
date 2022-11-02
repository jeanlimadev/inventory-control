import { prismaClient } from "../database/prismaClient";

export async function CheckInventoryAvailability(
  product_id: string,
  amount: Number
): Promise<Boolean> {
  const purchasesList = await prismaClient.buy_products.findMany({
    where: {
      product_id,
    },
  });

  const totalPurchases = purchasesList.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  const sellsList = await prismaClient.sell_products.findMany({
    where: {
      product_id,
    },
  });

  const totalSells = sellsList.reduce((acc, curr) => {
    return (acc += curr.amount);
  }, 0);

  const inventory = totalPurchases - totalSells - Number(amount);

  if (inventory >= 0) {
    return true;
  }

  return false;
}
