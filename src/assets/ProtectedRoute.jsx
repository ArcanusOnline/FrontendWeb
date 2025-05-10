// AuthRoutes.js
import { Navigate, Outlet } from "react-router";

// Comprueba si el token es válido
const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payloadBase64url = token.split(".")[1];
    if(!payloadBase64url) return false;
    let payloadBase64 = payloadBase64url.replace(/-/g,"+").replace(/_/g,"/")
    while(payloadBase64.length % 4 !== 0){
      base64+="="
    }
    const payload = JSON.parse(atob(payloadBase64));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// ProtectedRoute para la ruta de login:
// Si el usuario está autenticado, redirige al panel; de lo contrario, muestra el login.
export const ProtectedRoute = ({ redirectTo }) => {
  return isTokenValid() ? <Navigate to={redirectTo} /> : <Outlet />;
};

// PrivateRoute para las rutas protegidas (panel, etc.):
// Si el usuario está autenticado, muestra el contenido; de lo contrario, redirige al login.
export const PrivateRoute = ({ redirectTo }) => {
  return isTokenValid() ? <Outlet /> : <Navigate to={redirectTo} />;
};
