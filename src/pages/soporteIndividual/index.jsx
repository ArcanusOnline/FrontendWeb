import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { obtenerDataSoporte } from "../../querys/scripts";

const SoporteInfo = () => {
  let [parametro] = useSearchParams();
  let ticket = parametro.get("ticket");
  let [respuestas, setRespuestas] = useState([]);
  let navigate = useNavigate();
  let token = localStorage.getItem("token") || ""

  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  useEffect(() => {
    if (!ticket) {
      navigate("/");
      return;
    }

    async function extraerDatos() {
      try {
        const data = await obtenerDataSoporte(ticket,token );
        if (!data || !Array.isArray(data) || data.length === 0) {
          navigate("/"); // redirecciona si no le corresponde
          return;
        }
        setRespuestas(data);
      } catch (error) {
        console.error("Error al obtener datos del soporte:", error);
        navigate("/");
      }
    }

    extraerDatos();
  }, [ticket, navigate]);

  return (
    <div className="contenedor-soporte">
      {respuestas.length > 0 ? (
        <div className="soporte-detalle">
          <div className="botones-container">
            <h1 className="soporte-titulo">Asunto: {respuestas[0].asunto}</h1>
            {respuestas[0].estado != "Cerrado" ? (
              <button type="button" className="cerrar-soporte-btn">
                Cerrar soporte
              </button>
            ) : (
              <p>Cerrado</p>
            )}
          </div>
          <h2 className="soporte-categoria">
            {respuestas[0].descripcion} - Ticket #{respuestas[0].id}
          </h2>
          <div className="soporte-hilo">
            {respuestas.map((item, idx) => (
              <div key={idx} className="mensaje-hilo">
                <p className="mensaje-autor">
                  <span>{item.responde}</span>
                  <span className="fecha">{formatDate(item.fecha)}</span>
                </p>
                <p className="mensaje-texto">{item.censura === "CENSURADO" ? "Mensaje censurado" : item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Cargando o sin respuestas...</p>
      )}

      {respuestas.length > 0 && respuestas[0].estado !== "Cerrado" ? (
        <form className="soporte-formulario">
          <label htmlFor="mensaje">Responder:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="Escriba su respuesta aquí..."
          ></textarea>
          <div className="posicionEnviarRespuesta">
            <button type="submit">Enviar respuesta</button>
          </div>
        </form>
      ) : (
        <p className="soporte-cerrado">El soporte se encuentra cerrado</p>
      )}
    </div>
  );
};

export { SoporteInfo };
