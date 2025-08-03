import { Router } from "express";
import { nodeController } from "../controllers/node.controller";

const router = Router();

router.post("/", nodeController.createNode);

export { router as nodeRoutes };
