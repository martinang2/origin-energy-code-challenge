import { NextResponse } from "next/server";
import { MOCK_ENERGY_ACCOUNTS_API } from "@/mocks/accounts";

export async function GET() {
  try {
    const data = await MOCK_ENERGY_ACCOUNTS_API();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to load accounts" }, { status: 500 });
  }
}
