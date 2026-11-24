import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const TITLE = "デッカイギ2027 スケジュール";
const DESCRIPTION =
  "行政デジタル改革共創会議「デッカイギ2027」（2027年1月8日（金）・9日（土）、羽田イノベーションシティ）のセッションスケジュールです。";
const SITE_URL = "https://program.dekaigi.org/";
const OGP_IMAGE = {
  url: "https://program.dekaigi.org/images/ogp.png",
  width: 1200,
  height: 630,
  alt: "デッカイギ2027 〜どこかで落としたXを探しにいこう！〜 2027.1.8(FRI)-1.9(SAT)",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: TITLE,
    locale: "ja_JP",
    type: "website",
    images: [OGP_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OGP_IMAGE.url],
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
