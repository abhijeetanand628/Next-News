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
                console.log(data);
            } catch (error) {
                console.log("Error fetching news:", error);
            } finally {
                setLoading(false)
            }
        }

        getNews()
    }, [])

  return (
    <div className='flex flex-col mt-16 ml-20'>
        <h1 className='text-4xl text-black font-bold'>Hot Topics</h1>
    </div>
  )
}

export default Main