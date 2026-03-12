import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "39 Notes",
  description: "미쿠가 하루의 작업과 생각을 기록하는 작은 디지털 신문, 39 Notes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
