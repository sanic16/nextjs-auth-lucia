import React from "react";
import classes from "./page.module.css";
import Author from "@/components/post/Author/Author";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!post) {
    redirect("/");
  }
  return (
    <section className={classes.post__detail}>
      <div className={classes.author}>
        <Author authorId={post.userId} createdAt={post.createdAt} />
      </div>
      <div className={classes.post__body}>
        <h2>{post.title}</h2>
        <div className={classes.thumbnail}>
          <img src={post.thumbnail} alt={post.title} />
        </div>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const posts = await prisma.post.findMany();

  return posts.map((post) => {
    return {
      id: post.id,
    };
  });
}
