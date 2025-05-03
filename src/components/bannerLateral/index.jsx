import { Link } from "react-router";
import { MiniStats } from "../ministats";

const BannerLateral = () => {
  return (
    <>
      <div className="bannerLateral">
        <ul>
          <li>
            <Link to="/esperandoDescarga">
              Comenzar a jugar<br></br>Arcanus Online
            </Link>
          </li>
          <li>
            <Link to="/cuenta">
              Ingresa a tu<br></br>cuenta
            </Link>
          </li>
          <li>
            <Link to="/recoveryPasswords">
              Recuperar<br></br>contraseña
            </Link>
          </li>
          <li>
            <MiniStats />
          </li>
          <li>
            <Link to="/calculadoraVida">
              Calculadora de<br></br>vida
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export { BannerLateral };
