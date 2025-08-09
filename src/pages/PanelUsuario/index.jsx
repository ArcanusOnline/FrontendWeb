import { PanelComponent } from "../../components";
import { Outlet, useLocation } from "react-router";
import "./style.css";

const PanelUsuario = () => {
  const location = useLocation();
  const esRutaPrincipal = location.pathname === "/panel-de-usuario";

  return (
    <div className="panel-page">
      {esRutaPrincipal && <PanelComponent />}
      <Outlet />
    </div>
  );
};

export { PanelUsuario };
