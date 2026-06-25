import { NextResponse } from "next/server";
import { getPaymentSettings } from "@/lib/actions/store";

export async function GET() {
  const settings =
    await getPaymentSettings();

  return NextResponse.json(
    settings
  );
}