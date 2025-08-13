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
  const [mostrarPw, setMostrarPw] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);

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
    <div
      className={`modal-overlay-agregar-personaje-panel ${
        visible ? "visible" : "hidden"
      }`}
    >
      <form
        className="modal-form-agregar-personaje-panel"
        onSubmit={handleSubmit}
      >
        <h2 className="modal-title-agregar-personaje-panel">
          Agregar Personaje
        </h2>

        <label>Nombre de personaje:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="modal-input-agregar-personaje-panel"
          required
        />
        <div className="form-agregar-personaje-panel-wrapped">
          <label>Contraseña del personaje:</label>
          <input
            type={mostrarPw ? "text" : "password"}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="modal-input-agregar-personaje-panel"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPw((prev) => !prev)}
            className="toggle-btn-form-agregar-personaje"
          >
            {mostrarPw ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="form-agregar-personaje-panel-wrapped">
          <label>PIN del personaje:</label>
          <input
            type={mostrarPin ? "text" : "password"}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="modal-input-agregar-personaje-panel"
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPin((prev) => !prev)}
            className="toggle-btn-form-agregar-personaje"
          >
            {mostrarPin ? "🙈" : "👁️"}
          </button>
        </div>

        <label>Email del personaje:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
          className="modal-input-agregar-personaje-panel"
          required
        />

        {mensajeConfirmacion && (
          <p
            className="modal-message-agregar-personaje-panel"
            style={{ color: mensajeColor }}
          >
            {mensajeConfirmacion}
          </p>
        )}

        <div className="modal-buttons-agregar-personaje-panel">
          <button type="submit" className="btn-agregar-agregar-personaje-panel">
            Agregar
          </button>
          <button
            type="button"
            className="btn-cancelar-agregar-personaje-panel"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export { AgregarPersonaje };
