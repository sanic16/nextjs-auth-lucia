import prisma from "@/lib/prisma";
import React from "react";
import Post from "../post/Post/Post";
import classes from "./postsByAuthor.module.css";
import { redirect } from "next/navigation";

const PostsByAuthor = async ({ authorId }: { authorId: string }) => {
  const posts = await prisma.post.findMany({
    where: {
      userId: authorId,
    },
  });
  if (posts.length === 0) redirect("/");
  return (
    <div className={classes.posts}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsByAuthor;
