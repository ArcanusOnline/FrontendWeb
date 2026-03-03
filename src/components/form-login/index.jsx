import { Link, useSearchParams } from "react-router";
import { loginAccount } from "../../querys/scripts";
import { useState, useRef } from "react";
import { useAuth } from "../../useContext/useContext.js";
import { useRedireccionar } from "../../assets/functions.js";

import ReCAPTCHA from "react-google-recaptcha";
import "./style.css";

const RECAPTCHA_PUBLIC_KEY = import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY;

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    captcha: "",
  });
  const [error, setError] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const recaptchaRef = useRef(null);
  const redireccionar = useRedireccionar();
  const { login, logout } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(""); // Limpiar error al escribir
  };

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({ ...prev, captcha: token }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.captcha) {
      setError("Por favor completa el reCAPTCHA");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await loginAccount(
        formData.username,
        formData.password,
        formData.captcha,
      );

      if (!data.state) {
        setError(data.message);
        recaptchaRef.current?.reset();
        setFormData((prev) => ({ ...prev, captcha: "" }));
        return;
      }

      // Login exitoso
      login(data.token, data.username);
      const redirect = searchParams.get("redirect");
      redireccionar(redirect || "/panel-de-usuario");
    } catch (err) {
      setError("Error al iniciar sesión. Intenta nuevamente.");
      recaptchaRef.current?.reset();
      setFormData((prev) => ({ ...prev, captcha: "" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-wrapper">
        <h2 className="form-title">Ingresa a tu Cuenta</h2>

        <div className="form-field">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={formData.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            required
          />
        </div>

        {/* Campo Contraseña */}
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <div className="form-password-wrapper">
            <input
              id="password"
              type={mostrarPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              className="form-input"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
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

        <ReCAPTCHA
          sitekey={RECAPTCHA_PUBLIC_KEY}
          onChange={handleCaptchaChange}
          ref={recaptchaRef}
        />

        {/* Mensaje de Error */}
        {error && <div className="form-error">{error}</div>}
        {/* Botón Submit */}
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        {/* Links */}
        <div className="form-links">
          <Link to="/recuperar-cuenta" className="form-link">
            Olvidé mi contraseña
          </Link>
          <Link to="/registrarse" className="form-link">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </form>
    </div>
  );
};

export { Login };
