-- CreateTable
CREATE TABLE "sell_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "client_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sell_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sell_products" ADD CONSTRAINT "sell_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sell_products" ADD CONSTRAINT "sell_products_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
