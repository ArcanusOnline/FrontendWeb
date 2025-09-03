import { Navigate, Outlet } from "react-router";
import { useAuth } from "../useContext/useContext";
import { urlImagenes } from "./urlImagenes";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payloadBase64url = token.split(".")[1];
    if (!payloadBase64url) return false;
    let payloadBase64 = payloadBase64url.replace(/-/g, "+").replace(/_/g, "/");
    while (payloadBase64.length % 4 !== 0) {
      payloadBase64 += "=";
    }
    const payload = JSON.parse(atob(payloadBase64));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// ProtectedRoute: si el usuario está autenticado, redirige; si no, muestra login
export const ProtectedRoute = ({ redirectTo }) => {
  const { loading } = useAuth();
  if (loading)
    return (
      <div className="global-loading-loader">
        <img className="logo-loader" src={urlImagenes.logo} alt="logo" />{" "}
        <span className="loading-text">
          Cargando<span className="dots"></span>
        </span>
      </div>
    );
  return isTokenValid() ? <Navigate to={redirectTo} /> : <Outlet />;
};

// PrivateRoute: si el usuario está autenticado, muestra contenido; si no, redirige
export const PrivateRoute = ({ redirectTo }) => {
  const { loading } = useAuth();
  if (loading)
    return (
      <div className="global-loading-loader">
        <img className="logo-loader" src={urlImagenes.logo} alt="logo" />{" "}
        <span className="loading-text">
          Cargando<span className="dots"></span>
        </span>
      </div>
    );
  return isTokenValid() ? <Outlet /> : <Navigate to={redirectTo} />;
};
