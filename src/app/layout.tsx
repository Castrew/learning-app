import NavBar from "@/modules/NavBar";
import { Box, CssBaseline } from "@mui/material";
import { validateRequest } from "../../lib/auth";
import Providers from "@/app/providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  return (
    <html lang="en">
      <body>
        <Box bgcolor="pink" overflow="hidden" height="100vh" p={1}>
          <CssBaseline />
          <Providers user={user}>
            {user && <NavBar />}
            <Box height="calc(100vh - 96px)">{children}</Box>
          </Providers>
        </Box>
      </body>
    </html>
  );
}
