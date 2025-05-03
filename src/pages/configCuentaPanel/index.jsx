import { Link, Outlet, useLocation } from "react-router";

const ConfigPanelCuenta = () => {
  const location = useLocation();

  const showLinks = !location.pathname.includes("cambiar");

  return (
    <>
      {showLinks && (
        <div className="settings-links">
          <Link to="cambiarPassword">Cambiar contraseña</Link>
          {/*<Link to="cambiarPin">Cambiar clave PIN</Link> */}
          <Link to="cambiarEmail">Cambiar Email</Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { ConfigPanelCuenta };
