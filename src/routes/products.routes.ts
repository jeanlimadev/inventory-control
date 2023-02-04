import { Router } from "express";

import { CreateProductController } from "../controllers/products/CreateProduct/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProduct/DeleteProductController";
import { ListProductsController } from "../controllers/products/ListProducts/ListProductsController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { EditProductController } from "../controllers/products/EditProduct/EditProductController";
import { ListProductByIdController } from "../controllers/products/ListProductById/ListProductByIdController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const listProductByIdController = new ListProductByIdController();
const editProductController = new EditProductController();
const deleteProductController = new DeleteProductController();

productsRoutes.post("/", ensureAuthenticated, createProductController.handle);

productsRoutes.get("/", ensureAuthenticated, listProductsController.handle);

productsRoutes.get("/:id", ensureAuthenticated, listProductByIdController.handle);

productsRoutes.patch("/:id", ensureAuthenticated, editProductController.handle);

productsRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteProductController.handle
);

export { productsRoutes };
