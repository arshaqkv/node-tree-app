import mongoose, { Document, Schema } from "mongoose";

export interface INode extends Document {
  name: string;
  parentId?: mongoose.Types.ObjectId | null;
}

const NodeSchema = new Schema<INode>(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Node", default: null },
  },
  { timestamps: true }
);

export const NodeModel = mongoose.model<INode>("Node", NodeSchema);
