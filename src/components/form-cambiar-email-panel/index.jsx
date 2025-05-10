import { useState } from "react";
import { protectedName } from "../../assets/protectedName";
import { cambiarEmail } from "../../querys/scripts";
import { useNavigate, Link } from "react-router";
import "./style.css";

const CambiarEmailPanel = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmeEmail, setConfirmeEmail] = useState("");
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

    if (newEmail !== confirmeEmail) {
      setError("Los emails nuevos no coinciden.");
      return;
    }

    let nombre = await protectedName(token);
    try {
      const response = await cambiarEmail(
        nombre,
        pin,
        oldPassword,
        newEmail,
        email
      );
      if (response === "OK") {
        setError("Se ha enviado un email, para confirmar el cambio.");
        setTimeout(() => {
          desconectar();
        }, 2000);
        return;
      }
      setError(response);
    } catch (error) {
      setError("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="config-panel-container">
        <h2 className="config-panel-title">Cambiar Email</h2>
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
            <label className="config-panel-label">Nuevo Email:</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="config-panel-input"
            />
          </div>
          <div className="config-panel-field">
            <label className="config-panel-label">Confirmar Nuevo Email:</label>
            <input
              type="email"
              value={confirmeEmail}
              onChange={(e) => setConfirmeEmail(e.target.value)}
              required
              className="config-panel-input"
            />
          </div>
          {error && <p className="config-panel-error">{error}</p>}
          {success && <p className="config-panel-success">{success}</p>}
          <button type="submit" className="config-panel-button">
            Cambiar Email
          </button>
        </form>
        <Link
          to="/panel-de-usuario/configuracion-de-cuenta"
          className="config-panel-link"
        >
          Volver
        </Link>
      </div>
    </>
  );
};

export { CambiarEmailPanel };
