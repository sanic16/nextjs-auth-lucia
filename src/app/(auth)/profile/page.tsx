import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";

import classes from "./page.module.css";
import Image from "next/image";
import { defaultAvatar } from "@/data/contants";
import { FaEdit } from "react-icons/fa";
import AvatarProfile from "@/components/profile/AvatarProfile/AvatarProfile";
import BodyProfile from "@/components/profile/BodyProfile/BodyProfile";

export default async function page() {
  const result = await verifyAuth();
  if (!result.user) redirect("/auth?mode=login");

  const user = await prisma.user.findUnique({
    where: {
      id: result.user.id,
    },
  });

  if (!user) return null;

  return (
    <section className={classes.profile}>
      <div className={classes.profile__info}>
        <AvatarProfile user={user} />
        <BodyProfile user={user} />
      </div>
    </section>
  );
}
