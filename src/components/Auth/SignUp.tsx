"use client";
import Link from "next/link";
import "./signUp.css";

import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions";

const initialState: { errors: SignUpErrors } = {
  errors: {},
};

const SignUp = () => {
  const [formState, formAction] = useFormState(signup, initialState);
  const hasErrors = Object.values(formState.errors).some(
    (error) => error !== null && error !== ""
  );

  return (
    <section className="register">
      <div className="container register__container">
        <h2>Registrarse</h2>
        <form action={formAction} className="form register__form">
          {hasErrors && (
            <p className="form__error-message">
              {Object.values(formState.errors).map((error) => (
                <>
                  {error}
                  {", "}
                </>
              ))}
            </p>
          )}
          <input
            type="text"
            placeholder="Nombre de Usuario"
            name="username"
            autoFocus
          />
          <input type="email" placeholder="Correo Electrónico" name="email" />
          <input type="password" placeholder="Contraseña" name="password" />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            name="password2"
          />
          <button type="submit" className="btn primary">
            Registrarse
          </button>
        </form>
        <small>
          ¿Ya tienes una cuenta?{" "}
          <Link href="/auth?mode=login">Iniciar Sesión</Link>
        </small>
      </div>
    </section>
  );
};

export default SignUp;
