import { Link } from "react-router";
import { login } from "../../querys/scripts";
import { useState } from "react";
import { useAuth } from "../../useContext/useContext.js";
import { useRedireccionar } from "../../assets/functions.js";
import "./style.css";

const Login = () => {
  const [fields, setFields] = useState({
    nick: "",
    pass: "",
  });

  const [errorLog, setErrorLog] = useState("");
  const [error, setError] = useState(false);
  const redireccionar = useRedireccionar();
  const { updateUsername, updateToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await login(fields.nick, fields.pass);
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
    <>
      <div className="cuentaContainer">
        <fieldset>
          <legend>Acceder</legend>
          <form onSubmit={handleSubmit} autoComplete="on">
            <label>Usuario</label>
            <input
              type="text"
              name="username"
              autoComplete="username"
              onChange={(e) => {
                setError(false);
                setFields({ ...fields, nick: e.target.value });
              }}
            ></input>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={(e) => {
                setError(false);
                setFields({ ...fields, pass: e.target.value });
              }}
            ></input>
            <button type="submit">Ingresar</button>
            {error && <span>{errorLog}</span>}
          </form>
          <p>
            <Link to="/recuperar-contrasenas/recuperar-cuenta">
              Olvide mi contraseña
            </Link>
          </p>
        </fieldset>
      </div>
    </>
  );
};

export { Login };
