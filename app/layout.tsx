import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | 당근마켓",
    default: "당근마켓",
  },
  description: "누구든지 사고, 무엇이든지 팔고 | 당근마켓",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-900 text-white max-w-screen-md mx-auto px-2 py-5`}
      >
        {children}
      </body>
    </html>
  );
}
