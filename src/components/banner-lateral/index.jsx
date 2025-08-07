import { Link } from "react-router";
import { MiniStats } from "../boton-mini-estadisticas";
import "./style.css";

const BannerLateral = () => {
  return (
    <>
      <div className="bannerLateral">
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
            <MiniStats />
          </li>
          <li>
            <Link to="/calculadora-de-vida">
              Calculadora de<br></br>vida
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export { BannerLateral };
