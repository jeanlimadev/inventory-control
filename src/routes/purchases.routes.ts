import { Router } from "express";

import { BuyProductController } from "../controllers/purchases/BuyProduct/BuyProductController";
import { DeletePurchaseController } from "../controllers/purchases/DeletePurchase/DeletePurchaseController";
import { EditPurchaseController } from "../controllers/purchases/EditPurchase/EditPurchaseController";
import { FilterPurchases } from "../controllers/purchases/FilterPurchases/FilterPurchases";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const purchasesRoutes = Router();

const buyProductController = new BuyProductController();
const editPurchaseController = new EditPurchaseController();
const filterPurchases = new FilterPurchases();
const deletePurchaseController = new DeletePurchaseController();

purchasesRoutes.post("/", ensureAuthenticated, buyProductController.handle);

purchasesRoutes.patch(
  "/:id",
  ensureAuthenticated,
  editPurchaseController.handle
);

purchasesRoutes.get("/filter", ensureAuthenticated, filterPurchases.handle);

purchasesRoutes.delete(
  "/:id",
  ensureAuthenticated,
  deletePurchaseController.handle
);

export { purchasesRoutes };
