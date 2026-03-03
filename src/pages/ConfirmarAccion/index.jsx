import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { confirmarAccion } from "../../querys/scripts";
import "./style.css";

const ConfirmarAccion = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [estado, setEstado] = useState("loading");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const confirmar = async () => {
      if (!token) {
        setEstado("error");
        setMensaje("Token no proporcionado.");
        return;
      }

      try {
        const response = await confirmarAccion(token);

        if (response.success) {
          setEstado("success");
          setMensaje(response.message);
        } else {
          setEstado("error");
          setMensaje(response.message || "Error al confirmar la acción.");
        }
      } catch (error) {
        setEstado("error");
        setMensaje("Error al procesar la confirmación.");
      }
    };

    confirmar();
  }, [token]);

  return (
    <div className="confirmar-container">
      <div className={`confirmar-card ${estado}`}>
        {/* Ícono según estado */}
        <div className={`confirmar-icono ${estado}`}>
          {estado === "loading" && <div className="confirmar-spinner" />}
          {estado === "success" && "✓"}
          {estado === "error" && "✕"}
        </div>

        {/* Título según estado */}
        <h2 className={`confirmar-titulo ${estado}`}>
          {estado === "loading" && "Confirmando..."}
          {estado === "success" && "¡Operación exitosa!"}
          {estado === "error" && "Algo salió mal"}
        </h2>

        {/* Mensaje */}
        {estado !== "loading" && <p className="confirmar-mensaje">{mensaje}</p>}

        {/* Subtítulo de carga */}
        {estado === "loading" && (
          <p className="confirmar-subtitulo">
            Por favor esperá mientras procesamos tu solicitud
          </p>
        )}

        {/* Botón para volver */}
        {estado !== "loading" && (
          <button
            className={`confirmar-boton ${estado}`}
            onClick={() => navigate("/")}
          >
            Volver al inicio
          </button>
        )}
      </div>
    </div>
  );
};

export { ConfirmarAccion };
