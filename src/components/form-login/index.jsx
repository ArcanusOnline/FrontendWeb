import { Link } from "react-router";
import { login } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext.js";
import { useRedireccionar } from "../../assets/functions.js";
import ReCAPTCHA from "react-google-recaptcha"; // react-google-recaptcha wrapper
import "./style.css";
const recaptchaPublicKey = import.meta.env.VITE_RECAPTCHA_PUBLIC_KEY;

const Login = () => {
  const [fields, setFields] = useState({ nick: "", pass: "", captcha: "" });
  const [errorLog, setErrorLog] = useState("");
  const [error, setError] = useState(false);
  const [mostrarPw, setMostrarPw] = useState(false);
  const redireccionar = useRedireccionar();
  const { handleLogin, setName } = useAuth();
  const handleCaptchaChange = (token) => {
    setFields({ ...fields, captcha: token });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fields.captcha) {
      setError(true);
      setErrorLog("Por favor completa el reCAPTCHA");
      return;
    }

    const data = await login(fields.nick, fields.pass, fields.captcha);
    console.log(data);

    if (data.state === false) {
      setError(true);
      if (data.message.includes("nick")) {
        setErrorLog(
          <>
            {data.message}
            <br />
            Recordá que el nick no puede tener espacios
          </>
        );
      }
      return;
    }
    setName(data.username);
    handleLogin();
    redireccionar("/panel-de-usuario");
  };

  return (
    <div className="form-container-form-login">
      <form
        onSubmit={handleSubmit}
        className="form-content-form-login"
        autoComplete="on"
      >
        <h2 className="form-title-form-login">Ingresa a tu Cuenta</h2>

        <div className="form-field-form-login">
          <label className="form-label-form-login">Usuario</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="form-input-form-login"
            onChange={(e) => {
              setError(false);
              setFields({ ...fields, nick: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-field-form-login">
          <label className="form-label-form-login">Contraseña</label>
          <div className="form-password-wrapper-form-login">
            <input
              type={mostrarPw ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              className="form-input-form-login"
              onChange={(e) => {
                setError(false);
                setFields({ ...fields, pass: e.target.value });
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
        <ReCAPTCHA
          sitekey={recaptchaPublicKey}
          onChange={handleCaptchaChange}
        />
        {error && <p className="form-error-form-login">{errorLog}</p>}

        <button type="submit" className="form-button-form-login">
          Ingresar
        </button>

        <div className="form-link-container-form-login">
          <p>
            <Link to="/recuperar-cuenta" className="form-link-form-login">
              Olvidé mi contraseña
            </Link>
          </p>
          <p>
            <Link to="/registrarse" className="form-link-form-login">
              ¿No tenes cuenta? Registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export { Login };
