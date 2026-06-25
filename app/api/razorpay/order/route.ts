import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  request: NextRequest
) {
  try {
    const { amount } =
      await request.json();

    const order =
      await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: "INR",
      });

    return NextResponse.json(order);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to create Razorpay order",
      },
      {
        status: 500,
      }
    );
  }
}