import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { cambiarEmail } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import "./style.css";
import { useAuth } from "../../useContext/useContext";

const CambiarEmailPanel = () => {
  const navigate = useNavigate();
  const { token, logout, username } = useAuth();

  const [formData, setFormData] = useState({
    pin: "",
    email: "",
    password: "",
    newEmail: "",
    confirmEmail: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [mostrarPw, setMostrarPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación
    if (formData.newEmail !== formData.confirmEmail) {
      setError("Los emails nuevos no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await cambiarEmail(
        token,
        username,
        formData.pin,
        formData.password,
        formData.newEmail.toLowerCase(),
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
          <h2 className="form-title">Cambiar Email</h2>

          {/* PIN */}
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

          {/* Email Actual */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">
              Email actual
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

          {/* Contraseña */}
          <div className="form-field">
            <label htmlFor="password" className="form-label">
              Contraseña actual
            </label>
            <div className="form-password-wrapper">
              <input
                id="password"
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPw((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPw ? "Ocultar Contraseña" : "Mostrar Contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPw ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Nuevo Email */}
          <div className="form-field">
            <label htmlFor="newEmail" className="form-label">
              Nuevo email
            </label>
            <input
              id="newEmail"
              type="email"
              name="newEmail"
              className="form-input"
              value={formData.newEmail}
              onChange={(e) => handleInputChange("newEmail", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Confirmar Nuevo Email */}
          <div className="form-field">
            <label htmlFor="confirmEmail" className="form-label">
              Confirmar nuevo email
            </label>
            <input
              id="confirmEmail"
              type="email"
              name="confirmEmail"
              className="form-input"
              value={formData.confirmEmail}
              onChange={(e) =>
                handleInputChange("confirmEmail", e.target.value)
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

          {/* Botón submit */}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Procesando..." : "Cambiar Email"}
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
        title="¡Email enviado!"
        message="Se ha enviado un correo de confirmación a tu nuevo email. Por favor revisa tu bandeja de entrada y confirma el cambio. Por seguridad, debes iniciar sesión nuevamente."
        onClose={handleModalClose}
        buttonText="Iniciar sesión"
      />
    </>
  );
};

export { CambiarEmailPanel };
