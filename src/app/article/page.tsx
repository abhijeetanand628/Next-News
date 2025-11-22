"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from 'react';

function ArticleContent() {
  const params = useSearchParams();
  const router = useRouter();

  const title = params.get("title");
  const description = params.get("description");
  const content = params.get("content");
  const image = params.get("image");
  const source = params.get("source");
  const published = params.get("published");
  const url = params.get("url");

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 max-w-3xl mx-auto">
      {image && (
        <img
          src={image}
          alt={title || ""}
          className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        {source && <span>{source} • </span>}
        {published && <span>{new Date(published).toLocaleString()}</span>}
      </div>

      <p className="text-lg text-gray-700 mb-4">{description}</p>

      <p className="text-base text-gray-600 whitespace-pre-line">{content}</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

        <button
          onClick={() => router.back()}
          className="px-5 py-3 bg-gray-100 text-gray-700 cursor-pointer rounded-xl shadow-sm hover:bg-gray-200 hover:shadow-md transition-all font-medium"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="px-5 py-3 bg-blue-500 text-white rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all font-medium"
        >
          Home
        </Link>
      </div>

      {url && (
        <a
          href={url}
          target="_blank"
          className="block mt-6 text-center text-blue-600 underline font-medium"
        >
          Read Original Source →
        </a>
      )}
    </main>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ArticleContent />
    </Suspense>
  );
}
