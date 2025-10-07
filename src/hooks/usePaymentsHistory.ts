"use client";
import { Payment } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export function usePaymentsHistory() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async (): Promise<Payment[]> => {
      const res = await fetch("/api/payments");
      if (!res.ok) throw new Error(`Failed to fetch payments (${res.status})`);
      const { data = [] } = await res.json();
      return data;
    },
    staleTime: 60_000,
  });
}
