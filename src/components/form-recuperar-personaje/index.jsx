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
  const [mostrarPw, setMostrarPw] = useState(false);
  let navigate = useNavigate();

  let { token } = useParams();

  if (token) return <Outlet />;

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await recuperarPersonaje(fields);
    if (data.estado === 2 || data.estado === 3) {
      setError(data.message);
    } else {
      setModalMessage(data.message);
      setShowModal(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }

  return (
    <>
      <div className="form-container-recuperar-pj-form">
        <h2 className="form-title-recuperar-pj-form">Recuperar Personaje</h2>
        <form className="form-recuperar-pj-form" onSubmit={handleSubmit}>
          <div className="form-group-recuperar-pj-form">
            <label className="form-label-recuperar-pj-form">Nick:</label>
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
              className="form-input-recuperar-pj-form"
            />
          </div>

          <div className="form-group-recuperar-pj-form">
            <label className="form-label-recuperar-pj-form">Email:</label>
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
              className="form-input-recuperar-pj-form"
            />
          </div>

          <div
            className="form-group-recuperar-pj-form"
            style={{ position: "relative" }}
          >
            <label className="form-label-recuperar-pj-form">PIN:</label>
            <input
              type={mostrarPw ? "text" : "password"}
              value={fields.pin}
              onChange={(e) => {
                setFields((prev) => ({
                  ...prev,
                  pin: e.target.value,
                }));
                setError("");
              }}
              required
              className="form-input-recuperar-pj-form"
            />
            <button
              type="button"
              onClick={() => setMostrarPw((prev) => !prev)}
              className="pin-toggle-button-recuperar-pj-form"
            >
              {mostrarPw ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className="form-error-recuperar-pj-form">{error}</p>}

          <button type="submit" className="form-button-recuperar-pj-form">
            Recuperar personaje
          </button>
        </form>

        <Link
          to="/recuperar-contrasenas"
          className="form-link-recuperar-pj-form"
        >
          ← Volver
        </Link>
      </div>

      {showModal && (
        <div className="modal-overlay-recuperar-pj-form">
          <div className="modal-content-recuperar-pj-form">
            <h2>{modalMessage}</h2>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export { RecuperarPersonaje };
