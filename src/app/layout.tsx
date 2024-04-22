import NavBar from "@/modules/NavBar";
import { Box } from "@mui/material";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "pink" }}>
        {/* <Box>
          <NavBar />
        </Box> */}
        {children}
        {/* <div style={{ height: "75px", backgroundColor: "white" }}>Footer</div> */}
      </body>
    </html>
  );
}
