import "./style.css";
import { useState, useEffect } from "react";
import {
  traerPersonajesPublicados,
  personajePublicadosPorCuenta,
  personajesPorCuenta,
} from "../../querys/scripts";
import { obtenerPromedio } from "../../assets/calculadoraVida";
import { PanelPersonajeDetalle } from "../../components";
import {
  PanelIntercambioPersonaje,
  PanelCompraPersonaje,
} from "../../components";
import { useRedireccionar, colorBanderin } from "../../assets/functions";
import { useAuth } from "../../useContext/useContext";

const MercadoPage = () => {
  const [personajes, setPersonajes] = useState([]);
  const [pjSeleccionado, setPjSeleccionado] = useState(null);
  const [publicados, setPublicados] = useState(null);
  const [pjsPorCuenta, setPersonajesPorCuenta] = useState([]);
  const [pjIntercambio, setPjIntercambio] = useState(null);
  const [pjVenta, setPjVenta] = useState(null);

  // Estados de tabs
  const [tabPrincipal, setTabPrincipal] = useState("personajes"); // 'personajes' | 'objetos'
  const [tabPersonajes, setTabPersonajes] = useState("intercambio"); // 'intercambio' | 'venta-oro' | 'venta-real'
  const [tabObjetos, setTabObjetos] = useState("venta-oro"); // 'venta-oro' | 'venta-real'

  const [filtros, setFiltros] = useState({
    clase: "todas",
    raza: "todas",
    nivelMin: "",
    nivelMax: "",
    ordenPrecio: "ninguno",
  });

  const { token } = useAuth();
  const redireccionar = useRedireccionar();

  useEffect(() => {
    async function traerPersonajes() {
      let result = await traerPersonajesPublicados();
      let pjsPublicados = await personajePublicadosPorCuenta(token);
      let pjsCuenta = await personajesPorCuenta(token);
      let data = pjsPublicados.data;

      setPublicados(Array.isArray(data) ? data : []);
      if (Array.isArray(result)) {
        setPersonajes(result);
      }
      if (Array.isArray(pjsCuenta)) {
        setPersonajesPorCuenta(pjsCuenta);
      }
    }
    traerPersonajes();
  }, []);

  function actualizarFiltro(campo, valor) {
    setFiltros((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  // Filtrar personajes según tab activo
  const personajesFiltrados = personajes
    .filter((p) => {
      // Filtrar por tipo según tab
      if (tabPersonajes === "intercambio" && p.TipoVenta !== "intercambio")
        return false;
      if (
        tabPersonajes === "venta-oro" &&
        (p.TipoVenta !== "venta" || p.Moneda !== "oro")
      )
        return false;
      if (
        tabPersonajes === "venta-real" &&
        (p.TipoVenta !== "venta" || p.Moneda !== "ars")
      )
        return false;

      // Filtros adicionales
      if (filtros.clase !== "todas" && p.Clase !== filtros.clase) return false;
      if (filtros.raza !== "todas" && p.Raza !== filtros.raza) return false;
      if (filtros.nivelMin && p.Nivel < filtros.nivelMin) return false;
      if (filtros.nivelMax && p.Nivel > filtros.nivelMax) return false;

      return true;
    })
    .sort((a, b) => {
      if (filtros.ordenPrecio === "asc") return a.Precio - b.Precio;
      if (filtros.ordenPrecio === "desc") return b.Precio - a.Precio;
      return 0;
    });
  const misNicks = new Set(pjsPorCuenta.map((p) => p.NickB));
  return (
    <div className="mercado-container">
      <h1 className="mercado-title">Mercado de Arcanus Online</h1>

      {/* Tabs principales */}
      <div className="tabs-principales">
        <button
          className={`tab-principal ${tabPrincipal === "personajes" ? "active" : ""}`}
          onClick={() => setTabPrincipal("personajes")}
        >
          ⚔️ Mercado de Personajes
        </button>
        <button
          className={`tab-principal ${tabPrincipal === "objetos" ? "active" : ""}`}
          onClick={() => setTabPrincipal("objetos")}
        >
          🛡️ Mercado de Objetos
        </button>
      </div>

      {/* Layout con tabs laterales y contenido */}
      <div className="mercado-layout">
        {/* Tabs laterales */}
        <aside className="tabs-laterales">
          {tabPrincipal === "personajes" ? (
            <>
              <button
                className={`tab-lateral ${tabPersonajes === "intercambio" ? "active" : ""}`}
                onClick={() => setTabPersonajes("intercambio")}
              >
                🔄 Intercambios
              </button>
              <button
                className={`tab-lateral ${tabPersonajes === "venta-oro" ? "active" : ""}`}
                onClick={() => setTabPersonajes("venta-oro")}
              >
                🪙 Venta (Oro)
              </button>
              <button
                className={`tab-lateral ${tabPersonajes === "venta-real" ? "active" : ""}`}
                onClick={() => setTabPersonajes("venta-real")}
              >
                💵 Venta (ARS)
              </button>
            </>
          ) : (
            <>
              <button
                className={`tab-lateral ${tabObjetos === "venta-oro" ? "active" : ""}`}
                onClick={() => setTabObjetos("venta-oro")}
              >
                🪙 Venta (Oro)
              </button>
              <button
                className={`tab-lateral ${tabObjetos === "venta-real" ? "active" : ""}`}
                onClick={() => setTabObjetos("venta-real")}
              >
                💵 Venta (ARS)
              </button>
            </>
          )}
        </aside>

        {/* Contenido principal */}
        <main className="mercado-contenido">
          {/* Filtros - Solo para personajes */}
          {tabPrincipal === "personajes" && (
            <div className="mercado-filtros">
              <div className="filtro-grupo">
                <label className="filtro-label">Clase</label>
                <select
                  className="filtro-select"
                  value={filtros.clase}
                  onChange={(e) => actualizarFiltro("clase", e.target.value)}
                >
                  <option value="todas">Todas las clases</option>
                  <option value="Guerrero">⚔️ Guerrero</option>
                  <option value="Mago">🔮 Mago</option>
                  <option value="Clerigo">✨ Clérigo</option>
                </select>
              </div>

              <div className="filtro-grupo">
                <label className="filtro-label">Raza</label>
                <select
                  className="filtro-select"
                  value={filtros.raza}
                  onChange={(e) => actualizarFiltro("raza", e.target.value)}
                >
                  <option value="todas">Todas las razas</option>
                  <option value="Humano">👤 Humano</option>
                  <option value="ELFO">🧝 Elfo</option>
                  <option value="Enano">🧔 Enano</option>
                </select>
              </div>

              <div className="filtro-grupo filtro-rango">
                <label className="filtro-label">Rango de Nivel</label>
                <div className="filtro-rango-inputs">
                  <input
                    type="number"
                    className="filtro-input"
                    placeholder="Min"
                    min="1"
                    value={filtros.nivelMin}
                    onChange={(e) =>
                      actualizarFiltro("nivelMin", e.target.value)
                    }
                  />
                  <span className="filtro-separador">-</span>
                  <input
                    type="number"
                    className="filtro-input"
                    placeholder="Max"
                    min="1"
                    value={filtros.nivelMax}
                    onChange={(e) =>
                      actualizarFiltro("nivelMax", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="filtro-grupo">
                <label className="filtro-label">Ordenar</label>
                <select
                  className="filtro-select"
                  value={filtros.ordenPrecio}
                  onChange={(e) =>
                    actualizarFiltro("ordenPrecio", e.target.value)
                  }
                >
                  <option value="ninguno">Sin ordenar</option>
                  <option value="asc">💰 Menor precio</option>
                  <option value="desc">💎 Mayor precio</option>
                </select>
              </div>

              <button
                className="filtro-reset"
                onClick={() =>
                  setFiltros({
                    clase: "todas",
                    raza: "todas",
                    nivelMin: "",
                    nivelMax: "",
                    ordenPrecio: "ninguno",
                  })
                }
              >
                🔄 Limpiar filtros
              </button>
            </div>
          )}

          {/* Grid de contenido */}
          {tabPrincipal === "personajes" ? (
            <div className="panel-mao-publicaciones-container">
              {personajesFiltrados.length === 0 ? (
                <div className="mensaje-vacio">
                  <p>No hay personajes publicados en esta categoría.</p>
                </div>
              ) : (
                personajesFiltrados.map((p) => (
                  <div
                    key={p.ID}
                    className="mercado-card"
                    onClick={() => setPjSeleccionado(p.Nombre)}
                  >
                    <div className="badge-nivel">{p.Nivel}</div>
                    <span className={`tag-tipo ${p.TipoVenta}`}>
                      {p.TipoVenta === "venta" ? "Venta" : "Intercambio"}
                    </span>

                    <div className="publicacion-name-head-container">
                      <img
                        src={`/heads/${p.Head}.png`}
                        alt="head"
                        className="personaje-head-lista-panel-pjs"
                      />
                      <h3 style={{ color: colorBanderin(p) }}>{p.Nombre}</h3>
                    </div>
                    <p>
                      {p.Clase} {p.Raza}
                    </p>
                    <p>
                      Vida: {p.Vida} [
                      {(() => {
                        let promedio = obtenerPromedio(p.Clase, p.Raza);
                        let vidaPromedioReal = promedio * (p.Nivel - 1) + 20;
                        const upsPj = p.Vida - vidaPromedioReal;
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
                    {p.TipoVenta === "venta" && (
                      <p>
                        <b>Precio:</b> {p.Precio}{" "}
                        {p.Moneda === "oro" ? "oro" : "ARS"}
                      </p>
                    )}
                    <div className="mercado-button-container">
                      <button
                        className="btn-comprar-personaje"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!token) {
                            redireccionar("/cuenta");
                          } else {
                            if (p.TipoVenta === "venta") {
                              setPjVenta(p);
                            } else {
                              setPjIntercambio(p);
                            }
                          }
                        }}
                      >
                        {p.TipoVenta === "venta"
                          ? "Comprar personaje"
                          : "Intercambiar personaje"}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            // Mercado de objetos (placeholder)
            <div className="mensaje-vacio">
              <h2>🛡️ Mercado de Objetos</h2>
              <p>
                {tabObjetos === "venta-oro"
                  ? "Próximamente: Venta de objetos por oro"
                  : "Próximamente: Venta de objetos por dinero real"}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Modales */}
      {pjSeleccionado && (
        <PanelPersonajeDetalle
          namePersonaje={pjSeleccionado}
          onClose={() => setPjSeleccionado(null)}
        />
      )}
      {pjIntercambio && (
        <PanelIntercambioPersonaje
          personajePublicado={pjIntercambio}
          misPersonajes={publicados}
          onClose={() => setPjIntercambio(null)}
        />
      )}
      {pjVenta && (
        <PanelCompraPersonaje
          personajePublicado={pjVenta}
          misPersonajes={pjsPorCuenta}
          onClose={() => setPjVenta(null)}
        />
      )}
    </div>
  );
};

export { MercadoPage };
