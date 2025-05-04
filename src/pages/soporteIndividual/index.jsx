import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  obtenerDataSoporte,
  enviarRespuestaNuevaSoporte,
  cerrarSoporte,
} from "../../querys/scripts";

const SoporteInfo = () => {
  let [parametro] = useSearchParams();
  let ticket = parametro.get("ticket");
  let [respuestas, setRespuestas] = useState([]);
  let navigate = useNavigate();
  let token = localStorage.getItem("token") || "";
  let [formData, setFormData] = useState({
    censura: "",
    texto: "",
    idSoporte: "",
    token: token,
  });
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await enviarRespuestaNuevaSoporte(formData);
    if (data.error === 0) {
      navigate("/panel-usuario/historialDeSoportes");
      alert(data.message);
      return;
    } else {
      alert(data.message);
      return;
    }
  }

  useEffect(() => {
    if (!ticket) {
      navigate("/");
      return;
    }
    async function extraerDatos() {
      try {
        const data = await obtenerDataSoporte(ticket, token);
        if (!data || !Array.isArray(data) || data.length === 0) {
          navigate("/"); // redirecciona si no le corresponde
          return;
        }
        setRespuestas(data);
        setFormData({ ...formData, idSoporte: data[0].id });
      } catch (error) {
        console.error("Error al obtener datos del soporte:", error);
        navigate("/");
      }
    }

    extraerDatos();
  }, [ticket, navigate]);

  async function closeSupport() {
    const confirmado = window.confirm("¿Estás seguro que deseas cerrar el soporte?");
    if (confirmado) {
     let response = await cerrarSoporte(formData.idSoporte);
      if(response.error === 0){
        navigate("/panel-usuario/historialDeSoportes")
        alert(response.message);
      }
    }
  }

  return (
    <div className="contenedor-soporte">
      {respuestas.length > 0 ? (
        <div className="soporte-detalle">
          <div className="botones-container">
            <h1 className="soporte-titulo">Asunto: {respuestas[0].asunto}</h1>
            {respuestas[0].estado != "Cerrado" ? (
              <button type="button" className="cerrar-soporte-btn" onClick={closeSupport}>
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
                <p className="mensaje-texto">
                  {item.censura === "CENSURADO"
                    ? "Mensaje censurado"
                    : item.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Cargando o sin respuestas...</p>
      )}

      {respuestas.length > 0 && respuestas[0].estado !== "Cerrado" ? (
        <form className="soporte-formulario" onSubmit={handleSubmit}>
          <label htmlFor="mensaje" style={{ color: "orangered" }}>
            Responder:
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="4"
            placeholder="Escriba su respuesta aquí..."
            value={formData.texto}
            onChange={(e) =>
              setFormData({ ...formData, texto: e.target.value })
            }
          />

          <div className="checkbox-censura">
            <input
              type="checkbox"
              id="censuraRespuesta"
              name="censuraRespuesta"
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  censura: e.target.checked ? "CENSURADO" : "",
                }))
              }
            />

            <label htmlFor="censuraRespuesta">
              Marcar mensaje como CENSURADO
            </label>
          </div>

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
