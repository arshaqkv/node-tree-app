import mongoose from "mongoose";
import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../utils/http.status";

export class DeleteNodeTree {
  constructor(private nodeTreeRepository: INodeTreeRepository) {}

  async execute(nodeId: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(nodeId)) {
      throw new CustomError("Invalid node ID", HttpStatus.BAD_REQUEST);
    }

    const node = await this.nodeTreeRepository.getNodeById(nodeId);

    if (!node) {
      throw new CustomError("Node not found", HttpStatus.NOT_FOUND);
    }

    await this.deleteNodeRecursively(nodeId);

    if (node.parentId) {
      await this.nodeTreeRepository.findByParentIdAndRemoveChild(
        node.parentId,
        nodeId
      );
    }
  }

  private async deleteNodeRecursively(nodeId: string): Promise<void> {
    const node = await this.nodeTreeRepository.getNodeById(nodeId);

    if (!node) return;

    for (const childId of node.children) {
      await this.deleteNodeRecursively(childId.toString());
    }

    await this.nodeTreeRepository.deleteNode(nodeId);
  }
}
