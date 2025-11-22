export async function GET(request: Request) {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
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

    const response = await fetch(url);
    const data = await response.json();

    // Return the JSON data to the client
    return Response.json(data);
}