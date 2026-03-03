import "./style.css";
import { colorBanderin } from "../../assets/functions";

const SlidePublicacion = ({ personaje, onQuitar }) => {
  return (
    <div className="slide-publicacion-modern">
      {/* Badge de tipo (arriba a la derecha) */}
      <span className={`slide-badge ${personaje.TipoVenta.toLowerCase()}`}>
        {personaje.TipoVenta === "venta" ? "💰 Venta" : "🔄 Intercambio"}
      </span>

      {/* Contenido principal */}
      <div className="slide-content">
        {/* Avatar */}
        <div className="slide-avatar-wrapper">
          <img
            src={`/heads/${personaje.Head}.png`}
            alt={personaje.Nombre}
            className="slide-avatar"
          />
        </div>

        {/* Info del personaje */}
        <div className="slide-info-wrapper">
          <h4
            className="slide-nombre"
            style={{ color: colorBanderin(personaje) }}
          >
            {personaje.Nombre}
          </h4>
          <div className="slide-detalles">
            <span className="slide-nivel">Nivel {personaje.Nivel}</span>
            {personaje.Clase && (
              <span className="slide-clase">• {personaje.Clase}</span>
            )}
          </div>
        </div>

        {/* Botón quitar */}
        <button className="btn-quitar-publicacion" onClick={onQuitar}>
          <span className="btn-text">Quitar</span>
        </button>
      </div>
    </div>
  );
};

const SlidePlaceholder = ({ onAgregar }) => {
  return (
    <div className="slide-placeholder-modern" onClick={onAgregar}>
      <div className="placeholder-icon">
        <span className="plus-symbol">+</span>
      </div>
      <div className="placeholder-text">
        <span className="placeholder-title">Agregar personaje</span>
        <span className="placeholder-subtitle">Publicar en el mercado</span>
      </div>
    </div>
  );
};

export { SlidePublicacion, SlidePlaceholder };
