import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import type { TreeNode } from "../types";
import { apiService } from "../services/apiService";
import TreeNodeComponent from "../components/TreeNodeComponent";

const LandingPage: React.FC = () => {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingRoot, setIsAddingRoot] = useState(false);
  const [newRootName, setNewRootName] = useState("");

  useEffect(() => {
    loadTreeData();
  }, []);

  const loadTreeData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await apiService.getTree();
      setTreeData(data);
    } catch (error) {
      console.error("Failed to load tree data:", error);
      toast.error("Failed to load tree data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChild = async (parentId: string, name: string) => {
    try {
      await apiService.createNode({ name, parentId });
      toast.success("Child node added")
      await loadTreeData();
    } catch (error) {
      console.error("Failed to add child:", error);
      throw error;
    }
  };

  const handleDeleteNode = async (nodeId: string) => {
    try {
      await apiService.deleteNode(nodeId);
      await loadTreeData();
    } catch (error) {
      console.error("Failed to delete node:", error);
      throw error;
    }
  };

  const handleAddRoot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRootName.trim()) return;

    try {
      setIsLoading(true);
      const message = await apiService.createNode({ name: newRootName.trim() });
      setNewRootName("");
      setIsAddingRoot(false);
      toast.success(message);
      await loadTreeData();
    } catch (error) {
      console.error("Failed to add root node:", error);
      toast.error("Failed to add root node");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your tree structure...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-red-800 font-semibold mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadTreeData}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg">
        {treeData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border border-gray-200 rounded-md">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No nodes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first root node to get started!
            </p>
            <button
              onClick={() => setIsAddingRoot(true)}
              className="inline-flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Root Node
            </button>
          </div>
        ) : (
          <div className="px-2">
            {treeData.map((node) => (
              <TreeNodeComponent
                key={node._id}
                node={node}
                onAddChild={handleAddChild}
                onDelete={handleDeleteNode}
                level={0}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Node Tree Manager
            </h1>
            <p className="text-gray-600">
              Manage your hierarchical data structure with ease
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Add Root Node Button */}
        {!isAddingRoot && treeData.length > 0 && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingRoot(true)}
              className="inline-flex cursor-pointer items-center px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Root Node
            </button>
          </div>
        )}

        {/* Add Root Form */}
        {isAddingRoot && (
          <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <form onSubmit={handleAddRoot} className="space-y-4">
              <div>
                <label
                  htmlFor="rootName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Root Node Name
                </label>
                <input
                  id="rootName"
                  type="text"
                  value={newRootName}
                  onChange={(e) => setNewRootName(e.target.value)}
                  placeholder="Enter root node name"
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  maxLength={100}
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isLoading || !newRootName.trim()}
                >
                  {isLoading ? "Adding..." : "Add Root Node"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingRoot(false);
                    setNewRootName("");
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

  
        {renderContent()}
      </div>
    </div>
  );
};

export default LandingPage;
