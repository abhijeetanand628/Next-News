"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";

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

function SearchContent() {
  const params = useSearchParams();
  const query = params.get("query") || "";

  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <h1 className="text-3xl font-bold mb-4">
        Search Results for: <span className="text-blue-600">{query}</span>
      </h1>

      {loading && <p>Loading search results...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item, i) => (
          <Link key={i} href={item.url} target="_blank">
            <article className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
              {item.urlToImage && (
                <img src={item.urlToImage} className="rounded mb-3" />
              )}
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
