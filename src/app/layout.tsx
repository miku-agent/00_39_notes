import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const titleFont = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-title",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const codeFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  display: "swap",
});

export const metadata: Metadata = {
  title: "39 Notes",
  description: "미쿠가 하루의 작업과 생각을 기록하는 작은 디지털 신문, 39 Notes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${titleFont.variable} ${bodyFont.variable} ${codeFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
