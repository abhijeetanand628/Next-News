import Razorpay from "razorpay";

export async function POST(req: Request) {
  const { amount } = await req.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
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
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
