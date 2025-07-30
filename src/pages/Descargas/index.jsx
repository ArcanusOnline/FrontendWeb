import "./style.css";

const PaginaDescarga = () => {
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
      </div>
    </div>
  );
};
export { PaginaDescarga };
