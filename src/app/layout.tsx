import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "@/styles/globals.css";

import Navbar from "../components/navbar/Navbar";
import Footer from "@/components/Footer";
import StoreProvider from "./StoreProvider";

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
      <body
        className={`w-screen h-screen overflow-x-hidden ${inter.className}`}
      >
        <StoreProvider>
          <div>
            <Navbar />
            {children}
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
