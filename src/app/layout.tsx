import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "39 Notes",
  description: "Newsprint-style editorial blog reading from the 00_Blog content repository.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
