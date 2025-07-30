import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { confirmarEliminacionPersonaje } from "../../querys/scripts";
import "./style.css";

const ConfirmacionEliminadoPersonaje = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarEstado() {
      if (token && isLoading) {
        const chequeo = await confirmarEliminacionPersonaje(token);
        setEstado(chequeo?.message || "Error al confirmar eliminación.");
        setTimeout(() => {
          navigate("/");
        }, 5000);
        setIsLoading(false);
      }
    }

    cargarEstado();
  }, [token, isLoading, navigate]);

  return (
    <div className="confirmacion-pj-delete">
      <h2>{estado}</h2>
    </div>
  );
};

export { ConfirmacionEliminadoPersonaje };
