import { Router } from "express";
import { BuyProductController } from "../controllers/products/BuyProduct/BuyProductController";

import { CreateProductController } from "../controllers/products/CreateProduct/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProduct/DeleteProductController";
import { ListProductsController } from "../controllers/products/ListProducts/ListProductsController";
import { SellProductController } from "../controllers/products/SellProduct/SellProductController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();
const buyProductsController = new BuyProductController();
const sellProductsController = new SellProductController();

productsRoutes.post(
  "/create",
  ensureAuthenticated,
  createProductController.handle
);

productsRoutes.get("/", ensureAuthenticated, listProductsController.handle);

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

productsRoutes.post(
  "/sell",
  ensureAuthenticated,
  sellProductsController.handle
);

export { productsRoutes };
