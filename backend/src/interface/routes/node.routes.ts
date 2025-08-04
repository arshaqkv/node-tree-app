import { Router } from "express";
import { nodeController } from "../controllers/node.controller";

const router = Router();

router.post("/", nodeController.createNode);
router.delete("/:id", nodeController.deleteNode);

export { router as nodeRoutes };
