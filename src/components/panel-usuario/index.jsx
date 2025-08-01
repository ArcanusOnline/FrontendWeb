import { Link, useNavigate } from "react-router";
import { useAuth } from "../../useContext/useContext";
import "./style.css";

const PanelComponent = () => {
  const { getUsername, getToken } = useAuth();
  let navigate = useNavigate();

  let nombre =
    getUsername() || localStorage.getItem("username") || "Usuario desconocido";
  let response = getToken() || localStorage.getItem("token") || "";

  const verPersonajes = () => {
    const nombreURI = encodeURIComponent(nombre);
    navigate(`/panel-de-usuario/lista-de-mis-personajes/${nombreURI}`, {
      state: { response },
    });
  };

  const desconectar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/`);
  };

  return (
    <div className="panel-pagina-principal-container">
      <div className="panel-pagina-principal-header">
        <h1 className="panel-pagina-principal-nombre">
          {nombre.toUpperCase()}
        </h1>
        <p className="panel-pagina-principal-ultima">{`Última conexión: ${new Date().toLocaleString()}`}</p>
        <button
          className="panel-pagina-principal-btn panel-pagina-principal-logout"
          onClick={desconectar}
        >
          CERRAR SESIÓN
        </button>
      </div>

      <hr className="panel-pagina-principal-separator" />

      <div className="panel-pagina-principal-section">
        <h5>Mis Personajes</h5>
        <button
          className="panel-pagina-principal-btn panel-pagina-principal-mis-personajes"
          onClick={verPersonajes}
        >
          VER PERSONAJES
        </button>
      </div>

      <hr className="panel-pagina-principal-separator" />

      <div className="panel-pagina-principal-section">
        <h5>Soporte</h5>
        <Link
          to="/panel-de-usuario/historial-de-soportes"
          className="panel-pagina-principal-link"
        >
          Nuevo soporte
        </Link>
      </div>

      <hr className="panel-pagina-principal-separator" />

      <div className="panel-pagina-principal-section">
        <h5>Ayuda a la comunidad</h5>
        <a
          href="https://discord.com/channels/860283261539450881/976668226299756545"
          target="_blank"
          rel="noopener noreferrer"
          className="panel-pagina-principal-link"
        >
          Reportar un error
        </a>
      </div>

      <hr className="panel-pagina-principal-separator" />

      <div className="panel-pagina-principal-section">
        <Link
          to="/panel-de-usuario/configuracion-de-cuenta"
          className="panel-pagina-principal-link"
        >
          Configuración de la cuenta
        </Link>
      </div>
    </div>
  );
};

export { PanelComponent };
