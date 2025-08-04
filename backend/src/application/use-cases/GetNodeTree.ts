import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { INode } from "../../infrastructure/models/node.model";

export class GetNodeTree {
  constructor(private nodeTreeRepository: INodeTreeRepository) {}

  async execute(): Promise<any> {
    const rootNodes = await this.getRootNodes();
    const tree = await Promise.all(
      rootNodes.map(async (node) => await this.buildNodeTree(node))
    );

    return tree;
  }

  async getRootNodes(): Promise<INode[]> {
    return await this.nodeTreeRepository.findNodesByParent(null);
  }

  private async buildNodeTree(node: INode): Promise<any> {
    const children = await this.nodeTreeRepository.findNodesByParent(node._id);
    const childTrees = await Promise.all(
      children.map(async (child) => await this.buildNodeTree(child))
    );

    return {
      _id: node._id,
      name: node.name,
      parentId: node.parentId,
      children: childTrees,
      createdAt: node.createdAt,
      updatedAt: node.updatedAt,
    };
  }
}
