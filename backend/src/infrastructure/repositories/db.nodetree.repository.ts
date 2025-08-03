import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { INode, NodeModel } from "../models/node.model";

export class DBNodeTreeRepository implements INodeTreeRepository {
  async createNode(name: string, parentId?: string | null): Promise<INode> {
    return await NodeModel.create({ name, parentId });
  }

  async getAllNodes(): Promise<INode[]> {
    return await NodeModel.find();
  }

  async getNodeById(id: string): Promise<INode | null> {
    return NodeModel.findById(id);
  }

  async findNodeByName(name: string): Promise<INode | null> {
    return NodeModel.findOne({ name });
  }
}
