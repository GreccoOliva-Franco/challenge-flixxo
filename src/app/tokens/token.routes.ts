import { Router } from "express";

import tokenController from "./token.controller";

const routes = Router();

routes.get("/", tokenController.find);
routes.get("/:tokenId", tokenController.findById)
routes.get('/:tokenId/price', tokenController.getPriceById)
routes.get("/:tokenId/history", tokenController.getHistoryById)

routes.post("/", tokenController.create)

routes.delete('/', tokenController.deleteAll)

export default routes;
