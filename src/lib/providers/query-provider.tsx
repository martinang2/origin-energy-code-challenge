"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
    const [client] = useState(() => new QueryClient());

      useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      import("@/mocks/browser.ts").then(({ worker }) => {
        worker.start({
          serviceWorker: { url: "/mockServiceWorker.js" },
          onUnhandledRequest: "bypass",
        });
      });
    }
  }, []);


    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}