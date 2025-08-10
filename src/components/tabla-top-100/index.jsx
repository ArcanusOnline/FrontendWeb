import { calcularExp } from "../../assets/calculadoraExp";
import { getTop100 } from "../../querys/scripts";
import { useState, useEffect } from "react";
import { urlImagenes } from "../../assets/urlImagenes";
import { useRedireccionar } from "../../assets/functions";
import "./style.css";

const Ranking = () => {
  let [ranking, setRanking] = useState([]);
  const redireccionar = useRedireccionar();

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
      <h1 className="lista-ranking-title">
        Los Personajes mas Poderosos de Arcanus
      </h1>
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
              redireccionar("/");
            }}
            className="change-ranking-button"
          >
            Ranking de Retos
          </button>
        </div>
        <table className="tableRanking">
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
                    <td>{elem.ELVB}</td>
                    <td>{elem.ClaseB.toUpperCase()}</td>
                    <td>
                      {elem.nombreClan == null ? "SIN CLAN" : elem.nombreClan}
                    </td>
                    <td>{elem.ELVB < 47 ? `${elem.EXPB}%` : "-"}</td>
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

export { Ranking };
