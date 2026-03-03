import { useParams, useSearchParams, useNavigate } from "react-router";
import "./style.css";

const config = {
  success: {
    icono: "✓",
    titulo: "¡Pago exitoso!",
    clase: "success",
    mensajes: {
      donacion:
        "Muchas gracias por apoyar a Arcanus Online. ¡Tu aporte hace la diferencia!",
      points: "Tus Arcanus Points fueron acreditados. ¡Que los disfrutes!",
    },
  },
  failure: {
    icono: "✕",
    titulo: "Pago rechazado",
    clase: "error",
    mensajes: {
      donacion: "No se pudo procesar el pago. Por favor, intentalo nuevamente.",
      points: "No se pudo procesar el pago. Por favor, intentalo nuevamente.",
    },
  },
  pending: {
    icono: "⏳",
    titulo: "Pago pendiente",
    clase: "pending",
    mensajes: {
      donacion:
        "Tu pago está siendo procesado. ¡Muchas gracias por apoyar Arcanus Online!",
      points:
        "Tu pago está siendo procesado. Los puntos serán acreditados en breve.",
    },
  },
};

const ResultadoPago = () => {
  const { status, tipo } = useParams(); // tipo: "donacion" | "points"
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const paymentId = searchParams.get("payment_id");
  const tipoValido =
    tipo === "donacion" || tipo === "points" ? tipo : "donacion";
  const estadoConfig = config[status];

  if (!estadoConfig) {
    return (
      <div className="confirmar-container">
        <div className="confirmar-card error">
          <div className="confirmar-icono error">✕</div>
          <h2 className="confirmar-titulo error">Página no encontrada</h2>
          <p className="confirmar-mensaje">El estado del pago no es válido.</p>
          <button
            className="confirmar-boton error"
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const { icono, titulo, clase, mensajes } = estadoConfig;
  const mensaje = mensajes[tipoValido];

  return (
    <div className="confirmar-container">
      <div className={`confirmar-card ${clase}`}>
        <div className={`confirmar-icono ${clase}`}>{icono}</div>

        <h2 className={`confirmar-titulo ${clase}`}>{titulo}</h2>

        <p className="confirmar-mensaje">{mensaje}</p>

        {paymentId && (
          <p className="confirmar-subtitulo">ID de pago: {paymentId}</p>
        )}

        <button
          className={`confirmar-boton ${clase}`}
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export { ResultadoPago };
