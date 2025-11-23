"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from 'react';
import ArticleSkeleton from "../components/skeletons/ArticleSkeleton";

function ArticleContent() {
  const params = useSearchParams();
  const router = useRouter();

  const title = params.get("title");
  const description = params.get("description");
  const content = params.get("content");
  const image = params.get("image");
  const source = params.get("source");
  const published = params.get("published");
  const url = params.get("url");

  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, [])

  const originalSource = useCallback(
    async (articleUrl: string) => {
      const paid = sessionStorage.getItem("articlePaid");

      if (paid) {
        window.open(articleUrl, "_blank");
        return;
      }

      try {
        const response = await fetch("/api/razorpay/order", {
          method: "POST",
          body: JSON.stringify({ amount: 299 }),
        });

        const order = await response.json();

        const options: any = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: order.amount,
          currency: "INR",
          name: "NextNews Premium Access",
          description: "Unlock full article source",
          order_id: order.id,

          handler: async function (response: any) {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verify = await verifyRes.json();

            if (verify.success) {
              sessionStorage.setItem("articlePaid", "true");
              window.open(articleUrl, "_blank");
            } else {
              alert("Payment verification failed!");
            }
          },

          theme: { color: "#4f46e5" },
        };

        const razorPay = new (window as any).Razorpay(options);
        razorPay.open();
      } catch (error) {
        console.error("Payment Error", error);
        alert("Something went wrong!");
      }
    },
    []
  );

  return (
    <main className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 max-w-3xl mx-auto">
      {image && (
        <img
          src={image}
          alt={title || ""}
          className="w-full h-72 object-cover rounded-xl shadow-md mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="text-sm text-gray-500 mb-6">
        {source && <span>{source} • </span>}
        {published && isClient && (
          <span>{new Date(published).toLocaleString()}</span>
        )}
      </div>

      <p className="text-lg text-gray-700 mb-4">{description}</p>

      <p className="text-base text-gray-600 whitespace-pre-line">{content}</p>

      <div className="flex justify-center gap-3 mt-10 w-full">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg shadow-sm hover:bg-gray-200 hover:shadow transition-all font-medium"
        >
          ← Back
        </button>

        <Link
          href="/"
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-700 hover:shadow transition-all font-medium"
        >
          Home
        </Link>
      </div>

      {url && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => originalSource(url!)}
            className="px-6 py-3 bg-purple-600 cursor-pointer text-white rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all font-mediumtext-l"
          >
            Read Original Source →
          </button>
        </div>
      )}
    </main>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent />
    </Suspense>
  );
}
