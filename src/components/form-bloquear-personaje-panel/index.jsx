import { bloquearPersonaje } from "../../querys/scripts";
import { useState } from "react";
import { useRedireccionar } from "../../assets/functions";
import "./style.css";

const BloquearPersonaje = ({ visible, setVisible, nombrePj, estadoBloq }) => {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("lightgreen");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const redireccionar = useRedireccionar();
  const handleCancelar = () => {
    setVisible(false);
    setMensajeConfirmacion("");
  };

  const handleConfirmar = async () => {
    let shouldRedirect = false;
    try {
      const data = await bloquearPersonaje({
        usuario: nombrePj,
        status: estadoBloq,
      });
      if (data.error === 0) {
        setMensajeConfirmacion(data.message);
        setMensajeColor("lightgreen");
        shouldRedirect = true;
      } else {
        setMensajeColor("orange");
        setMensajeConfirmacion(data?.message || "Ocurrió un error.");
      }
    } catch (error) {
      setMensajeConfirmacion(
        error?.message || "Error al conectarse con el servidor"
      );
      setMensajeColor("red");
    } finally {
      setVisible(false);
      setMostrarMensaje(true);

      setTimeout(() => {
        setMostrarMensaje(false);
        setMensajeConfirmacion("");
        if (shouldRedirect) {
          redireccionar("/panel-de-usuario");
        }
      }, 3000);
    }
  };

  return (
    <>
      <div
        className={`bloquear-modal-overlay-bloquear-personaje ${
          visible ? "visible" : "hidden"
        }`}
      >
        <div className="bloquear-modal-contenido-bloquear-personaje">
          <h2 className="bloquear-modal-texto-bloquear-personaje">
            ¿Estás seguro de que querés{" "}
            {estadoBloq == 1 ? "bloquear" : "desbloquear"} al personaje{" "}
            {nombrePj}?
          </h2>
          <div className="bloquear-modal-botones-bloquear-personaje">
            <button
              className="btn-confirmar-bloquear-personaje"
              onClick={handleConfirmar}
            >
              Sí, {estadoBloq == 1 ? "bloquear" : "desbloquear"}
            </button>
            <button
              className="btn-cancelar-bloquear-personaje"
              onClick={handleCancelar}
            >
              No, cancelar
            </button>
          </div>
        </div>
      </div>
      {mostrarMensaje && (
        <div className="modal-overlay-mensaje-global">
          <div
            className="modal-mensaje-contenido"
            style={{ borderColor: mensajeColor }}
          >
            <p style={{ color: mensajeColor }}>{mensajeConfirmacion}</p>
          </div>
        </div>
      )}
    </>
  );
};

export { BloquearPersonaje };
