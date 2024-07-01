"use client";

import NavBar from "@/modules/NavBar";
import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
<<<<<<< Updated upstream
=======
import { validateRequest } from "../../lib/auth";
import Providers from "@/app/providers";
import { redirect } from "next/navigation";
>>>>>>> Stashed changes

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
        // We don't retry mutations since they're not idempotent
        // We can allow retries if we implement idempotency keys and idempotency checking on the back-end
        retry: 0,
      },
    },
  });
  return (
    <html lang="en">
      <body style={{ backgroundColor: "pink", overflow: "hidden" }}>
        <QueryClientProvider client={queryClient}>
          <Box>
            {user && <NavBar />}
            <Box
              id="scroll-container"
              flexDirection="column"
              flex={5}
              overflow="auto"
            >
              {children}
            </Box>
          </Box>

          {/* <div style={{ height: "75px", backgroundColor: "white" }}>Footer</div> */}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
