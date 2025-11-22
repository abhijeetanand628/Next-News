export const runtime = "nodejs";

import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return new Response("Missing key secret", { status: 500 });
  }

  const expected = crypto
    .createHmac("sha256", keySecret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  return Response.json({
    success: expected === razorpay_signature,
  });
}
