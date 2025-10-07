import { MOCK_PAYMENTS_API, mockPayments } from "@/mocks/handlers/payments";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await MOCK_PAYMENTS_API();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to load accounts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, amount, cardNumber } = body;

    // Basic validation
    // TODO: this needs to be more robust to check all the fields
    if (!accountId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payment = {
      id: Date.now().toString(),
      accountId,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      status: "completed",
      cardLast4: cardNumber?.slice(-4) || "4242",
    };

    mockPayments.unshift(payment);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
