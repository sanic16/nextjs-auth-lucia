import PostsByAuthor from "@/components/PostsByAuthor/PostsByAuthor";
import React from "react";
import classes from "./page.module.css";

export default function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <section className={classes.author__posts}>
      <PostsByAuthor authorId={params.id} />
    </section>
  );
}
