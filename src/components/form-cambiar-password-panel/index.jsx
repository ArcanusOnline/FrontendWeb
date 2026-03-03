import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { cambiarContra } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import { useAuth } from "../../useContext/useContext";
import "./style.css";

const CambiarPassPanel = () => {
  const navigate = useNavigate();
  const { token, logout, username } = useAuth();

  const [formData, setFormData] = useState({
    pin: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [mostrarPwActual, setMostrarPwActual] = useState(false);
  const [mostrarPwNueva, setMostrarPwNueva] = useState(false);
  const [mostrarPwNuevaConfirm, setMostrarPwNuevaConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await cambiarContra(
        username,
        formData.pin,
        formData.oldPassword,
        formData.newPassword,
        formData.email.toLowerCase(),
      );

      if (response === "OK") {
        setShowSuccessModal(true);
      } else {
        setError(response);
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">Cambiar Contraseña</h2>

          {/* PIN */}
          <div className="form-field">
            <label htmlFor="pin" className="form-label">
              PIN
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

          {/* Email */}
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

          {/* Contraseña Actual */}
          <div className="form-field">
            <label htmlFor="oldPassword" className="form-label">
              Contraseña actual
            </label>
            <div className="form-password-wrapper">
              <input
                id="oldPassword"
                type="password"
                name="oldPassword"
                className="form-input"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleInputChange("oldPassword", e.target.value)
                }
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPwActual((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPwActual ? "Ocultar Contraseña" : "Mostrar Contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPwActual ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Nueva Contraseña */}
          <div className="form-field">
            <label htmlFor="newPassword" className="form-label">
              Nueva contraseña
            </label>
            <div className="form-password-wrapper">
              <input
                id="newPassword"
                type="password"
                name="newPassword"
                className="form-input"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                disabled={isLoading}
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPwNueva((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPwNueva ? "Ocultar Contraseña" : "Mostrar Contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPwNueva ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirmar Nueva Contraseña */}
          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar nueva contraseña
            </label>
            <div className="form-password-wrapper">
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                disabled={isLoading}
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPwNuevaConfirm((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPwNuevaConfirm
                    ? "Ocultar Contraseña"
                    : "Mostrar Contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPwNuevaConfirm ? "🙈" : "👁️"}
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
            {isLoading ? "Cambiando..." : "Cambiar Contraseña"}
          </button>

          {/* Link para volver */}
          <div className="form-links">
            <Link to="/panel-de-usuario" className="form-link">
              ← Volver al panel
            </Link>
          </div>
        </form>
      </div>

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        type="success"
        title="¡Contraseña actualizada!"
        message="Tu contraseña ha sido cambiada correctamente. Por seguridad, debes iniciar sesión nuevamente."
        onClose={handleModalClose}
        buttonText="Iniciar sesión"
      />
    </>
  );
};

export { CambiarPassPanel };
