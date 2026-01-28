import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import User from "../../models/User";
import Article from "../../models/Article";

// ⚠️ DEMO ONLY: Hardcoded user ID mechanism
// In a real app, you would get this from the session (NextAuth)
const GEMINI_DEMO_EMAIL = "demo@nextnews.com";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { articleId } = await req.json();

    if (!articleId) {
      return NextResponse.json({ error: "Article ID required" }, { status: 400 });
    }

    // 1. Find or Create the Demo User
    let user = await User.findOne({ email: GEMINI_DEMO_EMAIL });
    
    if (!user) {
      user = await User.create({
        name: "Demo User",
        email: GEMINI_DEMO_EMAIL,
        savedArticles: []
      });
    }

    // 2. Toggle Save (Add if not there, remove if there)
    const isSaved = user.savedArticles.includes(articleId);

    if (isSaved) {
      user.savedArticles = user.savedArticles.filter((id: any) => id.toString() !== articleId);
    } else {
      user.savedArticles.push(articleId);
    }

    await user.save();

    return NextResponse.json({ 
        success: true, 
        saved: !isSaved, 
        message: !isSaved ? "Article Saved" : "Article Removed" 
    });

  } catch (error: any) {
    console.error("Save Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
