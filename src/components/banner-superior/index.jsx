import "./style.css";
import { urlImagenes } from "../../assets/urlImagenes";
import { NavLink, Link } from "react-router";
import { useState } from "react";

const BannerInicio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Opcional: cerrar menú al hacer clic en un link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <div className="bannerConLogo">
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div className="logo">
        <img src={urlImagenes.logo} alt="Logo Arcanus" />
      </div>

      <div className="cta">
        <Link to="/lista-de-descargas">Comenzar a jugar</Link>
      </div>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cuenta"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cuenta
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ranking"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Ranking
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top100"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Top 100
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Staff
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manual-del-juego"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manual
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reglas"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reglas
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export { BannerInicio };
