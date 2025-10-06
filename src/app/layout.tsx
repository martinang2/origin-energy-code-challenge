import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/lib/providers/query-provider";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Origin energy",
  description: "Coding challenge for the kings and queens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white`}>
        <QueryProvider>
          <Navbar />
          <div className="bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
