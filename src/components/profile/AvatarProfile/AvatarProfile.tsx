"use client";

import Image from "next/image";
import React, { useState } from "react";
import classes from "./avatarProfile.module.css";
import type { User } from "@prisma/client";
import { defaultAvatar } from "@/data/contants";
import { FaCheck, FaEdit } from "react-icons/fa";
import StatusButton from "@/components/buttons/StatusButton/StatusButton";
import { BsThreeDots } from "react-icons/bs";
import { uploadUserAvatar } from "@/actions/user-actions";
import defaultAvatarImage from "@/../public/avatar.png";

const AvatarProfile = ({ user }: { user: User }) => {
  const [avatarFile, setAvatarFile] = useState<File>();
  const [avatar, setAvatar] = useState<string>(user.avatar || defaultAvatar);
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      setAvatarFile(file[0]);
      setAvatar(URL.createObjectURL(file[0]));
    }
  };
  return (
    <div className={classes.avatar__info}>
      <label htmlFor="avatar">
        <div className={classes.avatar}>
          <Image src={avatar} alt="" fill />
        </div>
      </label>
      <form
        className={classes.avatar__form}
        action={uploadUserAvatar.bind(null, user.id)}
      >
        <input
          type="file"
          id="avatar"
          onChange={handleAvatarChange}
          name="avatar"
        />
        <label htmlFor="avatar">
          <FaEdit />
        </label>
        {avatarFile && (
          <StatusButton
            currentStatus={<FaCheck />}
            pendingText={<BsThreeDots />}
            className={classes.avatar__btn}
          />
        )}
      </form>
    </div>
  );
};

export default AvatarProfile;
