import { eliminarPersonajeCuenta } from "../../querys/scripts";
import "./style.css"



const BorrarPersonaje = ({ visible, setVisible, nombrePj }) => {
    const handleCancelar = () => {
      setVisible(false);
    };
  
    const handleConfirmar = async () => {
      try {
        const mensaje = await eliminarPersonajeCuenta(nombrePj);
        alert(mensaje);
      } catch (error) {
        console.error("Error al eliminar personaje:", error);
        alert("Ocurrió un error al eliminar el personaje.");
      } finally {
        setVisible(false);
      }
    };
  
    return (
      <div className={`borrar-modal-overlay ${visible ? "visible" : "hidden"}`}>
        <div className="borrar-modal-contenido">
          <h2 className="borrar-modal-texto">
            ¿Estás seguro de que querés borrar al personaje{" "}
            <strong>{nombrePj}</strong> de forma permanente?
          </h2>
          <div className="borrar-modal-botones">
            <button className="btn-confirmar" onClick={handleConfirmar}>
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
  
  export { BorrarPersonaje };