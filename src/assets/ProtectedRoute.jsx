// AuthRoutes.js
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../useContext/useContext";

// ProtectedRoute para la ruta de login:
// Si el usuario está autenticado, redirige al panel; de lo contrario, muestra el login.
export const ProtectedRoute = ({ redirectTo }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
};

// PrivateRoute para las rutas protegidas (panel, etc.):
// Si el usuario está autenticado, muestra el contenido; de lo contrario, redirige al login.
export const PrivateRoute = ({ redirectTo }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};
