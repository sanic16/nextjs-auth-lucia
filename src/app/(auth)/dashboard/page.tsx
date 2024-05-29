import { verifyAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import React from "react";
import classes from "./page.module.css";
import Link from "next/link";

export default async function page() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/auth?mode=login");
  }
  const posts = await prisma.post.findMany();
  return (
    <section className={classes.dashboard}>
      <h1>Mis publicaciones</h1>
      <div className={classes.dashboard__posts}>
        {posts.map((post) => (
          <div className={classes.post} key={post.id}>
            <div className={classes.info}>
              <Link href={`/post/${post.id}`}>
                <div className={classes.thumbnail}>
                  <img src={post.thumbnail} alt={post.title} />
                </div>
                <div className={classes.details}>
                  <h5>{post.title}</h5>
                  <p>
                    creado el{" "}
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("es-GT", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </div>
              </Link>
            </div>

            <div className={classes.actions}>
              <Link href={`/post/${post.id}`} className="btn sm primary">
                Ver Publicación
              </Link>
              <button className="btn sm white">Editar</button>
              <button className="btn sm danger">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
