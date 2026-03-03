import { useState } from "react";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { PanelPersonajeDetalle } from "../../components";
import { sendOfertaIntercambio } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import "./style.css";
import { useAuth } from "../../useContext/useContext";

const PanelIntercambioPersonaje = ({
  personajePublicado,
  misPersonajes,
  onClose,
}) => {
  const [pjOfrecido, setPjOfrecido] = useState(null);
  const [pjSeleccionado, setPjSeleccionado] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  async function sendOferta(nombreSolicitado, nombreOfrecido, token) {
    setIsLoading(true);

    try {
      const res = await sendOfertaIntercambio(
        nombreSolicitado,
        nombreOfrecido,
        token,
      );

      if (res.ok) {
        setModalConfig({
          type: "success",
          message: res.message || "La oferta se envió correctamente 👍",
        });
        setShowResultModal(true);
        // Limpiar selección
        setPjOfrecido(null);
      } else {
        setModalConfig({
          type: "warning",
          message: res.message || "No se pudo enviar la oferta",
        });
        setShowResultModal(true);
      }
    } catch (err) {
      console.error("Error al enviar oferta:", err);
      setModalConfig({
        type: "error",
        message: "Ocurrió un error inesperado",
      });
      setShowResultModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    onClose();
  };

  return (
    <>
      <div className="panel-overlay">
        <div className="panel-intercambio">
          <h2>Intercambio de personaje</h2>

          <div className="panel-columnas">
            <div className="panel-exchange-container">
              <h3>Personaje solicitado</h3>
              <div className="panel-box">
                <img
                  className="personaje-head-lista-panel-pjs"
                  src={`/heads/${personajePublicado.Head}.png`}
                  alt=""
                />
                <p>
                  <b>{personajePublicado.Nombre}</b>
                </p>

                <p>
                  {personajePublicado.Clase} {personajePublicado.Raza}
                </p>
                <p>Nivel {personajePublicado.Nivel}</p>
                <p>
                  Vida: {personajePublicado.Vida} [
                  {(() => {
                    let promedio = obtenerPromedio(
                      personajePublicado.Clase,
                      personajePublicado.Raza,
                    );
                    let vidaPromedioReal =
                      promedio * (personajePublicado.Nivel - 1) + 20;

                    const upsPj = personajePublicado.Vida - vidaPromedioReal;
                    return upsPj > 0 ? (
                      <span style={{ color: "lightgreen" }}>+{upsPj}</span>
                    ) : upsPj === 0 ? (
                      <span style={{ color: "white" }}>{upsPj}</span>
                    ) : (
                      <span style={{ color: "red" }}>{upsPj}</span>
                    );
                  })()}
                  ]
                </p>
                <button
                  className="btn-link-lista-panel-pjs"
                  onClick={() => setPjSeleccionado(personajePublicado.Nombre)}
                >
                  Ver estadísticas
                </button>
              </div>
            </div>

            <div className="panel-exchange-container">
              <div className="panel-box-header">
                <h3>Tu personaje</h3>

                <select
                  className="select-inline"
                  value={pjOfrecido?.Nombre || ""}
                  onChange={(e) => {
                    setPjOfrecido(
                      misPersonajes.find((pj) => pj.Nombre === e.target.value),
                    );
                  }}
                  disabled={isLoading}
                >
                  <option value="">Elegir</option>
                  {misPersonajes.map((pj) => (
                    <option key={pj.Nombre} value={pj.Nombre}>
                      {pj.Nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="panel-box">
                {pjOfrecido ? (
                  <div className="preview-pj">
                    <img
                      className="personaje-head-lista-panel-pjs"
                      src={`/heads/${pjOfrecido.Head}.png`}
                      alt=""
                    />
                    <p>
                      <b>{pjOfrecido.Nombre}</b>
                    </p>
                    <p>
                      {pjOfrecido.Clase} {pjOfrecido.Raza}
                    </p>
                    <p>Nivel {pjOfrecido.Nivel}</p>
                    <p>
                      Vida: {pjOfrecido.Vida} [
                      {(() => {
                        let promedio = obtenerPromedio(
                          pjOfrecido.Clase,
                          pjOfrecido.Raza,
                        );
                        let vidaPromedioReal =
                          promedio * (pjOfrecido.Nivel - 1) + 20;

                        const upsPj = pjOfrecido.Vida - vidaPromedioReal;
                        return upsPj > 0 ? (
                          <span style={{ color: "lightgreen" }}>+{upsPj}</span>
                        ) : upsPj === 0 ? (
                          <span style={{ color: "white" }}>{upsPj}</span>
                        ) : (
                          <span style={{ color: "red" }}>{upsPj}</span>
                        );
                      })()}
                      ]
                    </p>
                    <button
                      className="btn-link-lista-panel-pjs"
                      onClick={() => setPjSeleccionado(pjOfrecido.Nombre)}
                    >
                      Ver estadísticas
                    </button>
                  </div>
                ) : (
                  <p style={{ opacity: 0.5 }}>Seleccioná un personaje</p>
                )}
              </div>
            </div>
          </div>

          <div className="panel-actions">
            <button
              className="btn-cancelar-intercambio"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              disabled={!pjOfrecido || isLoading}
              onClick={() => {
                sendOferta(personajePublicado.Nombre, pjOfrecido.Nombre, token);
              }}
              className="btn-enviar-oferta-intercambio"
            >
              {isLoading ? "Enviando..." : "Enviar oferta"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal reutilizable */}
      <Modal
        isOpen={showResultModal}
        type={modalConfig.type}
        title={
          modalConfig.type === "success"
            ? "¡Oferta enviada!"
            : modalConfig.type === "warning"
              ? "Advertencia"
              : "Error"
        }
        message={modalConfig.message}
        onClose={handleCloseResultModal}
        buttonText="Entendido"
      />

      {pjSeleccionado && (
        <PanelPersonajeDetalle
          namePersonaje={pjSeleccionado}
          onClose={() => setPjSeleccionado(null)}
        />
      )}
    </>
  );
};

export { PanelIntercambioPersonaje };
