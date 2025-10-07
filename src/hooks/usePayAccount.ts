import { useMutation, useQueryClient } from "@tanstack/react-query";

const processPayment = async (paymentData: {
  accountId: string;
  amount: number;
  cardNumber: string;
  expiry: string;
  cvc: string;
}) => {
  const response = await fetch("/api/payments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  console.log("Response status:", response.status);
  console.log("Response headers:", response.headers);

  if (!response.ok) throw new Error("Payment failed");
  return response.json();
};

export const usePayAccount = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      onSuccess();
    },
  });
};
