import { render, screen, fireEvent } from "@testing-library/react";
import AccountCard from "./AccountCard";
import { Account, AccountType } from "@/lib/types";
import { vi } from "vitest";

// --- Mock formatCurrency so we don't depend on locale formatting ---
vi.mock("@/lib/utils/format", () => ({
  formatCurrency: (val: number) => `$${val.toFixed(2)}`,
}));

describe("AccountCard", () => {
  const electricity: Account = {
    id: "A-1001",
    type: AccountType.Electricity,
    address: "1 Greville Ct, Thomastown VIC",
    meterNumber: "1234567890",
    balance: 50,
  };

  const gas: Account = {
    id: "A-2001",
    type: AccountType.Gas,
    address: "74 Taltarni Rd, Yawong Hills VIC",
    volume: 3034,
    balance: -10,
  };

  const zeroBalance: Account = { ...electricity, balance: 0 };

  it("renders electricity account details", () => {
    render(<AccountCard account={electricity} onMakePayment={() => {}} />);
    expect(screen.getByText("Electricity")).toBeInTheDocument();
    expect(screen.getByText("Meter No: 1234567890")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toHaveClass("text-green-600");
  });

  it("renders gas account details", () => {
    render(<AccountCard account={gas} onMakePayment={() => {}} />);
    expect(screen.getByText("Gas")).toBeInTheDocument();
    expect(screen.getByText("Volume: 3034")).toBeInTheDocument();
    expect(screen.getByText("$-10.00")).toHaveClass("text-red-600");
  });

  it("renders zero balance in gray", () => {
    render(<AccountCard account={zeroBalance} onMakePayment={() => {}} />);
    expect(screen.getByText("$0.00")).toHaveClass("text-gray-500");
  });

  it("calls onMakePayment when button clicked", () => {
    const handleClick = vi.fn();
    render(<AccountCard account={electricity} onMakePayment={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Make a payment" }));
    expect(handleClick).toHaveBeenCalled();
  });
});
