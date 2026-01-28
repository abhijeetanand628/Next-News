import Main from "./components/Main";
import connectDB from "./lib/db";
import Article from "./models/Article";

async function getArticles() {
  try {
    await connectDB();
    const articles = await Article.find().sort({ createdAt: -1 }).limit(6).lean();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error("Home SSR Error:", error);
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();

  return (
    <>
      <Main initialDbArticles={articles} />
    </>
  );
}
