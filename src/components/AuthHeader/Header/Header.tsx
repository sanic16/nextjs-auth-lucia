"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Pacifico } from "next/font/google";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "@/actions/delete";

import "./header.css";
import StatusButton from "@/components/buttons/StatusButton/StatusButton";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="container nav__container">
        <Link href={"/"} className="nav__logo">
          <h1 className={`${pacifico.className}`}>
            Julius <span>Cars</span>
          </h1>
        </Link>
        <ul className={`${isOpen ? "show" : ""} nav__menu`}>
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
          <li>
            <Link href={"/profile"}>Perfil</Link>
          </li>
          <li>
            <Link href={"/create"}>Crear</Link>
          </li>
          <li>
            <form action={logout}>
              <StatusButton
                currentStatus="Cerrar Sesión"
                pendingText="Cerrando Sesión..."
              />
            </form>
          </li>
        </ul>
        <div className="nav__mobile">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="nav__mobile-btn"
          >
            {!isOpen ? <FaBars /> : <FaTimes />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
