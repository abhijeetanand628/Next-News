"use client";

import { useEffect, useState } from "react";
import HotTopics from "./HotTopics";
import LatestNews from "./LatestNews";

type Article = {
  title: string;
  description: string;
  urlToImage: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
};

export default function Main() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHotIndex, setCurrentHotIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setVisible(false); 

      setTimeout(() => {
        setCurrentHotIndex((prev) =>
          prev === news.length - 1 ? 0 : prev + 1
        );
        setVisible(true); 
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, [news]);

  const featuredArticle = news[currentHotIndex] || null;

  return (
    <main className="px-6 md:px-12 lg:px-24 py-8">

      <h1 className="text-4xl font-bold mb-6">Hot Topics</h1>

      {loading && <p>Loading news...</p>}

      <div
        className={`transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <HotTopics article={featuredArticle} />
      </div>

      <h2 className="text-3xl font-bold mt-14 mb-6">Latest News</h2>

      <LatestNews articles={news} />
    </main>
  );
}
