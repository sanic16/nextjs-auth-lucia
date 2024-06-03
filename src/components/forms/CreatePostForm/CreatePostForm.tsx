"use client";

import React, { useState } from "react";
import { categories } from "../../../data/categories";

import "./createPostForm.css";
import { useFormState } from "react-dom";
import { createPostAction } from "@/actions/post-actions";
import StatusButton from "@/components/buttons/StatusButton/StatusButton";
import ReactQuillEditor from "../ReactQuillEditor/ReactQuillEditor";
import Image from "next/image";

const CreatePostForm = ({ userId }: { userId: string }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  let handleThumbnail;
  if (typeof window !== "undefined") {
    handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      if (file) {
        setThumbnail(file[0]);
      }
    };
  } else {
    handleThumbnail = () => {};
  }
  const initialState: { errors: PostErrors } = {
    errors: {},
  };
  const changeDescription = (value: string) => {
    setDescription(value);
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
      <ReactQuillEditor
        description={description}
        setDescription={changeDescription}
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
            <Image src={URL.createObjectURL(thumbnail)} alt="Thumbnail" fill />
          )}
        </div>
      </div>
      <StatusButton
        currentStatus="Crear Post"
        pendingText="Creando Post..."
        className="btn primary"
      />
    </form>
  );
};

export default CreatePostForm;
