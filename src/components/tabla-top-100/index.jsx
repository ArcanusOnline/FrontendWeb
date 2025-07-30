import { calcularExp } from "../../assets/calculadoraExp";
import { getTop100 } from "../../querys/scripts";
import { useState, useEffect } from "react";
import "./style.css";

const Ranking = () => {
  let [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function getRank() {
      try {
        let response = await getTop100();
        if (response) {
          let topActualizado = [];
          response.map((elem) => {
            topActualizado.push({
              ...elem,
              EXPB: calcularExp(elem.ELVB, elem.EXPB),
            });
          });
          setRanking(topActualizado);
        }
      } catch (error) {
        console.error("Hubo un error al conectarse con el servidor");
      }
    }

    getRank();
  }, []);

  return (
    <div className="lista-ranking-cien">
      <table className="tableRanking">
        <caption>TOP 100</caption>
        <thead>
          <tr>
            <th>POS.</th>
            <th>NICK</th>
            <th>LvL</th>
            <th>CLASE</th>
            <th>CLAN</th>
            <th>EXP%</th>
          </tr>
        </thead>
        <tbody>
          {ranking.length > 0 ? (
            ranking.map((elem, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{elem.NickB.toUpperCase()}</td>
                <td>{elem.ELVB}</td>
                <td>{elem.ClaseB.toUpperCase()}</td>
                <td>
                  {elem.nombreClan == null ? "SIN CLAN" : elem.nombreClan}
                </td>
                <td>{elem.ELVB < 47 ? `${elem.EXPB}%` : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No hay datos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { Ranking };
