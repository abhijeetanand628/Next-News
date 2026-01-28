import connectDB from "../lib/db";
import User from "../models/User";
import Article from "../models/Article"; // Needed for population?
import DbNewsFeed from "../components/DbNewsFeed";
import Link from "next/link";

const GEMINI_DEMO_EMAIL = "demo@nextnews.com";

async function getSavedArticles() {
  await connectDB();
  // Ensure Article model is registered
  // (In dev mode, sometimes models need to be touched)
  const _ = Article; 

  const user = await User.findOne({ email: GEMINI_DEMO_EMAIL }).populate("savedArticles");
  
  if (!user || !user.savedArticles) return [];
  
  // Clean serialization
  return JSON.parse(JSON.stringify(user.savedArticles));
}

export default async function SavedPage() {
  const articles = await getSavedArticles();

  return (
    <main className="px-6 md:px-12 lg:px-24 py-8">
      <h1 className="text-4xl font-bold mb-6">My Saved Articles</h1>
      
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
