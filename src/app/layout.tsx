import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "デッカイギ 2024 スケジュール",
  description: "デッカイギ 2024 のスケジュールです",
  openGraph: {
    title: "デッカイギ 2024 スケジュール",
    description: "デッカイギ 2024 のスケジュールです",
    url: "https://program.dekaigi.org/",
    siteName: "デッカイギ 2024 スケジュール",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "デッカイギ 2024 スケジュール",
    description: "デッカイギ 2024 のスケジュールです",
    site: "@dekaigi",
    creator: "@dekaigi",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
