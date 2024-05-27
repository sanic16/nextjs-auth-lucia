"use server";

import { signout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function logout() {
  await signout();
  redirect("/auth");
}
