import React from "react";
import "./createPage.css";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const CreatePostForm = dynamic(
  () => import("@/components/forms/CreatePostForm/CreatePostForm"),
  {
    ssr: false,
  }
);

export default async function CreatePage() {
  const result = await verifyAuth();
  if (!result.user) {
    return redirect("/auth");
  }
  return (
    <section className="create__post">
      <div className="create__post-container">
        <h1>Crear Post</h1>
        <CreatePostForm userId={result.user.id} />
      </div>
    </section>
  );
}
