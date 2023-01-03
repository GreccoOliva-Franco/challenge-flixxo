import { Router } from "express";

import tokenController from "./token.controller";

import { AuthMiddleware } from "../auth/middlewares/auth.middleware";

const routes = Router();

routes.get("/", tokenController.find);
routes.get("/:tokenId", tokenController.findById)
routes.get("/:tokenId/history", tokenController.getHistoryById)
routes.get('/:tokenId/price', tokenController.getPriceById)

routes.post("/", AuthMiddleware.bearer(), tokenController.create)

routes.patch("/:tokenId", AuthMiddleware.bearer(), tokenController.updateById)

routes.delete('/', tokenController.deleteAll)

export default routes;
