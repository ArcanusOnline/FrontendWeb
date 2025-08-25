import { Link, useNavigate } from "react-router";
import { useAuth } from "../../useContext/useContext";
import "./style.css";
import { logout } from "../../querys/scripts";

const PanelComponent = () => {
  const { userName, handleLogout } = useAuth();
  let navigate = useNavigate();
  const verPersonajes = () => {
    const nombreURI = encodeURIComponent(userName);
    navigate(`/panel-de-usuario/lista-de-mis-personajes/${nombreURI}`);
  };

  const desconectar = async () => {
    try {
      const data = await logout();
      if (!data.error) {
        handleLogout();
        navigate(`/`);
      } else {
        console.error(data.message);
        return;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="panel-pagina-principal-container">
      <div className="panel-pagina-principal-header">
        <h1 className="panel-pagina-principal-nombre">
          {userName.toUpperCase()}
        </h1>
        <p className="panel-pagina-principal-ultima">{`Última conexión: ${new Date().toLocaleString()}`}</p>
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
          Tus Soportes
        </Link>
      </div>
      <hr className="panel-pagina-principal-separator" />

      <div className="panel-pagina-principal-section">
        <h5>Configuracion</h5>
        <div className="panel-pagina-principal-contenedor">
          <Link
            to="/panel-de-usuario/change-password"
            className="panel-pagina-principal-link"
          >
            Cambiar Contraseña
          </Link>
          <Link
            to="/panel-de-usuario/change-email"
            className="panel-pagina-principal-link"
          >
            Cambiar <br></br>Email
          </Link>
        </div>
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
      <button
        className="panel-pagina-principal-btn panel-pagina-principal-logout"
        onClick={desconectar}
      >
        CERRAR SESIÓN
      </button>
    </div>
  );
};

export { PanelComponent };
