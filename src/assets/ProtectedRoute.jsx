import { Navigate, Outlet } from "react-router";
import { useAuth } from "../useContext/useContext";
import { urlImagenes } from "./urlImagenes";

// ProtectedRoute: si el usuario está autenticado, redirige; si no, muestra login
export const ProtectedRoute = ({ redirectTo }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading)
    return (
      <div className="global-loading-loader">
        <img className="logo-loader" src={urlImagenes.logo} alt="logo" />{" "}
        <span className="loading-text">
          Cargando<span className="dots"></span>
        </span>
      </div>
    );
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
};

// PrivateRoute: si el usuario está autenticado, muestra contenido; si no, redirige
export const PrivateRoute = ({ redirectTo }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading)
    return (
      <div className="global-loading-loader">
        <img className="logo-loader" src={urlImagenes.logo} alt="logo" />{" "}
        <span className="loading-text">
          Cargando<span className="dots"></span>
        </span>
      </div>
    );
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};
