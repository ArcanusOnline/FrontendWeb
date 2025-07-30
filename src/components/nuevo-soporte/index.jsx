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
      <form className="formulario-nuevo-soporte" onSubmit={handleSubmit}>
        <h2 className="titulo-nuevo-soporte">Nuevo Soporte</h2>

        <label className="label-nuevo-soporte" htmlFor="asunto">
          Asunto del soporte:
        </label>
        <input
          className="input-nuevo-soporte"
          type="text"
          id="asunto"
          name="asunto"
          value={formData.asunto}
          onChange={handleChange}
          required
        />

        <label className="label-nuevo-soporte" htmlFor="sector">
          Sector:
        </label>
        <select
          className="select-nuevo-soporte"
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

        <label className="label-nuevo-soporte" htmlFor="nick">
          Personaje:
        </label>
        <select
          className="select-nuevo-soporte"
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

        <label className="label-nuevo-soporte" htmlFor="texto">
          Descripción del soporte:
        </label>
        <textarea
          className="textarea-nuevo-soporte"
          id="texto"
          name="texto"
          value={formData.texto}
          onChange={handleChange}
          rows="4"
          cols="50"
          required
        ></textarea>

        <div className="checkbox-nuevo-soporte">
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

        <input
          className="boton-enviar-nuevo-soporte"
          type="submit"
          value="Enviar soporte"
        />
      </form>

      {successMessage && (
        <div className="modal-overlay">
          <div className="modal-content success">
            <p>{successMessage}</p>
          </div>
        </div>
      )}

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
