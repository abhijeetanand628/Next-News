export async function GET() {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    // Return the JSON data to the client
    return Response.json(data);
}