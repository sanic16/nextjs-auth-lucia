import { useFormStatus } from "react-dom";
import "./statusButton.css";

const StatusButton = ({
  currentStatus,
  pendingText,
  className,
}: {
  currentStatus: string | JSX.Element;
  pendingText: string | JSX.Element;
  className?: string;
}) => {
  const status = useFormStatus();

  return (
    <button
      className={className ? `${className}` : "auth__btn"}
      type="submit"
      disabled={status.pending}
    >
      {status.pending ? pendingText : currentStatus}
    </button>
  );
};

export default StatusButton;
