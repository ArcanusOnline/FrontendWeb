import { useEffect, useState } from "react";
import {
  traerInfoPersonajeAsuntoSoporte,
  enviarNuevoSoporte,
} from "../../querys/scripts";
import { useNavigate } from "react-router";
import "./style.css";

const NuevoSoporte = () => {
  const token = localStorage.getItem("token") || "";
  const account = localStorage.getItem("username") || "";

  const [formData, setFormData] = useState({
    asunto: "",
    sector: "",
    nick: "",
    texto: "",
    token: token,
    censura: "",
  });

  const [sectores, setSectores] = useState([]);
  const [personajes, setPersonajes] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    async function obtenerDatos() {
      let data = await traerInfoPersonajeAsuntoSoporte(formData.token);
      if (data.error === 0) {
        setSectores(data.data.sectores);
        setPersonajes(data.data.personajes);
      }
    }
    obtenerDatos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dato = await enviarNuevoSoporte(formData);
    if (dato.error === 0) {
      setSuccessMessage(dato.message);
      setTimeout(() => {
        navigate("/panel-de-usuario/historial-de-soportes");
      }, 2500);
    } else {
      setErrorMessage(typeof dato === "string" ? dato : "Ocurrió un error.");
    }
  };

  return (
    <>
      <form className="form-mmorpg" onSubmit={handleSubmit}>
        <h2 className="form-title">Nuevo Soporte</h2>

        <label className="form-label" htmlFor="asunto">
          Asunto del soporte:
        </label>
        <input
          className="form-input"
          type="text"
          id="asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          required
        />

        <label className="form-label" htmlFor="sector">
          Sector:
        </label>
        <select
          className="form-select"
          id="sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar --</option>
          {sectores &&
            sectores.map(([nombre, id]) => (
              <option key={id} value={id}>
                {nombre}
              </option>
            ))}
        </select>

        <label className="form-label" htmlFor="nick">
          Personaje:
        </label>
        <select
          className="form-select"
          id="nick"
          name="nick"
          value={formData.nick}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar --</option>
          {personajes && personajes.length > 0 ? (
            personajes.map((elem, index) => (
              <option key={index} value={elem}>
                {elem}
              </option>
            ))
          ) : (
            <option key={0} value={account}>
              {account}
            </option>
          )}
        </select>

        <label className="form-label" htmlFor="texto">
          Descripción del soporte:
        </label>
        <textarea
          className="form-textarea"
          id="texto"
          name="texto"
          value={formData.texto}
          onChange={handleChange}
          rows="4"
          cols="50"
          required
        ></textarea>

        <div className="form-checkbox">
          <label htmlFor="censura">
            <input
              type="checkbox"
              id="censura"
              name="censura"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  censura: e.target.checked ? "CENSURADO" : "",
                })
              }
            />
            Marcar mensaje como CENSURADO
          </label>
        </div>

        <input className="form-button" type="submit" value="Enviar soporte" />
      </form>

      {/* Modal de éxito */}
      {successMessage && (
        <div className="modal-overlay">
          <div className="modal-content success">
            <p>{successMessage}</p>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {errorMessage && (
        <div className="modal-overlay">
          <div className="modal-content error">
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export { NuevoSoporte };
