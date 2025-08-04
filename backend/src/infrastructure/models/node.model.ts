import mongoose, { Document, Schema } from "mongoose";

export interface INode extends Document {
  _id: string;
  name: string;
  parentId?: string | null;
  children: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NodeSchema = new Schema<INode>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Node",
      default: null,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Node",
      },
    ],
  },
  { timestamps: true }
);

export const NodeModel = mongoose.model<INode>("Node", NodeSchema);
