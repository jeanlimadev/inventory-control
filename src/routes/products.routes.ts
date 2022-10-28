import { Router } from "express";
import { CreateProductController } from "../controllers/products/CreateProduct/CreateProductController";
import { DeleteProductController } from "../controllers/products/DeleteProduct/DeleteProductController";
import { ListProductsController } from "../controllers/products/ListProducts/ListProductsController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();
const deleteProductController = new DeleteProductController();

productsRoutes.post("/create", createProductController.handle);

productsRoutes.get("/", listProductsController.handle);

productsRoutes.delete("/delete", deleteProductController.handle);

export { productsRoutes };
