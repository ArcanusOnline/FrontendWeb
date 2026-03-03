import { Link, useNavigate, Outlet, useParams } from "react-router";
import { useState } from "react";
import { recuperarCuenta } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import "./style.css";

const RecuperarCuenta = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    cuenta: "",
    email: "",
    pin: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [mostrarPin, setMostrarPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await recuperarCuenta(formData);

      if (response.estado === 2 || response.estado === 3) {
        setError(response.message);
      } else {
        setSuccessMessage(response.message);
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError("Error al recuperar la cuenta. Intenta nuevamente.");
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
          <h2 className="form-title">Recuperar Cuenta</h2>

          {/* Campo Cuenta */}
          <div className="form-field">
            <label htmlFor="cuenta" className="form-label">
              Nombre de cuenta
            </label>
            <input
              id="cuenta"
              type="text"
              name="cuenta"
              className="form-input"
              value={formData.cuenta}
              onChange={(e) => handleInputChange("cuenta", e.target.value)}
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
              PIN de la cuenta
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
            {isLoading ? "Recuperando..." : "Recuperar Cuenta"}
          </button>

          {/* Link a recuperar personaje */}
          <div className="form-links">
            <Link to="/recuperar-personaje" className="form-link">
              ¿Quieres recuperar tu Personaje?
            </Link>
          </div>
        </form>
      </div>

      {/* Modal de éxito */}
      <Modal
        isOpen={showSuccessModal}
        type="success"
        title="¡Cuenta recuperada!"
        message={successMessage}
        onClose={handleModalClose}
        buttonText="Ir al inicio"
      />
    </>
  );
};

export { RecuperarCuenta };
