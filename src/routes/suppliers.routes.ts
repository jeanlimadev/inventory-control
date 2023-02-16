import { Router } from "express";

import { CreateSupplierController } from "../controllers/suppliers/CreateSupplier/CreateSupplierController";
import { DeleteSupplierController } from "../controllers/suppliers/DeleteSupplier/DeleteSupplierController";
import { EditSupplierController } from "../controllers/suppliers/EditSupplier/EditSupplierController";
import { ListSupplierByIdController } from "../controllers/suppliers/ListSupplierById/ListSupplierByIdController";
import { ListSuppliersController } from "../controllers/suppliers/ListSuppliers/ListSuppliersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const suppliersRoutes = Router();

const createSupplierController = new CreateSupplierController();
const listSuppliersController = new ListSuppliersController();
const listSupplierByIdController = new ListSupplierByIdController();
const editSupplierController = new EditSupplierController();
const deleteSupplierController = new DeleteSupplierController();

suppliersRoutes.post("/", ensureAuthenticated, createSupplierController.handle);

suppliersRoutes.get("/", ensureAuthenticated, listSuppliersController.handle);

suppliersRoutes.get("/:id", ensureAuthenticated, listSupplierByIdController.handle);

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
