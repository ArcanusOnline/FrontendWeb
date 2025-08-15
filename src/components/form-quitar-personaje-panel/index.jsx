import { quitarPersonajeCuenta } from "../../querys/scripts";
import { useState } from "react";
import "./style.css";

const QuitarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("lightgreen");
  const handleCancelar = () => {
    setVisible(false);
    setMensajeConfirmacion("");
  };

  const handleConfirmar = async () => {
    try {
      const mensaje = await quitarPersonajeCuenta(nombrePj);
      if (mensaje === "Se removió correctamente el personaje") {
        setMensajeConfirmacion(mensaje);
        setMensajeColor("lightgreen");
      } else {
        setMensajeColor("orange");
        setMensajeConfirmacion(mensaje || "Ocurrió un error.");
      }
    } catch (error) {
      setMensajeConfirmacion("Error");
      setMensajeColor("red");
    } finally {
      setTimeout(() => {
        setVisible(false);
        setMensajeConfirmacion("");
      }, 3000);
    }
  };

  return (
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
        {mensajeConfirmacion && (
          <div
            className="modal-overlay-mensaje"
            style={{ border: `2px solid ${mensajeColor}` }}
          >
            <p style={{ color: mensajeColor }}>{String(mensajeConfirmacion)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export { QuitarPersonaje };
