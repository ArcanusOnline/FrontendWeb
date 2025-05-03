import { Link } from "react-router";
import { Login } from "../../components";

const Cuenta = () => {
  return (
    <>
      <div className="seccionCuenta">
        <h1>Iniciar sesión</h1>
        <Login />
        <Link to="/register" className="linkRegistrarseCuenta">
          Registrarme
        </Link>
      </div>
    </>
  );
};

export { Cuenta };
