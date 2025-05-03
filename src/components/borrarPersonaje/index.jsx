import { eliminarPersonajeCuenta } from "../../querys/scripts";

const BorrarPersonaje = ({ visible, setVisible, nombrePj }) => {
  const handleCancelar = () => {
    setVisible(false);
    return;
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
    <div
      style={{
        display: visible ? "flex" : "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "30px",
          border: "2px solid #ffd700",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          ¿Estás seguro de que querés borrar al personaje{" "}
          <strong>{nombrePj}</strong> de forma permanente?
        </h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button
            style={{
              backgroundColor: "#ff4d4f",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleConfirmar}
          >
            Sí, quitar
          </button>
          <button
            style={{
              backgroundColor: "#4caf50",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleCancelar}
          >
            No, cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export { BorrarPersonaje };
