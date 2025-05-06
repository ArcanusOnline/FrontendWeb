import { Link, Outlet, useLocation } from "react-router";

const RecuperarContrasenas = () => {
  const location = useLocation();

  const showLinks = location.pathname === "/recuperar-contrasenas";
  return (
    <>
      {showLinks && (
        <div className="settings-links">
          <Link to="recuperar-cuenta">Recuperar Cuenta</Link>
          <Link to="recuperar-personaje">Recuperar personaje</Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { RecuperarContrasenas };
