"use client";
import { useEffect, useState } from "react";
import HotTopics from "./HotTopics";

type Article = {
  title?: string;
  description?: string;
  urlToImage?: string | null;
  source?: { name?: string } | null;
  publishedAt?: string;
  url?: string;
};

export default function Main() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"hot" | "latest">("hot");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fetch once from our server-side route
    const getNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        const articles = data.articles || [];
        setNews(articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  useEffect(() => {
    // Auto-rotate every 10 seconds.
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActiveSection((prev) => (prev === "hot" ? "latest" : "hot"));
        setVisible(true);
      }, 300); 
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const featured = news && news.length > 0 ? news[0] : null;
  const latest = news && news.length > 1 ? news.slice(1) : [];

  return (
    <main className="px-6 md:px-12 lg:px-24 py-8">
      <h1 className="text-4xl font-bold mb-6">Hot Topics</h1>

      {loading && <p>Loading news...</p>}

      <div className={`transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        {activeSection === "hot" ? (
          <HotTopics article={featured} />
        ) : (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Latest News</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latest.map((a, i) => (
                <article key={i} className="rounded-lg overflow-hidden shadow-sm bg-white">
                  <img
                    src={a.urlToImage || "/mnt/data/0de236f7-e159-4742-a723-ed0f42fc950d.png"}
                    alt={a.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-semibold">{a.title}</h3>
                    <div className="mt-2 text-xs text-gray-500">
                      {a.source?.name} · {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : ""}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
