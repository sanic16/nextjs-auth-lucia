"use client";

import Link from "next/link";
import "./signIn.css";
import { useFormState } from "react-dom";
import { signin } from "@/actions/auth-actions";
import StatusButton from "../buttons/StatusButton/StatusButton";

const initialState: { errors: SignInErrors } = {
  errors: {},
};

const SignIn = () => {
  const [formState, formAction] = useFormState(signin, initialState);
  const hasErrors = Object.values(formState.errors).some(
    (error) => error !== null && error !== ""
  );

  return (
    <section className="login">
      <div className="container login__container">
        <h2>Iniciar Sesión</h2>
        <form className="form login__form" action={formAction}>
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
            type="email"
            placeholder="Correo Electrónico"
            name="email"
            autoFocus
          />
          <input type="password" placeholder="Contraseña" name="password" />
          <StatusButton
            currentStatus="Iniciar Sesión"
            pendingText="Iniciando Sesión..."
            className="btn primary"
          />
        </form>
        <small>
          ¿No tienes una cuenta?{" "}
          <Link href="/auth?mode=register">Registrarse</Link>
        </small>
      </div>
    </section>
  );
};

export default SignIn;
