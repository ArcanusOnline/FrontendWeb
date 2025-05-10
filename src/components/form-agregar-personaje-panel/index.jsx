import { useState } from "react";
import { agregarPersonajeCuenta } from "../../querys/scripts";
import "./style.css";

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

    if (!nombre || !contrasena || !pin || !email) {
      setMensajeConfirmacion("Todos los campos son obligatorios.");
      setMensajeColor("orange");
      return;
    }

    try {
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

        setNombre("");
        setContrasena("");
        setPin("");
        setEmail("");

        setTimeout(() => {
          setVisible(false);
          setMensajeConfirmacion("");
        }, 3000);
      } else {
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
    <div className={`modal-overlay ${visible ? "visible" : "hidden"}`}>
      <form className="modal-form" onSubmit={handleSubmit}>
        <h2 className="modal-title">Agregar Personaje</h2>

        <label>Nombre de personaje:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input"
          required
        />

        <label>Contraseña del personaje:</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="modal-input"
          required
        />

        <label>PIN del personaje:</label>
        <input
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="modal-input"
          required
        />

        <label>Email del personaje:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input"
          required
        />

        {mensajeConfirmacion && (
          <p className="modal-message" style={{ color: mensajeColor }}>
            {mensajeConfirmacion}
          </p>
        )}

        <div className="modal-buttons">
          <button
            type="button"
            className="btn-cancelar"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-agregar">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export { AgregarPersonaje };
