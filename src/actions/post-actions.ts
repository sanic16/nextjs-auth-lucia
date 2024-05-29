"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

import { categories } from "@/data/categories";
import { deleteObject, uploadObject } from "@/utils/aws";
import { revalidatePath } from "next/cache";

const categoriesIds = categories.map((category) => category.id);
const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];

export async function createPostAction(
  description: string,
  userId: string,
  prevState: { errors: PostErrors },
  formData: FormData
) {
  let errors: PostErrors = {};
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const thumbnail = formData.get("thumbnail") as File;

  // console.log(title, category, description, thumbnail);

  if (title.trim().length === 0) {
    errors.title = "Por favor, introduce un título";
  }
  if (category.trim().length === 0 || !(category in categoriesIds)) {
    errors.category = "Por favor, selecciona una categoría";
  }
  if (description.trim().length < 10) {
    errors.description = "Por favor, introduce una descripción";
  }
  if (
    !thumbnail ||
    thumbnail.size === 0 ||
    !allowedImageTypes.includes(thumbnail.type)
  ) {
    errors.thumbnail = "Por favor, selecciona una imagen";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const fileBuffer = await thumbnail.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const imageName = `public/${uuid()}-${thumbnail.name}`;

  try {
    await uploadObject(buffer, imageName, thumbnail.type);
  } catch (error) {
    errors.thumbnail = "Error al subir la imagen";
    return { errors };
  }

  try {
    await prisma.post.create({
      data: {
        title,
        description,
        thumbnail: `https://${process.env.BUCKET}.s3.amazonaws.com/${imageName}`,
        category,
        userId,
      },
    });
  } catch (error) {}

  revalidatePath("/");
  return redirect("/");
}

export async function deletePostAction(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    throw new Error("Error al eliminar la publicación");
  }

  revalidatePath("/", "layout");
}
