import { Link, useNavigate } from "react-router";
import { useAuth } from "../../useContext/useContext";
import { useState } from "react";
import "./style.css";

const PanelComponent = () => {
  const { getUsername, getToken } = useAuth();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
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

  const desconectar = async () => {
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
      {mostrarMensaje && (
        <div className="modal-overlay-mensaje-global">
          <div className="modal-mensaje-contenido">
            <p className="mensaje-cerrando-sesion">
              Cerrando sesión<span className="dots"></span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { PanelComponent };
