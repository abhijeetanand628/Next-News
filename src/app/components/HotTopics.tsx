'use client'
 
type Article = {
    title?: string;
    description?: string;
    urlToImage?: string | null;
    source?: { name?: string} | null;
    publishedAt?: string;
    url?: string;
};

type Props = {
    article: Article | null | undefined;
    className?: string;
};

// Local fallback image
const FALLBACK_IMG = '/mnt/data/0de236f7-e159-4742-a723-ed0f42fc950d.png';

function timeAgo(dateString?: string) {
  if (!dateString) return "";
  const d = new Date(dateString);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function HotTopics({ article, className = "" }: Props) {
  if (!article) {
    return null;
  }

  const image = article.urlToImage || FALLBACK_IMG;
  const title = article.title || "Untitled";
  const description = article.description || "";
  const source = article.source?.name || "Unknown";
  const published = timeAgo(article.publishedAt);

  return (
    <section className={`w-full ${className}`}>
      <div className="flex flex-col lg:flex-row items-stretch gap-6">

        <div className="relative lg:w-3/5 rounded-lg overflow-hidden shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-72 lg:h-[360px] object-cover block"
          />

          <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-3xl lg:text-4xl font-serif text-white leading-tight max-w-3/4">
              {title}
            </h2>

            <div className="mt-4 text-sm text-white/90 flex gap-4">
              <span>{published}</span>
              <span>·</span>
              <span>{source}</span>
            </div>
          </div>
        </div>

        <div className="lg:w-2/5 flex flex-col justify-center">
          <p className="text-2xl lg:text-3xl font-serif text-gray-800 mb-4">
            {description ? description.slice(0, 250) : "No summary available."}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">
            {description ? description : ""}
            {" "}
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 underline ml-1 cursor-pointer hover:text-black"
              >
                read more
              </a>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
