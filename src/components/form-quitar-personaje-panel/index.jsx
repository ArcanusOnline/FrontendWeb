import { quitarPersonajeCuenta } from "../../querys/scripts";
import { useState } from "react";
import { useRedireccionar } from "../../assets/functions";
import { useAuth } from "../../useContext/useContext";
import "./style.css";

const QuitarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("lightgreen");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const { getToken } = useAuth();
  const token = getToken();
  const redireccionar = useRedireccionar();
  const handleCancelar = () => {
    setVisible(false);
    setMensajeConfirmacion("");
  };

  const handleConfirmar = async () => {
    let shouldRedirect = false;
    try {
      const data = await quitarPersonajeCuenta(nombrePj, token);
      if (data.state === 1) {
        setMensajeConfirmacion(data.message);
        setMensajeColor("lightgreen");
        // redirect si quitamos pj
        shouldRedirect = true;
      } else {
        setMensajeColor("orange");
        setMensajeConfirmacion(data.message || "Ocurrió un error.");
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
        className={`modal-overlay-quitar-pj-panel ${
          visible ? "visible" : "hidden"
        }`}
      >
        <div className="modal-contenido-quitar-pj-panel">
          <h2 className="modal-titulo-quitar-pj-panel">
            ¿Estás seguro que querés quitar al personaje {nombrePj} de esta
            cuenta?
          </h2>
          <div className="modal-botones-quitar-pj-panel">
            <button
              className="btn-quitar-quitar-pj-panel"
              onClick={handleConfirmar}
            >
              Sí, quitar
            </button>
            <button
              className="btn-cancelar-quitar-pj-panel"
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

export { QuitarPersonaje };
