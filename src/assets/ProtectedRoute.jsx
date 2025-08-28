import { Navigate, Outlet } from "react-router";
import { useAuth } from "../useContext/useContext";

// ProtectedRoute: si el usuario está autenticado, redirige; si no, muestra login
export const ProtectedRoute = ({ redirectTo }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return isLoggedIn ? <Navigate to={redirectTo} /> : <Outlet />;
};

// PrivateRoute: si el usuario está autenticado, muestra contenido; si no, redirige
export const PrivateRoute = ({ redirectTo }) => {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};
