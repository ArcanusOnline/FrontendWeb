import { useState, useEffect } from "react";
import { PanelPersonajeDetalle } from "../panel-personaje-detalle";
import "./style.css";

const TradeCarousel = ({
  titulo,
  type,
  propuestas,
  textoVacio,
  onAceptar,
  onRechazar,
  onInfo,
}) => {
  const [slide, setSlide] = useState(0);
  const [personajeDetalle, setPersonajeDetalle] = useState(null);
  useEffect(() => {
    if (slide >= propuestas.length) {
      setSlide(Math.max(propuestas.length - 1, 0));
    }
  }, [propuestas.length]);

  if (!propuestas || propuestas.length === 0) {
    return (
      <div className="propuesta-panel">
        <h2>{titulo}</h2>
        <p>{textoVacio}</p>
      </div>
    );
  }
  return (
    <div className="propuesta-panel">
      <h2>{titulo}</h2>

      <div className="carousel">
        {/* IZQ */}
        <button
          className="carousel-btn left"
          onClick={() =>
            setSlide((p) => (p === 0 ? propuestas.length - 1 : p - 1))
          }
        >
          ‹
        </button>

        {/* WINDOW */}
        <div className="carousel-window">
          <div
            className="carousel-track"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {propuestas.map((p) => {
              const left =
                type === "enviadas"
                  ? p.personajeOfrecido
                  : p.personajeSolicitado;

              const right =
                type === "enviadas"
                  ? p.personajeSolicitado
                  : p.personajeOfrecido;
              let estadoTexto = "";

              if (p.estado === "lista_para_confirmar") {
                estadoTexto =
                  "Intercambio pendiente de finalización. Puedes reenviar el mail.";
              } else if (type === "recibidas") {
                if (!p.confirmoSolicitado) {
                  estadoTexto = "Debes aceptar la propuesta";
                } else {
                  estadoTexto = `El personaje ${p.personajeOfrecido.NickB.toLowerCase()} debe finalizar el intercambio`;
                }
              } else {
                if (!p.confirmoSolicitado) {
                  estadoTexto = `El personaje ${p.personajeSolicitado.NickB.toLowerCase()} debe aceptar la propuesta`;
                } else {
                  estadoTexto = "Debes finalizar el intercambio";
                }
              }

              let tipoAccion = "aceptar";

              if (p.estado === "lista_para_confirmar") {
                tipoAccion = "reenviar";
              }

              let puedeAceptar = false;

              if (p.estado === "lista_para_confirmar") {
                puedeAceptar = true;
              } else if (type === "recibidas") {
                if (!p.confirmoSolicitado) {
                  puedeAceptar = true;
                }
              } else {
                if (p.confirmoSolicitado) {
                  puedeAceptar = true;
                }
              }
              return (
                <div key={p.id} className="trade-card">
                  <div className="char-card-container">
                    {/* IZQUIERDA */}
                    <div className="char-card">
                      <img
                        src={`/heads/${left.HeadB}.png`}
                        className="char-head"
                      />
                      <span className="nick">{left.NickB}</span>
                      <span className="level">Lvl {left.ELVB}</span>
                    </div>

                    <div className="exchange">
                      <span className="arrow give">←</span>
                      <span className="arrow receive">→</span>
                    </div>

                    {/* DERECHA */}
                    <div className="char-card">
                      <img
                        src={`/heads/${right.HeadB}.png`}
                        className="char-head"
                      />
                      <span className="nick">{right.NickB}</span>
                      <span className="level">Lvl {right.ELVB}</span>
                    </div>
                  </div>{" "}
                  {/* ESTADO */}
                  <div className="trade-status-container">
                    {p.estado && (
                      <span className={`estado ${p.estado}`}>
                        {estadoTexto}
                      </span>
                    )}
                  </div>
                  {/* ACCIONES */}
                  <div className="trade-actions">
                    <button
                      className={`action-btn accept ${tipoAccion === "reenviar" ? "reenviar" : ""}`}
                      disabled={!puedeAceptar}
                      onClick={() => onAceptar?.(p)}
                    >
                      {tipoAccion === "reenviar" ? "📩" : "✓"}
                    </button>

                    <button
                      className="action-btn reject"
                      onClick={() => onRechazar?.(p)}
                    >
                      ✕
                    </button>

                    <button
                      className="action-btn info"
                      onClick={() => {
                        setPersonajeDetalle(right.NickB);
                        onInfo?.(p);
                      }}
                    >
                      ℹ
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DER */}
        <button
          className="carousel-btn right"
          onClick={() =>
            setSlide((p) => (p === propuestas.length - 1 ? 0 : p + 1))
          }
        >
          ›
        </button>
      </div>

      {/* DOTS */}
      {propuestas.length > 1 && (
        <div className="carousel-dots">
          {propuestas.map((_, i) => (
            <span
              key={i}
              className={`dot ${slide === i ? "active" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      )}

      {personajeDetalle && (
        <PanelPersonajeDetalle
          namePersonaje={personajeDetalle}
          onClose={() => setPersonajeDetalle(null)}
        />
      )}
    </div>
  );
};

export { TradeCarousel };
