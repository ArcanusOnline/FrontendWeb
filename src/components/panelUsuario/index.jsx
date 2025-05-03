import { Link, useNavigate } from "react-router";
import { useAuth } from "../../useContext/useContext";

const PanelComponent = () => {
  const { getUsername, getToken } = useAuth();
  let navigate = useNavigate();

  let nombre =
    getUsername() || localStorage.getItem("username") || "Usuario desconocido";

  let response = getToken() || localStorage.getItem("token") || "";

  function verPersonajes() {
    let nombreURI = encodeURIComponent(nombre);
    navigate(`/panel-usuario/listaMisPersonajes/${nombreURI}`, {
      state: { response },
    });
  }

  function desconectar() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate(`/`);
  }

  return (
    <div className="containerPanelInicio">
      <div className="nombreCuentaPanel">
        <h1>{nombre.toUpperCase()}</h1>
      </div>

      <div className="fechaInicioPanel">
        {/*Renderiza la fecha */}
        <p>Ultima conexion: {new Date().toLocaleString()}</p>
        <button onClick={desconectar}>Cerrar Sesión</button>
      </div>
      <div className="divSeparadorInicioPanel"></div>
      <div className="misPersonajesPanel">
        <h5>Mis Personajes</h5>
        <button onClick={verPersonajes}>Mis personajes</button>
      </div>
      <div className="divSeparadorInicioPanel"></div>
      <div className="soporteInicioPanel">
        {/*Redirige al form de soporte */}
        <h5>Soporte</h5>
        <Link to={"/panel-usuario/historialDeSoportes"}>Nuevo soporte</Link>
      </div>
      <div className="divSeparadorInicioPanel"></div>
      <div className="ayudaInicioPanel">
        {/*Redirige al form de reportar error ( o podria ser al link del discord en el channel de reportar errores) */}
        <h5>Ayuda a la comunidad</h5>
        <a
          href="https://discord.com/channels/860283261539450881/976668226299756545"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reportar un error
        </a>
      </div>
      <div className="divSeparadorInicioPanel"></div>
      <div className="configInicioPanel">
        <Link to={"/panel-usuario/configuracion"}>
          Configuracion de la cuenta
        </Link>
      </div>
    </div>
  );
};

export { PanelComponent };
