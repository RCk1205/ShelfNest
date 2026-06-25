import { NextRequest, NextResponse } from "next/server";

import {
  getCouponByCode,
} from "@/lib/actions/coupon";

export async function POST(
  request: NextRequest
) {
  const body =
    await request.json();

  const coupon =
    await getCouponByCode(
      body.code
    );

  if (!coupon) {
    return NextResponse.json(
      {
        valid: false,
      }
    );
  }

  return NextResponse.json({
    valid: true,
    discount:
      coupon.discount,
  });
}