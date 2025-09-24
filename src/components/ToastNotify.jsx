import { CheckCircle2, XCircle } from "lucide-react";
import { Toast } from "react-bootstrap";

const ToastNotify = ({ toast, onHide }) => {
  return (
    <Toast
      show={toast.type}
      bg={toast.variant}
      onClose={onHide}
      className="animation-fade"
    >
      <Toast.Header>
        {toast.type === "Success" ? <CheckCircle2 /> : <XCircle />}
        <strong className="me-auto ms-2">{toast.type}</strong>
        <small className="text-muted">{toast.id}</small>
      </Toast.Header>
      <Toast.Body className="text-white">{toast.message}</Toast.Body>
    </Toast>
  );
};

export default ToastNotify;
