import { NextResponse } from "next/server";
import connectDB from "../../lib/db";
import Article from "../../models/Article";
import User from "../../models/User";

const GEMINI_DEMO_EMAIL = "demo@nextnews.com";

const DUMMY_ARTICLES = [
  {
    title: "SpaceX Successfully Launches New Starship Prototype",
    description: "The massive rocket achieved orbit for the first time, marking a major milestone in space exploration.",
    content: "SpaceX has successfully launched its latest Starship prototype, achieving orbit for the first time in history. The launch took place at the Starbase facility in Texas, drawing millions of viewers online. \n\nMusk stated, 'This is a huge step for humanity.' The rocket is designed to carry humans to Mars and beyond. The test flight lasted approximately 90 minutes before splashing down in the Indian Ocean.",
    category: "technology",
    author: "Elon Musk", // Ensure this matches schema string
    imageUrl: "https://images.unsplash.com/photo-1541185933-710f50b77e7d?w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Global Markets Rally as Inflation Cools Down",
    description: "Stock markets across the globe surged today as new data suggests inflation is finally under control.",
    content: "Wall Street saw significant gains today as the latest CPI report showed lower-than-expected inflation numbers. The S&P 500 rose by 2.5%, while the Nasdaq jumped 3.1%. \n\nAnalysts predict that the Federal Reserve may pause interest rate hikes in the coming meeting. This optimism has spread to European and Asian markets as well.",
    category: "business",
    author: "Jane Doe",
    imageUrl: "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "The Future of AI: What to Expect in 2026",
    description: "Artificial Intelligence continues to evolve rapidly. Here are the top trends to watch this year.",
    content: "From generative video to autonomous agents, AI is reshaping every industry. In 2026, we expect to see more personalized AI assistants, breakthroughs in healthcare diagnostics, and AI-integrated smart cities. \n\nExperts warn about the ethical implications, but the momentum seems unstoppable. Companies like OpenAI and Google are leading the charge with new models.",
    category: "technology",
    author: "Sam Altman",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Championship Finals: Underdogs Take the Trophy",
    description: "In a stunning upset, the city's beloved underdogs defeated the defending champions.",
    content: "The stadium was electric as the final whistle blew, declaring the underdogs as the new champions. It was a match full of drama, with a last-minute goal sealing the victory. \n\nFans flooded the streets in celebration. The team captain dedicated the win to their loyal supporters who never stopped believing.",
    category: "sports",
    author: "Mike Breen",
    imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Sustainable Living: 5 Easy Swaps for a Greener Home",
    description: "Reducing your carbon footprint is easier than you think. Try these simple eco-friendly changes.",
    content: "1. Switch to LED bulbs. \n2. Use reusable bags. \n3. Compost kitchen waste. \n4. Install a smart thermostat. \n5. Buy local produce. \n\nSmall changes can have a big impact on the environment. Start today!",
    category: "lifestyle",
    author: "Greta T.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-24d4c16419d7?w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "New Electric Vehicle Battery Breakthrogh",
    description: "Scientists have discovered a new material that could double the range of electric cars.",
    content: "A team of researchers at MIT has published a paper detailing a new solid-state battery technology. This innovation promises to charge EVs in under 10 minutes and provide a range of over 800 miles. \n\nMajor automakers are already in talks to license the technology. Production could start as early as 2027.",
    category: "technology",
    author: "Dr. Emmett Brown",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    publishedAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    await connectDB();
    
    // 1. Clear existing
    await Article.deleteMany({});
    
    // 2. Insert Articles
    const createdArticles = await Article.insertMany(DUMMY_ARTICLES);
    console.log(`Inserted ${createdArticles.length} articles`);

    // 3. Setup Demo User
    let user = await User.findOne({ email: GEMINI_DEMO_EMAIL });
    if (!user) {
        user = await User.create({
            name: "Demo User",
            email: GEMINI_DEMO_EMAIL,
            savedArticles: []
        });
    }

    // 4. Save first 2 articles for the user
    // IMPORTANT: Clear previous saved to avoid null references if we deleted articles
    user.savedArticles = [];
    const idsToSave = createdArticles.slice(0, 2).map((a: any) => a._id);
    user.savedArticles = idsToSave;
    await user.save();

    return NextResponse.json({ 
        success: true, 
        message: "Database seeded successfully",
        articlesCount: createdArticles.length,
        savedCount: idsToSave.length
    });

  } catch (error: any) {
    console.error("Seed Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
