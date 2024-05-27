import Header from "@/components/AuthHeader/Header/Header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
