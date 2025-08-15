import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import { urlImagenes } from "../../assets/urlImagenes";
import "./style.css";

const PanelMiniStats = () => {
  const location = useLocation();
  const [fieldsPj, setFieldsPj] = useState({});
  const datosPj = location.state?.response || {};
  const [style, setStyle] = useState({ backgroundColor: "", color: "" });
  const [src, setSrc] = useState({ src: null });

  useEffect(() => {
    if (datosPj) {
      setFieldsPj(datosPj);
      controlBanderin(datosPj);
    }
  }, []);

  function controlBanderin(data) {
    if (data.EjercitoCaosB === 1) {
      setStyle({ backgroundColor: "rgb(141, 5, 5)", color: "rgb(141, 5, 5)" }); // Legion
      setSrc(urlImagenes.escudoLegion);
    } else if (data.EjercitoRealB === 1) {
      setStyle({
        backgroundColor: "rgb(26, 194, 216)",
        color: "rgb(26, 194, 216)",
      }); // Armada
      setSrc(urlImagenes.escudoArmada);
    } else if (data.PromedioB < 0) {
      setStyle({
        backgroundColor: "rgb(255, 0, 0)",
        color: "rgb(255, 0, 0)",
      }); // Criminal
      setSrc(null);
    } else {
      setStyle({
        backgroundColor: "rgb(4,103,171)",
        color: "rgb(0, 130, 220)",
      }); // Ciudadano
      setSrc(null);
    }
  }

  return (
    <div className="contenedor-panel-mini-estadisticas">
      <div
        className="banderin-panel-mini-estadisticas"
        style={{ "--color-banderin": style.backgroundColor }}
      >
        {" "}
        {src && <img src={src} alt="" />}
        <span className="banderin-texto">ARCANUS</span>
      </div>
      <div className="contenido-panel-mini-estadisticas">
        <div className="titulo-panel-mini-estadisticas">
          <span>Mini estadísticas</span>
        </div>
        <table className="tabla-panel-mini-estadisticas">
          <thead>
            <tr>
              <th colSpan="2" className="nick-panel-mini-estadisticas">
                <div className="nick-header-panel-mini-estadisticas">
                  <img
                    src={`/heads/${fieldsPj.HeadB}.png`}
                    alt="head"
                    className="imagen-raza-panel-mini-estadisticas"
                  />
                  {
                    <legend style={{ color: style.color }}>
                      {fieldsPj.NickB || "NOMBRE"}
                    </legend>
                  }
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
              <td>{fieldsPj.BanB === 1 ? "Sí" : "No"}</td>
            </tr>
          </tbody>
        </table>

        <div className="info-extra-panel-mini-estadisticas">
          <p>
            <span className="texto-azul-panel-mini-estadisticas">
              Requisitos para entrar a la Armada Real:
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
            <span className="texto-rojo-panel-mini-estadisticas">
              Requisitos para entrar a las Fuerzas del Caos:
            </span>
            <br />
            Ciudadanos matados deben ser 150 o más.
            <br />
            Nivel debe ser 25 o más.
          </p>
        </div>
      </div>
      <div
        className="banderin-panel-mini-estadisticas"
        style={{ "--color-banderin": style.backgroundColor }}
      >
        {src && <img src={src} alt="" />}
        <span className="banderin-texto">ARCANUS</span>
      </div>
    </div>
  );
};

export { PanelMiniStats };
