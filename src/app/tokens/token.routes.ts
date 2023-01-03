import { Router } from "express";

import tokenController from "./token.controller";
import tokenHistoryRoutes from "./modules/token-history/token-history.routes";

const routes = Router();

// routes.use('/history', tokenHistoryRoutes);

// Un endpoint público que permita listar los tokens soportados, su nombre y
// alguna otra información considerada relevante.
routes.get("/", tokenController.find);
routes.get("/:tokenId", tokenController.findById)

// Un endpoint privado para crear los tokens
routes.post("/", tokenController.create)

// Un endpoint que permita modificar un registro existente.
routes.patch("/:tokenId", tokenController.updateById)

export default routes;
