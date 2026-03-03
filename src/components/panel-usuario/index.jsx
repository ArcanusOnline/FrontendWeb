import { Link, useNavigate } from "react-router";
import { useAuth } from "../../useContext/useContext";
import { useState, useEffect } from "react";
import { ArcanusPointsCoin } from "../../ui/arcanusPointsLogo";
import { getAccountData } from "../../querys/scripts";
import "./style.css";

const PanelComponent = () => {
  const { token, username, logout } = useAuth();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [arcanusPoints, setArcanusPoints] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [premiumExpira, setPremiumExpira] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const userData = await getAccountData(token);
        setArcanusPoints(userData.arcanusPoints);
        setIsPremium(userData.tipoCuenta === "PREMIUM");

        if (userData.fechaVencimiento) {
          setPremiumExpira(userData.fechaVencimiento * 1000);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosUsuario();
  }, [token]);

  const verPersonajes = () => {
    const nombreURI = encodeURIComponent(username);
    navigate(`/panel-de-usuario/lista-de-mis-personajes/${nombreURI}`);
  };

  const verMAO = () => {
    const nombreURI = encodeURIComponent(username);
    navigate(`/panel-de-usuario/panel-de-mercado/${nombreURI}`, {
      state: { token },
    });
  };

  const desconectar = async () => {
    setMostrarMensaje(true);
    logout();
    navigate("/");
  };

  const formatearFecha = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const premiumVencido = premiumExpira && new Date(premiumExpira) < new Date();

  return (
    <div className="panel-usuario-container">
      {/* ⭐ CARD SUPERIOR ÚNICA - Todo incluido */}
      <div className="panel-card-superior">
        {/* Sección izquierda: Avatar + Nombre */}
        <div className="superior-seccion-usuario">
          <div className="usuario-avatar">
            <div className="avatar-circle">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="usuario-info">
            <h1 className="usuario-nombre">{username.toUpperCase()}</h1>
            <p className="usuario-ultima-conexion">
              Última conexión: {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>

        {/* Divisor vertical */}
        <div className="divisor-vertical"></div>

        {/* Sección centro: Premium */}
        <div className="superior-seccion-premium">
          <div className="seccion-label">Estado Premium</div>
          <div className="seccion-contenido">
            {isPremium && !premiumVencido ? (
              <>
                <span className="premium-status activo">✓ PREMIUM ACTIVO</span>
                {premiumExpira && (
                  <span className="premium-vence">
                    Vence: {formatearFecha(premiumExpira)}
                  </span>
                )}
              </>
            ) : (
              <span className="premium-status inactivo">✕ NO PREMIUM</span>
            )}
          </div>
          <Link to="/tienda" className="btn-seccion comprar">
            {isPremium && !premiumVencido ? "Renovar" : "Activar Premium"}
          </Link>
        </div>

        {/* Divisor vertical */}
        <div className="divisor-vertical"></div>

        {/* Sección derecha: Arcanus Points */}
        <div className="superior-seccion-ap">
          <div className="seccion-label">Arcanus Points</div>
          <div className="seccion-contenido saldo-ap-display">
            <ArcanusPointsCoin size={40} />
            <span className="ap-saldo">
              {loading ? "..." : arcanusPoints.toLocaleString("es-AR")} AP
            </span>
          </div>
          <Link to="/tienda" className="btn-seccion comprar">
            Comprar AP
          </Link>
        </div>

        {/* Divisor vertical */}
        <div className="divisor-vertical"></div>

        {/* Botón de logout al final */}
        <button className="btn-logout-superior" onClick={desconectar}>
          🚪 Cerrar sesión
        </button>
      </div>

      {/* ⭐ GRID DE SECCIONES - 2 columnas */}
      <div className="panel-secciones-grid">
        {/* Mis Personajes */}
        <div className="seccion-card">
          <div className="seccion-icono">⚔️</div>
          <h3 className="seccion-titulo">Mis Personajes</h3>
          <p className="seccion-descripcion">
            Gestiona tus personajes, estadísticas y más
          </p>
          <button className="seccion-btn" onClick={verPersonajes}>
            Ver personajes
          </button>
        </div>

        {/* Mercado */}
        <div className="seccion-card">
          <div className="seccion-icono">🏪</div>
          <h3 className="seccion-titulo">Panel de MAO</h3>
          <p className="seccion-descripcion">
            Gestiona tus publicaciones de MAO
          </p>
          <button className="seccion-btn" onClick={verMAO}>
            Ir a tu panel de MAO
          </button>
        </div>

        {/* Soporte */}
        <div className="seccion-card">
          <div className="seccion-icono">💬</div>
          <h3 className="seccion-titulo">Soporte</h3>
          <p className="seccion-descripcion">
            Consulta tus tickets y solicitudes
          </p>
          <Link
            to="/panel-de-usuario/historial-de-soportes"
            className="seccion-btn"
          >
            Ver soportes
          </Link>
        </div>

        {/* Configuración */}
        <div className="seccion-card">
          <div className="seccion-icono">⚙️</div>
          <h3 className="seccion-titulo">Configuración</h3>
          <p className="seccion-descripcion">Cambia tu contraseña y email</p>
          <div className="seccion-links">
            <Link
              to="/panel-de-usuario/change-password"
              className="seccion-link"
            >
              Cambiar contraseña
            </Link>
            <Link to="/panel-de-usuario/change-email" className="seccion-link">
              Cambiar email
            </Link>
          </div>
        </div>

        {/* Ayuda a la comunidad */}
        <div className="seccion-card">
          <div className="seccion-icono">🐛</div>
          <h3 className="seccion-titulo">Reportar Error</h3>
          <p className="seccion-descripcion">
            Ayúdanos a mejorar reportando bugs
          </p>
          <a
            href="https://discord.com/channels/860283261539450881/976668226299756545"
            target="_blank"
            rel="noopener noreferrer"
            className="seccion-btn"
          >
            Ir a Discord
          </a>
        </div>
      </div>

      {/* Modal de cerrando sesión */}
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
