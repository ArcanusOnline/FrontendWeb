import { quitarPersonajeCuenta } from "../../querys/scripts";
import "./style.css";

const QuitarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const handleCancelar = () => {
    setVisible(false);
  };

  const handleConfirmar = async () => {
    try {
      const mensaje = await quitarPersonajeCuenta(nombrePj);
      alert(mensaje);
    } catch (error) {
      console.error("Error al quitar personaje:", error);
      alert("Ocurrió un error al quitar el personaje.");
    } finally {
      setVisible(false);
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
          ¿Estás seguro que querés quitar al personaje{" "}
          <strong>{nombrePj}</strong> de esta cuenta?
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
  );
};

export { QuitarPersonaje };
