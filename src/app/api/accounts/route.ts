import { Account } from "@/lib/types";
import { mockedAccounts } from "@/mocks/handlers/accounts";

import { NextResponse } from "next/server";

export async function MOCK_ENERGY_ACCOUNTS_API(): Promise<Account[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedAccounts);
    }, 1000);
  });
}

export async function GET() {
  try {
    const data = await MOCK_ENERGY_ACCOUNTS_API();
    return NextResponse.json({ data: data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to load accounts" },
      { status: 500 }
    );
  }
}
