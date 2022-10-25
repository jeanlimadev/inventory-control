import { Router } from "express";
import { CreateProductController } from "../controllers/products/createProductController";

const productsRoutes = Router();

const createProductController = new CreateProductController();

productsRoutes.post("/create", createProductController.handle);

export { productsRoutes };
