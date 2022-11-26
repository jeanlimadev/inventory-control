import { Router } from "express";

import { CreateProviderController } from "../controllers/providers/CreateProvider/CreateProviderController";
import { DeleteProviderController } from "../controllers/providers/DeleteProvider/DeleteProviderController";
import { EditProviderController } from "../controllers/providers/EditProvider/EditProviderController";
import { ListProvidersController } from "../controllers/providers/ListProviders/ListProvidersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const providersRoutes = Router();

const createProviderController = new CreateProviderController();
const listProvidersController = new ListProvidersController();
const editProviderController = new EditProviderController();
const deleteProviderController = new DeleteProviderController();

providersRoutes.post("/", ensureAuthenticated, createProviderController.handle);

providersRoutes.get("/", ensureAuthenticated, listProvidersController.handle);

providersRoutes.patch(
  "/:id",
  ensureAuthenticated,
  editProviderController.handle
);

providersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteProviderController.handle
);

export { providersRoutes };
