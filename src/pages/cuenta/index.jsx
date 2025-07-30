import { Link } from "react-router";
import { Login } from "../../components";
import "./style.css";

const Cuenta = () => {
  return (
    <div className="cuenta-login">
      <h1>Iniciar sesión</h1>
      <Login />
      <Link to="/registrarse" className="cuenta-login-link">
        Registrarme
      </Link>
    </div>
  );
};

export { Cuenta };
