import { NextRequest, NextResponse } from "next/server";

// TODO: Move this to lib/types
type Payment = {
  id: string;
  accountId: string;
  amount: number;
  date: string;
  status: string;
  cardLast4: string;
};

// TODO: This needs to go into src/mocks/handlers/payments.ts along with msw handlers for storybook+test integration
// For simplicity, using in-memory store here
const payments: Payment[] = [];

export async function GET() {
  return NextResponse.json({ payments });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, amount, cardNumber } = body;

    // Basic validation
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

    payments.unshift(payment);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
