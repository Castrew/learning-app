import NavBar from "@/modules/NavBar";

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
        <div style={{ height: "75px", backgroundColor: "white" }}>
          <NavBar />
        </div>
        {children}
        <div style={{ height: "75px", backgroundColor: "white" }}>Footer</div>
      </body>
    </html>
  );
}
