import { ReactNode } from "react";
import { UseQueryResult } from "@tanstack/react-query";

// Extract the data type from UseQueryResult
type QueryData<T extends UseQueryResult<unknown, unknown>> =
  T extends UseQueryResult<infer Data, unknown> ? Data : never;

interface QueryBoundaryProps<T extends UseQueryResult<unknown, unknown>> {
  query: T;
  loadingFallback?: ReactNode;
  errorFallback?: (error: Error) => ReactNode;
  emptyFallback?: ReactNode;
  isEmpty?: (data: QueryData<T>) => boolean;
  children: (data: QueryData<T>) => ReactNode;
}

export function QueryBoundary<T extends UseQueryResult<unknown, unknown>>({
  query,
  loadingFallback,
  errorFallback,
  emptyFallback,
  isEmpty,
  children,
}: QueryBoundaryProps<T>) {
  const { data, isLoading, isError, error, isPending } = query;

  // Loading state
  if (isLoading || isPending) {
    return loadingFallback || <DefaultLoadingFallback />;
  }

  // Error state
  if (isError) {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    return (
      errorFallback?.(errorObj) || <DefaultErrorFallback error={errorObj} />
    );
  }

  // Data exists but might be empty
  if (
    typeof isEmpty === "function" &&
    data !== undefined &&
    isEmpty(data as QueryData<T>)
  ) {
    return emptyFallback || <DefaultEmptyFallback />;
  }

  // Success state - pass data to children
  return <>{children(data as QueryData<T>)}</>;
}

// Default components remain the same...
function DefaultLoadingFallback() {
  return (
    <div className="flex justify-center items-center py-12" role="status">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
  );
}

function DefaultErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-center py-12">
      <div className="text-red-600 text-lg font-semibold mb-2">
        Something went wrong
      </div>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );
}

function DefaultEmptyFallback() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg">No data found</div>
      <p className="text-gray-400 mt-2">
        There is nothing to display at the moment.
      </p>
    </div>
  );
}
