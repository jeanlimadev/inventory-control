import { Router } from "express";
import { CreateProductController } from "../controllers/products/CreateProductController";

const productsRoutes = Router();

const createProductController = new CreateProductController();

productsRoutes.post("/create", createProductController.handle);

export { productsRoutes };
