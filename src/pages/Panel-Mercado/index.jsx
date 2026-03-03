import "./style.css";
import {
  PostearPersonajeMAO,
  QuitarPersonajeMAO,
  SlidePlaceholder,
  SlidePublicacion,
  RechazarPropuesta,
  AceptarPropuesta,
  TradeCarousel,
} from "../../components";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useRedireccionar } from "../../assets/functions";
import {
  personajesPorCuenta,
  personajePublicadosPorCuenta,
  propuestasRecibidasPendientesPorCuenta,
  propuestasRealizadasPendientesPorCuenta,
  getPaquetesArcanusPoints,
  comprarArcanusPoints,
} from "../../querys/scripts";
import { useAuth } from "../../useContext/useContext";

const PanelMercado = () => {
  const [tabActiva, setTabActiva] = useState("publicaciones"); // 'publicaciones' | 'intercambios' | 'arcanus-points'
  const [agregarPersonaje, setAgregarPersonaje] = useState(false);
  const [personajes, setPersonajes] = useState([]);
  const [propuestaSeleccionada, setPropuestaSeleccionada] = useState("");
  const [publicados, setPublicados] = useState([]);
  const [quitarPersonaje, setQuitarPersonaje] = useState(false);
  const [personajeAQuitar, setPersonajeAQuitar] = useState("");
  const [propuestasEnviadas, setPropuestasEnviadas] = useState([]);
  const [propuestasRecibidas, setPropuestasRecibidas] = useState([]);
  const [rechazarPropuesta, setRechazarPropuesta] = useState(false);
  const [aceptarPropuesta, setAceptarPropuesta] = useState(false);
  const { token, username } = useAuth();
  const { usuario: paramUsuario } = useParams();
  const navigate = useNavigate();
  const redireccionar = useRedireccionar();

  const cargarInformacionMAO = async () => {
    let pjsPublicados = await personajePublicadosPorCuenta(token);
    let propuestasRecibidasPendientes =
      await propuestasRecibidasPendientesPorCuenta(token);
    let propuestasRealizadasPendientes =
      await propuestasRealizadasPendientesPorCuenta(token);
    let paquetesArcanusPoints = await getPaquetesArcanusPoints();

    if (Array.isArray(pjsPublicados?.data)) {
      setPublicados(pjsPublicados.data);
    }
    if (Array.isArray(propuestasRecibidasPendientes.data)) {
      setPropuestasRecibidas(propuestasRecibidasPendientes.data);
    }
    if (Array.isArray(propuestasRealizadasPendientes.data)) {
      setPropuestasEnviadas(propuestasRealizadasPendientes.data);
    }
    if (Array.isArray(paquetesArcanusPoints)) {
      setPaquetes(paquetesArcanusPoints);
    }
  };

  useEffect(() => {
    async function traerPersonajes() {
      if (username !== paramUsuario) {
        return navigate(
          `/panel-de-usuario/lista-de-mis-personajes/${username}`,
          {
            replace: true,
          },
        );
      }
      let personajesCuenta = await personajesPorCuenta(token);

      if (Array.isArray(personajesCuenta)) {
        if (personajesCuenta.length > 0) {
          setPersonajes(personajesCuenta);
        }
      }
      await cargarInformacionMAO();
    }
    traerPersonajes();
  }, [navigate]);

  return (
    <div className="panel-mao-container">
      <div className="panel-mao-header">
        <h1>Panel de Mercado de {username}</h1>
        <p className="panel-subtitle-mercado">
          Gestiona tus publicaciones e intercambios
        </p>
      </div>

      {/* Tabs */}
      <div className="panel-tabs">
        <button
          className={`tab-button ${tabActiva === "publicaciones" ? "active" : ""}`}
          onClick={() => setTabActiva("publicaciones")}
        >
          <span className="tab-icon">📝</span>
          Mis Publicaciones
        </button>

        <button
          className={`tab-button ${tabActiva === "intercambios" ? "active" : ""}`}
          onClick={() => setTabActiva("intercambios")}
        >
          <span className="tab-icon">🔄</span>
          Intercambios
          {(propuestasEnviadas.length > 0 ||
            propuestasRecibidas.length > 0) && (
            <span className="tab-badge">
              {propuestasEnviadas.length + propuestasRecibidas.length}
            </span>
          )}
        </button>
      </div>

      {/* Contenido según tab activa */}
      <div className="panel-content">
        {/* Tab: Publicaciones */}
        {tabActiva === "publicaciones" && (
          <div className="tab-panel">
            <div className="section-header">
              <h2>Tus personajes publicados</h2>
              <p>Agrega y quita personajes del Mercado de Arcanus.</p>
            </div>

            <div className="panel-publicaciones-grid">
              {Array.from({ length: 5 }).map((_, index) => {
                const pj = publicados[index];
                return pj ? (
                  <SlidePublicacion
                    key={pj.Nombre}
                    personaje={pj}
                    onQuitar={() => {
                      setPersonajeAQuitar(pj.Nombre);
                      setQuitarPersonaje(true);
                    }}
                  />
                ) : (
                  <SlidePlaceholder
                    key={`empty-${index}`}
                    onAgregar={() => setAgregarPersonaje(true)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Tab: Intercambios */}
        {tabActiva === "intercambios" && (
          <div className="tab-panel">
            <div className="section-header">
              <h2>Gestión de Intercambios</h2>
              <p>Revisa las propuestas que enviaste y las que recibiste.</p>
            </div>

            <div className="intercambios-grid">
              <TradeCarousel
                titulo="Propuestas Enviadas"
                type="enviadas"
                propuestas={propuestasEnviadas}
                textoVacio="No enviaste propuestas todavía."
                puedeAceptar={(p) => p.estado === "pendiente"}
                puedeRechazar={(p) => p.estado === "pendiente"}
                onAceptar={(p) => {
                  setPropuestaSeleccionada(p);
                  setAceptarPropuesta(true);
                }}
                onRechazar={(p) => {
                  setPropuestaSeleccionada(p);
                  setRechazarPropuesta(true);
                }}
              />

              <TradeCarousel
                titulo="Propuestas Recibidas"
                type="recibidas"
                propuestas={propuestasRecibidas}
                textoVacio="No recibiste propuestas todavía."
                onAceptar={(p) => {
                  setPropuestaSeleccionada(p);
                  setAceptarPropuesta(true);
                }}
                onRechazar={(p) => {
                  setPropuestaSeleccionada(p);
                  setRechazarPropuesta(true);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Botón volver */}
      <div className="lista-panel-contenedor-botones">
        <button
          className="btn-volver-lista-panel-pjs"
          onClick={() => redireccionar("/panel-de-usuario")}
        >
          Volver
        </button>
      </div>

      {/* Modales */}
      <PostearPersonajeMAO
        visible={agregarPersonaje}
        setVisible={setAgregarPersonaje}
        nombreCuenta={username}
        personajes={personajes}
      />
      <QuitarPersonajeMAO
        visible={quitarPersonaje}
        setVisible={setQuitarPersonaje}
        personajeNick={personajeAQuitar}
        onSuccess={cargarInformacionMAO}
      />
      <RechazarPropuesta
        visible={rechazarPropuesta}
        setVisible={setRechazarPropuesta}
        propuesta={propuestaSeleccionada}
        onSuccess={cargarInformacionMAO}
      />
      <AceptarPropuesta
        visible={aceptarPropuesta}
        setVisible={setAceptarPropuesta}
        propuesta={propuestaSeleccionada}
      />
      <Outlet />
    </div>
  );
};

export { PanelMercado };
