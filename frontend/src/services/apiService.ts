import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import type { TreeNode, ApiResponse, CreateNodeRequest } from "../types";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.api.request(
        config
      );
      return response.data;
    } catch (error: any) {
      console.error("API request failed:", error);
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error("API request error");
    }
  }

  // Get complete tree structure
  async getTree(): Promise<TreeNode[]> {
    const response = await this.request<TreeNode[]>({
      url: "/",
      method: "GET",
    });
    return response.data || [];
  }

  // Create a new node
  async createNode(nodeData: CreateNodeRequest): Promise<string> {
    const response = await this.request<TreeNode>({
      url: "/",
      method: "POST",
      data: nodeData,
    });
    if (!response.message) throw new Error("No data received from server");

    return response.message;
  }

  // Delete a node and all its descendants
  async deleteNode(nodeId: string): Promise<void> {
    await this.request<void>({
      url: `/${nodeId}`,
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
