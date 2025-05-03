import { useLocation } from "react-router";
import { useState, useEffect } from "react";

const PanelMiniStats = () => {
  const location = useLocation();
  const [fieldsPj, setFieldsPj] = useState({});
  const datosPj = location.state?.response || {};
  const [style, setStyle] = useState({ backgroundColor: "" });

  useEffect(() => {
    if (datosPj) {
      setFieldsPj(datosPj);
      controlBanderin(datosPj);
    }
  }, []);

  function controlBanderin(data) {
    if (data.EjercitoCaosB === 1) {
      setStyle({ backgroundColor: "rgb(141, 5, 5)" });
    } else if (data.EjercitoRealB === 1) {
      setStyle({ backgroundColor: "rgb(26, 194, 216)" });
    } else if (data.PromedioB < 0) {
      setStyle({ backgroundColor: "rgb(255, 0, 0)" });
    } else {
      setStyle({ backgroundColor: "rgb(51, 10, 199)" });
    }
  }

  return (
    <div className="miniStats-container">
      <div className="banderinesStats" style={style}></div>
      <div>
        <div className="miniStats-title">
          Arcanus Online
          <br />
          <span>Mini estadísticas</span>
        </div>
        <table className="miniStats-table">
          <thead>
            <tr>
              <th colSpan="2" className="miniStats-nick">
                <div
                  style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <img
                    src={`/heads/${fieldsPj.HeadB}.png `}
                    alt="head"
                    className="raza-img"
                  />
                  {fieldsPj.NickB || "NOMBRE"}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Clase:</td>
              <td>{fieldsPj.ClaseB || "-"}</td>
            </tr>
            <tr>
              <td>Raza:</td>
              <td>{fieldsPj.RazaB || "-"}</td>
            </tr>
            <tr>
              <td>Reputación:</td>
              <td>{fieldsPj.PromedioB || "0"}</td>
            </tr>
            <tr>
              <td>Ciudadanos matados:</td>
              <td>{fieldsPj.CiudMatadosB || "0"}</td>
            </tr>
            <tr>
              <td>Criminales matados:</td>
              <td>{fieldsPj.CrimMatadosB || "0"}</td>
            </tr>
            <tr>
              <td>Usuarios matados:</td>
              <td>{fieldsPj.UserMuertesB || "0"}</td>
            </tr>
            <tr>
              <td>NPCs matados:</td>
              <td>{fieldsPj.NpcsMuertesB || "0"}</td>
            </tr>
            <tr>
              <td>Clan:</td>
              <td>{fieldsPj.Clan || "-"}</td>
            </tr>
            <tr>
              <td>Baneado:</td>
              <td>{fieldsPj.BaneadoB ? "Sí" : "No"}</td>
            </tr>
          </tbody>
        </table>
        <div className="miniStats-info">
          <p>
            <span className="blue">
              Recuerde que para entrar a la Armada Real necesita:
            </span>
            <br />
            Matar más de 100 criminales.
            <br />
            Ciudadanos matados debe ser 0, de lo contrario, no podrá ingresar
            nunca más.
            <br />
            Nivel debe ser 25 o más.
          </p>

          <p>
            <span className="red">
              Recuerde que para entrar a las Fuerzas del caos necesita:
            </span>
            <br />
            Ciudadanos matados deben ser 150 o más.
            <br />
            Nivel debe ser 25 o más.
          </p>
        </div>
      </div>
      <div className="banderinesStats" style={style}></div>
    </div>
  );
};

export { PanelMiniStats };
