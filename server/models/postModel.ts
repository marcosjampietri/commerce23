import { model, Schema, Model, models, Document } from "mongoose";

interface post extends Document {
  author: object;
  title: string;
  body: string;
  createdAt: Date;
  likes: number;
  comments: object[];
  attachments: string[];
}

const postSchema: Schema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  ],
  attachments: [
    {
      type: String,
    },
  ],
  privacy: {
    type: String,
    enum: ["public", "private", "friends"],
    default: "public",
  },
});

const posts: Model<post> = models.posts || model("posts", postSchema);

export default posts;
