"use client";
import { useState, useMemo } from "react";
import AccountCard from "@/components/AccountCard/AccountCard";
import { QueryBoundary } from "@/components/QueryBoundary/QueryBoundary";
import { Account, AccountType } from "@/lib/types";
import { useAccounts } from "@/hooks/useAccounts";
import PageHeader from "@/components/PageHeader/PageHeader";
import SearchInput from "@/components/SearchInput/SearchInput";
import EnergyTypeFilter from "@/components/EnergyFilter/EnergyFilter";
import PaymentModal from "@/components/PaymentModal/PaymentModal";

export default function AccountsPage() {
  const accountsQuery = useAccounts();

  const [filters, setFilters] = useState({
    search: "",
    type: "all" as AccountType | "all",
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleMakePayment = (account: Account) => {
    setSelectedAccount(account);
    setIsPaymentModalOpen(true);
  };

  return (
    <main className="container mx-auto px-4 max-w-7xl">
      <PageHeader
        title="Energy Accounts"
        subtitle="Manage and view all your energy accounts in one place. Filter by type or search by address."
      />

      <div className="mt-8">
        <QueryBoundary
          query={accountsQuery}
          isEmpty={(data) => data.length === 0}
        >
          {(accounts) => (
            <>
              <div className=" mx-auto space-y-4">
                {/* Maybe: Add a useDebounced hook to optimize search if BE uses seperate searchParams calls  */}
                <SearchInput
                  value={filters.search}
                  onChange={(value) => updateFilter("search", value)}
                  placeholder="Search by address..."
                />

                <EnergyTypeFilter
                  selectedType={filters.type}
                  onTypeChange={(type) => updateFilter("type", type)}
                />

                <AccountsContent
                  accounts={accounts}
                  filters={filters}
                  onMakePayment={handleMakePayment}
                />
              </div>
            </>
          )}
        </QueryBoundary>
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setSelectedAccount(null)}
          account={selectedAccount}
        />
      </div>
    </main>
  );
}

// TODO: Move to  src/components: Test + storybook
function AccountsContent({
  accounts,
  filters,
  onMakePayment,
}: {
  accounts: Account[];
  filters: { search: string; type: AccountType | "all" };
  onMakePayment: (account: Account) => void;
}) {
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        filters.search === "" ||
        account.address.toLowerCase().includes(filters.search.toLowerCase());

      const matchesType =
        filters.type === "all" || account.type === filters.type;

      return matchesSearch && matchesType;
    });
  }, [accounts, filters]);

  return (
    <div className="space-y-8">
      <ResultsHeader
        totalCount={accounts.length}
        filteredCount={filteredAccounts.length}
        hasActiveFilters={filters.search !== "" || filters.type !== "all"}
      />

      <AccountsGrid accounts={filteredAccounts} onMakePayment={onMakePayment} />
    </div>
  );
}

// TODO: Move to  src/components: Test + storybook
function AccountsGrid({
  accounts,
  onMakePayment,
}: {
  accounts: Account[];
  onMakePayment: (account: Account) => void;
}) {
  if (accounts.length === 0) {
    return <EmptyState />;
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onMakePayment={onMakePayment}
        />
      ))}
    </section>
  );
}

// TODO: Move to  src/components: Test + storybook
function ResultsHeader({
  totalCount,
  filteredCount,
  hasActiveFilters,
}: {
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
}) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-4 px-6 py-3 bg-white rounded-2xl border border-gray-200 shadow-sm">
        {hasActiveFilters ? (
          <>
            <span className="text-gray-700">
              Showing <strong>{filteredCount}</strong> of{" "}
              <strong>{totalCount}</strong> accounts
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
              Filtered
            </span>
          </>
        ) : (
          <span className="text-gray-600 text-lg">
            Showing all <strong>{totalCount}</strong> energy accounts
          </span>
        )}
      </div>
    </div>
  );
}

// TODO: Move to  src/components: Test + storybook
function EmptyState() {
  return (
    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
      <div className="text-8xl mb-6">🔍</div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-3">
        No accounts found
      </h3>
      <p className="text-gray-500 text-lg max-w-md mx-auto">
        Try adjusting your search terms or filter criteria
      </p>
    </div>
  );
}
