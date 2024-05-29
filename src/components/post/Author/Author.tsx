import Link from "next/link";
import type { User } from "@prisma/client";
import "./author.css";
import { defaultAvatar } from "@/data/contants";
import prisma from "@/lib/prisma";
import Image from "next/image";

const Author = async ({
  authorId,
  createdAt,
}: {
  authorId: string;
  createdAt: Date;
}) => {
  const creator = await prisma.user.findUnique({
    where: {
      id: authorId,
    },
  });
  const reducedUsername =
    creator!.username.length > 10
      ? creator!.username.slice(0, 10) + "..."
      : creator!.username;
  return (
    <div className="author">
      <Link href={`/posts/authors/${creator!.id}`}>
        <div className="author__thumbnail">
          <Image
            src={creator!.avatar || defaultAvatar}
            alt={creator!.username}
            fill
          />
        </div>
        <div className="author__info">
          <small>{reducedUsername}</small>
          <small>
            {new Date(createdAt).toLocaleDateString("es-GT", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </small>
        </div>
      </Link>
    </div>
  );
};

export default Author;
