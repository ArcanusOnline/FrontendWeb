import { removerPersonajeMAO } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import "./style.css";

const QuitarPersonajeMAO = ({
  visible,
  setVisible,
  personajeNick,
  onSuccess,
}) => {
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const handleCancelar = () => {
    setVisible(false);
  };

  const handleConfirmar = async () => {
    setIsLoading(true);
    try {
      const res = await removerPersonajeMAO(personajeNick, token);

      setVisible(false);

      if (res.ok) {
        onSuccess();
        setModalConfig({
          type: "success",
          message: res.message,
        });
        setShowResultModal(true);
      } else {
        setModalConfig({
          type: "error",
          message: res.message || "Ocurrió un error al quitar el personaje.",
        });
        setShowResultModal(true);
      }
    } catch (error) {
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
      {visible && (
        <div className="modal-overlay-quitar-pj">
          <div className="modal-content-quitar-pj">
            <h2 className="modal-titulo-quitar-pj">
              ¿Estás seguro de quitar la publicacion?
            </h2>
            <p className="modal-descripcion-quitar-pj">
              El personaje <strong>{personajeNick}</strong> será removido del
              mercado
            </p>

            <div className="modal-botones-quitar-pj">
              <button
                className="btn-quitar-pj"
                onClick={handleConfirmar}
                disabled={isLoading}
              >
                {isLoading ? "Quitando..." : "Sí, quitar personaje"}
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
            ? "¡Personaje quitado!"
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

export { QuitarPersonajeMAO };
