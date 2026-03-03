import { rechazarPropuestaIntercambio } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import "./style.css";

const RechazarPropuesta = ({ visible, setVisible, propuesta, onSuccess }) => {
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
      const res = await rechazarPropuestaIntercambio(propuesta.id, token);
      setVisible(false);
      if (res.ok) {
        onSuccess();
        setModalConfig({
          type: "success",
          message: res.message || "¡Propuesta rechazada con éxito!",
        });
        setShowResultModal(true);
      } else {
        setModalConfig({
          type: "error",
          message:
            res?.message || "Ocurrió un error al aceptar el intercambio.",
        });
        setShowResultModal(true);
      }
    } catch (error) {
      console.error("Error al aceptar propuesta:", error);
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
        <div className="modal-overlay-aceptar-propuesta">
          <div className="modal-content-aceptar-propuesta">
            <h2 className="modal-titulo-aceptar-propuesta">
              Rechazar intercambio
            </h2>

            {propuesta && (
              <div className="modal-descripcion-aceptar-propuesta">
                <p>
                  ¿Queres rechazar la propuesta de intercambio del personaje
                  <span className="personaje-nombre">
                    {" "}
                    {propuesta.personajeSolicitado.NickB}
                  </span>{" "}
                  por el personaje
                  <span className="personaje-nombre">
                    {" "}
                    {propuesta.personajeOfrecido.NickB}
                  </span>
                  ?
                </p>
              </div>
            )}

            <div className="modal-botones-aceptar-propuesta">
              <button
                className="btn-aceptar-propuesta"
                onClick={handleConfirmar}
                disabled={isLoading}
              >
                {isLoading ? "Rechazando..." : "Sí, rechazar"}
              </button>
              <button
                className="btn-cancelar-aceptar-propuesta"
                onClick={handleCancelar}
                disabled={isLoading}
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de resultado */}
      <Modal
        isOpen={showResultModal}
        type={modalConfig.type}
        title={
          modalConfig.type === "success"
            ? "¡Intercambio Rechazado!"
            : modalConfig.type === "error"
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

export { RechazarPropuesta };
