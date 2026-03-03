import { useState } from "react";
import { aceptarPropuestaIntercambio } from "../../querys/scripts";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import "./style.css";

const AceptarPropuesta = ({ visible, setVisible, propuesta }) => {
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
      const res = await aceptarPropuestaIntercambio(
        propuesta.id,
        token,
        propuesta.personajeSolicitado.NickB,
        propuesta.personajeOfrecido.NickB,
      );
      // Cerrar modal de confirmación
      setVisible(false);

      if (res.ok) {
        // Éxito
        setModalConfig({
          type: "success",
          message: res.message || "¡Intercambio aceptado con éxito!",
        });
        setShowResultModal(true);
      } else {
        // Error del servidor
        setModalConfig({
          type: "warning",
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
              Aceptar intercambio
            </h2>

            {propuesta && (
              <div className="modal-descripcion-aceptar-propuesta">
                <p>
                  ¿Queres aceptar la propuesta de intercambio del personaje
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
                {isLoading ? "Aceptando..." : "Sí, aceptar"}
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
            ? "¡Intercambio aceptado!"
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

export { AceptarPropuesta };
