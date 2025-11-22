"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Article = {
  title: string;
  description: string;
  urlToImage: string | null;
  url: string;
  source: { name: string };
  content: string;
  publishedAt: string;
};

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = Number(searchParams.get("page") || 1);

  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(pageFromUrl);

  const perPage = 8;

  const totalPages = Math.ceil(news.length / perPage);
  const start = (page - 1) * perPage;
  const paginatedNews = news.slice(start, start + perPage);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        const response = await fetch(`/api/news?category=${slug}`);
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error("Error fetching category news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryNews();
  }, [slug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const changePage = (num: number) => {
    setPage(num);
    router.push(`/category/${slug}?page=${num}`);
  };

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-4xl font-bold capitalize mb-6">{slug} News</h1>

      {loading && <p>Loading news...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedNews.map((item, i) => (
          <Link
            href={{
              pathname: "/article",
              query: {
                title: item.title,
                description: item.description,
                content: item.content,
                image: item.urlToImage,
                source: item.source?.name,
                published: item.publishedAt,
                url: item.url,
              },
            }}
            key={i}
          >
            <article className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]">
              {item.urlToImage && (
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}

              <div className="p-4">
                <h2 className="text-lg font-semibold leading-tight">{item.title}</h2>

                <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                  {item.description}
                </p>

                <div className="text-xs mt-4 text-gray-500">
                  {item.source?.name} —{" "}
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleString()
                    : ""}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {news.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-10">

          <button
            onClick={() => page > 1 && changePage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 border rounded-lg ${
              page === 1
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-gray-100 cursor-pointer"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => changePage(num)}
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
            onClick={() => page < totalPages && changePage(page + 1)}
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
      )}
    </main>
  );
}
