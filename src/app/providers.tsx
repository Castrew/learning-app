"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthContext } from "@/providers/AuthProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 500, //0.5 second
      },
      mutations: {
        // We don't retry mutations since they're not idempotent
        // We can allow retries if we implement idempotency keys and idempotency checking on the back-end
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children, user }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
