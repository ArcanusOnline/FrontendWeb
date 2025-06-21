import { useParams, useNavigate } from "react-router";
import { protectedName } from "../../assets/protectedName";
import { useEffect, useState } from "react";
import { enviarActivacion } from "../../querys/scripts";

const ActivarCuenta = () => {
  const { token } = useParams();
  const [mensaje, setMensaje] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    async function activar() {
      const nick = await protectedName(token);
      if (nick) {
        let response = await enviarActivacion(token);
        console.log(response);
        setMensaje(response);
        setTimeout(() => {
          navigate("/cuenta");
        }, 10000);
      }
    }
    activar();
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="mensajeCuentaActivada">Token inválido o ausente</div>
    );
  }

  return <div className="mensajeCuentaActivada">{mensaje}</div>;
};

export { ActivarCuenta };
