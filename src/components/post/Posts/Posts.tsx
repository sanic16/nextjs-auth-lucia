import React from "react";
import Post from "../Post/Post";

import "./posts.css";
import type { Post as PostType } from "@prisma/client";

const Posts = async ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
