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

  const token = localStorage.getItem("token");
  const [mostrarPw, setMostrarPw] = useState(false);

  const desconectar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/`);
  };

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
        newEmail.toLocaleLowerCase(),
        email.toLocaleLowerCase()
      );
      if (response === "OK") {
        setSuccess("Se ha enviado un email, para confirmar el cambio.");
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
    <div className="form-container-cambiar-email-panel">
      <h2 className="form-title-cambiar-email-panel">Cambiar Email</h2>
      <form onSubmit={handleSubmit} className="form-cambiar-email-panel">
        <div className="form-field-cambiar-email-panel">
          <label className="form-label-cambiar-email-panel">PIN:</label>
          <div className="input-wrapper-cambiar-email-panel">
            <input
              type={mostrarPw ? "text" : "password"}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError("");
              }}
              required
              className="form-input-cambiar-email-panel"
            />
            <button
              type="button"
              onClick={() => setMostrarPw((prev) => !prev)}
              className="toggle-visibility-cambiar-email-panel"
            >
              {mostrarPw ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="form-field-cambiar-email-panel">
          <label className="form-label-cambiar-email-panel">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
              setError("");
            }}
            required
            className="form-input-cambiar-email-panel"
          />
        </div>

        <div className="form-field-cambiar-email-panel">
          <label className="form-label-cambiar-email-panel">
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
            className="form-input-cambiar-email-panel"
          />
        </div>

        <div className="form-field-cambiar-email-panel">
          <label className="form-label-cambiar-email-panel">Nuevo Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
              setError("");
            }}
            required
            className="form-input-cambiar-email-panel"
          />
        </div>

        <div className="form-field-cambiar-email-panel">
          <label className="form-label-cambiar-email-panel">
            Confirmar Nuevo Email:
          </label>
          <input
            type="email"
            value={confirmeEmail}
            onChange={(e) => {
              setConfirmeEmail(e.target.value);
              setError("");
            }}
            required
            className="form-input-cambiar-email-panel"
          />
        </div>

        {error && <p className="form-error-cambiar-email-panel">{error}</p>}
        {success && (
          <p className="form-success-cambiar-email-panel">{success}</p>
        )}

        <button type="submit" className="form-button-cambiar-email-panel">
          Cambiar Email
        </button>
      </form>

      <Link to="/panel-de-usuario" className="form-link-cambiar-email-panel">
        ← Volver
      </Link>
    </div>
  );
};

export { CambiarEmailPanel };
