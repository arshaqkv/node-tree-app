import React, { useState } from "react";
import type { TreeNode } from "../types";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Loader2,
  PencilLineIcon,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

interface TreeNodeComponentProps {
  node: TreeNode;
  onAddChild: (parentId: string, name: string) => Promise<void>;
  onDelete: (nodeId: string) => Promise<void>;
  level?: number;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  onAddChild,
  onDelete,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const indentLevel = level * 20;

  const handleToggleExpand = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleAddChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    setIsLoading(true);
    try {
      await onAddChild(node._id, newChildName.trim());
      setNewChildName("");
      setIsAddingChild(false);
      setIsExpanded(true);
    } catch (error) {
      console.error("Failed to add child:", error);
      toast.error("Failed to add child");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(node._id);
    } catch (error) {
      console.error("Failed to delete node:", error);
      toast.error("Failed to delete node");
      setIsLoading(false);
    }
  };

  const renderChildren = () => {
    if (!isExpanded || !hasChildren) return null;

    return (
      <div className="ml-5 my-2">
        {node.children.map((child) => (
          <TreeNodeComponent
            key={child._id}
            node={child}
            onAddChild={onAddChild}
            onDelete={onDelete}
            level={level + 1}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="select-none">
      <div
        className="group flex my-2 dark:bg-gray-900 items-center py-3 px-2 border border-gray-200 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-150"
        style={{ paddingLeft: `${8 + indentLevel}px` }}
        onClick={handleToggleExpand}
      >
        <button
          className={`mr-2 p-0.5 rounded hover:bg-gray-200 transition-colors ${
            !hasChildren ? "invisible" : ""
          }`}
          disabled={isLoading || !hasChildren}
        >
          {isExpanded ? (
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {/* Node Name / Edit Input */}
        <div className="flex-1 flex items-center min-w-0">
          <span className="text-gray-800 dark:text-gray-200 text-sm font-medium truncate cursor-pointer">
            {node.name}
          </span>

          <button
            className="p-1 text-gray-500 opacity-0 group-hover:opacity-100 dark:text-gray-100 cursor-pointer hover:text-gray-700  rounded transition-colors"
            disabled={isLoading}
            title="Edit node"
          >
            <PencilLineIcon className="w-3 h-3 ml-2" />
          </button>
        </div>

        {/* Action Buttons - Show on Hover */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <>
            <button
              onClick={() => setIsAddingChild(true)}
              className="p-1 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors cursor-pointer"
              disabled={isLoading}
              title="Add child node"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={handleDelete}
              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
              disabled={isLoading}
              title="Delete node"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        </div>
      </div>

      {/* Add Child Form */}
      {isAddingChild && (
        <div
          className="mt-1 mb-2 bg-white dark:bg-gray-900 border border-gray-200 rounded-md p-3 shadow-sm"
          style={{ marginLeft: `${20 + indentLevel}px` }}
        >
          <form onSubmit={handleAddChild} className="space-y-2">
            <input
              type="text"
              value={newChildName}
              onChange={(e) => setNewChildName(e.target.value)}
              placeholder="Enter node name"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              maxLength={100}
              disabled={isLoading}
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingChild(false);
                  setNewChildName("");
                }}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-200 cursor-pointer hover:text-gray-800 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-sm bg-blue-900 dark:bg-blue-800 cursor-pointer text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={isLoading || !newChildName.trim()}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Children */}
      {renderChildren()}
    </div>
  );
};

export default TreeNodeComponent;
