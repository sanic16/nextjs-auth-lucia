import Link from "next/link";
import type { Post } from "@prisma/client";
import Author from "../Author/Author";
import "./post.css";
import dynamic from "next/dynamic";

const Description = dynamic(() => import("../Description/Description"), {
  ssr: false,
});

const Post = ({ post }: { post: Post }) => {
  const reducedTitle =
    post.title.length > 50 ? post.title.slice(0, 50) + "..." : post.title;
  return (
    <div className="post">
      <div className="header">
        <Link href={`/post/${post.id}`}>
          <div className="thumbnail">
            <img src={post.thumbnail} alt={post.title} />
          </div>
          <h4>{reducedTitle}</h4>
        </Link>
      </div>
      <div className="body">
        <Description description={post.description} />
        <div className="info">
          <Author authorId={post.userId} createdAt={post.createdAt} />
          <Link href={`/posts/categories/${post.category}`}>
            {post.category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
