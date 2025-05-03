import { Link, useNavigate, Outlet, useParams } from "react-router";
import { useState } from "react";
import { recuperarPersonaje } from "../../querys/scripts";

const RecuperarPersonaje = () => {
  const [error, setError] = useState("");
  const [fields, setFields] = useState({
    nick: "",
    email: "",
    pin: "",
  });
  let navigate = useNavigate();

  let { token } = useParams();

  if (token) {
    return <Outlet />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await recuperarPersonaje(fields);
    if (data.estado === 2 || data.estado === 3) {
      setError(data.message);
    } else {
      navigate("/");
      alert(data.message);
      return;
    }
  }

  return (
    <>
      <div className="config-panel-container">
        <h2 className="config-panel-title">Cambiar Contraseña</h2>
        <form className="config-panel-form" onSubmit={handleSubmit}>
          <div className="config-panel-field">
            <label className="config-panel-label">Nick:</label>
            <input
              type="text"
              value={fields.nick}
              onChange={(e) => {
                setFields((prev) => ({
                  ...prev,
                  nick: e.target.value,
                }));
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
                  email: e.target.value,
                }));
                setError("");
              }}
              required
              className="config-panel-input"
            />
          </div>
          <div className="config-panel-field">
            <label className="config-panel-label">PIN:</label>
            <input
              type="text"
              value={fields.pin}
              onChange={(e) => {
                setFields((prev) => ({
                  ...prev,
                  pin: e.target.value,
                }));
                setError("");
              }}
              required
              className="config-panel-input"
            />
          </div>
          {error && <p className="config-panel-error">{error}</p>}
          <button type="submit" className="config-panel-button">
            Recuperar personaje
          </button>
        </form>
        <Link to="/recoveryPasswords" className="config-panel-link">
          Volver
        </Link>
      </div>
    </>
  );
};

export { RecuperarPersonaje };
