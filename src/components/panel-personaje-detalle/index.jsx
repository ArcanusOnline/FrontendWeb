import "./style.css";
import { traerInfoIndividual } from "../../querys/scripts";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { devolverExp } from "../../assets/indiceExp";
import { calcularExp } from "../../assets/calculadoraExp";
import { transcribirSkill } from "../../assets/indicesSkill";
import { useEffect, useState } from "react";
import { colorBanderin } from "../../assets/functions";

const PanelPersonajeDetalle = ({ namePersonaje, onClose }) => {
  const [personajeInfo, setPersonajeInfo] = useState();
  const [tablaHechis, setTablaHechis] = useState();
  const [tablaObjBove, setTablaObjBove] = useState();
  const [tablaObjInven, setTablaObjInven] = useState();
  const [tablaDatos, setTablaDatos] = useState();
  const [estadoCivil, setEstadoCivil] = useState();
  const [faccion, setFaccion] = useState(null);
  const [penas, setPenas] = useState();
  const [baneos, setBaneos] = useState();
  const [skills, setSkills] = useState();
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarSkills, setMostrarSkills] = useState(false);
  const [mostrarInventario, setMostrarInventario] = useState(false);
  const [mostrarBoveda, setMostrarBoveda] = useState(false);
  const [mostrarHechizos, setMostrarHechizos] = useState(false);
  const oroFormatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  function getEstadoCivil(data) {
    if (data.PromedioB < 0) {
      setEstadoCivil({ key: "criminal", label: "Criminal" });
    } else {
      setEstadoCivil({ key: "ciudadano", label: "Ciudadano" });
    }
  }
  function getFaccion(data) {
    if (data.EjercitoCaosB === 1 && data.PromedioB < 0) {
      setFaccion({ key: "caos", label: "Legión Oscura" });
    }
    if (data.EjercitoRealB === 1 && data.PromedioB >= 0) {
      setFaccion({ key: "real", label: "Ejército Real" });
    }
  }
  useEffect(() => {
    if (namePersonaje) {
      async function traerPersonajeSeleccionado() {
        let result = await traerInfoIndividual(namePersonaje);
        setPersonajeInfo(result);
        setTablaHechis(result.queryHechis[0]);
        setTablaObjBove(result.queryOBoveda[0]);
        setTablaObjInven(result.queryOInventario[0]);
        setTablaDatos(result.queryStatsPersonaje[0]);
        setSkills(result.queryInfoSkills[0]);
        setPenas(
          typeof result.queryStatsPersonaje[0].PenasasB === "string"
            ? result.queryStatsPersonaje[0].PenasasB.split("-")
            : [],
        );
        setBaneos(
          typeof result.queryStatsPersonaje[0].BanrazB === "string"
            ? result.queryStatsPersonaje[0].BanrazB.split("-")
            : [],
        );
        getEstadoCivil(result.queryStatsPersonaje[0]);
        getFaccion(result.queryStatsPersonaje[0]);
      }
      traerPersonajeSeleccionado();
    }
  }, [namePersonaje]);
  const renderItemInventario = (item) => {
    const [nombre, cantidad] = item.split(" - ");

    return (
      <span className="item-inventario">
        <span className="item-nombre">{nombre}</span>
        {cantidad && <span className="item-cantidad">{cantidad}</span>}
      </span>
    );
  };
  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="panel-detalle" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose}>
          ✕
        </button>

        {tablaDatos && (
          <div className="panel-header">
            <img src={`/heads/${tablaDatos.HeadB}.png`} alt="" />
            <div>
              <h2 style={{ color: colorBanderin(tablaDatos) }}>
                {tablaDatos.NickB}
              </h2>
              <p className="panel-subtitle">
                Nivel {tablaDatos.ELVB}
                {" · "}
                Exp:{" "}
                {tablaDatos.ELVB >= 47 ? (
                  <span className="exp-max">Nivel Máximo</span>
                ) : (
                  <span className="exp-normal">
                    {oroFormatter.format(tablaDatos.EXPB)} /
                    {oroFormatter.format(devolverExp(tablaDatos.ELVB))} [
                    {calcularExp(tablaDatos.ELVB, tablaDatos.EXPB)}%]
                  </span>
                )}
              </p>

              <p className="panel-subtitle secondary">
                {tablaDatos.ClaseB} {tablaDatos.RazaB}
                {" · "}
                <span className={`status ${estadoCivil.key}`}>
                  {estadoCivil.label}
                </span>
                {faccion && (
                  <span className={`status ${faccion.key}`}>
                    {faccion.label}
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {personajeInfo ? (
          <div className="main-panel-container">
            <div className="panel-stats">
              <div className="main-stats">
                <p>
                  Vida: {tablaDatos.MaxHPB} [
                  {(() => {
                    let promedio = obtenerPromedio(
                      tablaDatos.ClaseB,
                      tablaDatos.RazaB,
                    );
                    let vidaPromedioReal =
                      promedio * (tablaDatos.ELVB - 1) + 20;

                    const upsPj = tablaDatos.MaxHPB - vidaPromedioReal;
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
                  <b>Mana:</b> {tablaDatos.MaxMANB}
                </p>
                <p>
                  <b>Fuerza:</b> {tablaDatos.AT1}
                </p>
                <p>
                  <b>Agilidad:</b> {tablaDatos.AT2}
                </p>
                <p>
                  <b>Inteligencia:</b> {tablaDatos.AT3}
                </p>
                <p>
                  <b>Carisma:</b> {tablaDatos.AT4}
                </p>
                <p>
                  <b>Constitucion:</b> {tablaDatos.AT5}
                </p>
                <p>
                  <b>Criaturas Matadas:</b> {tablaDatos.NpcsMuertesB}
                </p>
              </div>
              <div className="atributos">
                {" "}
                <p>
                  <b>Ciudadanos Matados:</b> {tablaDatos.CiudMatadosB}
                </p>
                <p>
                  <b>Criminales Matados:</b> {tablaDatos.CrimMatadosB}
                </p>
                <p>
                  <b>Asesino:</b> {tablaDatos.AsesinoB}
                </p>
                <p>
                  <b>Bandido:</b> {tablaDatos.BandidoB}
                </p>
                <p>
                  <b>Noble:</b> {tablaDatos.NoblesB}
                </p>
                <p>
                  <b>Burguesía:</b> {tablaDatos.BurguesiaB}
                </p>
                <p>
                  <b>Plebe:</b> {tablaDatos.PlebeB}
                </p>
                <p>
                  <b>Ladron:</b> {tablaDatos.LadronesB}
                </p>
              </div>
            </div>
            <div className="infoClanPersonaje">
              <h3>Información de Clan</h3>
              <p>
                {tablaDatos.ClanFundado ? (
                  <>
                    Fundó el clan <b>{tablaDatos.ClanFundado}</b> y{" "}
                    {tablaDatos.Nombre ? (
                      <>
                        actualmente pertenece al clan <b>{tablaDatos.Nombre}</b>
                      </>
                    ) : (
                      "actualmente no participa de ningún clan"
                    )}
                  </>
                ) : (
                  <>
                    No fundó ningún clan y{" "}
                    {tablaDatos.Nombre ? (
                      <>
                        actualmente pertenece al clan <b>{tablaDatos.Nombre}</b>
                      </>
                    ) : (
                      "actualmente no participa de ningún clan"
                    )}
                  </>
                )}
              </p>
            </div>
            <div className="infoClanPersonaje">
              <h3>Faccion</h3>
              <p>
                {tablaDatos
                  ? tablaDatos.EjercitoCaosB === 0 &&
                    tablaDatos.EjercitoRealB === 0
                    ? "No pertenece a ninguna facción"
                    : tablaDatos.EjercitoCaosB === 1
                      ? "Pertenece a la Legión Oscura"
                      : "Pertenece a la Armada Real"
                  : "Cargando datos..."}
              </p>
            </div>

            <div className="info-historial-personaje">
              <h3>Historial de Penas y Baneos</h3>

              <table className="historial-table">
                <thead>
                  <tr>
                    <th>Penas</th>
                    <th>Baneos</th>
                  </tr>
                </thead>
                <tbody>
                  {penas && penas.length > 1 ? (
                    penas.slice(1).map((pena, idx) => (
                      <tr key={`pena-${idx}`}>
                        <td>{pena}</td>

                        {idx === 0 && (
                          <td rowSpan={penas.length - 1}>
                            {baneos && baneos.length > 1 ? (
                              baneos
                                .slice(1)
                                .map((baneo, i) => (
                                  <div key={`baneo-${i}`}>{baneo}</div>
                                ))
                            ) : (
                              <span className="historial-vacio">
                                Nunca fue baneado
                              </span>
                            )}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="historial-vacio">No posee penas</td>
                      <td className="historial-vacio">
                        {baneos && baneos.length > 1
                          ? baneos
                              .slice(1)
                              .map((baneo, i) => (
                                <div key={`baneo-${i}`}>{baneo}</div>
                              ))
                          : "Nunca fue baneado"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              className="mercado-toggle-button"
              onClick={() => setMostrarSkills((v) => !v)}
            >
              {mostrarSkills ? "Ocultar Skills" : "Ver Skills"}
            </button>
            {mostrarSkills && (
              <div className="info-skills-personaje">
                <h3>Skills</h3>

                <table className="skills-table">
                  <tbody>
                    {skills ? (
                      (() => {
                        const entries = Object.entries(skills);
                        const chunks = [];
                        for (let i = 0; i < entries.length; i += 2) {
                          chunks.push(entries.slice(i, i + 2));
                        }

                        return chunks.map((pair, rowIndex) => (
                          <tr key={`skill-row-${rowIndex}`}>
                            {pair.map(([key, value], cellIndex) => (
                              <td key={`skill-${cellIndex}`}>
                                <span className="skill-name">
                                  {transcribirSkill(key)}
                                </span>
                                <span className="skill-value">{value}</span>
                              </td>
                            ))}
                            {pair.length === 1 && <td />}
                          </tr>
                        ));
                      })()
                    ) : (
                      <tr>
                        <td colSpan={2} className="skills-vacio">
                          No hay datos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <button
              className="mercado-toggle-button"
              onClick={() => setMostrarInventario((v) => !v)}
            >
              {mostrarInventario ? "Ocultar inventario" : "Ver inventario"}
            </button>
            {mostrarInventario && (
              <div className="info-skills-personaje">
                <h3>Inventario</h3>
                <table className="skills-table">
                  <tbody>
                    {tablaObjInven ? (
                      (() => {
                        // tablaObjInven ES UN OBJETO
                        const objetosInventario = Object.values(
                          tablaObjInven,
                        ).filter((valor) => valor && valor !== "");

                        if (objetosInventario.length === 0) {
                          return (
                            <tr>
                              <td colSpan={2} className="no-data-cell">
                                No hay objetos en el inventario
                              </td>
                            </tr>
                          );
                        }

                        const filas = [];
                        for (let i = 0; i < objetosInventario.length; i += 2) {
                          const primero = objetosInventario[i] || "";
                          const segundo = objetosInventario[i + 1] || "";

                          filas.push(
                            <tr key={`inventario-${i}`}>
                              {primero && (
                                <td>{renderItemInventario(primero)}</td>
                              )}
                              {segundo && (
                                <td>{renderItemInventario(segundo)}</td>
                              )}
                            </tr>,
                          );
                        }

                        return filas;
                      })()
                    ) : (
                      <tr>
                        <td colSpan={2} className="no-data-cell">
                          No hay objetos en el inventario
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <button
              className="mercado-toggle-button"
              onClick={() => setMostrarBoveda((v) => !v)}
            >
              {mostrarBoveda ? "Ocultar Boveda" : "Ver Boveda"}
            </button>
            {mostrarBoveda && (
              <div className="info-skills-personaje">
                <h3>Boveda</h3>
                <table className="skills-table">
                  <tbody>
                    {tablaObjBove ? (
                      (() => {
                        // tablaObjBove ES UN OBJETO
                        const objetosBoveda = Object.values(
                          tablaObjBove,
                        ).filter((valor) => valor && valor !== "");

                        if (objetosBoveda.length === 0) {
                          return (
                            <tr>
                              <td colSpan={2} className="no-data-cell">
                                No hay objetos en la boveda
                              </td>
                            </tr>
                          );
                        }

                        const filas = [];
                        for (let i = 0; i < objetosBoveda.length; i += 2) {
                          const primero = objetosBoveda[i] || "";
                          const segundo = objetosBoveda[i + 1] || "";

                          filas.push(
                            <tr key={`inventario-${i}`}>
                              {primero && (
                                <td>{renderItemInventario(primero)}</td>
                              )}
                              {segundo && (
                                <td>{renderItemInventario(segundo)}</td>
                              )}
                            </tr>,
                          );
                        }

                        return filas;
                      })()
                    ) : (
                      <tr>
                        <td colSpan={2} className="no-data-cell">
                          No hay objetos en la boveda
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <button
              className="mercado-toggle-button"
              onClick={() => setMostrarHechizos((v) => !v)}
            >
              {mostrarHechizos ? "Ocultar Hechizos" : "Ver Hechizos"}
            </button>
            {mostrarHechizos && (
              <div className="info-skills-personaje">
                <h3>Hechizos</h3>
                <table className="skills-table">
                  <tbody>
                    {tablaHechis ? (
                      (() => {
                        // tablaHechis ES UN OBJETO
                        const hechizos = Object.values(tablaHechis).filter(
                          (valor) => valor && valor !== "",
                        );

                        if (hechizos.length === 0) {
                          return (
                            <tr>
                              <td colSpan={2} className="no-data-cell">
                                El personaje no posee hechizos
                              </td>
                            </tr>
                          );
                        }

                        const filas = [];
                        for (let i = 0; i < hechizos.length; i += 2) {
                          const primero = hechizos[i] || "";
                          const segundo = hechizos[i + 1] || "";

                          filas.push(
                            <tr key={`inventario-${i}`}>
                              {primero && <td>{primero}</td>}
                              {segundo && <td>{segundo}</td>}
                            </tr>,
                          );
                        }

                        return filas;
                      })()
                    ) : (
                      <tr>
                        <td colSpan={2} className="no-data-cell">
                          El personaje no posee hechizos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="panel-loading">Cargando estadísticas...</div>
        )}
      </div>
    </div>
  );
};

export { PanelPersonajeDetalle };
