"use server";
import prisma from "@/lib/prisma";
import { uploadObject } from "@/utils/aws";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export async function uploadUserAvatar(userId: string, formData: FormData) {
  const image = formData.get("avatar") as File;
  const fileBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(fileBuffer);

  const imageName = `public/profile/${uuid()} - ${image.name}`;

  try {
    await uploadObject(buffer, imageName, image.type);
  } catch (error) {
    throw new Error("Error al subir la imagen");
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      avatar: `https://${process.env.BUCKET}.s3.amazonaws.com/${imageName}`,
    },
  });

  revalidatePath("/profile");
  revalidatePath("/authors");
}
