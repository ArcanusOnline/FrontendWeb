import { Link, Outlet, useLocation } from "react-router";
import "./style.css";

const ConfigPanelCuenta = () => {
  const location = useLocation();

  const showLinks = !location.pathname.includes("change");

  return (
    <>
      {showLinks && (
        <div className="settings-links">
          <Link to="change-password">Cambiar contraseña</Link>
          <Link to="change-email">Cambiar Email</Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { ConfigPanelCuenta };
