import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Article from "../../models/Article";

export async function POST(req: Request) {
  try {
    // 1️⃣ Connect to database
    console.log("POST /api/articles hit");
    await connectDB();
    console.log("DB connected");

    // 2️⃣ Read data sent from client
    const body = await req.json();
    console.log("Request body:", body);

    // 3️⃣ Create new article document
    const article = await Article.create(body);
    console.log("Article saved");

    // 4️⃣ Send success response
    return NextResponse.json({ success: true, data: article });
  } catch (error: any) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
