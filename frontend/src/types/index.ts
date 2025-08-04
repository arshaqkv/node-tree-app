export interface TreeNode {
  _id: string;
  name: string;
  parentId: string | null;
  children: TreeNode[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreateNodeRequest {
  name: string;
  parentId?: string;
}
