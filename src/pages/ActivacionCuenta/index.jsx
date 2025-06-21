import { useParams, useNavigate } from "react-router";
import { protectedName } from "../../assets/protectedName";
import { useEffect, useState } from "react";
import { enviarActivacion } from "../../querys/scripts";

const ActivarCuenta = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function activar() {
      const nick = await protectedName(token);
      if (nick) {
        const response = await enviarActivacion(token);
        setMensaje(response);
        setTimeout(() => {
          navigate("/cuenta");
        }, 10000);
      } else {
        setMensaje("Token inválido o ausente");
      }
    }

    if (token) {
      activar();
    } else {
      setMensaje("Token inválido o ausente");
    }
  }, [token, navigate]);

  return (
    <div className="mensajeCuentaActivada">{mensaje && <h2>{mensaje}</h2>}</div>
  );
};

export { ActivarCuenta };

export { ActivarCuenta };
