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

  if (token) return <Outlet />;

  return (
    <>
      <div className="form-container-recuperar-cuenta">
        <h2 className="form-title-recuperar-cuenta">Recuperar Cuenta</h2>
        <form className="form-recuperar-cuenta" onSubmit={handleSubmit}>
          <div className="form-group-recuperar-cuenta">
            <label className="form-label-recuperar-cuenta">Cuenta:</label>
            <input
              type="text"
              value={fields.cuenta}
              onChange={(e) => {
                setFields((prev) => ({ ...prev, cuenta: e.target.value }));
                setError("");
              }}
              required
              className="form-input-recuperar-cuenta"
            />
          </div>

          <div className="form-group-recuperar-cuenta">
            <label className="form-label-recuperar-cuenta">Email:</label>
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
              className="form-input-recuperar-cuenta"
            />
          </div>

          <div
            className="form-group-recuperar-cuenta"
            style={{ position: "relative" }}
          >
            <label className="form-label-recuperar-cuenta">PIN:</label>
            <input
              type={mostrarPw ? "text" : "password"}
              value={fields.pin}
              onChange={(e) => {
                setFields((prev) => ({ ...prev, pin: e.target.value }));
                setError("");
              }}
              required
              className="form-input-recuperar-cuenta"
            />
            <button
              type="button"
              onClick={() => setMostrarPw((prev) => !prev)}
              className="pin-toggle-button-recuperar-cuenta"
            >
              {mostrarPw ? "🙈" : "👁️"}
            </button>
          </div>

          <button type="submit" className="form-button-recuperar-cuenta">
            Recuperar Cuenta
          </button>

          {error && <p className="form-error-recuperar-cuenta">{error}</p>}
        </form>

        <Link to="/recuperar-personaje" className="form-link-recuperar-cuenta">
          ¿Queres recuperar tu Personaje?
        </Link>
      </div>

      {successMessage && (
        <div className="modal-overlay-recuperar-cuenta">
          <div className="modal-content-recuperar-cuenta">
            <p>{successMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export { RecuperarCuenta };
