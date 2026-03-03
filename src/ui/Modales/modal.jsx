import "./Modal.css";

const Modal = ({
  isOpen,
  type = "success", // 'success' | 'error' | 'info' | 'warning'
  title,
  message,
  onClose,
  buttonText,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
        return "ℹ";
      default:
        return "✓";
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case "success":
        return "¡Éxito!";
      case "error":
        return "Error";
      case "warning":
        return "Advertencia";
      case "info":
        return "Información";
      default:
        return "Mensaje";
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Icono */}
        <div className={`modal-icon ${type}`}>{getIcon()}</div>

        {/* Título */}
        <h3 className={`modal-title ${type}`}>{title || getDefaultTitle()}</h3>

        {/* Mensaje */}
        <p className="modal-message">{message}</p>

        {/* Botón */}
        <button className={`modal-button ${type}`} onClick={handleClose}>
          {buttonText || "Cerrar"}
        </button>
      </div>
    </div>
  );
};

export { Modal };
