import { describe, it, expect } from "vitest";
import { formatCurrency } from "./format";

describe("formatCurrency", () => {
    it("formats positive amounts with CR", () => {
        expect(formatCurrency(100)).toBe("$100 CR");
    });

    it("formats negative amounts with DR", () => {
        expect(formatCurrency(-50)).toBe("-$50 DR");
    });

    it("formats zero without suffix", () => {
        expect(formatCurrency(0)).toBe("$0");
    });
});