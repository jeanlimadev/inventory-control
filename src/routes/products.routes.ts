import { Router } from "express";
import { CreateProductController } from "../controllers/products/CreateProductController";
import { ListProductsController } from "../controllers/products/ListProductsController";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const listProductsController = new ListProductsController();

productsRoutes.post("/create", createProductController.handle);

productsRoutes.get("/", listProductsController.handle);

export { productsRoutes };
