import { CreateNodeTree } from "../../application/use-cases/CreateNodeTree";
import { DeleteNodeTree } from "../../application/use-cases/DeleteNodeTree";
import { GetNodeTree } from "../../application/use-cases/GetNodeTree";
import { DBNodeTreeRepository } from "../repositories/db.nodetree.repository";

export class NodeTreeDIContainer {
  static getNodeTreeRepository() {
    return new DBNodeTreeRepository();
  }

  static getCreateNodeTreeUseCase() {
    return new CreateNodeTree(this.getNodeTreeRepository());
  }

  static getDeleteNodeTreeUseCase() {
    return new DeleteNodeTree(this.getNodeTreeRepository());
  }

  static getNodeTreeUseCase() {
    return new GetNodeTree(this.getNodeTreeRepository());
  }
}
