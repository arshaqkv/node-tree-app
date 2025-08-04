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

  async deleteNode(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await NodeTreeDIContainer.getDeleteNodeTreeUseCase().execute(id);
      res.status(HttpStatus.OK).json({ message: "Node deleted" });
    } catch (error: any) {
      next(error);
    }
  }

  async getNodeTree(req: Request, res: Response, next: NextFunction) {
    try {
      const tree = await NodeTreeDIContainer.getNodeTreeUseCase().execute();
      res.status(HttpStatus.OK).json({ success: true, data: tree });
    } catch (error: any) {
      next(error);
    }
  }
}

export const nodeController = new NodeController();
