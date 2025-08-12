import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Mono } from 'next/font/google'

const roboto_mono = Roboto_Mono({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Ai agent tutorial",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        {children}
      </body>
    </html>
  );
}
