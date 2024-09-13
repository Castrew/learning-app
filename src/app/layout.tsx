import NavBar from "@/modules/NavBar";
import { Box, CssBaseline, useTheme } from "@mui/material";
import { validateRequest } from "../../lib/auth";
import Providers from "@/app/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <html lang="en">
      <body>
        <Box bgcolor="#FADADD" overflow="hidden" height="100vh" p={1}>
          <CssBaseline />
          <Suspense fallback={"loading"}>
            <Providers user={user}>
              {user && <NavBar />}
              <Box height="calc(100vh - 96px)" overflow="auto">
                {children}
              </Box>
            </Providers>
          </Suspense>
          <ToastContainer />
        </Box>
      </body>
    </html>
  );
}
