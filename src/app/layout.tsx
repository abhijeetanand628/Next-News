import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next News",
  description: "Get Daily News Update",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
