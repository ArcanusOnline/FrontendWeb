import "./style.css";
import { useRedireccionar } from "../../assets/functions";

const PaginaDescarga = () => {
  const redireccionar = useRedireccionar();
  return (
    <div className="links-descargas">
      <h2 className="links-descargas-title">Descargas</h2>
      <div className="links-descargas-list">
        <a href="/descargas/cliente" target="_blank" rel="noopener noreferrer">
          Descarga #1
        </a>
        <a href="/descargas/patch" target="_blank" rel="noopener noreferrer">
          Descarga #2
        </a>
        <a href="/descargas/manual" target="_blank" rel="noopener noreferrer">
          Descarga #3
        </a>
        <a href="/descargas/manual" target="_blank" rel="noopener noreferrer">
          Descarga #4
        </a>
        <button
          className="registrarse-button"
          onClick={() => redireccionar("/registrarse")}
        >
          Aun no tenes cuenta? Registrate
        </button>
      </div>
    </div>
  );
};
export { PaginaDescarga };
