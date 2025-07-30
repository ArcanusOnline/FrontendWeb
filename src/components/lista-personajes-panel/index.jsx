import {
  NavLink,
  useLocation,
  useParams,
  Outlet,
  useNavigate,
} from "react-router";
import { useState, useEffect } from "react";
import { protectedName } from "../../assets/protectedName";
import { personajesPorCuenta, bloquearPersonaje } from "../../querys/scripts";
import { calcularExp } from "../../assets/calculadoraExp";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { devolverExp } from "../../assets/indiceExp";
import {
  BorrarPersonaje,
  QuitarPersonaje,
  AgregarPersonaje,
} from "../../components";

import "./style.css";

const ListadoPersonajes = () => {
  const { state } = useLocation();
  const { usuario: paramUsuario } = useParams();
  const navigate = useNavigate();
  const response = state?.response; // Evita error si state es null
  const [personajes, setPersonajes] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [quitarPersonaje, setQuitarPersonaje] = useState(false);
  const [borrarPersonaje, setBorrarPersonaje] = useState(false);
  const [agregarPersonaje, setAgregarPersonaje] = useState(false);

  let [nombrePj, setNombrePj] = useState("");

  useEffect(() => {
    async function traerPersonajes() {
      const tokenUsername = await protectedName(response);
      if (tokenUsername !== paramUsuario) {
        return navigate(
          `/panel-de-usuario/lista-de-mis-personajes/${tokenUsername}`,
          {
            replace: true,
          }
        );
      }
      let data = await personajesPorCuenta(response);

      // Si data es un array
      if (Array.isArray(data)) {
        if (data.length === 0) {
          setMensaje("No tienes personajes.");
        } else {
          setPersonajes(data);
        }
      } else if (data && data.message) {
        // Si data es un objeto con un mensaje
        setMensaje(data.message);
      } else {
        setMensaje("Error al cargar personajes.");
      }
    }
    traerPersonajes();
  }, [response, paramUsuario, navigate]);

  const oroFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return (
    <div className="container-lista-panel-pjs">
      {mensaje ? (
        <h1 className="mensaje-lista-panel-pjs">{mensaje}</h1>
      ) : (
        personajes.map((elem, index) => (
          <div key={index} className="personaje-card-lista-panel-pjs">
            <div className="personaje-info-lista-panel-pjs">
              <div className="personaje-header-lista-panel-pjs">
                <img
                  src={`/heads/${elem.HeadB}.png`}
                  alt="head"
                  className="personaje-head-lista-panel-pjs"
                />
                <span className="personaje-nick-lista-panel-pjs">
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
                    const diferencia = ((elem.MaxHPB - 20) / elem.ELVB).toFixed(
                      0
                    );
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
                        devolverExp(elem.ELVB)
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
              <NavLink
                className="btn-link-lista-panel-pjs"
                to="infoPersonaje"
                state={{ datos: elem }}
              >
                Ver estadísticas
              </NavLink>
              <button
                className="btn-link-lista-panel-pjs danger"
                onClick={async () => {
                  try {
                    const nuevoEstado = elem.Bloqueado == 0 ? 1 : 0;
                    const data = await bloquearPersonaje({
                      usuario: elem.NickB,
                      status: nuevoEstado,
                    });
                    alert(
                      `${data.message}, debe esperar 1 minuto para poder bloquear/desbloquearlo`
                    );
                    setTimeout(() => {
                      navigate("/panel-de-usuario");
                    }, 2000);
                  } catch (error) {
                    alert("Error al intentar cambiar el estado del personaje.");
                    console.error(error);
                  }
                }}
              >
                {elem.Bloqueado == 0
                  ? "Bloquear personaje"
                  : "Desbloquear personaje"}
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
                  setBorrarPersonaje(!borrarPersonaje);
                  setNombrePj(elem.NickB);
                }}
              >
                Borrar personaje
              </button>
            </div>
          </div>
        ))
      )}

      <QuitarPersonaje
        visible={quitarPersonaje}
        setVisible={setQuitarPersonaje}
        nombrePj={nombrePj}
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

      <button
        className="btn-agregar-lista-panel-pjs"
        onClick={() => setAgregarPersonaje(true)}
      >
        Agregar personaje
      </button>

      <Outlet />
    </div>
  );
};

export { ListadoPersonajes };
