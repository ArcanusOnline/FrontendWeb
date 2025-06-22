import { Link, useNavigate, Outlet, useParams } from "react-router";
import { useState } from "react";
import { recuperarCuenta } from "../../querys/scripts";
import "./style.css";

const RecuperarCuenta = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let navigate = useNavigate();
  let { token } = useParams();

  const [fields, setFields] = useState({
    cuenta: "",
    email: "",
    pin: "",
  });
  const [mostrarPw, setMostrarPw] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await recuperarCuenta(fields);
    if (data.estado === 2 || data.estado === 3) {
      setError(data.message);
    } else {
      setSuccessMessage(data.message);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  }

  if (token) {
    return <Outlet />;
  }

  return (
    <>
      <div className="config-panel-container">
        <h2 className="config-panel-title">Recuperar Cuenta</h2>
        <form className="config-panel-form" onSubmit={handleSubmit}>
          <div className="config-panel-field">
            <label className="config-panel-label">Cuenta:</label>
            <input
              type="text"
              value={fields.cuenta}
              onChange={(e) => {
                setFields((prev) => ({ ...prev, cuenta: e.target.value }));
                setError("");
              }}
              required
              className="config-panel-input"
            />
          </div>
          <div className="config-panel-field">
            <label className="config-panel-label">Email:</label>
            <input
              type="email"
              value={fields.email}
              onChange={(e) => {
                setFields((prev) => ({
                  ...prev,
                  email: e.target.value.toLowerCase(),
                }));
                setError("");
              }}
              required
              className="config-panel-input"
            />
          </div>
          <div className="config-panel-field">
            <div style={{ position: "relative" }}>
              <label className="config-panel-label">PIN:</label>
              <input
                type={mostrarPw ? "text" : "password"}
                value={fields.pin}
                onChange={(e) => {
                  setFields((prev) => ({ ...prev, pin: e.target.value }));
                  setError("");
                }}
                required
                className="config-panel-input"
              />
              <button
                type="button"
                onClick={() => setMostrarPw((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {mostrarPw ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <button type="submit" className="config-panel-button">
            Recuperar cuenta
          </button>
          {error && <p className="config-panel-error">{error}</p>}
        </form>
        <Link to="/recuperar-contrasenas" className="config-panel-link">
          Volver
        </Link>
      </div>

      {/* Modal de éxito */}
      {successMessage && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export { RecuperarCuenta };
