import { Link } from "react-router";
import { Login } from "../../components";
import "./style.css";

const Cuenta = () => {
  return (
    <>
      <div className="seccionCuenta">
        <h1>Iniciar sesión</h1>
        <Login />
        <Link to="/registrarse" className="linkRegistrarseCuenta">
          Registrarme
        </Link>
      </div>
    </>
  );
};

export { Cuenta };
