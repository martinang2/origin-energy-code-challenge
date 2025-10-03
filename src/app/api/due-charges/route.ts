import { NextResponse } from "next/server";
import { MOCK_DUE_CHARGES_API } from "@/mocks/due-charges";


export async function GET() {
  try {
    const data = await MOCK_DUE_CHARGES_API();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to load due charges" }, { status: 500 });
  }
}