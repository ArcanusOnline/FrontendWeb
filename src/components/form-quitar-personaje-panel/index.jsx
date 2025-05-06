import { quitarPersonajeCuenta } from "../../querys/scripts";
import "./style.css"


const QuitarPersonaje = ({ visible, setVisible, nombrePj }) => {
    const handleCancelar = () => {
      setVisible(false);
    };
  
    const handleConfirmar = async () => {
      try {
        const mensaje = await quitarPersonajeCuenta(nombrePj);
        alert(mensaje);
      } catch (error) {
        console.error("Error al eliminar personaje:", error);
        alert("Ocurrió un error al eliminar el personaje.");
      } finally {
        setVisible(false);
      }
    };
  
    return (
      <div className={`modal-overlay ${visible ? "show" : "hide"}`}>
        <div className="modal-contenido">
          <h2 className="modal-titulo">
            ¿Estás seguro que querés quitar al personaje{" "}
            <strong>{nombrePj}</strong> de esta cuenta?
          </h2>
          <div className="modal-botones">
            <button className="btn-quitar" onClick={handleConfirmar}>
              Sí, quitar
            </button>
            <button className="btn-cancelar" onClick={handleCancelar}>
              No, cancelar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export { QuitarPersonaje };