"use client";
import { useState } from "react";
import { Account } from "@/lib/types";
import { usePayAccount } from "@/hooks/usePayAccount";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: Account | null;
}

export default function PaymentModal({
  isOpen,
  onClose,
  account,
}: PaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const paymentMutation = usePayAccount({
    onSuccess: () => {
      setPaymentSuccess(true);
    },
  });

  if (!isOpen || !account) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    paymentMutation.mutate({
      accountId: account.id,
      amount: parseFloat(amount),
      cardNumber,
      expiry,
      cvc,
    });
  };

  const handleClose = () => {
    setAmount("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setPaymentSuccess(false);
    paymentMutation.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal Content */}
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative z-50 shadow-2xl">
        {!paymentSuccess ? (
          /* Payment Form View */
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Make Payment</h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 rounded hover:cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">{account.address}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm capitalize">{account.type}</span>
                <span
                  className={`font-semibold ${
                    account.balance < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${account.balance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* TODO: FE Validations for forms fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 16)
                    )
                  }
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) =>
                      setExpiry(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4)
                          .replace(/(\d{2})(\d{0,2})/, "$1/$2")
                      )
                    }
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) =>
                      setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    placeholder="123"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {paymentMutation.isError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  Payment failed. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={
                  paymentMutation.isPending ||
                  !amount ||
                  !cardNumber ||
                  !expiry ||
                  !cvc
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {paymentMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Pay $${amount || "0.00"}`
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success View */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-2">
              Your payment of <strong>${amount}</strong> has been processed.
            </p>

            <button
              onClick={handleClose}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors hover:cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
