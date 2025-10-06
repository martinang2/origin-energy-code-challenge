import { render, screen } from "@testing-library/react";
import PageHeader from "./PageHeader";

describe("PageHeader", () => {
  it("renders title and subtitle correctly", () => {
    render(
      <PageHeader
        title="Energy Accounts"
        subtitle="Manage your energy accounts in one place"
      />
    );

    expect(screen.getByText("Energy Accounts")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your energy accounts in one place")
    ).toBeInTheDocument();
  });

  it("renders only title when no subtitle provided", () => {
    render(<PageHeader title="Payments" />);

    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.queryByTestId("subtitle")).not.toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <PageHeader title="Dashboard">
        <button>Add Account</button>
        <div>Extra content</div>
      </PageHeader>
    );

    expect(screen.getByText("Add Account")).toBeInTheDocument();
    expect(screen.getByText("Extra content")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<PageHeader title="Test" />);

    const header = container.querySelector("header");
    const title = screen.getByText("Test");

    expect(header).toHaveClass("text-center", "mb-12");
    expect(title).toHaveClass("text-4xl", "font-bold", "bg-gradient-to-r");
  });
});
