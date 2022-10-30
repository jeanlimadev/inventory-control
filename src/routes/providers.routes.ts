import { Router } from "express";

import { CreateProviderController } from "../controllers/providers/CreateProvider/CreateProviderController";
import { DeleteProviderController } from "../controllers/providers/DeleteProvider/DeleteProviderController";
import { ListProvidersController } from "../controllers/providers/ListProviders/ListProvidersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const providersRoutes = Router();

const createProviderController = new CreateProviderController();
const listProvidersController = new ListProvidersController();
const deleteProviderController = new DeleteProviderController();

providersRoutes.post(
  "/create",
  ensureAuthenticated,
  createProviderController.handle
);

providersRoutes.get("/", ensureAuthenticated, listProvidersController.handle);

providersRoutes.delete(
  "/delete",
  ensureAuthenticated,
  deleteProviderController.handle
);

export { providersRoutes };
