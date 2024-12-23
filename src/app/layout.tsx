import NavBar from "src/modules/NavBar";
import { Box, CssBaseline, useTheme } from "@mui/material";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

const RootLayout = ({ children, params: { session } }) => {
  return (
    <html lang="en">
      <body>
        <Box bgcolor="#FADADD" overflow="hidden" height="100vh" p={1}>
          <CssBaseline />
          <SessionProvider session={session} basePath="/api/auth">
            <Suspense fallback={"loading"}>
              <Providers>
                <NavBar />
                <Box height="calc(100vh - 96px)" overflow="auto">
                  {children}
                </Box>
              </Providers>
            </Suspense>

            <ToastContainer />
          </SessionProvider>
        </Box>
      </body>
    </html>
  );
};
export default RootLayout;
