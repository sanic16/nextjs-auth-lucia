import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function HomePage() {
  const result = await verifyAuth();

  if (!result.user) {
    return redirect("/auth");
  }

  const users = await prisma.user.findMany();
  if (!users) {
    return <div>No users found</div>;
  }
  return (
    <section>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.username}</li>;
        })}
      </ul>
    </section>
  );
}
