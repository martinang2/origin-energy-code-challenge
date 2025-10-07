"use client";
import PageHeader from "@/components/PageHeader/PageHeader";
import { QueryBoundary } from "@/components/QueryBoundary/QueryBoundary";
import { usePaymentsHistory } from "@/hooks/usePaymentsHistory";

const PaymentsPage = () => {
  const paymentsQuery = usePaymentsHistory();

  return (
    <main className="container mx-auto px-4 max-w-7xl">
      <PageHeader
        title="Payments"
        subtitle="Manage and view transaction history."
      />

      <QueryBoundary
        query={paymentsQuery}
        isEmpty={(data) => data.length === 0}
      >
        {(payments) => (
          <div className="space-y-3">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{payment.accountId}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(payment.date).toLocaleDateString()} • ****
                      {payment.cardLast4}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${payment.amount.toFixed(2)}
                    </p>
                    <p
                      className={`text-sm ${
                        payment.status === "completed"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {payment.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </QueryBoundary>
    </main>
  );
};

export default PaymentsPage;
