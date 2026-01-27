import mongoose, { Schema, Document } from "mongoose";

// 1. Define the Interface (TypeScript type)
// This helps VS Code know what fields exist on an article
export interface IArticle extends Document {
  title: string;
  description: string;
  content: string;
  category: string;
  imageUrl?: string; // Optional field
  author: string;
  publishedAt: Date;
}

// 2. Define the Schema (Database rules)
const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String, default: "Anonymous" },
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// 3. Export the Model
// Check if the model already exists (to prevent errors in development), otherwise create it
export default mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);