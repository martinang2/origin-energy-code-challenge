/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { QueryBoundary } from "./QueryBoundary";
import { UseQueryResult } from "@tanstack/react-query";

// Simple mock query creator
const mockQuery = (
  state: "loading" | "error" | "success",
  data?: any,
  error?: Error
) =>
  ({
    isLoading: state === "loading",
    isError: state === "error",
    isSuccess: state === "success",
    data,
    error,
  } as any);

describe("QueryBoundary - Simple Tests", () => {
  test("shows loading spinner by default", () => {
    render(
      <QueryBoundary query={mockQuery("loading")}>
        {() => <div>Content</div>}
      </QueryBoundary>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("shows error message when query fails", () => {
    const error = new Error("Failed to fetch");

    render(
      <QueryBoundary query={mockQuery("error", null, error)}>
        {() => <div>Content</div>}
      </QueryBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  test("renders children when query succeeds", () => {
    interface TestItem {
      id: number;
      name: string;
    }

    const data: TestItem[] = [{ id: 1, name: "Test" }];

    const mockQuery = {
      isLoading: false,
      isError: false,
      isSuccess: true,
      data,
      error: null,
    } as UseQueryResult<TestItem[], Error>;

    render(
      <QueryBoundary query={mockQuery}>
        {(data) => <div>Items: {data.length}</div>}
      </QueryBoundary>
    );

    expect(screen.getByText("Items: 1")).toBeInTheDocument();
  });
});
