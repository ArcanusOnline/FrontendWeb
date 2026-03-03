import { useState } from "react";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { PanelPersonajeDetalle } from "..";
import { Modal } from "../../ui/Modales";
import { comprarPersonaje } from "../../querys/scripts";
import "./style.css";
import { useAuth } from "../../useContext/useContext";

const PanelCompraPersonaje = ({
  personajePublicado,
  misPersonajes,
  onClose,
}) => {
  const [pjComprador, setPjComprador] = useState(null);
  const [pjSeleccionado, setPjSeleccionado] = useState(null);
  const [modal, setModal] = useState(null);
  const [comprando, setComprando] = useState(false);
  const { token } = useAuth();

  const cerrarSoloModal = () => {
    setModal(null);
  };

  const cerrarTodo = () => {
    setModal(null);
    onClose();
  };
  async function confirmarCompra() {
    if (!pjComprador) return;

    try {
      setComprando(true);
      const res = await comprarPersonaje(
        personajePublicado.Nombre,
        pjComprador.NickB,
        personajePublicado.Precio,
        token,
      );
      setModal({
        type: "success",
        message: "Compra realizada con éxito. Revisa tu email.",
      });
    } catch (err) {
      setModal({
        type: "error",
        message: err.message || "Ocurrió un error inesperado",
      });
    } finally {
      setComprando(false);
    }
  }

  return (
    <div className="panel-overlay">
      <div className="panel-intercambio panel-compra">
        <h2>Compra de personaje</h2>

        {/* Sección superior: Selección del personaje comprador */}
        <div className="panel-compra-selector">
          <div className="panel-box-header">
            <h3>Selecciona tu personaje</h3>
            <select
              className="select-inline"
              onChange={(e) => {
                setPjComprador(
                  misPersonajes.find((pj) => pj.NickB === e.target.value),
                );
              }}
              value={pjComprador?.NickB || ""}
            >
              <option value="">Elegir personaje</option>
              {misPersonajes.map((pj) => (
                <option key={pj.NickB} value={pj.NickB}>
                  {pj.NickB}
                </option>
              ))}
            </select>
          </div>

          <div className="panel-box panel-info-compra">
            {pjComprador ? (
              <div className="info-personaje-comprador">
                <img
                  className="personaje-head-lista-panel-pjs"
                  src={`/heads/${pjComprador.HeadB}.png`}
                  alt=""
                />
                <div className="datos-comprador">
                  <p>
                    <b>{pjComprador.NickB}</b>
                  </p>
                  <p>
                    {pjComprador.ClaseB} {pjComprador.RazaB} - Nivel{" "}
                    {pjComprador.ELVB}
                  </p>
                  <p className="oro-boveda">
                    💰 Oro en bóveda:{" "}
                    <span className="cantidad-oro">{pjComprador.BANCOB}</span>
                  </p>
                  {pjComprador.BANCOB < personajePublicado.Precio && (
                    <p className="advertencia-oro">
                      ⚠️ Oro insuficiente (necesitas {personajePublicado.Precio}
                      )
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="placeholder-comprador">
                <p className="texto-info">
                  ℹ️ Selecciona un personaje con al menos{" "}
                  <span className="precio-requerido">
                    {personajePublicado.Precio} oro
                  </span>{" "}
                  en su bóveda para realizar la compra.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Separador visual */}
        <div className="separador-compra">
          <span>Personaje a comprar</span>
        </div>

        {/* Sección inferior: Personaje en venta */}
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
          <p className="precio-personaje">
            💰 Precio:{" "}
            <span className="valor-precio">
              {personajePublicado.Precio} oro
            </span>
          </p>
          <button
            className="btn-link-lista-panel-pjs"
            onClick={() => setPjSeleccionado(personajePublicado.Nombre)}
          >
            Ver estadísticas
          </button>
        </div>

        {/* Botones de acción */}
        <div className="panel-actions">
          <button
            className="btn-link-lista-panel-pjs danger"
            onClick={onClose}
            disabled={comprando}
          >
            Cancelar
          </button>
          <button
            disabled={
              !pjComprador ||
              comprando ||
              (pjComprador && pjComprador.Oro < personajePublicado.Precio)
            }
            onClick={confirmarCompra}
            className="btn-confirmar"
          >
            {comprando
              ? "Procesando..."
              : `Comprar por ${personajePublicado.Precio} oro`}
          </button>
        </div>
      </div>

      <Modal
        isOpen={!!modal}
        type={modal?.type}
        title={modal?.title}
        message={modal?.message}
        onClose={modal?.type === "success" ? cerrarTodo : cerrarSoloModal}
      />

      {/* Panel de detalle del personaje */}
      {pjSeleccionado && (
        <PanelPersonajeDetalle
          namePersonaje={pjSeleccionado}
          onClose={() => setPjSeleccionado(null)}
        />
      )}
    </div>
  );
};

export { PanelCompraPersonaje };
