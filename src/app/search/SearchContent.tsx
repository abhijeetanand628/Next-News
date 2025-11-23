"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import SearchSkeleton from "../components/skeletons/SearchSkeleton";

interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export default function SearchContent() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("query") || "";

  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchSearch = async () => {
      const res = await fetch(`/api/news?search=${query}`);
      const data = await res.json();
      setResults(data.articles || []);
      setLoading(false);
    };

    fetchSearch();
  }, [query]);

  return (
    <main className="px-6 py-8">

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Search Results for: <span className="text-blue-600">{query}</span>
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl shadow-sm hover:bg-gray-200 transition"
          >
            ← Back
          </button>

          <Link
            href="/"
            className="px-3 py-2 text-sm bg-blue-500 text-white rounded-xl shadow-sm hover:bg-blue-700 transition"
          >
            Home
          </Link>
        </div>
      </div>

      {loading && <SearchSkeleton />}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, i) => (
            <Link key={i} href={item.url} target="_blank">
              <article className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
                {item.urlToImage && (
                  <img
                    src={item.urlToImage}
                    className="rounded mb-3 w-full h-40 object-cover"
                  />
                )}
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                  {item.description}
                </p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
