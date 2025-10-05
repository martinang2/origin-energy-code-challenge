import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import { vi, Mock } from "vitest";

vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
}));
import { usePathname } from "next/navigation";

describe("Navbar", () => {
    const mockUsePathname = usePathname as Mock;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders brand and links", () => {
        mockUsePathname.mockReturnValue("/accounts");
        render(<Navbar />);

        expect(screen.getByText("Origin Energy")).toBeInTheDocument();
        expect(screen.getByText("Energy Accounts")).toBeInTheDocument();
        expect(screen.getByText("Payment History")).toBeInTheDocument();
    });

    it("updates highlight after clicking another link", async () => {
        const user = userEvent.setup();

        // start on /accounts
        mockUsePathname.mockReturnValue("/accounts");
        const { rerender } = render(<Navbar />);

        const accountsLink = screen.getByText("Energy Accounts");
        const paymentsLink = screen.getByText("Payment History");

        // verify initial state
        expect(accountsLink).toHaveClass("text-orange-700");
        expect(paymentsLink).not.toHaveClass("text-orange-700");

        // simulate user clicking
        await user.click(paymentsLink);

        // simulate navigation (Next.js route change)
        mockUsePathname.mockReturnValue("/payments");
        rerender(<Navbar />);

        // verify highlight switched
        expect(paymentsLink).toHaveClass("text-orange-700");
        expect(accountsLink).not.toHaveClass("text-orange-700");
    });
});