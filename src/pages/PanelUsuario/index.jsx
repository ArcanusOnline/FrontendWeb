import { PanelComponent } from "../../components";
import { Outlet, useLocation } from "react-router";

const PanelUsuario = () => {
  const location = useLocation();
  const esRutaPrincipal = location.pathname === "/panel-de-usuario";

  return (
    <div>
      {esRutaPrincipal && <PanelComponent />}
      <Outlet />
    </div>
  );
};

export { PanelUsuario };
