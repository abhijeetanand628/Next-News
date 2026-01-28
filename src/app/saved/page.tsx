import connectDB from "../lib/db";
import User from "../models/User";
import Article from "../models/Article"; 
import DbNewsFeed from "../components/DbNewsFeed";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const GEMINI_DEMO_EMAIL = "demo@nextnews.com";

async function getSavedArticles() {
  await connectDB();
  const _ = Article; 
  const user = await User.findOne({ email: GEMINI_DEMO_EMAIL }).populate("savedArticles");
  if (!user || !user.savedArticles) return [];
  return JSON.parse(JSON.stringify(user.savedArticles));
}

export default async function SavedPage() {
  const articles = await getSavedArticles();

  return (
    <main className="px-6 md:px-12 lg:px-24 py-8">
      
      {/* Header Section with Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">My Saved Articles</h1>
        
        <div className="flex items-center gap-2">
            <Link 
                href="/"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            >
                <MoveLeft size={16} />
                Back
            </Link>
            <Link 
                href="/"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
                Home
            </Link>
        </div>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
            <p className="text-xl text-gray-500 mb-4">You haven't saved any articles yet.</p>
            <Link href="/" className="text-blue-600 hover:underline">
                Browse News
            </Link>
        </div>
      ) : (
        <DbNewsFeed articles={articles} />
      )}
    </main>
  );
}
