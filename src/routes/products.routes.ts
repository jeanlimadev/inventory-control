import { Router } from "express";

import { BuyProductController } from "../controllers/products/purchases/BuyProduct/BuyProductController";
import { CreateProductController } from "../controllers/products/CreateProduct/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProduct/DeleteProductController";
import { ListProductsController } from "../controllers/products/ListProducts/ListProductsController";
import { SellProductController } from "../controllers/products/sales/SellProduct/SellProductController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeletePurchaseController } from "../controllers/products/purchases/DeletePurchase/DeletePurchaseController";
import { DeleteSaleController } from "../controllers/products/sales/DeleteSale/DeleteSaleController";
import { EditProductController } from "../controllers/products/EditProduct/EditProductController";
import { EditPurchaseController } from "../controllers/products/purchases/EditPurchase/EditPurchaseController";
import { EditSaleController } from "../controllers/products/sales/EditSale/EditSaleController";
import { FilterPurchasesByProviderAndPeriod } from "../controllers/products/purchases/FilterPurchases/FilterPurchasesByProviderAndPeriod";
import { FilterSalesByClientAndPeriod } from "../controllers/products/sales/FilterSales/FilterSalesByClientAndPeriod";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const editProductController = new EditProductController();
const deleteProductController = new DeleteProductController();
const buyProductsController = new BuyProductController();
const editPurchaseController = new EditPurchaseController();
const filterPurchasesByProviderAndPeriod =
  new FilterPurchasesByProviderAndPeriod();
const deletePurchaseController = new DeletePurchaseController();
const sellProductsController = new SellProductController();
const editSaleController = new EditSaleController();
const filterSalesByClientAndPeriod = new FilterSalesByClientAndPeriod();
const deleteSaleController = new DeleteSaleController();

productsRoutes.post(
  "/create",
  ensureAuthenticated,
  createProductController.handle
);

productsRoutes.get("/", ensureAuthenticated, listProductsController.handle);

productsRoutes.patch(
  "/edit/:id",
  ensureAuthenticated,
  editProductController.handle
);

productsRoutes.delete(
  "/delete/:id",
  ensureAuthenticated,
  deleteProductController.handle
);

productsRoutes.post(
  "/purchase",
  ensureAuthenticated,
  buyProductsController.handle
);

productsRoutes.patch(
  "/purchase/edit/:id",
  ensureAuthenticated,
  editPurchaseController.handle
);

productsRoutes.get(
  "/purchase/filter/:id",
  ensureAuthenticated,
  filterPurchasesByProviderAndPeriod.handle
);

productsRoutes.delete(
  "/purchase/:id",
  ensureAuthenticated,
  deletePurchaseController.handle
);

productsRoutes.post(
  "/sell",
  ensureAuthenticated,
  sellProductsController.handle
);

productsRoutes.patch(
  "/sell/edit/:id",
  ensureAuthenticated,
  editSaleController.handle
);

productsRoutes.get(
  "/sell/filter/:id",
  ensureAuthenticated,
  filterSalesByClientAndPeriod.handle
);

productsRoutes.delete(
  "/sell/:id",
  ensureAuthenticated,
  deleteSaleController.handle
);

export { productsRoutes };
