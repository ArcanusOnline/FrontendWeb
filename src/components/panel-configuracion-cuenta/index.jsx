import { Link, Outlet, useLocation } from "react-router";
import "./style.css";

const ConfigPanelCuenta = () => {
  const location = useLocation();
  const showLinks = !location.pathname.includes("change");

  return (
    <>
      {showLinks && (
        <div className="links-config-cuenta">
          <Link className="link-config-cuenta" to="change-password">
            Cambiar contraseña
          </Link>
          <Link className="link-config-cuenta" to="change-email">
            Cambiar Email
          </Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { ConfigPanelCuenta };
