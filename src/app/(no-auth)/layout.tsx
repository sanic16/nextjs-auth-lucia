import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React, { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Footer />
    </>
  );
}
