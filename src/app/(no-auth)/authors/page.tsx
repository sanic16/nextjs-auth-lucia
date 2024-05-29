import prisma from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import classes from "./authors.module.css";

export default async function page() {
  const authors = await prisma.user.findMany();
  return (
    <section>
      <div className={classes.authors}>
        {authors.map((author) => (
          <div key={author.id} className={classes.author}>
            <Link href={`/posts/authors/${author.id}`}>
              <div className={classes.avatar}>
                <Image
                  src={
                    author.avatar ||
                    "https://nextjs-blog-gt.s3.amazonaws.com/defaults/avatar.png"
                  }
                  alt={author.username}
                  fill
                />
              </div>
              <div className={classes.info}>
                <h5>{author.username}</h5>
                <p>Posts: {author.numberOfPosts}</p>
                <p>
                  Usuario desde:{" "}
                  {new Date(author.createdAt).toLocaleDateString("es-GT", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
