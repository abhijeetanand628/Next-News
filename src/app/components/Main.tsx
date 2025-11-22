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
  const [loading, setLoading] = useState<boolean>(true);
  const [currentHotIndex, setCurrentHotIndex] = useState(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const perPage = 8;

  // Pagination Math
  const totalPages = Math.ceil(news.length / perPage);
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedNews = news.slice(start, end);

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
  
  const featuredArticle = news[currentHotIndex] || null;

  useEffect(() => {
    if (news.length === 0) return;
    if (isPaused) return;

    const interval = setInterval(() => {
      setVisible(false); 

      setTimeout(() => {
        setCurrentHotIndex((prev) =>
          prev === news.length - 1 ? 0 : prev + 1
        );
        setVisible(true); 
      }, 250);
    }, 3000);

    return () => clearInterval(interval);
  }, [news, isPaused]);

  useEffect(() => {
    scrollToTop();
  }, [page]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="px-6 md:px-12 lg:px-24 py-8">

      <h1 className="text-4xl font-bold mb-6">Hot Topics</h1>

      {loading && <p>Loading news...</p>}

      <div
        className={`transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <HotTopics
          article={featuredArticle}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        />
      </div>

      <h2 className="text-3xl font-bold mt-14 mb-6">Latest News</h2>
      
        {loading && <p>Loading news...</p>}

      <LatestNews articles={paginatedNews} />

      <div className="flex justify-center items-center gap-3 mt-10">
           <button
               onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                  scrollToTop();
                }
              }}
              disabled={page === 1}
              className={`px-4 py-2 border rounded-lg ${
                page === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setPage(num);
                  scrollToTop();
                }}
                className={`px-3 py-2 rounded-lg border ${
                  page === num
                    ? "bg-gray-900 text-white cursor-pointer"
                    : "hover:bg-gray-100 cursor-pointer"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => {
                if (page < totalPages) {
                  setPage(page + 1);
                  scrollToTop();
                }
              }}
              disabled={page === totalPages}
              className={`px-4 py-2 border rounded-lg ${
                page === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Next
            </button>
      </div>
    </main>
  );
}
