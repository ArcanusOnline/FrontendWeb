import { useState } from "react";
import { agregarPersonajeCuenta } from "../../querys/scripts";
import { useAuth } from "../../useContext/useContext";
import { Modal } from "../../ui/Modales";
import "./style.css";

const AgregarPersonaje = ({ visible, setVisible, nombreCuenta }) => {
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    contrasena: "",
    pin: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleCancelar = () => {
    setVisible(false);
    setFormData({
      nombre: "",
      contrasena: "",
      pin: "",
      email: "",
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.nombre ||
      !formData.contrasena ||
      !formData.pin ||
      !formData.email
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setIsLoading(true);

    try {
      const mensaje = await agregarPersonajeCuenta({
        nombre: formData.nombre,
        contrasena: formData.contrasena,
        pin: formData.pin,
        email: formData.email,
        nombreCuenta,
        token,
      });

      if (mensaje === "OK") {
        setModalConfig({
          type: "success",
          message:
            "Se ha enviado un email a la casilla de correo del personaje para finalizar el proceso.",
        });
        setShowModal(true);
        setVisible(false);
        setFormData({
          nombre: "",
          contrasena: "",
          pin: "",
          email: "",
        });
      } else {
        setError(
          mensaje?.message || "Ocurrió un error al agregar el personaje.",
        );
      }
    } catch (err) {
      console.error("Error al agregar personaje:", err);
      setError(err?.message || "Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Formulario - solo se muestra si visible es true */}
      {visible && (
        <div className="modal-overlay-agregar-pj">
          <div className="modal-content-agregar-pj">
            <form onSubmit={handleSubmit} className="form-wrapper">
              <h2 className="form-title">Agregar Personaje</h2>

              {/* Nombre del personaje */}
              <div className="form-field">
                <label htmlFor="nombre" className="form-label">
                  Nombre del personaje
                </label>
                <input
                  id="nombre"
                  type="text"
                  name="nombre"
                  className="form-input"
                  value={formData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Contraseña del personaje */}
              <div className="form-field">
                <label htmlFor="contrasena" className="form-label">
                  Contraseña del personaje
                </label>
                <div className="form-password-wrapper">
                  <input
                    id="contrasena"
                    type={mostrarPassword ? "text" : "password"}
                    name="contrasena"
                    className="form-input"
                    value={formData.contrasena}
                    onChange={(e) =>
                      handleInputChange("contrasena", e.target.value)
                    }
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword((prev) => !prev)}
                    className="form-toggle-password"
                    aria-label={
                      mostrarPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"
                    }
                    disabled={isLoading}
                  >
                    {mostrarPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* PIN del personaje */}
              <div className="form-field">
                <label htmlFor="pin" className="form-label">
                  PIN del personaje
                </label>
                <div className="form-password-wrapper">
                  <input
                    id="pin"
                    type={mostrarPin ? "text" : "password"}
                    name="pin"
                    className="form-input"
                    value={formData.pin}
                    onChange={(e) => handleInputChange("pin", e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPin((prev) => !prev)}
                    className="form-toggle-password"
                    aria-label={mostrarPin ? "Ocultar PIN" : "Mostrar PIN"}
                    disabled={isLoading}
                  >
                    {mostrarPin ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Email del personaje */}
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email del personaje
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value.toLowerCase())
                  }
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="form-error" role="alert">
                  {error}
                </div>
              )}

              {/* Botones */}
              <div className="form-buttons-agregar-pj">
                <button
                  type="submit"
                  className="btn-agregar-pj"
                  disabled={isLoading}
                >
                  {isLoading ? "Agregando..." : "Agregar Personaje"}
                </button>
                <button
                  type="button"
                  className="btn-cancelar-pj"
                  onClick={handleCancelar}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Modal
        isOpen={showModal}
        type={modalConfig.type}
        title={modalConfig.type === "success" ? "¡Email enviado!" : "Error"}
        message={modalConfig.message}
        onClose={() => setShowModal(false)}
        buttonText="Entendido"
      />
    </>
  );
};

export { AgregarPersonaje };
