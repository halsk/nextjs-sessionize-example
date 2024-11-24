import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "デッカイギ 2025 スケジュール",
  description: "デッカイギ 2025 のスケジュールです",
  openGraph: {
    title: "デッカイギ 2025 スケジュール",
    description: "デッカイギ 2025 のスケジュールです",
    url: "https://program.dekaigi.org/",
    siteName: "デッカイギ 2025 スケジュール",
    locale: "ja_JP",
    type: "website",
    images: "https://program.dekaigi.org/images/ogp.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "デッカイギ 2025 スケジュール",
    description: "デッカイギ 2025 のスケジュールです",
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
    <html lang="ja">
      <head>
        <meta property="fb:app_id" content="587135371878544" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
