import { useState, useEffect } from "react";
import { rankingPorClases } from "../../querys/scripts.js";
import { urlImagenes } from "../../assets/urlImagenes.js";
import { useRedireccionar } from "../../assets/functions.js";
import "./style.css";

const RankingPorClases = () => {
  const [clase, setClase] = useState("");
  const [fields, setFields] = useState([]);
  const [error, setError] = useState(false);
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);
  const redireccionar = useRedireccionar();

  const traerData = async () => {
    setLoading(true);
    const data = await rankingPorClases(clase); // Asumo que esta función está definida en otro lado
    setLoading(false);

    if (!data || data.message) {
      setError(true);
      setFields([]);
      setDataError(data?.message || "Error desconocido");
    } else {
      setError(false);
      setFields(data);
    }
  };

  useEffect(() => {
    if (clase !== "") {
      traerData();
    }
  }, [clase]);

  return (
    <div className="lista-ranking-clases">
      <div className="change-ranking-buttons-container">
        <button
          onClick={() => {
            redireccionar("/top100");
          }}
          className="change-ranking-button"
        >
          Top 100
        </button>
        <button
          onClick={() => {
            redireccionar("/");
          }}
          className="change-ranking-button"
        >
          Ranking de Retos
        </button>
      </div>
      <div className="lista-ranking-clases-container">
        <select
          id="razaRanking"
          className="rankingSelect"
          value={clase}
          onChange={(e) => setClase(e.target.value)}
        >
          <option value="" disabled hidden>
            Seleccione la raza
          </option>
          <optgroup label="Clases de combate">
            <option value="Guerrero">Guerrero</option>
            <option value="Cazador">Cazador</option>
            <option value="Paladin">Paladín</option>
            <option value="Mago">Mago</option>
            <option value="Druida">Druida</option>
            <option value="Bardo">Bardo</option>
            <option value="Ladron">Ladrón</option>
            <option value="Clerigo">Clérigo</option>
            <option value="Asesino">Asesino</option>
            <option value="Pirata">Pirata</option>
          </optgroup>
          <optgroup label="Clases trabajadoras">
            <option value="Carpintero">Carpintero</option>
            <option value="Lenador">Leñador</option>
            <option value="Herrero">Herrero</option>
            <option value="Minero">Minero</option>
            <option value="Pescador">Pescador</option>
          </optgroup>
        </select>

        <table className="rankingTable">
          <thead>
            <tr>
              <th>POS.</th>
              <th>NICK</th>
              <th>LvL</th>
              <th>RAZA</th>
              <th>CLAN</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Cargando...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                  {dataError}
                </td>
              </tr>
            ) : Array.isArray(fields) && fields.length > 0 ? (
              fields.map((item, index) => {
                let posicion;
                if (index === 0) {
                  posicion = (
                    <img
                      className="ranking-podio-img first"
                      src={urlImagenes.medallaOro}
                      alt="1er lugar"
                    />
                  );
                } else if (index === 1) {
                  posicion = (
                    <img
                      className="ranking-podio-img second"
                      src={urlImagenes.medallaPlata}
                      alt="2do lugar"
                    />
                  );
                } else if (index === 2) {
                  posicion = (
                    <img
                      className="ranking-podio-img third"
                      src={urlImagenes.medallaBronce}
                      alt="3er lugar"
                    />
                  );
                } else {
                  posicion = `${index + 1}°`;
                }

                return (
                  <tr key={index}>
                    <td>{posicion}</td>
                    <td>{item.nick}</td>
                    <td>{item.lvl}</td>
                    <td>{item.raza}</td>
                    <td>{item.clan}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Sin resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { RankingPorClases };
