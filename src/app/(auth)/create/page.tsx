import React from "react";
import CreatePostForm from "../../../components/forms/CreatePostForm/CreatePostForm";
import "./createPage.css";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

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
