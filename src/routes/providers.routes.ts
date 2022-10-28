import { Router } from "express";
import { CreateProviderController } from "../controllers/providers/CreateProvider/CreateProviderController";
import { DeleteProviderController } from "../controllers/providers/DeleteProvider/DeleteProviderController";
import { ListProvidersController } from "../controllers/providers/ListProviders/ListProvidersController";

const providersRoutes = Router();

const createProviderController = new CreateProviderController();
const listProvidersController = new ListProvidersController();
const deleteProviderController = new DeleteProviderController();

providersRoutes.post("/create", createProviderController.handle);

providersRoutes.get("/", listProvidersController.handle);

providersRoutes.delete("/delete", deleteProviderController.handle);

export { providersRoutes };
