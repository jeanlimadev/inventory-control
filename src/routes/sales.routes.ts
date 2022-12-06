import { Router } from "express";

import { SellProductController } from "../controllers/sales/SellProduct/SellProductController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteSaleController } from "../controllers/sales/DeleteSale/DeleteSaleController";
import { EditSaleController } from "../controllers/sales/EditSale/EditSaleController";
import { FilterSales } from "../controllers/sales/FilterSales/FilterSales";

const salesRoutes = Router();

const sellProductsController = new SellProductController();
const editSaleController = new EditSaleController();
const filterSales = new FilterSales();
const deleteSaleController = new DeleteSaleController();

salesRoutes.post("/", ensureAuthenticated, sellProductsController.handle);

salesRoutes.patch("/:id", ensureAuthenticated, editSaleController.handle);

salesRoutes.get("/filter", ensureAuthenticated, filterSales.handle);

salesRoutes.delete("/:id", ensureAuthenticated, deleteSaleController.handle);

export { salesRoutes };
