import { CreateNodeTree } from "../../application/use-cases/CreateNodeTree";
import { DBNodeTreeRepository } from "../repositories/db.nodetree.repository";

export class NodeTreeDIContainer {
  static getNodeTreeRepository() {
    return new DBNodeTreeRepository();
  }

  static getCreateNodeTreeUseCase() {
    return new CreateNodeTree(this.getNodeTreeRepository());
  }
}
