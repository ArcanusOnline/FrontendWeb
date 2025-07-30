import { useSearchParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import {
  obtenerDataSoporte,
  enviarRespuestaNuevaSoporte,
  cerrarSoporte,
} from "../../querys/scripts";
import "./style.css";

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

  const [modalMensaje, setModalMensaje] = useState({
    abierto: false,
    texto: "",
  });
  const [modalConfirmacion, setModalConfirmacion] = useState(false);

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
      setModalMensaje({ abierto: true, texto: data.message });
      setTimeout(
        () => navigate("/panel-de-usuario/historial-de-soportes"),
        1500
      );
    } else {
      setModalMensaje({ abierto: true, texto: data.message });
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
          navigate("/");
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

  async function confirmarCierre() {
    let response = await cerrarSoporte(formData.idSoporte);
    if (response.error === 0) {
      setModalMensaje({ abierto: true, texto: response.message });
      setTimeout(
        () => navigate("/panel-de-usuario/historial-de-soportes"),
        1500
      );
    }
    setModalConfirmacion(false);
  }

  return (
    <div className="contenedor-info-soporte-individual">
      {/* Modal Mensaje */}
      {modalMensaje.abierto && (
        <div className="modal-overlay-info-soporte-individual">
          <div className="modal-content-info-soporte-individual">
            <p>{modalMensaje.texto}</p>
            <button
              onClick={() => setModalMensaje({ abierto: false, texto: "" })}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Confirmación */}
      {modalConfirmacion && (
        <div className="modal-overlay-info-soporte-individual">
          <div className="modal-content-info-soporte-individual">
            <p>¿Estás seguro que deseas cerrar el soporte?</p>
            <div
              style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
            >
              <button onClick={confirmarCierre}>Confirmar</button>
              <button onClick={() => setModalConfirmacion(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {respuestas.length > 0 ? (
        <div className="soporte-detalle-info-soporte-individual">
          <div className="botones-container-info-soporte-individual">
            <h1 className="soporte-titulo-info-soporte-individual">
              Asunto: {respuestas[0].asunto}
            </h1>
            {respuestas[0].estado !== "Cerrado" ? (
              <button
                type="button"
                className="cerrar-soporte-btn-info-soporte-individual"
                onClick={() => setModalConfirmacion(true)}
              >
                Cerrar soporte
              </button>
            ) : (
              <p>Cerrado</p>
            )}
          </div>
          <h2 className="soporte-categoria-info-soporte-individual">
            {respuestas[0].descripcion} - Ticket #{respuestas[0].id}
          </h2>
          <div className="soporte-hilo-info-soporte-individual">
            {respuestas.map((item, idx) => (
              <div key={idx} className="mensaje-hilo-info-soporte-individual">
                <p className="mensaje-autor-info-soporte-individual">
                  <span>{item.responde}</span>
                  <span className="fecha">{formatDate(item.fecha)}</span>
                </p>
                <p className="mensaje-texto-info-soporte-individual">
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
        <form
          className="soporte-formulario-info-soporte-individual"
          onSubmit={handleSubmit}
        >
          <label htmlFor="mensaje">Responder:</label>
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

          <div className="checkbox-censura-info-soporte-individual">
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

          <div className="posicionEnviarRespuesta-info-soporte-individual">
            <button type="submit">Enviar respuesta</button>
          </div>
        </form>
      ) : (
        <p className="soporte-cerrado-info-soporte-individual">
          El soporte se encuentra cerrado
        </p>
      )}
    </div>
  );
};

export { SoporteInfo };
