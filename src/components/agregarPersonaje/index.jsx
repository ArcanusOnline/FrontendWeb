import { useState } from "react";
import { agregarPersonajeCuenta } from "../../querys/scripts";

const AgregarPersonaje = ({ visible, setVisible, nombreCuenta }) => {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState("");
  const [mensajeColor, setMensajeColor] = useState("lightgreen");

  const handleCancelar = () => {
    setVisible(false);
    setMensajeConfirmacion("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!nombre || !contrasena || !pin || !email) {
        setMensajeConfirmacion("Todos los campos son obligatorios.");
        setMensajeColor("orange");
        return;
      }

      const mensaje = await agregarPersonajeCuenta({
        nombre,
        contrasena,
        pin,
        email,
        nombreCuenta,
      });

      if (mensaje === "OK") {
        setMensajeConfirmacion(
          "Se ha enviado un email a la casilla de correo del personaje, para finalizar con el proceso."
        );
        setMensajeColor("lightgreen");

        // Limpia inputs
        setNombre("");
        setContrasena("");
        setPin("");
        setEmail("");

        // Cierra modal luego de 3 segundos
        setTimeout(() => {
          setVisible(false);
          setMensajeConfirmacion("");
        }, 3000);
      } else {
        // Si no es "OK", asumimos que puede ser un mensaje de error
        setMensajeColor("orange");
        setMensajeConfirmacion(mensaje?.message || "Ocurrió un error.");
      }
    } catch (error) {
      console.error("Error al agregar personaje:", error);
      setMensajeColor("orange");
      setMensajeConfirmacion(error?.message || "Ocurrió un error inesperado.");
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
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#1e1e1e",
          borderRadius: "12px",
          padding: "30px",
          border: "2px solid #ffd700",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Agregar Personaje
        </h2>

        <label>Nombre de personaje:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Contraseña del personaje:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          style={inputStyle}
          required
        />

        <label>PIN del personaje:</label>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          style={inputStyle}
          required
        />

        <label>Email del personaje:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        {mensajeConfirmacion && (
          <p
            style={{
              color: mensajeColor,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "-5px",
            }}
          >
            {mensajeConfirmacion}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <button
            type="button"
            style={{
              backgroundColor: "#ffd700",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleCancelar}
          >
            Cancelar
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#4caf50",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

export { AgregarPersonaje };
