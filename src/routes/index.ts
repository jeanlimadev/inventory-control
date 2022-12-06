import { Router } from "express";

import { customersRoutes } from "./customers.routes";
import { productsRoutes } from "./products.routes";
import { purchasesRoutes } from "./purchases.routes";
import { salesRoutes } from "./sales.routes";
import { suppliersRoutes } from "./suppliers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/products", productsRoutes);
router.use("/customers", customersRoutes);
router.use("/suppliers", suppliersRoutes);
router.use("/purchases", purchasesRoutes);
router.use("/sales", salesRoutes);
router.use("/users", usersRoutes);

export { router };
