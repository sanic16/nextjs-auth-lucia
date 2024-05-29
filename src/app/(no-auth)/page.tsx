import Posts from "@/components/post/Posts/Posts";
import React from "react";
import classes from "./page.module.css";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Slideshow from "@/components/Slideshow/Slideshow";

export default async function page({
  searchParams,
}: {
  searchParams: {
    page: string;
  };
}) {
  const totalItems = await prisma.post.count();
  const totalPages = Math.ceil(totalItems / 8);
  let numPage = parseInt(searchParams.page);
  if (isNaN(numPage) || numPage < 1 || numPage > totalPages) {
    numPage = 1;
  }
  const postsPage = await prisma.post.findMany({
    take: 8,
    skip: (numPage - 1) * 8,
  });

  const images = postsPage.map((post) => post.thumbnail);

  return (
    <section className={classes.home__posts}>
      <Slideshow images={images} />
      <Posts posts={postsPage} />
      <div className={classes.home__pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`/?page=${page}`}
            className={page === numPage ? classes.active : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const totalItems = await prisma.post.count();
  const totalPages = Math.ceil(totalItems / 8);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return pages.map((page) => {
    return {
      page: page.toString(),
    };
  });
}
