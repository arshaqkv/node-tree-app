import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { CustomError } from "../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../utils/http.status";

export class CreateNodeTree {
  constructor(private nodeTreeRepository: INodeTreeRepository) {}

  async execute(name: string, parentId?: string | null) {
    if (!name) {
      throw new CustomError("Title is required", HttpStatus.BAD_REQUEST);
    }

    const isExisting = await this.nodeTreeRepository.findNodeByName(name);

    if (isExisting) {
      throw new CustomError("Name already exists", HttpStatus.BAD_REQUEST);
    }

    await this.nodeTreeRepository.createNode(name, parentId);
  }
}
