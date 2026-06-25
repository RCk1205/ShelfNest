 import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { createOrder } from "@/lib/actions/order";

export async function POST(
  request: NextRequest
) {
  try {

    const body =
      await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      customerName,
      customerEmail,
      customerPhone,
      address,

      userId,
      paymentMethod,
      discount,

      items,

    } = body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET!
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {

      return NextResponse.json(
        {
          success: false,
          error:
            "Payment verification failed",
        },
        {
          status: 400,
        }
      );
    }

    const order =
      await createOrder({

        customerName,
        customerEmail,
        customerPhone,
        address,

        userId,

        paymentMethod,

        discount,

        paymentStatus:
          "PAID",

        razorpayOrderId:
          razorpay_order_id,

        razorpayPaymentId:
          razorpay_payment_id,

        razorpaySignature:
          razorpay_signature,

        items,

      });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}