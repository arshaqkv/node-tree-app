import { Router } from "express";
import { nodeController } from "../controllers/node.controller";

const router = Router();

router
  .route("/")
  .post(nodeController.createNode)
  .get(nodeController.getNodeTree);

router.delete("/:id", nodeController.deleteNode);

export { router as nodeRoutes };
