import "./style.css";
import { urlImagenes } from "../../assets/urlImagenes";
import { NavLink, Link } from "react-router";
import { useState, useEffect } from "react";
import { obtenerOnlinesServidor } from "../../querys/scripts";

const BannerInicio = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // Opcional: cerrar menú al hacer clic en un link
  const handleLinkClick = () => setMenuOpen(false);
  let [onlines, setOnlines] = useState(0); // Cantidad de onlines en el servidor

  useEffect(() => {
    async function cantidadOnlines() {
      let data = await obtenerOnlinesServidor();
      if (data.length > 0) {
        setOnlines(data?.onlines[0]?.NumeroB);
      } else {
        setOnlines(0);
      }
    }
    cantidadOnlines();
  }, []);

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
        <Link to="/">
          <img src={urlImagenes.logo} alt="Logo Arcanus" />
        </Link>
      </div>
      {/* Overlay */}
      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}
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
          <li>
            <NavLink
              to="https://discord.com/invite/Eqg7zmVj2f"
              onClick={handleLinkClick}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <img src={urlImagenes.discordWhite} alt="Discord" />
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="cta">
        <Link to="/lista-de-descargas">Comenzar a jugar</Link>
        <p>{`Cantidad de onlines: ${onlines}`}</p>
      </div>
    </div>
  );
};

export { BannerInicio };
