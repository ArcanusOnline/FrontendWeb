import { Link, Outlet, useParams } from "react-router";
import { useState } from "react";
import { recuperarPersonaje } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import "./style.css";

const RecuperarPersonaje = () => {
  const { token } = useParams();

  const [formData, setFormData] = useState({
    nick: "",
    email: "",
    pin: "",
  });

  const [error, setError] = useState("");
  const [modal, setModal] = useState(null);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await recuperarPersonaje(formData);

      if (response.estado === 2 || response.estado === 3) {
        setModal({
          type: "error",
          title: "Error en la recuperación",
          message:
            response.message || "Ocurrió un error al recuperar el personaje",
        });
      } else {
        setModal({
          type: "success",
          title: "¡Recuperación exitosa!",
          message:
            response.message ||
            "Se ha enviado un correo a tu email para recuperar el personaje",
        });
      }
    } catch (err) {
      setModal({
        type: "error",
        title: "Error",
        message: "Error al recuperar el personaje. Intenta nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Si hay token, mostrar nested route
  if (token) return <Outlet />;

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">Recuperar Personaje</h2>

          {/* Campo Nick */}
          <div className="form-field">
            <label htmlFor="nick" className="form-label">
              Nick del personaje
            </label>
            <input
              id="nick"
              type="text"
              name="nick"
              className="form-input"
              value={formData.nick}
              onChange={(e) => handleInputChange("nick", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Campo Email */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email
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

          {/* Campo PIN */}
          <div className="form-field">
            <label htmlFor="pin" className="form-label">
              PIN de seguridad
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

          {/* Mensaje de error */}
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          {/* Botón submit */}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Recuperando..." : "Recuperar Personaje"}
          </button>

          {/* Link a recuperar cuenta */}
          <div className="form-links">
            <Link to="/recuperar-cuenta" className="form-link">
              ¿Quieres recuperar tu Cuenta?
            </Link>
          </div>
        </form>
      </div>

      {/* Modal de respuesta */}
      <Modal
        isOpen={!!modal}
        type={modal?.type}
        title={modal?.title}
        message={modal?.message}
        onClose={() => setModal(null)}
        buttonText={modal?.type === "success" ? "Entendido" : "Cerrar"}
      />
    </>
  );
};

export { RecuperarPersonaje };
