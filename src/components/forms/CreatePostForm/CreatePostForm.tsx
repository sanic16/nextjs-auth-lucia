"use client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React, { useState } from "react";
import { categories } from "../../../data/categories";
import { modules, formats } from "../../../utils/quill-formats";

import "./createPostForm.css";
import { useFormState } from "react-dom";
import { createPostAction } from "@/actions/post-actions";

const CreatePostForm = ({ userId }: { userId: string }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setThumbnail(file[0]);
    }
  };
  const initialState: { errors: PostErrors } = {
    errors: {},
  };
  const [formState, formAction] = useFormState(
    createPostAction.bind(null, description, userId),
    initialState
  );
  return (
    <form action={formAction} className="post__form">
      <input type="text" placeholder="Título" autoFocus name="title" />
      <select name="category">
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ReactQuill
        modules={modules}
        formats={formats}
        placeholder="Escribe algo increíble..."
        className="quill__editor"
        value={description}
        onChange={setDescription}
      />
      <div className="post__file">
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnail}
          name="thumbnail"
        />
        <div className="post__thumbnail">
          {thumbnail && (
            <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" />
          )}
        </div>
      </div>
      <button type="submit" className="btn primary">
        Crear Post
      </button>
    </form>
  );
};

export default CreatePostForm;
