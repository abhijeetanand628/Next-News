export async function GET() {
    const apiKey = process.env.NEWS_API_KEY;

    const response = await fetch(`https://newsdata.io/api/1/news?apikey=${apiKey}`);
    const data = await response.json();

    return Response.json(data);
}