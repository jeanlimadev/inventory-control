import { Router } from "express";
import { CreateProviderController } from "../controllers/providers/CreateProviderController";
import { ListProvidersController } from "../controllers/providers/ListProvidersController";

const providersRoutes = Router();

const createProviderController = new CreateProviderController();
const listProvidersController = new ListProvidersController();

providersRoutes.post("/create", createProviderController.handle);

providersRoutes.get("/", listProvidersController.handle);

export { providersRoutes };
