import { BannerLateral, NoticiasInicio } from "../../components/index.js";
import { urlImagenes } from "../../assets/urlImagenes.js";
import { NavLink } from "react-router";
import "./style.css";
const Inicio = () => {
  return (
    <div className="paginaInicio">
      <BannerLateral />
      <NoticiasInicio />
      <div className="discord-tooltip-container">
        <NavLink
          to="https://discord.arcanusonline.com/"
          className="discord-button"
        >
          {" "}
          <img src={urlImagenes.discordWhite} alt="Discord" />{" "}
        </NavLink>
        <span className="discord-tooltip">¡Unite a nuestro Discord!</span>
      </div>
    </div>
  );
};

export { Inicio };
