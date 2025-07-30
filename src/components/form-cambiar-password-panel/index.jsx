import { useState } from "react";
import { protectedName } from "../../assets/protectedName";
import { cambiarContra } from "../../querys/scripts";
import { useNavigate, Link } from "react-router";
import "./style.css";
const CambiarPassPanel = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mostrarPw, setMostrarPw] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const desconectar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    const nombre = await protectedName(token);
    try {
      const response = await cambiarContra(
        nombre,
        pin,
        oldPassword,
        newPassword,
        email.toLowerCase()
      );
      if (response === "OK") {
        setSuccess("Contraseña cambiada correctamente.");
        setTimeout(() => {
          desconectar();
        }, 2000);
        return;
      }
      setError(response);
    } catch (error) {
      console.error(error);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="form-container-cambiar-pass-panel">
      <h2 className="form-title-cambiar-pass-panel">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="form-cambiar-pass-panel">
        <div className="form-field-cambiar-pass-panel">
          <label className="form-label-cambiar-pass-panel">PIN:</label>
          <div className="input-wrapper-cambiar-pass-panel">
            <input
              type={mostrarPw ? "text" : "password"}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              className="form-input-cambiar-pass-panel"
            />
            <button
              type="button"
              onClick={() => setMostrarPw((prev) => !prev)}
              className="toggle-visibility-cambiar-pass-panel"
            >
              {mostrarPw ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-field-cambiar-pass-panel">
          <label className="form-label-cambiar-pass-panel">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
              setError("");
            }}
            required
            className="form-input-cambiar-pass-panel"
          />
        </div>

        <div className="form-field-cambiar-pass-panel">
          <label className="form-label-cambiar-pass-panel">
            Contraseña Actual:
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setError("");
            }}
            required
            className="form-input-cambiar-pass-panel"
          />
        </div>

        <div className="form-field-cambiar-pass-panel">
          <label className="form-label-cambiar-pass-panel">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            required
            className="form-input-cambiar-pass-panel"
          />
        </div>

        <div className="form-field-cambiar-pass-panel">
          <label className="form-label-cambiar-pass-panel">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            required
            className="form-input-cambiar-pass-panel"
          />
        </div>

        {error && <p className="form-error-cambiar-pass-panel">{error}</p>}
        {success && (
          <p className="form-success-cambiar-pass-panel">{success}</p>
        )}

        <button type="submit" className="form-button-cambiar-pass-panel">
          Cambiar Contraseña
        </button>
      </form>

      <Link
        to="/panel-de-usuario/configuracion-de-cuenta"
        className="form-link-cambiar-pass-panel"
      >
        ← Volver
      </Link>
    </div>
  );
};

export { CambiarPassPanel };
