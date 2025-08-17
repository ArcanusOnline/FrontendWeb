import { getRankingRetos } from "../../querys/scripts";
import { useState, useEffect } from "react";
import { urlImagenes } from "../../assets/urlImagenes";
import { useRedireccionar } from "../../assets/functions";
import "./style.css";

const RankingRetos = () => {
  let [ranking, setRanking] = useState([]);
  const redireccionar = useRedireccionar();

  useEffect(() => {
    async function getRank() {
      try {
        let response = await getRankingRetos();
        if (response) {
          let topActualizado = [];
          response.map((elem) => {
            topActualizado.push({
              ...elem,
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
    <div className="lista-ranking-retos">
      <h1 className="lista-ranking-title">Ranking de Retos</h1>
      <div className="lista-ranking-main-container">
        <div className="lista-ranking-buttons-container">
          <button
            onClick={() => {
              redireccionar("/ranking");
            }}
            className="change-ranking-button"
          >
            Ranking por Clases
          </button>
          <button
            onClick={() => {
              redireccionar("/top100");
            }}
            className="change-ranking-button"
          >
            Top 100
          </button>
        </div>
        <table className="tableRanking">
          <thead>
            <tr>
              <th>POS.</th>
              <th>NICK</th>
              <th>RETOS GANADOS</th>
              <th>RETOS PERDIDOS</th>
              <th>ORO GANADO</th>
              <th>ORO PERDIDO</th>
            </tr>
          </thead>
          <tbody>
            {ranking.length > 0 ? (
              ranking.map((elem, index) => {
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
                    <td>{elem.NickB.toUpperCase()}</td>
                    <td>{elem.RG}</td>
                    <td>{elem.RP}</td>
                    <td>{elem.OG}</td>
                    <td>{elem.OP}</td>
                  </tr>
                );
              })
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
    </div>
  );
};

export { RankingRetos };
