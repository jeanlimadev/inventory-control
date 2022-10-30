import { Router } from "express";

import { CreateProductController } from "../controllers/products/CreateProduct/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProduct/DeleteProductController";
import { ListProductsController } from "../controllers/products/ListProducts/ListProductsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();

productsRoutes.post(
  "/create",
  ensureAuthenticated,
  createProductController.handle
);

productsRoutes.get("/", ensureAuthenticated, listProductsController.handle);

productsRoutes.delete(
  "/delete",
  ensureAuthenticated,
  deleteProductController.handle
);

export { productsRoutes };
