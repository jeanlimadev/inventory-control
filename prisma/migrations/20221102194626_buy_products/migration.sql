-- CreateTable
CREATE TABLE "buy_products" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "provider_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buy_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "buy_products" ADD CONSTRAINT "buy_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buy_products" ADD CONSTRAINT "buy_products_provider_id_fkey" FOREIGN KEY ("provider_id") REFERENCES "provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
