import { INodeTreeRepository } from "../../domain/interface/nodetree.repository";
import { INode, NodeModel } from "../models/node.model";

export class DBNodeTreeRepository implements INodeTreeRepository {
  async createNode(name: string, parentId?: string | null): Promise<INode> {
    const newNode = new NodeModel({
      name: name.trim(),
      parentId: parentId || null,
      children: [],
    });

    return await newNode.save();
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

  async findByParentIdAndAddChild(
    parentId: string,
    savedNodeId: string
  ): Promise<void> {
    await NodeModel.findByIdAndUpdate(
      parentId,
      { $push: { children: savedNodeId } },
      { new: true }
    );
  }

  async findByParentIdAndRemoveChild(
    parentId: string,
    nodeId: string
  ): Promise<void> {
    await NodeModel.findByIdAndUpdate(parentId, {
      $pull: { children: nodeId },
    });
  }

  async deleteNode(id: string): Promise<void> {
    await NodeModel.findByIdAndDelete(id);
  }

  async findNodesByParent(parentId: string | null): Promise<INode[]> {
    return await NodeModel.find({ parentId }).sort({ createdAt: 1 });
  }
}
