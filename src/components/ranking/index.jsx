import { useState, useEffect } from "react";
import { rankingPorClases } from "../../querys/scripts.js";

const RankingComponent = () => {
  const [clase, setClase] = useState(""); // Inicializa vacío
  const [fields, setFields] = useState([]);
  const [error, setError] = useState(false);
  const [dataError, setDataError] = useState("");
  const [loading, setLoading] = useState(false);

  const traerData = async () => {
    setLoading(true);
    const data = await rankingPorClases(clase);
    setLoading(false);

    if (!data || data.message) {
      setError(true);
      setFields([]);
      setDataError(data.message || "Error desconocido");
    } else {
      setError(false);
      setFields(data);
    }
  };

  useEffect(() => {
    if (clase !== "") {
      // Solo consulta si hay una clase seleccionada
      traerData();
    }
  }, [clase]);

  return (
    <div className="rankingClases">
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
          ) : (
            fields.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}°</td>
                <td>{item.nick}</td>
                <td>{item.lvl}</td>
                <td>{item.raza}</td>
                <td>{item.clan}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export { RankingComponent };
