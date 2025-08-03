import { NextFunction, Request, Response } from "express";
import { NodeTreeDIContainer } from "../../infrastructure/Di/tree.di.container";
import { HttpStatus } from "../../utils/http.status";

class NodeController {
  async createNode(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, parentId } = req.body;
      await NodeTreeDIContainer.getCreateNodeTreeUseCase().execute(
        name,
        parentId
      );
      res.status(HttpStatus.CREATED).json({ message: "Node created" });
    } catch (error: any) {
      next(error);
    }
  }
}

export const nodeController = new NodeController();
