import { Link, Outlet, useLocation } from "react-router";
import "./style.css"

const RecuperarContrasenas = () => {
  const location = useLocation();

  const showLinks = location.pathname === "/recuperar-contrasenas";

  return (
    <>
      {showLinks && (
        <div className="settings-links btn-recuperar-contrasenas-inicio">
          <Link to="recuperar-cuenta" className="btn-recuperar-link">
            Recuperar Cuenta
          </Link>
          <Link to="recuperar-personaje" className="btn-recuperar-link">
            Recuperar Personaje
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { RecuperarContrasenas };
