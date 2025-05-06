import { useState } from "react";
import { protectedName } from "../../assets/protectedName";
import { cambiarContra } from "../../querys/scripts";
import { useNavigate, Link } from "react-router";
import "./style.css"
const CambiarPassPanel = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pin, setPin] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  let navigate = useNavigate();

  let token = localStorage.getItem("token");

  function desconectar() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/`);
  }

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
    let nombre = await protectedName(token);
    try {
      const response = await cambiarContra(
        nombre,
        pin,
        oldPassword,
        newPassword,
        email
      );
      setError(response);
      if (response === "Contraseña cambiada correctamente") {
        setTimeout(() => {
          desconectar();
        }, 2000);
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="config-panel-container">
      <h2 className="config-panel-title">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="config-panel-form">
        <div className="config-panel-field">
          <label className="config-panel-label">PIN:</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            required
            className="config-panel-input"
          />
        </div>
        <div className="config-panel-field">
          <label className="config-panel-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="config-panel-input"
          />
        </div>
        <div className="config-panel-field">
          <label className="config-panel-label">Contraseña Actual:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="config-panel-input"
          />
        </div>
        <div className="config-panel-field">
          <label className="config-panel-label">Nueva Contraseña:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="config-panel-input"
          />
        </div>
        <div className="config-panel-field">
          <label className="config-panel-label">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="config-panel-input"
          />
        </div>
        {error && <p className="config-panel-error">{error}</p>}
        {success && <p className="config-panel-success">{success}</p>}
        <button type="submit" className="config-panel-button">
          Cambiar Contraseña
        </button>
      </form>
      <Link to="/panel-de-usuario/configuracion-de-cuenta" className="config-panel-link">
        Volver
      </Link>
    </div>
  );
};

export { CambiarPassPanel };
