import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecuperoPersonaje } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import "./style.css";

const FormularioCambiarPasswordRecuPersonaje = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await cambioPasswordRecuperoPersonaje(formData, token);

      if (response.estado !== 200) {
        setError(response.message);
      } else {
        setSuccessMessage(response.message);
        setShowSuccessModal(true);
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
    navigate("/");
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">Restablecer Contraseña del Personaje</h2>

          {/* Nueva Contraseña */}
          <div className="form-field">
            <label htmlFor="newPassword" className="form-label">
              Nueva contraseña
            </label>
            <div className="form-password-wrapper">
              <input
                id="newPassword"
                type={mostrarPassword ? "text" : "password"}
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
                onClick={() => setMostrarPassword((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <div className="form-password-wrapper">
              <input
                id="confirmPassword"
                type={mostrarPassword ? "text" : "password"}
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setMostrarPassword((prev) => !prev)}
                className="form-toggle-password"
                aria-label={
                  mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                disabled={isLoading}
              >
                {mostrarPassword ? "🙈" : "👁️"}
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
        </form>
      </div>

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        type="success"
        title="¡Contraseña actualizada!"
        message={successMessage}
        onClose={handleModalClose}
        buttonText="Ir al inicio"
      />
    </>
  );
};

export { FormularioCambiarPasswordRecuPersonaje };
