import { Router } from "express";
import { CreateProviderController } from "../controllers/providers/CreateProviderController";

const providersRoutes = Router();

const createProviderController = new CreateProviderController();

providersRoutes.post("/create", createProviderController.handle);

export { providersRoutes };
