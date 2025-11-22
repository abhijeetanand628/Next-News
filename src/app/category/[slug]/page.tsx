
interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage(props: PageProps) {
  const params = await props.params;
  const slug = params.slug;

  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Missing API Key</h2>
        <p>Add NEWSAPI_KEY to your .env.local</p>
      </div>
    );
  }

  const categoryMap: any = {
    world: "general",
    general: "general",
    technology: "technology",
    health: "health",
    business: "business",
    sports: "sports",
    entertainment: "entertainment",
    gaming: "gaming",
  };

  const category = categoryMap[slug] || slug;

  const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=20&country=us&apiKey=${apiKey}`;

  const response = await fetch(apiUrl, { next: { revalidate: 60 } });

  if (!response.ok) {
    return (
      <div className="p-8">
        <h2>Error fetching news</h2>
        <p>{response.status}</p>
      </div>
    );
  }

  const data: any = await response.json();
  const articles = data.articles || [];

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8">
      <h1 className="text-2xl font-bold capitalize mb-6">{slug}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item: any, i: number) => (
          <article key={i} className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300">
            {item.urlToImage && (
              <div className="relative h-48">
                <img
                  src={item.urlToImage}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </div>
            )}

            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm mt-2 text-gray-600 line-clamp-3">
                {item.description}
              </p>

              <div className="text-xs mt-4 text-gray-500">
                {item.source?.name} —{" "}
                {item.publishedAt ? new Date(item.publishedAt).toLocaleString() : ""}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
