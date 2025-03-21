import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import '@/styles/globals.css';

import Navbar from '../components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import StoreProvider from './StoreProvider';
import FullPageError from '@/components/error/FullPageError';
import { ErrorBoundaryHandler } from 'next/dist/client/components/error-boundary';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Eco HHB',
  description: 'E-commerce and service Company',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen w-screen overflow-x-hidden ${inter.className}`}
      >
        <StoreProvider>
          <ErrorBoundaryHandler pathname={'/'} errorComponent={FullPageError}>
            <Navbar />
            {children}
            <Footer />
          </ErrorBoundaryHandler>
        </StoreProvider>
      </body>
    </html>
  );
}
