import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { confirmAddCharacterAccount } from "../../querys/scripts";
import "./style.css";

const ConfirmarAgregarPersonaje = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarEstado() {
      if (token && isLoading) {
        const chequeo = await confirmAddCharacterAccount(token);
        setEstado(chequeo?.message || "Error al confirmar");
        setTimeout(() => {
          navigate("/");
        }, 5000);
        setIsLoading(false);
      }
    }

    cargarEstado();
  }, [token, isLoading, navigate]);

  return (
    <div className="confirmar-agregar-pj">
      <h2>{estado}</h2>
    </div>
  );
};

export { ConfirmarAgregarPersonaje };
