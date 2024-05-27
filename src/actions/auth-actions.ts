"use server";

import { createAuthSession, signout } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function signup(
  prevState: { errors: SignUpErrors },
  formData: FormData
) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password2 = formData.get("password2") as string;

  let errors: SignUpErrors = {};

  if (username.trim().length < 5) {
    errors.username = "El nombre debe tener al menos 5 caracteres";
  }

  if (!email.includes("@")) {
    errors.email = "Por favor, introduce un correo electrónico válido";
  }

  if (password.trim().length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  if (password !== password2) {
    errors.password2 = "La contraseña no coincide";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);

  let response;
  try {
    response = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes("User_username_key")) {
        errors.username = "El nombre de usuario ya está en uso";
      } else if (error.message.includes("User_email_key")) {
        errors.email = "El correo electrónico ya está en uso";
      } else {
        throw new Error(error.message);
      }
    }
  }

  if (Object.keys(errors).length > 0 || !response) {
    return { errors };
  }

  try {
    await createAuthSession(response.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  redirect("/");
}

export async function signin(
  prevState: { errors: SignInErrors },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let errors: SignInErrors = {};

  if (email.trim() === "") {
    errors.email = "Por favor, introduce tu correo electrónico";
  }

  if (password.trim() === "" || password.length < 8) {
    errors.password = "Por favor, introduce tu contraseña";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Error desconocido");
    }
  }

  if (!user) {
    return {
      errors,
    };
  }

  const isPasswordValid = verifyPassword(user.password, password);

  if (!isPasswordValid) {
    errors.password = "Contraseña incorrecta";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    await createAuthSession(user.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }

  redirect("/");
}

export async function singout() {
  // await signout();
  redirect("/auth");
}
