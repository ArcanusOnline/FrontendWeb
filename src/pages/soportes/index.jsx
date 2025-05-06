import { ListadoSoporte } from "../../components";
import { Link } from "react-router";
import "./style.css"

const PaginaSoportes = () => {
  return (
    <>
      <div className="paginaSoporteContainer">
        <ListadoSoporte />
        <Link to="/panel-de-usuario/nuevo-soporte" className="botonNuevoSoporte">
          Nuevo Soporte
        </Link>
      </div>
    </>
  );
};

export { PaginaSoportes };
