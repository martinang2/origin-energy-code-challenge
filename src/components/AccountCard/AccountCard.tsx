"use client";

import { AccountType, Account } from "@/lib/types";
import { formatCurrency } from "@/lib/utils/format";
import { MouseEvent } from "react";

type Props = {
  account: Account;
  onMakePayment?: (e: MouseEvent<HTMLButtonElement>) => void;
};

const getAccountDetails = (account: Account) => {
  if (account.type === AccountType.Electricity)
    return `Meter No: ${account.meterNumber}`;
  if (account.type === AccountType.Gas) return `Volume: ${account.volume}`;
};

const getIcon = (type: AccountType) => {
  return type === AccountType.Electricity ? "⚡" : "🔥";
};

const getAmountColor = (balance: number) => {
  if (balance > 0) return "text-green-600";
  if (balance < 0) return "text-red-600";
  return "text-gray-500";
};

export default function AccountCard({ account, onMakePayment }: Props) {
  const { id, type, address, balance } = account;

  const typeLabel = {
    [AccountType.Electricity]: "Electricity",
    [AccountType.Gas]: "Gas",
  }[type];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={`h-12 w-12 rounded-full border flex items-center justify-center text-base bg-blue-50 border-blue-200`}
          aria-hidden
        >
          {getIcon(type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-500">{typeLabel}</h2>
          </div>

          <div className="mt-1 text-gray-700 font-medium">{id}</div>
          <div className="mt-0.5 text-gray-600 truncate">{address}</div>

          <div className="mt-1 text-sm text-gray-500">
            {getAccountDetails(account)}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="font-medium text-gray-800">Account Balance</div>
            <div
              className={`tabular-nums font-semibold ${getAmountColor(
                balance
              )}`}
            >
              {formatCurrency(balance)}
            </div>
          </div>

          {/* Clarification: Wouldnt this only be available only if account is overdue/negative? */}
          <div className="mt-3">
            <button
              type="button"
              onClick={onMakePayment}
              className="text-red-600 hover:underline font-medium"
            >
              Make a payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
