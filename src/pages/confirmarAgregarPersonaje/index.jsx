import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { confirmAddCharacterAccount } from "../../querys/scripts";

const ConfirmarAgregarPersonaje = () => {
  let param = useParams();
  let { token } = param;
  let navigate = useNavigate();
  let [estado, setEstado] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  async function cargarEstado() {
    if (token && isLoading) {
      let chequeo = await confirmAddCharacterAccount(token);
      setEstado(chequeo?.message);
      setTimeout(() => {
        navigate("/");
      }, 5000);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function refrescarEstado() {
      await cargarEstado();
    }
    refrescarEstado();
  }, [token, isLoading]);

  return (
    <>
      <div
        style={{
          width: "100%",
          minHeight: "48vh",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>{estado}</h2>
      </div>
    </>
  );
};

export { ConfirmarAgregarPersonaje };
