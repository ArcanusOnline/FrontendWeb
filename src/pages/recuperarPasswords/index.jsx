import { Link, Outlet, useLocation } from "react-router";

const RecuperarContrasenas = () => {
  const location = useLocation();

  const showLinks = !location.pathname.includes("recuperar");
  return (
    <>
      {showLinks && (
        <div className="settings-links">
          <Link to="recuperarCuenta">Recuperar Cuenta</Link>
          <Link to="recuperarPersonaje">Recuperar personaje</Link>
        </div>
      )}
      <Outlet />
    </>
  );
};

export { RecuperarContrasenas };
