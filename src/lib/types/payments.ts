export type Payment = {
  id: string;
  accountId: string;
  date: string;
  amount: number;
  status: "completed" | "failed" | "pending";
};
