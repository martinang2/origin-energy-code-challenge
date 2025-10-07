import { Payment } from "@/lib/types";

export const mockPayments: Payment[] = [
  {
    id: "pay_1",
    accountId: "Account 1",
    amount: 150.75,
    date: "2024-01-15T10:30:00Z",
    status: "completed",
    cardLast4: "4242",
  },
  {
    id: "pay_2",
    accountId: "Account 2",
    amount: 89.25,
    date: "2024-01-10T14:20:00Z",
    status: "completed",
    cardLast4: "1881",
  },
  {
    id: "pay_3",
    accountId: "Account 3",
    amount: 200.0,
    date: "2024-01-05T09:15:00Z",
    status: "completed",
    cardLast4: "5678",
  },
  {
    id: "pay_4",
    accountId: "Account 4",
    amount: 180.5,
    date: "2023-12-20T16:45:00Z",
    status: "completed",
    cardLast4: "4242",
  },
  {
    id: "pay_5",
    accountId: "Account 5",
    amount: 120.0,
    date: "2023-12-15T11:30:00Z",
    status: "failed",
    cardLast4: "9012",
  },
];

export async function MOCK_PAYMENTS_API(): Promise<Payment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPayments);
    }, 1000);
  });
}
