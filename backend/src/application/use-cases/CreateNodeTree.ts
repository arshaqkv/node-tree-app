import mongoose from "mongoose";
import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../utils/http.status";

export class CreateNodeTree {
  constructor(private nodeTreeRepository: INodeTreeRepository) {}

  async execute(name: string, parentId?: string | null) {
    if (!name || name.trim().length === 0) {
      throw new CustomError("Node name is required", HttpStatus.BAD_REQUEST);
    }

    if (name.trim().length > 100) {
      throw new CustomError(
        "Node name must be less than 100 characters",
        HttpStatus.BAD_REQUEST
      );
    }

    if (parentId) {
      if (!mongoose.Types.ObjectId.isValid(parentId)) {
        throw new CustomError("Invalid parent ID", HttpStatus.BAD_REQUEST);
      }

      const parent = await this.nodeTreeRepository.getNodeById(parentId);

      if (!parent) {
        throw new CustomError("Parent node not found", HttpStatus.NOT_FOUND);
      }
    }

    const isExisting = await this.nodeTreeRepository.findNodeByName(name);

    if (isExisting) {
      throw new CustomError("Name already exists", HttpStatus.BAD_REQUEST);
    }

    const savedNode = await this.nodeTreeRepository.createNode(name, parentId);

    if (parentId) {
      await this.nodeTreeRepository.findByParentIdAndAddChild(
        parentId,
        savedNode._id
      );
    }
  }
}
