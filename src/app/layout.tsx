import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "@/styles/globals.css";

import Navbar from "../components/navbar/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco HHB",
  description: "E-commerce and service Company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
