import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecuperoPersonaje } from "../../querys/scripts";
import "./style.css";

const FormularioCambiarPasswordRecuPersonaje = () => {
  const [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const [succes, setSucces] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");
  const [mostrarPw, setMostrarPw] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const enviarPasswords = async (e) => {
    e.preventDefault();
    setError(false);
    setSucces(false);
    if (fields.newPassword !== fields.confirmPassword) {
      setError(true);
      setErrorLog("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await cambioPasswordRecuperoPersonaje(fields, token);
      if (data.estado !== 200) {
        setError(true);
        setErrorLog(data.message);
      } else {
        setSucces(true);
        setSuccesMsg(data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setErrorLog(error);
      return;
    }
  };

  return (
    <form
      className="form-container-cambiar-pw-pj-recu"
      onSubmit={enviarPasswords}
    >
      <h2 className="form-title-cambiar-pw-pj-recu">
        Restablecer Contraseña del Personaje
      </h2>

      <div className="form-field-cambiar-pw-pj-recu">
        <label htmlFor="newPassword" className="form-label-cambiar-pw-pj-recu">
          Nueva Contraseña:
        </label>
        <div className="form-password-wrapper-form-login">
          <input
            type={mostrarPw ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="form-input-cambiar-pw-pj-recu"
            value={fields.newPassword}
            onChange={(e) => {
              setFields((prev) => ({ ...prev, newPassword: e.target.value }));
              setError("");
            }}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPw((prev) => !prev)}
            className="toggle-btn-form-login"
          >
            {mostrarPw ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      <div className="form-field-cambiar-pw-pj-recu">
        <label
          htmlFor="repeatPassword"
          className="form-label-cambiar-pw-pj-recu"
        >
          Repetir Contraseña:
        </label>
        <div className="form-password-wrapper-form-login">
          <input
            type={mostrarPw ? "text" : "password"}
            id="repeatPassword"
            name="repeatPassword"
            className="form-input-cambiar-pw-pj-recu"
            value={fields.confirmPassword}
            onChange={(e) => {
              setFields((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }));
              setError("");
            }}
            required
          />
          <button
            type="button"
            onClick={() => setMostrarPw((prev) => !prev)}
            className="toggle-btn-form-login"
          >
            {mostrarPw ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {error && <p className="form-error-cambiar-pw-pj-recu">{errorLog}</p>}
      {succes && (
        <div className="modal-overlay-mensaje-global">
          <div
            className="modal-mensaje-contenido"
            style={{ borderColor: "lightgreen" }}
          >
            <p style={{ color: "lightgreen" }}>{}</p>
          </div>
        </div>
      )}
      <button type="submit" className="form-button-cambiar-pw-pj-recu">
        Cambiar Contraseña
      </button>
    </form>
  );
};

export { FormularioCambiarPasswordRecuPersonaje };
