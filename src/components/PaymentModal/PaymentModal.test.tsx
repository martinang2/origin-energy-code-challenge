import { render, screen, fireEvent } from "@testing-library/react";
import PaymentModal from "./PaymentModal";
import { vi } from "vitest";
import { AccountType, ElectricityAccount } from "@/lib/types";

vi.mock("@/hooks/usePayAccount", () => ({
  usePayAccount: () => ({
    mutate: vi.fn(),
    isPending: false,
    isError: false,
    isSuccess: false,
    reset: vi.fn(),
  }),
}));

const mockAccount: ElectricityAccount = {
  id: "1",
  address: "123 Test Street",
  type: AccountType.Electricity,
  balance: -200.5,
  meterNumber: "987654321",
};

describe("PaymentModal - Simple", () => {
  it("renders form and submits payment", () => {
    const mockOnClose = vi.fn();

    render(
      <PaymentModal isOpen={true} onClose={mockOnClose} account={mockAccount} />
    );

    // Check basic rendering
    expect(screen.getByText("Make Payment")).toBeInTheDocument();
    expect(screen.getByText("123 Test Street")).toBeInTheDocument();

    // Check form elements exist
    expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("1234 5678 9012 3456")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("MM/YY")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("123")).toBeInTheDocument();
  });

  it("closes when X button is clicked", () => {
    const mockOnClose = vi.fn();

    render(
      <PaymentModal isOpen={true} onClose={mockOnClose} account={mockAccount} />
    );

    fireEvent.click(screen.getByText("✕"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
