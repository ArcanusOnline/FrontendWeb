import { bloquearPersonaje } from "../../querys/scripts";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import { useState } from "react";

import "./style.css";

const BloquearPersonaje = ({
  visible,
  setVisible,
  nombrePj,
  estadoBloq,
  onSuccess,
}) => {
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
      const data = await bloquearPersonaje({
        usuario: nombrePj,
        status: estadoBloq,
        token,
      });
      setVisible(false);
      if (data.error === 0) {
        onSuccess();
        setModalConfig({
          type: "success",
          message: data.message,
        });
        setShowResultModal(true);
      } else {
        setModalConfig({
          type: "warning",
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
    // NO redirigir, solo cerrar
  };

  return (
    <>
      {visible && (
        <div className="modal-overlay-quitar-pj">
          <div className="modal-content-quitar-pj">
            <h2 className="modal-titulo-quitar-pj">
              ¿Estás seguro de {estadoBloq ? "Bloquear" : "Desbloquear"} el
              personaje?
            </h2>
            <p className="modal-descripcion-quitar-pj">
              El personaje <strong>{nombrePj}</strong> será{" "}
              {estadoBloq ? "bloqueado" : "desbloqueado"}
            </p>

            <div className="modal-botones-quitar-pj">
              <button
                className="btn-quitar-pj"
                onClick={handleConfirmar}
                disabled={isLoading}
              >
                {isLoading
                  ? estadoBloq
                    ? "Bloqueando..."
                    : "Desbloqueando..."
                  : estadoBloq
                    ? "Sí, bloquear personaje"
                    : "Sí, desbloquear personaje"}
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
            ? estadoBloq
              ? "¡Personaje bloqueado!"
              : "¡Personaje Desbloqueado!"
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

export { BloquearPersonaje };
