import { BannerLateral, NoticiasInicio } from "../../components/index.js";
import "./style.css"
const Inicio = () => {
  return (
    <div className="paginaInicio">
      <BannerLateral />
      <NoticiasInicio />
    </div>
  );
};

export { Inicio };