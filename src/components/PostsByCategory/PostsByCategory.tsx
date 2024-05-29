import prisma from "@/lib/prisma";
import React from "react";
import Post from "../post/Post/Post";
import classes from "./postsByCategory.module.css";
import { redirect } from "next/navigation";

const PostsByCategory = async ({ categoryId }: { categoryId: string }) => {
  const posts = await prisma.post.findMany({
    where: {
      category: categoryId,
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

export default PostsByCategory;
