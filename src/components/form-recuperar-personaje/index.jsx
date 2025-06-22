import { Link, useNavigate, Outlet, useParams } from "react-router";
import { useState } from "react";
import { recuperarPersonaje } from "../../querys/scripts";
import "./style.css";
import "../form-recuperar-cuenta/style.css";

const RecuperarPersonaje = () => {
  const [error, setError] = useState("");
  const [fields, setFields] = useState({
    nick: "",
    email: "",
    pin: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
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
      setModalMessage(data.message); // Guardamos el mensaje para mostrarlo en el modal
      setShowModal(true); // Mostramos el modal
      setTimeout(() => {
        navigate("/"); // Navegamos después de cerrar el modal
      }, 2000);
    }
  }

  return (
    <>
      <div className="config-panel-container">
        <h2 className="config-panel-title">Recuperar Personaje</h2>
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
          {error && <p className="config-panel-error">{error}</p>}
          <button type="submit" className="config-panel-button">
            Recuperar personaje
          </button>
        </form>
        <Link to="/recuperar-contrasenas" className="config-panel-link">
          Volver
        </Link>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export { RecuperarPersonaje };
