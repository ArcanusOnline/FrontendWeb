import { Link, useNavigate } from "react-router";
import { useState, useRef } from "react";
import { registrarCuenta } from "../../querys/scripts";
import { Modal } from "../../ui/Modales";
import ReCAPTCHA from "react-google-recaptcha";
import "./style.css"; // Solo estilos específicos de registro

const RECAPTCHA_PUBLIC_KEY = import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY;

const RegisterPanel = () => {
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState({
    NombreCuenta: "",
    Clave: "",
    Mail: "",
    Nombre: "",
    Apellido: "",
    Pais: "",
    Localidad: "",
    Provincia: "",
    FechaNacimiento: "",
    pin: "",
    captcha: "",
  });

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarPin, setMostrarPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({ ...prev, captcha: token }));
    if (error) setError("");
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const getFieldError = (field) => {
    if (!error) return false;
    const errorMap = {
      NombreCuenta: "cuenta",
      Clave: "contraseña",
      pin: "pin",
    };
    return error.toLowerCase().includes(errorMap[field]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación básica
    if (!formData.NombreCuenta || !formData.Clave || !formData.Mail) {
      setError("Por favor completá los campos obligatorios.");
      return;
    }

    if (!formData.captcha) {
      setError("Por favor completa el reCAPTCHA.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await registrarCuenta(formData);

      if (response.error) {
        let errorMessage = response.message;

        if (response.message.includes("cuenta")) {
          errorMessage +=
            "\nRecordá que el nombre de la cuenta no puede tener espacios";
        } else if (response.message.includes("contraseña")) {
          errorMessage += "\nRecordá que la contraseña no puede tener espacios";
        } else if (response.message.includes("pin")) {
          errorMessage += "\nRecordá que el pin no puede tener espacios";
        }

        setError(errorMessage);
        recaptchaRef.current?.reset();
        setFormData((prev) => ({ ...prev, captcha: "" }));
        return;
      }

      if (response.estado === 1) {
        setSuccessMessage(response.message);
        setShowSuccessModal(true);
        setFormData({
          NombreCuenta: "",
          Clave: "",
          Mail: "",
          Nombre: "",
          Apellido: "",
          Pais: "",
          Localidad: "",
          Provincia: "",
          FechaNacimiento: "",
          pin: "",
          captcha: "",
        });
      }
    } catch (err) {
      setError("Error al registrar la cuenta. Intenta nuevamente.");
      recaptchaRef.current?.reset();
      setFormData((prev) => ({ ...prev, captcha: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form-wrapper">
          <h2 className="form-title">Crear tu Cuenta</h2>

          {/* Nombre de cuenta */}
          <div className="form-field">
            <label htmlFor="nombreCuenta" className="form-label">
              Nombre de cuenta
            </label>
            <input
              id="nombreCuenta"
              type="text"
              name="NombreCuenta"
              className={`form-input ${getFieldError("NombreCuenta") ? "form-input--error" : ""}`}
              value={formData.NombreCuenta}
              onChange={(e) =>
                handleInputChange("NombreCuenta", e.target.value)
              }
              disabled={isLoading}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-field">
            <label htmlFor="clave" className="form-label">
              Contraseña
            </label>
            <div className="form-password-wrapper">
              <input
                id="clave"
                type={mostrarPassword ? "text" : "password"}
                name="Clave"
                className={`form-input ${getFieldError("Clave") ? "form-input--error" : ""}`}
                value={formData.Clave}
                onChange={(e) => handleInputChange("Clave", e.target.value)}
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

          {/* Email */}
          <div className="form-field">
            <label htmlFor="mail" className="form-label">
              Email
            </label>
            <input
              id="mail"
              type="email"
              name="Mail"
              className="form-input"
              value={formData.Mail}
              onChange={(e) => handleInputChange("Mail", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Grid para nombre y apellido */}
          <div className="register-grid">
            <div className="form-field">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                name="Nombre"
                className="form-input"
                value={formData.Nombre}
                onChange={(e) => handleInputChange("Nombre", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                id="apellido"
                type="text"
                name="Apellido"
                className="form-input"
                value={formData.Apellido}
                onChange={(e) => handleInputChange("Apellido", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* País */}
          <div className="form-field">
            <label htmlFor="pais" className="form-label">
              País
            </label>
            <input
              id="pais"
              type="text"
              name="Pais"
              className="form-input"
              value={formData.Pais}
              onChange={(e) => handleInputChange("Pais", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {/* Grid para provincia y localidad */}
          <div className="register-grid">
            <div className="form-field">
              <label htmlFor="provincia" className="form-label">
                Provincia
              </label>
              <input
                id="provincia"
                type="text"
                name="Provincia"
                className="form-input"
                value={formData.Provincia}
                onChange={(e) => handleInputChange("Provincia", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="localidad" className="form-label">
                Localidad
              </label>
              <input
                id="localidad"
                type="text"
                name="Localidad"
                className="form-input"
                value={formData.Localidad}
                onChange={(e) => handleInputChange("Localidad", e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          {/* Fecha de nacimiento */}
          <div className="form-field">
            <label htmlFor="fechaNacimiento" className="form-label">
              Fecha de Nacimiento
            </label>
            <input
              id="fechaNacimiento"
              type="date"
              name="FechaNacimiento"
              className="form-input"
              value={formData.FechaNacimiento}
              onChange={(e) =>
                handleInputChange("FechaNacimiento", e.target.value)
              }
              disabled={isLoading}
              required
            />
          </div>

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
                className={`form-input ${getFieldError("pin") ? "form-input--error" : ""}`}
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

          {/* ReCAPTCHA */}

          <ReCAPTCHA
            sitekey={RECAPTCHA_PUBLIC_KEY}
            onChange={handleCaptchaChange}
            ref={recaptchaRef}
          />

          {/* Mensaje de error */}
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          {/* Botón submit */}
          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>

          {/* Link a login */}
          <div className="form-links">
            <Link to="/cuenta" className="form-link">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>

      <Modal
        isOpen={showSuccessModal}
        type="success"
        title="¡Registro exitoso!"
        message={successMessage}
        onClose={handleModalClose}
        buttonText="Ir al inicio"
      />
    </>
  );
};

export { RegisterPanel };
