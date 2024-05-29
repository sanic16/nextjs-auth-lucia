import React from "react";
import classes from "./page.module.css";
import PostsByCategory from "@/components/PostsByCategory/PostsByCategory";
import prisma from "@/lib/prisma";

export default function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <section className={classes.category__posts}>
      <PostsByCategory categoryId={params.id} />
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    distinct: ["category"],
  });

  return posts.map((post) => {
    return {
      id: post.category,
    };
  });
}
