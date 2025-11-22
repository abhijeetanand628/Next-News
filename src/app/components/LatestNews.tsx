"use client";

type Article = {
  title: string;
  description: string;
  urlToImage: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
};

const FALLBACK_IMG = "https://picsum.photos/600/400";

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function LatestNews({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {articles.map((article, idx) => (
        <div key={idx} className="rounded-xl overflow-hidden shadow-sm bg-white">

          <img
            src={article.urlToImage || FALLBACK_IMG}
            alt={article.title}
            className="w-full h-40 object-cover"
          />

          <div className="p-4">
            <h3 className="font-bold text-lg mb-2 leading-snug">
              {article.title?.slice(0, 60) || "No title available"}
            </h3>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>{timeAgo(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.source?.name}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
