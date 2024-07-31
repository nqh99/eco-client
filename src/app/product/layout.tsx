import React, { Suspense } from "react";
import "@/styles/globals.css";

import PageLoading from "@/components/skeleton/PageLoading";
import StoreProvider from "../StoreProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Suspense fallback={<PageLoading />}>
        <StoreProvider>
          <div>{children}</div>
        </StoreProvider>
      </Suspense>
    </section>
  );
}
