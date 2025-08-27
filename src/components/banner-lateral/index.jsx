import { Link } from "react-router";
import { useState } from "react";
import { MiniStats } from "../boton-mini-estadisticas";
import { ListarPersonajes } from "../boton-listar-pjs";
import { urlImagenes } from "../../assets/urlImagenes";
import "./style.css";

const BannerLateral = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {/* Overlay */}
      {visible && (
        <div className="overlay" onClick={() => setVisible(false)}></div>
      )}
      <div className={`bannerLateral ${visible ? "visible-mobile" : ""}`}>
        <ul>
          <li>
            <Link to="/cuenta">
              Ingresa a tu<br></br>cuenta
            </Link>
          </li>
          <li>
            <Link to="/recuperar-personaje">
              Recuperar<br></br>Personaje
            </Link>
          </li>
          <li>
            <ListarPersonajes />
          </li>
          <li>
            <MiniStats />
          </li>
          <li>
            <Link to="/calculadora-de-vida">
              Calculadora de<br></br>vida
            </Link>
          </li>
        </ul>
        <img
          src={urlImagenes.sidebarClose}
          className="sidebar-close"
          onClick={() => setVisible(!visible)}
        ></img>
      </div>
      <img
        src={urlImagenes.sidebar}
        className="sidebar-open"
        onClick={() => setVisible(!visible)}
      ></img>
    </div>
  );
};

export { BannerLateral };
