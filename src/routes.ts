import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsControllers";

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/", itemsController.index);

routes.post("/points", pointsController.create);
routes.post("/points/:id", pointsController.show);

export default routes;
