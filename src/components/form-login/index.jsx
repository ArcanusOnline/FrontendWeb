import { Link } from "react-router";
import { login } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext.js";
import { useRedireccionar } from "../../assets/functions.js";
import "./style.css";

const Login = () => {
  const [fields, setFields] = useState({ nick: "", pass: "" });
  const [errorLog, setErrorLog] = useState("");
  const [error, setError] = useState(false);

  const redireccionar = useRedireccionar();
  const { updateUsername, updateToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await login(fields.nick, fields.pass);

    if (data.state === false) {
      setError(true);
      setErrorLog(data.message);
      return;
    }

    updateUsername(data.username);
    updateToken(data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("token", data.token);
    redireccionar("/panel-de-usuario");
  };

  return (
    <div className="form-container-form-login">
      <form
        onSubmit={handleSubmit}
        className="form-content-form-login"
        autoComplete="on"
      >
        <h2 className="form-title-form-login">Acceder</h2>

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
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            className="form-input-form-login"
            onChange={(e) => {
              setError(false);
              setFields({ ...fields, pass: e.target.value });
            }}
            required
          />
        </div>

        {error && <p className="form-error-form-login">{errorLog}</p>}

        <button type="submit" className="form-button-form-login">
          Ingresar
        </button>

        <p className="form-link-container-form-login">
          <Link
            to="/recuperar-contrasenas/recuperar-cuenta"
            className="form-link-form-login"
          >
            Olvidé mi contraseña
          </Link>
        </p>
      </form>
    </div>
  );
};

export { Login };
