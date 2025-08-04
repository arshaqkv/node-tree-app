import { INode } from "../../infrastructure/models/node.model";

export interface INodeTreeRepository {
  createNode(name: string, parentId?: string | null): Promise<INode>;
  getAllNodes(): Promise<INode[]>;
  getNodeById(id: string): Promise<INode | null>;
  findNodeByName(name: string): Promise<INode | null>;
  findByParentIdAndUpdate(parentId: string, savedNodeId: string): Promise<void>;
}
