export const runtime = "nodejs";

export async function POST(req: Request) {
  const Razorpay = (await import("razorpay")).default;

  const { amount } = await req.json();

  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return new Response("Missing Razorpay keys", { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // convert rupees to paisa
    currency: "INR",
    receipt: "receipt_order_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return Response.json(order);
  } catch (err) {
    console.error("Razorpay Error", err);
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
