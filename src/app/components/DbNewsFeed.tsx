"use client";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useState } from "react";

type DbArticle = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: string;
  author: string;
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

export default function DbNewsFeed({ articles }: { articles: DbArticle[] }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const toggleSave = async (id: string) => {
    try {
        const res = await fetch("/api/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articleId: id })
        });
        const data = await res.json();
        if (data.success) {
            if (data.saved) {
                setSavedIds([...savedIds, id]);
                alert("Article Saved!");
            } else {
                setSavedIds(savedIds.filter(sid => sid !== id));
                alert("Article Removed from Saved!");
            }
        }
    } catch (err) {
        console.error(err);
        alert("Failed to save");
    }
  }

  if (!articles || articles.length === 0) return null;

  return (
    <div className="mb-12">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="group relative rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md duration-300 border border-gray-100"
          >
            {/* Image */}
            <Link href={`/article/${article._id}`} className="block overflow-hidden h-40">
              <img
                src={article.imageUrl || FALLBACK_IMG}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
              />
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col h-[180px]">
              {/* Category & Date */}
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded-full text-gray-700 font-medium capitalize">
                    {article.category}
                </span>
                <span>{timeAgo(article.publishedAt)}</span>
              </div>

              {/* Title */}
              <Link href={`/article/${article._id}`}>
                <h3 className="font-bold text-lg mb-2 leading-snug text-gray-800 group-hover:text-black line-clamp-3">
                  {article.title}
                </h3>
              </Link>
              
              {/* Author */}
               <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">by {article.author}</span>
                  
                  <button 
                    onClick={() => toggleSave(article._id)}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Bookmark 
                        size={18} 
                        fill={savedIds.includes(article._id) ? "currentColor" : "none"}
                        className={savedIds.includes(article._id) ? "text-blue-600" : ""}
                    />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
