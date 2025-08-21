import { ListadoSoporte } from "../../components";
import { Link } from "react-router";
import "./style.css";

const PaginaSoportes = () => {
  return (
    <>
      <div className="paginaSoporteContainer">
        <ListadoSoporte />
        <div className="soporte-button-container">
          <Link
            to="/panel-de-usuario/nuevo-soporte"
            className="botonNuevoSoporte"
          >
            Nuevo Soporte
          </Link>
          <Link to="/panel-de-usuario" className="soportes-go-back-button">
            Volver al Panel
          </Link>
        </div>
      </div>
    </>
  );
};

export { PaginaSoportes };
