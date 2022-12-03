import { Router } from "express";

import { customersRoutes } from "./customers.routes";
import { productsRoutes } from "./products.routes";
import { suppliersRoutes } from "./suppliers.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/products", productsRoutes);
router.use("/customers", customersRoutes);
router.use("/suppliers", suppliersRoutes);
router.use("/users", usersRoutes);

export { router };
