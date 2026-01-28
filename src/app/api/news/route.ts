import { MOCK_NEWS } from "@/app/lib/mockNews";

export async function GET(request: Request) {
    const apiKey = process.env.NEWS_API_KEY;

    // Fallback if no key (though user said they have it, this is safe)
    if (!apiKey) {
        console.warn("No API Key found, returning mock data.");
        return Response.json({ status: "ok", articles: MOCK_NEWS });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let url = "";
 
    if (search) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        search
        )}&pageSize=50&sortBy=publishedAt&language=en&apiKey=${apiKey}`;
    }

    else if (category) {
        url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=50&apiKey=${apiKey}`;
    }

    else {
        url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`;
    }

    try {
        const response = await fetch(url);
        
        // NewsAPI returns 426 or 401 or 403 when blocked or limited
        if (!response.ok) {
            console.error(`NewsAPI Error: ${response.status} ${response.statusText}`);
            throw new Error("NewsAPI fetch failed");
        }

        const data = await response.json();

        // Check for application-level error (e.g., status: "error")
        if (data.status === "error") {
            console.error("NewsAPI returned error status:", data.message);
            throw new Error(data.message);
        }

        // Return real data
        return Response.json(data);

    } catch (error) {
        console.warn("Returning MOCK DATA due to API error:", error);
        
        // Filter mock data if category is requested
        let filteredMock = MOCK_NEWS;
        if (category) {
            filteredMock = MOCK_NEWS.filter(a => a.category === category);
            // If we filter too much, just return all mixed to keep UI populated
            if (filteredMock.length === 0) filteredMock = MOCK_NEWS;
        }

        return Response.json({
            status: "ok",
            totalResults: filteredMock.length,
            articles: filteredMock
        });
    }
}