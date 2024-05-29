import React from "react";
import classes from "./footer.module.css";
import { categories } from "@/data/categories";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={`container ${classes.footer__container}`}>
        <div className={classes.footer__categories}>
          {categories.map((category) => (
            <Link
              href={`/posts/categories/${category.id}`}
              key={category.id}
              className={`btn sm category`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className={classes.copyright}>
          <p>
            &copy; {new Date().getFullYear()} <span>El blog</span>. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
