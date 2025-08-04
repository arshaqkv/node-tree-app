import { INode } from "../../infrastructure/models/node.model";

export interface INodeTreeRepository {
  createNode(name: string, parentId?: string | null): Promise<INode>;
  getAllNodes(): Promise<INode[]>;
  getNodeById(id: string): Promise<INode | null>;
  findNodeByName(name: string): Promise<INode | null>;
  findByParentIdAndAddChild(
    parentId: string,
    savedNodeId: string
  ): Promise<void>;
  deleteNode(id: string): Promise<void>;
  findByParentIdAndRemoveChild(id: string, nodeId: string): Promise<void>;
}
