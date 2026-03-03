import { eliminarPersonajeCuenta } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import "./style.css";

const BorrarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const { token } = useAuth();

  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelar = () => {
    setVisible(false);
  };

  const handleConfirmar = async () => {
    setIsLoading(true);
    try {
      const data = await eliminarPersonajeCuenta(nombrePj, token);
      setVisible(false);
      if (data.state === 1) {
        setModalConfig({
          type: "success",
          message: data.message,
        });
        setShowResultModal(true);
      } else {
        setModalConfig({
          type: "error",
          message: data.message || "Ocurrió un error al quitar el personaje.",
        });
        setShowResultModal(true);
      }
    } catch (error) {
      console.error("Error al quitar personaje:", error);
      setVisible(false);
      setModalConfig({
        type: "error",
        message: error?.message || "Error al conectarse con el servidor.",
      });
      setShowResultModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  return (
    <>
      {/* Modal de confirmación */}
      {visible && (
        <div className="modal-overlay-quitar-pj">
          <div className="modal-content-quitar-pj">
            <h2 className="modal-titulo-quitar-pj">
              ¿Estás seguro de borrar el personaje?
            </h2>
            <p className="modal-descripcion-quitar-pj">
              El personaje <strong>{nombrePj}</strong> será borrado de forma
              permanente. Se te enviara un mail para confirmar la operacion.
            </p>

            <div className="modal-botones-quitar-pj">
              <button
                className="btn-quitar-pj"
                onClick={handleConfirmar}
                disabled={isLoading}
              >
                {isLoading ? "Procesando..." : "Sí, borrar personaje"}
              </button>
              <button
                className="btn-cancelar-quitar-pj"
                onClick={handleCancelar}
                disabled={isLoading}
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        isOpen={showResultModal}
        type={modalConfig.type}
        title={
          modalConfig.type === "success"
            ? "¡Operacion Exitosa!"
            : modalConfig.type === "warning"
              ? "Advertencia"
              : "Error"
        }
        message={modalConfig.message}
        onClose={handleCloseResultModal}
        buttonText="Entendido"
      />
    </>
  );
};

export { BorrarPersonaje };
