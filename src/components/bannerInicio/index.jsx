import { urlImagenes } from "../../assets/urlImagenes";
import { NavLink } from "react-router";

const BannerInicio = () => {
  return (
    <>
      <div className="bannerConLogo">
        <img src={urlImagenes.logo} alt="Logo Arcanus" />
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cuenta"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Cuenta
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ranking"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Ranking
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/top100"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Top 100
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/staff"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Staff
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/manual"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Manual
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reglas"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reglas
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export { BannerInicio };
