'use client'
import { useEffect, useState } from 'react'

const Main = () => {

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                const response = await fetch('/api/news');
                const data = await response.json();
                setNews(data.results || []);
                console.log(data);
            } catch (error) {
                console.log("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        }

        getNews();
    }, []);

  return (
    <div className='flex flex-col mt-16 ml-20'>
        <h1 className='text-4xl text-black font-bold'>Hot Topics</h1>

        {loading && <p>Loading news...</p>}

        <div className='mt-6 flex flex-col gap-4'>
            {news.map((article, index) => (
                <div 
                    key={index}
                    className='p-4 border rounded-lg'    
                >
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <p className="text-gray-600">{article.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Main