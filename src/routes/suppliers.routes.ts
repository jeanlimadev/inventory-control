import { Router } from "express";

import { CreateSupplierController } from "../controllers/suppliers/CreateSupplier/CreateSupplierController";
import { DeleteSupplierController } from "../controllers/suppliers/DeleteSupplier/DeleteSupplierController";
import { EditSupplierController } from "../controllers/suppliers/EditSupplier/EditSupplierController";
import { ListSuppliersController } from "../controllers/suppliers/ListSupplier/ListSupplierController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const suppliersRoutes = Router();

const createSupplierController = new CreateSupplierController();
const listSuppliersController = new ListSuppliersController();
const editSupplierController = new EditSupplierController();
const deleteSupplierController = new DeleteSupplierController();

suppliersRoutes.post("/", ensureAuthenticated, createSupplierController.handle);

suppliersRoutes.get("/", ensureAuthenticated, listSuppliersController.handle);

suppliersRoutes.patch(
  "/:id",
  ensureAuthenticated,
  editSupplierController.handle
);

suppliersRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deleteSupplierController.handle
);

export { suppliersRoutes };
