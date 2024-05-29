"use client";
import React, { useState } from "react";
import type { User } from "@prisma/client";
import classes from "./bodyProfile.module.css";
import StatusButton from "@/components/buttons/StatusButton/StatusButton";

const BodyProfile = ({ user }: { user: User }) => {
  const [userData, setUserData] = useState({
    name: user.username,
    email: user.email,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h1 className={classes.avatar__name}>{user.username}</h1>
      <form className={classes.form}>
        <input
          type="text"
          name="name"
          placeholder="Nombre de Usuario"
          value={userData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={userData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="currentPassword"
          autoComplete="new-password"
          placeholder="Contraseña Actual"
          value={userData.currentPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="newPassword"
          autoComplete="new-password"
          placeholder="Nueva Contraseña"
          value={userData.newPassword}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmNewPassword"
          autoComplete="new-password"
          placeholder="Confirmar Nueva Contraseña"
          value={userData.confirmNewPassword}
          onChange={handleInputChange}
        />
        <StatusButton
          currentStatus={"Actualizar Perfil"}
          pendingText={"Actualizando..."}
          className={`btn primary`}
        />
      </form>
    </>
  );
};

export default BodyProfile;
