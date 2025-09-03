import { eliminarPersonajeCuenta } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext";
import "./style.css";

const BorrarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("lightgreen");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const { getToken } = useAuth();
  const handleCancelar = () => {
    setVisible(false);
    setMensajeConfirmacion("");
  };
  const token = getToken();
  const handleConfirmar = async () => {
    try {
      const mensaje = await eliminarPersonajeCuenta(nombrePj, token);
      if (mensaje.state === 1) {
        setMensajeConfirmacion(mensaje.message);
        setMensajeColor("lightgreen");
      } else {
        setMensajeColor("orange");
        setMensajeConfirmacion(mensaje.message || "Ocurrió un error.");
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
      }, 3000);
    }
  };

  return (
    <>
      <div
        className={`borrar-modal-overlay-borrar-personaje ${
          visible ? "visible" : "hidden"
        }`}
      >
        <div className="borrar-modal-contenido-borrar-personaje">
          <h2 className="borrar-modal-texto-borrar-personaje">
            ¿Estás seguro de que querés borrar al personaje {nombrePj} de forma
            permanente?
          </h2>
          <div className="borrar-modal-botones-borrar-personaje">
            <button
              className="btn-confirmar-borrar-personaje"
              onClick={handleConfirmar}
            >
              Sí, borrar
            </button>
            <button
              className="btn-cancelar-borrar-personaje"
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

export { BorrarPersonaje };
