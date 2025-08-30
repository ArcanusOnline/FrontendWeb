import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { cambioPasswordRecupero } from "../../querys/scripts";
import "./style.css";

const FormularioCambiarPasswordRecu = () => {
  const [fields, setFields] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [mostrarPw, setMostrarPw] = useState(false);
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);
  const [succesMsg, setSuccesMsg] = useState("");
  const [errorLog, setErrorLog] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const enviarPasswords = async (e) => {
    e.preventDefault();
    setError(false);
    setSucces(false);
    if (fields.newPassword !== fields.confirmPassword) {
      setError(true);
      setErrorLog("Las contraseñas no coindicen");
      return;
    }
    try {
      const data = await cambioPasswordRecupero(fields, token);
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
      className="form-container-form-cambiar-pw-recu"
      onSubmit={enviarPasswords}
    >
      <h2 className="form-title-form-cambiar-pw-recu">
        Restablecer Contraseña
      </h2>

      <div className="form-field-form-cambiar-pw-recu">
        <label
          htmlFor="newPassword"
          className="form-label-form-cambiar-pw-recu"
        >
          Nueva Contraseña:
        </label>
        <div className="form-password-wrapper-form-login">
          <input
            type={mostrarPw ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            className="form-input-form-cambiar-pw-recu"
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

      <div className="form-field-form-cambiar-pw-recu">
        <label
          htmlFor="repeatPassword"
          className="form-label-form-cambiar-pw-recu"
        >
          Repetir Contraseña:
        </label>
        <div className="form-password-wrapper-form-login">
          <input
            type={mostrarPw ? "text" : "password"}
            id="repeatPassword"
            name="repeatPassword"
            className="form-input-form-cambiar-pw-recu"
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

      {error && <p className="form-error-form-cambiar-pw-recu">{errorLog}</p>}
      {succes && (
        <div className="modal-overlay-mensaje-global">
          <div
            className="modal-mensaje-contenido"
            style={{ borderColor: "lightgreen" }}
          >
            <p style={{ color: "lightgreen" }}>{succesMsg}</p>
          </div>
        </div>
      )}
      <button type="submit" className="form-button-form-cambiar-pw-recu">
        Cambiar Contraseña
      </button>
    </form>
  );
};

export { FormularioCambiarPasswordRecu };
