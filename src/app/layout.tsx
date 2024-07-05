import NavBar from "@/modules/NavBar";
import { Box } from "@mui/material";
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
      <body style={{ backgroundColor: "pink", overflow: "hidden" }}>
        {" "}
        <Providers user={user}>
          {user && <NavBar />}
          {children}
          {/* <div style={{ height: "75px", backgroundColor: "white" }}>Footer</div> */}{" "}
        </Providers>
      </body>
    </html>
  );
}
