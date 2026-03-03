import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";
import { useState, useEffect } from "react";
import { personajesPorCuenta, bloquearPersonaje } from "../../querys/scripts";
import { calcularExp } from "../../assets/calculadoraExp";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { devolverExp } from "../../assets/indiceExp";
import { useRedireccionar, colorBanderin } from "../../assets/functions";
import {
  BorrarPersonaje,
  QuitarPersonaje,
  AgregarPersonaje,
  BloquearPersonaje,
  PanelPersonajeDetalle,
} from "../../components";

import "./style.css";
import { useAuth } from "../../useContext/useContext";

const ListadoPersonajes = () => {
  const { token, username } = useAuth();
  const { usuario: paramUsuario } = useParams();
  const redireccionar = useRedireccionar();
  const navigate = useNavigate();
  const [personajes, setPersonajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [estatusBloq, setEstatusBloq] = useState(0);
  const [quitarPersonaje, setQuitarPersonaje] = useState(false);
  const [bloquearPersonaje, setBloquearPersonaje] = useState(false);
  const [borrarPersonaje, setBorrarPersonaje] = useState(false);
  const [agregarPersonaje, setAgregarPersonaje] = useState(false);
  const [pjSeleccionado, setPjSeleccionado] = useState(null);

  let [nombrePj, setNombrePj] = useState("");
  const traerPersonajes = async () => {
    if (username !== paramUsuario) {
      return navigate(`/panel-de-usuario/lista-de-mis-personajes/${username}`, {
        replace: true,
      });
    }
    let data = await personajesPorCuenta(token);
    // Si data es un array
    if (Array.isArray(data)) {
      if (data.length === 0) {
        setMensaje("No tienes personajes.");
        setPersonajes([]);
      } else {
        setPersonajes(data);
      }
    } else if (data && data.message) {
      // Si data es un objeto con un mensaje
      setMensaje(data.message);
    } else {
      setMensaje("Error al cargar personajes.");
    }
  };
  useEffect(() => {
    traerPersonajes();
  }, [navigate]);
  const oroFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="container-lista-panel-pjs">
      {/* Header fijo arriba con todo */}
      <div className="header-personajes">
        <div className="header-info">
          <h1 className="titulo-seccion">Mis Personajes</h1>
          <span className="contador-personajes">{personajes.length} / 10</span>
        </div>

        <div className="header-actions">
          <button
            className="btn-agregar-header"
            onClick={() => setAgregarPersonaje(true)}
          >
            + Nuevo Personaje
          </button>
          <button
            className="btn-volver-header"
            onClick={() => redireccionar("/panel-de-usuario")}
          >
            ← Volver
          </button>
        </div>
      </div>
      {mensaje ? (
        <div className="mensaje-vacio-container">
          <h1 className="mensaje-lista-panel-pjs">{mensaje}</h1>
        </div>
      ) : (
        <div className="personajes-grid">
          {personajes.map((elem, index) => (
            <div key={index} className="personaje-card-lista-panel-pjs">
              <div
                className={`personaje-info-lista-panel-pjs ${
                  elem.Bloqueado == 1 ? "bloqueado" : ""
                }`}
              >
                <div className="personaje-header-lista-panel-pjs">
                  <img
                    src={`/heads/${elem.HeadB}.png`}
                    alt="head"
                    className="personaje-head-lista-panel-pjs"
                  />
                  <span
                    className="personaje-nick-lista-panel-pjs"
                    style={{ color: colorBanderin(elem) }}
                  >
                    {elem.NickB}
                  </span>
                </div>

                <div className="personaje-detalles-lista-panel-pjs">
                  <p>
                    {`${(elem.ClaseB || "SIN CLASE").toUpperCase()} ${(
                      elem.RazaB || "SIN RAZA"
                    ).toUpperCase()} nivel ${elem.ELVB}`}
                  </p>

                  <p>
                    Estado:{" "}
                    <span className="estado-offline-lista-panel-pjs">
                      {elem.Online === 0 ? "Offline" : "Online"}
                    </span>
                  </p>

                  <p>
                    Vida: {elem.MaxHPB} [
                    {(() => {
                      const diferencia = (
                        (elem.MaxHPB - 20) /
                        elem.ELVB
                      ).toFixed(0);
                      const diferenciaNumber = Number(diferencia);
                      let promedio = obtenerPromedio(elem.ClaseB, elem.RazaB);
                      let vidaPromedioReal = promedio * (elem.ELVB - 1) + 20;

                      const upsPj = elem.MaxHPB - vidaPromedioReal;
                      return upsPj > 0 ? (
                        <span style={{ color: "lightgreen" }}>+{upsPj}</span>
                      ) : upsPj === 0 ? (
                        <span style={{ color: "white" }}>{upsPj}</span>
                      ) : (
                        <span style={{ color: "red" }}>{upsPj}</span>
                      );
                    })()}
                    ]
                  </p>

                  <p>
                    Exp:{" "}
                    {elem.ELVB >= 47
                      ? "Nivel Máximo"
                      : `${oroFormatter.format(elem.EXPB)}/${oroFormatter.format(
                          devolverExp(elem.ELVB),
                        )} [${calcularExp(elem.ELVB, elem.EXPB)}%]`}
                  </p>
                  <p>
                    Oro: {oroFormatter.format(elem.GLDB + elem.BANCOB)} (
                    {oroFormatter.format(elem.GLDB)} en billetera y{" "}
                    {oroFormatter.format(elem.BANCOB)} en banco)
                  </p>
                </div>
              </div>

              <div className="personaje-actions-lista-panel-pjs">
                <button
                  className="btn-link-lista-panel-pjs"
                  state={{
                    datos: elem,
                    head: elem.HeadB,
                    color: colorBanderin(elem),
                  }}
                  onClick={() => setPjSeleccionado(elem.NickB)}
                >
                  Ver estadísticas
                </button>
                <button
                  className="btn-link-lista-panel-pjs warning"
                  onClick={() => {
                    setQuitarPersonaje(!quitarPersonaje);
                    setNombrePj(elem.NickB);
                  }}
                >
                  Quitar personaje
                </button>
                <button
                  className="btn-link-lista-panel-pjs danger"
                  onClick={() => {
                    setBloquearPersonaje(!bloquearPersonaje);
                    setNombrePj(elem.NickB);
                    setEstatusBloq(elem.Bloqueado == 0 ? 1 : 0);
                  }}
                >
                  {elem.Bloqueado == 0
                    ? "Bloquear personaje"
                    : "Desbloquear personaje"}
                </button>
                <button
                  className="btn-link-lista-panel-pjs danger"
                  onClick={() => {
                    setBorrarPersonaje(!borrarPersonaje);
                    setNombrePj(elem.NickB);
                  }}
                >
                  Borrar personaje
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {pjSeleccionado && (
        <PanelPersonajeDetalle
          namePersonaje={pjSeleccionado}
          onClose={() => setPjSeleccionado(null)}
        />
      )}
      <QuitarPersonaje
        visible={quitarPersonaje}
        setVisible={setQuitarPersonaje}
        nombrePj={nombrePj}
        onSuccess={traerPersonajes}
      />
      <BloquearPersonaje
        visible={bloquearPersonaje}
        setVisible={setBloquearPersonaje}
        nombrePj={nombrePj}
        estadoBloq={estatusBloq}
        onSuccess={traerPersonajes}
      />
      <BorrarPersonaje
        visible={borrarPersonaje}
        setVisible={setBorrarPersonaje}
        nombrePj={nombrePj}
      />
      <AgregarPersonaje
        visible={agregarPersonaje}
        setVisible={setAgregarPersonaje}
        nombreCuenta={paramUsuario}
      />

      <Outlet />
    </div>
  );
};

export { ListadoPersonajes };
