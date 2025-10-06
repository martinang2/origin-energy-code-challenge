"use client";
import { useQuery } from "@tanstack/react-query";
import type { Account } from "@/lib/types";

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async (): Promise<Account[]> => {
      const res = await fetch("/api/accounts");
      if (!res.ok) throw new Error(`Failed to fetch accounts (${res.status})`);
      const { data = [] } = await res.json();
      return data;
    },
    staleTime: 60_000,
  });
}
