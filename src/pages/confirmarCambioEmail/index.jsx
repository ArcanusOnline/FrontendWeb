import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { confirmUpdateEmailAccountQuery } from "../../querys/scripts";

const ConfirmarCambioEmailCuenta = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function cargarEstado() {
      if (token && isLoading) {
        const chequeo = await confirmUpdateEmailAccountQuery(token);
        setEstado(chequeo?.message || "Error al confirmar el cambio de email.");
        setTimeout(() => {
          navigate("/");
        }, 5000);
        setIsLoading(false);
      }
    }

    cargarEstado();
  }, [token, isLoading, navigate]);

  return (
    <div className="confirmar-cambio-email">
      <h2>{estado}</h2>
    </div>
  );
};

export { ConfirmarCambioEmailCuenta };
