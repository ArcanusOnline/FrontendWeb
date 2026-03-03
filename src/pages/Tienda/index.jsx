import "./style.css";
import { useState, useEffect } from "react";
import {
  getPaquetesArcanusPoints,
  comprarArcanusPoints,
  getPaquetesTiempoPremium,
  cargarTiempoPremium,
} from "../../querys/scripts";
import { ArcanusPointsCoin } from "../../ui/arcanusPointsLogo";
import { Modal } from "../../ui/Modales";
import { useAuth } from "../../useContext/useContext";
import { useRedireccionar } from "../../assets/functions";

const TiendaArcanus = () => {
  const [tabPrincipal, setTabPrincipal] = useState("arcanus-points");
  const [paquetes, setPaquetes] = useState([]);
  const [paquetesPremium, setPaquetesPremium] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCompra, setLoadingCompra] = useState(null); // para Arcanus Points
  const [loadingPremiumID, setLoadingPremiumID] = useState(null); // para Premium
  const [loadingPremium, setLoadingPremium] = useState(false);
  const { token } = useAuth();
  const redireccionar = useRedireccionar();

  const [showResultModal, setShowResultModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
  });

  const cargarInformacion = async () => {
    setLoading(true);
    try {
      let paquetesArcanusPoints = await getPaquetesArcanusPoints();
      let paquetesTiempoPremium = await getPaquetesTiempoPremium();

      if (Array.isArray(paquetesArcanusPoints)) {
        // Filtrar solo los activos
        const paquetesActivos = paquetesArcanusPoints.filter(
          (p) => p.Activo === 1,
        );
        setPaquetes(paquetesActivos);
      }

      if (Array.isArray(paquetesTiempoPremium)) {
        // Filtrar solo los activos
        const paquetesActivos = paquetesTiempoPremium.filter(
          (p) => p.Activo === 1,
        );
        setPaquetesPremium(paquetesActivos);
      }
    } catch (error) {
      console.error("Error cargando paquetes:", error);
      setPaquetes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarInformacion();
  }, []);

  const handleComprar = async (paquete) => {
    if (!token) {
      redireccionar("/cuenta", true);
      return;
    }
    setLoadingCompra(paquete.ID);

    try {
      const link = await comprarArcanusPoints(paquete.ID, token);
      window.location.href = link.data;
    } catch (error) {
      console.error("Error en la compra:", error);
      setModalConfig({
        type: "error",
        message: "Ocurrió un error al procesar la compra.",
      });
      setShowResultModal(true);
    } finally {
      setLoadingCompra(null);
    }
  };

  const handleComprarPremium = async (plan) => {
    if (!token) {
      redireccionar("/cuenta", true);
      return;
    }
    setLoadingPremium(true); // ← Desactiva todos
    setLoadingPremiumID(plan.ID);

    try {
      const response = await cargarTiempoPremium(plan.ID, token);

      setModalConfig({
        type: response.ok ? "success" : "error",
        message:
          response.message ||
          (response.ok
            ? "¡Tiempo premium cargado con éxito!"
            : "Ocurrió un error al acreditar el tiempo premium."),
      });
      setShowResultModal(true);
    } catch (error) {
      console.error("Error comprando premium:", error);
      setModalConfig({
        type: "error",
        message: "Ocurrió un error al acreditar el tiempo premium.",
      });
      setShowResultModal(true);
    } finally {
      setLoadingPremium(false);
      setLoadingPremiumID(null);
    }
  };
  const handleCloseResultModal = () => {
    setShowResultModal(false);
  };

  return (
    <div className="tienda-container">
      <div className="tienda-header">
        <h1 className="tienda-title">🛒 Tienda de Arcanus Online</h1>
      </div>

      {/* Tabs principales */}
      <div className="tabs-principales">
        <button
          className={`tab-principal ${tabPrincipal === "arcanus-points" ? "active" : ""}`}
          onClick={() => setTabPrincipal("arcanus-points")}
        >
          💎 Arcanus Points
        </button>
        <button
          className={`tab-principal ${tabPrincipal === "premium" ? "active" : ""}`}
          onClick={() => setTabPrincipal("premium")}
        >
          ⭐ Premium
        </button>
      </div>

      {/* Contenido */}
      <div className="tienda-contenido">
        {/* Tab Arcanus Points */}
        {tabPrincipal === "arcanus-points" && (
          <div className="seccion-ap">
            <div className="seccion-header">
              <h2 className="seccion-titulo">Comprar Arcanus Points</h2>
              <p className="seccion-descripcion">
                Los Arcanus Points te permiten adquirir items premium,
                membresías y beneficios exclusivos
              </p>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner" />
                <p>Cargando paquetes...</p>
              </div>
            ) : paquetes.length === 0 ? (
              <div className="mensaje-vacio">
                <h2>Sin paquetes disponibles</h2>
                <p>No hay paquetes disponibles en este momento.</p>
              </div>
            ) : (
              <div className="paquetes-grid">
                {paquetes.map((paquete) => {
                  return (
                    <div
                      key={paquete.ID}
                      className={`paquete-card ${paquete.Popular === 1 ? "popular" : ""}`}
                    >
                      {paquete.Popular === 1 && (
                        <div className="badge-popular">Más Popular</div>
                      )}

                      <div className="paquete-icono">
                        <ArcanusPointsCoin size={120} />
                      </div>

                      <h3 className="paquete-nombre">{paquete.Nombre}</h3>

                      <div className="paquete-puntos-info">
                        <div className="paquete-cantidad">
                          {paquete.CantidadPuntos.toLocaleString()} AP
                        </div>

                        {paquete.PuntosBonus > 0 && (
                          <div className="paquete-bonus">
                            + {paquete.PuntosBonus} AP de bonus
                          </div>
                        )}
                      </div>

                      <div className="paquete-precio">
                        <span className="precio-simbolo">$</span>
                        <span className="precio-valor">
                          {parseFloat(paquete.PrecioARS).toLocaleString(
                            "es-AR",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2,
                            },
                          )}
                        </span>
                        <span className="precio-moneda">ARS</span>
                      </div>

                      <button
                        className="btn-comprar-paquete"
                        disabled={loadingCompra === paquete.ID}
                        onClick={() => handleComprar(paquete)}
                      >
                        {loadingCompra === paquete.ID
                          ? "Procesando..."
                          : "Comprar ahora"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab Premium - Por ahora placeholder */}
        {tabPrincipal === "premium" && (
          <div className="seccion-premium">
            <div className="seccion-header">
              <h2 className="seccion-titulo">Planes Premium</h2>
              <p className="seccion-descripcion">
                Desbloqueá beneficios exclusivos y potenciá tu experiencia en
                Arcanus
              </p>
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner" />
                <p>Cargando planes...</p>
              </div>
            ) : paquetesPremium.length === 0 ? (
              <div className="mensaje-vacio">
                <h2>Sin planes disponibles</h2>
                <p>No hay planes premium activos en este momento.</p>
              </div>
            ) : (
              <div className="planes-grid">
                {paquetesPremium.map((plan) => (
                  <div
                    key={plan.ID}
                    className={`plan-card ${plan.Popular === 1 ? "popular" : ""}`}
                  >
                    {plan.Popular === 1 && (
                      <div className="badge-popular">Más Popular</div>
                    )}

                    <div className="plan-header">
                      <h3 className="plan-duracion">
                        {plan.MesesDuracion}{" "}
                        {plan.MesesDuracion === 1 ? "Mes" : "Meses"} Premium
                      </h3>

                      <div className="plan-precio">
                        <span className="precio-valor">
                          {plan.CostoArcanusPoints.toLocaleString()}
                        </span>
                        <span className="precio-moneda">AP</span>
                      </div>

                      {plan.MesesDuracion >= 3 && (
                        <div className="plan-ahorro">Mejor valor por mes</div>
                      )}
                    </div>

                    <ul className="plan-beneficios">
                      <li className="beneficio-item">
                        <span className="beneficio-check">✓</span>
                        Acceso a zonas exclusivas
                      </li>
                      <li className="beneficio-item">
                        <span className="beneficio-check">✓</span>
                        Bonus de experiencia
                      </li>
                      <li className="beneficio-item">
                        <span className="beneficio-check">✓</span>
                        Soporte prioritario
                      </li>
                      <li className="beneficio-item">
                        <span className="beneficio-check">✓</span>
                        Tag exclusivo en el juego
                      </li>
                    </ul>

                    <button
                      className="btn-comprar-paquete"
                      disabled={loadingPremium}
                      onClick={() => handleComprarPremium(plan)}
                    >
                      {loadingPremiumID === plan.ID
                        ? "Procesando..."
                        : "Comprar ahora"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal de resultado */}
      <Modal
        isOpen={showResultModal}
        type={modalConfig.type}
        title={
          modalConfig.type === "success"
            ? "¡Email enviado!"
            : modalConfig.type === "error"
              ? "Error"
              : "Advertencia"
        }
        message={modalConfig.message}
        onClose={handleCloseResultModal}
        buttonText="Entendido"
      />
    </div>
  );
};

export { TiendaArcanus };
