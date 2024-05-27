import { useFormStatus } from "react-dom";
import "./statusButton.css";

const StatusButton = () => {
  const status = useFormStatus();

  return (
    <button className="auth__btn">
      {status.pending ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
};

export default StatusButton;
