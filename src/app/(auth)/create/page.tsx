import React from "react";
import CreatePostForm from "../../../components/forms/CreatePostForm/CreatePostForm";
import "./createPage.css";

export default function CreatePage() {
  return (
    <section className="create__post">
      <div className="create__post-container">
        <h1>Crear Post</h1>
        <CreatePostForm />
      </div>
    </section>
  );
}
