import { formats, modules } from "@/utils/quill-formats";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuillEditor = ({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (value: string) => void;
}) => {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      placeholder="Escribe algo increíble..."
      className="quill__editor"
      value={description}
      onChange={setDescription}
    />
  );
};

export default ReactQuillEditor;
