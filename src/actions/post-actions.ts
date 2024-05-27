"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createPostAction(
  description: string,
  prevState: { errors: PostErrors },
  formData: FormData
) {
  let errors: PostErrors = {};
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as string;

  console.log(title, category, description, thumbnail);

  if (title.trim().length === 0) {
    errors.title = "Por favor, introduce un título";
  }
  if (category.trim().length === 0) {
    errors.category = "Por favor, selecciona una categoría";
  }
  if (description.trim().length === 0) {
    errors.description = "Por favor, introduce una descripción";
  }
  if (!thumbnail) {
    errors.thumbnail = "Por favor, selecciona una imagen";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return redirect("/");
}
