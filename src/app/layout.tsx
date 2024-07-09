import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";

// import Footer from "@/components/Footer";
// ========== import components ========= //
import Navbar from "../components/navbar/Navbar";
// import css
import "@/styles/globals.css";
//import context

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
      <body className={`${inter.className} relative xl:pt-0`}>
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
