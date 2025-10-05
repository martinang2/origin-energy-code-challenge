import "../src/app/globals.css";

import { initialize,mswLoader } from "msw-storybook-addon";
import type { Preview, Decorator } from "@storybook/react";
import QueryProvider from "../src/lib/providers/query-provider";

initialize({ 
  serviceWorker: { url: '/mockServiceWorker.js' },
  onUnhandledRequest: "warn" });

export const loaders = [mswLoader];

export const decorators: Decorator[] = [
  (Story) => (
    <QueryProvider>
      <Story />
    </QueryProvider>
  ),
];

const preview: Preview = {};

export default preview;
